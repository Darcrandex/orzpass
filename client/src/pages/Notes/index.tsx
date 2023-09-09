/**
 * @name Notes
 * @description 列表
 * @author darcrand
 */

import DownloadButton from '@/common/DownloadButton'
import KeyModal from '@/common/KeyModal'
import Logo from '@/components/Logo'
import { useScrollBar } from '@/hooks/useScrollBar'
import { apiNotes } from '@/services/note'
import { MAX_NOTE_COUNT } from '@/types/enum'
import { DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useDebounce } from 'ahooks'
import { App, Button, Empty, Input, Space } from 'antd'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Notes() {
  const navigate = useNavigate()
  const client = useQueryClient()
  const { modal } = App.useApp()
  const { elRef } = useScrollBar()

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
        .filter((v) => !debouncedKeyword || v.title.includes(debouncedKeyword))
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
      <section className='flex flex-col h-full'>
        <header className='flex m-4 flex-wrap'>
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
            className='ml-2 mr-auto'
            onClick={() => {
              setKeyword('')
              refetch()
            }}
          />

          <Space className='mt-2 sm:mt-0'>
            <KeyModal />
            <Button type='primary' icon={<PlusOutlined />} onClick={beforeCreate}>
              Create
            </Button>
            <DownloadButton list={list} />
          </Space>
        </header>

        <section ref={elRef} className='relative flex-1 overflow-auto'>
          <ul>
            {filterList.map((v) => (
              <li
                key={v.id}
                className='group/item flex items-center m-4 p-4 bg-gray-50 rounded-lg cursor-pointer transition-all hover:bg-pink-50'
                onClick={() => navigate(`/note/${v.id}`)}
              >
                <Logo title={v.title} iconUrl={v.iconUrl} className='shrink-0' />

                <div className='ml-4 mr-auto truncate'>
                  <span className='text-gray-700 font-bold text-lg truncate'>{v.title}</span>
                  <p className='flex items-center text-gray-500 truncate'>
                    <span>{v.website || 'website'}</span>

                    <i className='inline-block w-1 h-1 mx-2 rounded-full bg-gray-300 max-sm:hidden'></i>
                    <span className='max-sm:hidden'>{v.username || 'username'}</span>
                  </p>
                </div>

                <div className='space-x-4 transition-all opacity-0 group-hover/item:opacity-90 max-sm:hidden'>
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
              </li>
            ))}
          </ul>

          <Empty
            className={clsx('py-10', (isFetching || filterList.length > 0) && 'hidden')}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='Empty Here'
          />
        </section>
      </section>
    </>
  )
}
