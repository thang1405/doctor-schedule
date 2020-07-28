import React from 'react'
import { Input } from 'antd'
import { AudioOutlined } from '@ant-design/icons'
import '../css/Search.css'

const { Search } = Input
export default function () {
  return (
    <Search
      placeholder="input search text"
      onSearch={(value) => console.log(value)}
      enterButton
    />
  )
}
