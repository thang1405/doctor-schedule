import React, { useState, useEffect } from 'react'
import { Input, AutoComplete } from 'antd'

import { getAll } from '../service/DoctorServices'
import { useHistory } from 'react-router-dom'

import '../css/Search.css'

const { Search } = Input

export default function SearchInput(props) {
  const [ListDoctors, setListDoctors] = useState([])
  const [options, setOptions] = useState([])
  const history = useHistory()

  useEffect(() => {
    getAll().then((res) => {
      const { data } = res
      const listOptions = data.map((i) => ({
        value: i.name,
        key: i.id,
      }))
      setListDoctors(listOptions)
    })
  }, [])
  const onSearch = (value) => { 
    history.push(`/search?name=${value}`)
  }

  const onSelect = (key) => {
    history.push(`/doctor/${key}`)
  }
  const onSearchComplete = (value)=>{
    if(value){
      const list = ListDoctors.filter(i=>{
        return i.value.search(value) !== -1 
      })
      setOptions(list)
    }else{
      setOptions([])
    }
  }

  return (
    <AutoComplete
      className='input'
      options={options}
      onSelect={(value,option) => {
        onSelect(option.key)
      }}
      onSearch={(value) => onSearchComplete(value)}
    >
      <Search
        size="large"
        placeholder="Nhập tên bác sĩ"
        onSearch={(value) => onSearch(value)}
      />
    </AutoComplete>
  )
}
