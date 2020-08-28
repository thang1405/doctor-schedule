import React, { useState, useEffect } from 'react'
import { Input, AutoComplete } from 'antd'

import { getAll } from '../service/DoctorServices'
import { useHistory } from 'react-router-dom'
import {convertString} from '../util/Validator'

import '../css/Search.css'

const { Search } = Input

function SearchInput(props) {
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

  const onSelect = (item) => {
    history.push(`/doctor/${item.key}-${convertString(item.value)}`)
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
        onSelect(option)
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
export default SearchInput