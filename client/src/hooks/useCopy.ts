import { App } from 'antd'

export function useCopy() {
  const { message } = App.useApp()

  const copy = (text?: string) => {
    if ('clipboard' in navigator && text) {
      navigator.clipboard
        .writeText(text)
        .then(() => message.success('Copy success'))
        .catch(() => message.error('Copy failed'))
    } else {
      message.error('Your browser does not support clipboard api')
    }
  }

  return [copy]
}
