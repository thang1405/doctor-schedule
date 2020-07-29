import React from 'react'
import '../css/Search.css'
import {Input } from 'antd'

const { Search } = Input

export default function SearchInput(props) {
  return (
    <Search
      className='input'
      size="large"
      placeholder={props.placeholder}
      onSearch={(value) => console.log(value)}
    />
  )
}
