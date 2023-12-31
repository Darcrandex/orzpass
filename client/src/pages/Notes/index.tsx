/**
 * @name Notes
 * @description 列表
 * @author darcrand
 */

import DownloadButton from '@/common/DownloadButton'
import KeyModal from '@/common/KeyModal'
import Logo from '@/components/Logo'
import { apiNotes } from '@/services/note'
import { MAX_NOTE_COUNT } from '@/types/enum'
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useDebounce } from 'ahooks'
import { App, Button, Empty, Input, Space, Spin } from 'antd'
import clsx from 'clsx'
import { isNil } from 'ramda'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Notes() {
  const navigate = useNavigate()
  const client = useQueryClient()
  const { modal } = App.useApp()

  const {
    data: list,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: () => apiNotes.list(),
  })

  const onRemove = useCallback(
    async (id: string) => {
      await apiNotes.remove(id)
      client.invalidateQueries(['notes'])
    },
    [client]
  )

  const beforeRemove = useCallback(
    (id: string) => {
      modal.confirm({ title: 'Warning', content: 'Are you sure you want to delete it?', onOk: () => onRemove(id) })
    },
    [modal, onRemove]
  )

  const [keyword, setKeyword] = useState<string>()
  const debouncedKeyword = useDebounce(keyword, { wait: 500 })
  const filterList = Array.isArray(list)
    ? list
        .filter((v) => {
          if (isNil(debouncedKeyword)) return true

          return (
            v.title.includes(debouncedKeyword) ||
            v.website?.includes(debouncedKeyword) ||
            v.remark?.includes(debouncedKeyword)
          )
        })
        .sort((a, b) => {
          if (a.updated_at && b.updated_at) {
            const d1 = new Date(a.updated_at)
            const d2 = new Date(b.updated_at)
            return d2.getTime() - d1.getTime() > 0 ? 1 : -1
          }
          return 0
        })
    : []

  const beforeCreate = useCallback(() => {
    if (list && list.length >= MAX_NOTE_COUNT) {
      modal.warning({ title: 'Tips', content: 'sorry, the number of notes has reached its limit' })
    } else {
      navigate('/note/new')
    }
  }, [list, modal, navigate])

  return (
    <>
      <header className='flex m-4 flex-wrap'>
        <Space className='mr-auto'>
          <Input.Search
            allowClear
            className='sm:!w-72 w-full'
            placeholder='input title to search'
            enterButton
            maxLength={20}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <Button
            type='primary'
            icon={<ReloadOutlined />}
            onClick={() => {
              setKeyword('')
              refetch()
            }}
          />
        </Space>

        <Space className='mt-2 sm:mt-0'>
          <KeyModal />
          <Button type='primary' icon={<PlusOutlined />} onClick={beforeCreate}>
            Create
          </Button>
          <DownloadButton list={list} />
        </Space>
      </header>

      <Spin spinning={isFetching}>
        <ul className='flex flex-wrap px-2'>
          {filterList.map((v) => (
            <li key={v.id} className={clsx('w-full lg:w-1/2 xl:w-1/3')} onClick={() => navigate(`/note/${v.id}`)}>
              <div className='group/item flex items-center m-2 p-4 bg-gray-50 rounded-lg cursor-pointer transition-all hover:bg-pink-50'>
                <Logo title={v.title} iconUrl={v.iconUrl} className='shrink-0' />

                <div className='ml-4 mr-auto truncate'>
                  <span className='text-gray-700 font-bold text-lg truncate'>{v.title}</span>
                  <p className='items-center max-w-full text-gray-500 truncate'>
                    <span>{v.website || v.username || 'no message'}</span>
                  </p>
                </div>

                <div className='flex space-x-4 transition-all opacity-0 group-hover/item:opacity-90 max-sm:hidden'>
                  <Button
                    type='text'
                    shape='circle'
                    icon={<EditOutlined className='text-gray-500' />}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/note/${v.id}/edit`)
                    }}
                  />
                  <Button
                    type='text'
                    shape='circle'
                    icon={<DeleteOutlined className='text-gray-500' />}
                    onClick={(e) => {
                      e.stopPropagation()
                      beforeRemove(v.id)
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Empty
          className={clsx('py-10', (isFetching || filterList.length > 0) && 'hidden')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description='Empty Here'
        />
      </Spin>
    </>
  )
}
