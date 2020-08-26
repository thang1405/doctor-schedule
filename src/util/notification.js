import React from 'react'
import { notification, Button } from 'antd'

export const notificationErrorNetwork = () => {
  const key = `open${Date.now()}`
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => {
        window.location.reload()
      }}
    >
      Thử lại
    </Button>
  )
  notification.error({
    message: 'Vui lòng thử lại',
    description: 'Trang đang gặp sự cố về mạng !',
    btn,
    key,
    top: 100,
    onClose: () => {
      console.log('Notification was closed')
    },
  })
}