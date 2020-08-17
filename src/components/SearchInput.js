import React, { useState, useEffect } from 'react'
import { Input, AutoComplete } from 'antd'

import { getAll } from '../service/DoctorServices'
import { useHistory } from 'react-router-dom'

import '../css/Search.css'

const { Search } = Input

export default function SearchInput(props) {
  const [optionList, setOptionList] = useState([])

  const history = useHistory()

  useEffect(() => {
    getAll().then((res) => {
      const { data } = res
      const listOptions = data.map((i) => ({
        value: i.first_name + ' ' + i.last_name,
        key: i.id,
      }))
      setOptionList(listOptions)
    })
  }, [])

  const onSearch = (value) => {
    history.push(`/search?name=${value}`)
  }

  const onSelect = (key) => {
    history.push(`/doctor/${key}`)
  }
  return (
    <AutoComplete
      style={{ width: 350 }}
      options={optionList}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      onSelect={(value,option) => {
        onSelect(option.key)
      }}
    >
      <Search
        className="input"
        size="large"
        placeholder="Nhập tên bác sĩ"
        onSearch={(value) => onSearch(value)}
      />
    </AutoComplete>
  )
}
