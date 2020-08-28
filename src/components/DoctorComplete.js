import React, { useEffect, useState } from 'react'
import { Form, Select } from 'antd'
import { getAll } from '../service/DoctorServices'
import DisableTime from './DisableTime';
function DoctorComplete(props) {
  const [doctors, setDoctors] = useState([])
  const [choose, setChoose] = useState({})
  const [isShow, setShow] = useState(false)
  useEffect(() => {
    getAll()
      .then((res) => {
        const { data } = res
        const list = data.map((i) => ({ ...i, value: i.name }))
        setDoctors(list)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const onChange =(value,item)=>{
    // console.log(value,doctors[item.key]);
    setShow(true)
    setChoose(doctors[item.key])
  }

  let optionToRender
  if (doctors.length) {
    optionToRender = doctors.map((item,index) => {
      return (
        <Select.Option
          value={item.id}
          key={index}
        >
          {item.name}
        </Select.Option>
      )
    })
  }

  return (
    <div>
      <Form.Item
        label="Chọn bác sĩ"
        name="doctor_id"
        hasFeedback
        rules={[{ required: true, message: 'Vui lòng chọn lại!' }]}
      >
        <Select placeholder="Select a person" onChange={onChange}>
        {optionToRender}
        </Select>
      </Form.Item>
      {isShow ? <DisableTime workTime={choose.workTime} doctorId={choose.id}/> : null}
    </div>
  )
}

export default DoctorComplete
