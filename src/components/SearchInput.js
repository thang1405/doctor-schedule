import React, { useState, useEffect } from 'react'
import { Input, AutoComplete } from 'antd'

import { getAll } from '../service/DoctorServices'

import '../css/Search.css'

const { Search } = Input

export default function SearchInput(props) {
  const [optionList, setOptionList] = useState([])
  useEffect(() => {
    getAll().then((res) => {
      const { data } = res
      const listOptions = data.map((i) => ({value : i.first_name + ' ' + i.last_name,key:i.id}))
      // console.log(listOptions)
      setOptionList(listOptions)
    })
  }, [])
  return (
    <AutoComplete
      style={{ width: 350 }}
      options={optionList}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    >
      <Search
        className="input"
        size="large"
        placeholder="Nhập tên bác sĩ"
        onSearch={(value) => console.log(value)}
      />
    </AutoComplete>
  )
}
