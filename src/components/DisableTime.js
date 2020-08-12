import React, { useEffect, useState } from 'react'
import { Form, Select, DatePicker } from 'antd'
import moment from 'moment'

import { getScheduleDoctor } from '../service/ScheduleServices'

function DisableTime({ workTime, doctorId, form }) {
  const [scheduled, setScheduled] = useState({})
  const [disabledShifts, setDisabledShifts] = useState([])

  useEffect(() => {
    getScheduleDoctor(doctorId)
      .then((res) => {
        const { data } = res
        const timeWork = data.map((i) => {
          return { time_work: i.time_work, date: i.date }
        })
        setScheduled(timeWork)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [doctorId])

  const checkDisableDate = (currentDay) => {
    const convertDay = moment(currentDay).format('YYYY-MM-DD')
    const listOfDate = scheduled
      ? scheduled.filter((i) => {
          return i.date === convertDay
        })
      : []
    return listOfDate.length >= workTime.length ? true : false
  }

  const disabledDate = (current) => {
    return checkDisableDate(current) ? true : current < moment().startOf('day')
  }
  console.log(scheduled)

  const disabledListShifts = (currentDay) => {
    const convertDay = moment(currentDay).format('YYYY-MM-DD')
    const listOfShift = scheduled
      ? scheduled.filter((i) => {
          return i.date === convertDay
        })
      : []
    return listOfShift
  }

  const onChangeDate = (current) => {
    console.log(disabledListShifts(current));
    setDisabledShifts(disabledListShifts(current));
  }

  console.log(disabledShifts);

  let optionToRender
  if (workTime) {
    optionToRender = workTime.map((item, index) => {
      console.log(index);
      return (
        <Select.Option value={index} disabled={!disabledShifts[index]} key={index}>
          {item[0]} - {item[1]}
        </Select.Option>
      )
    })
  }

  return (
    <div>
      <Form.Item
        label="Chọn ngày"
        name="date"
        hasFeedback
        rules={[{ required: true, message: 'Vui lòng chọn lại!' }]}
      >
        <DatePicker
          onChange={onChangeDate}
          format="YYYY-MM-DD"
          disabledDate={disabledDate}
        />
      </Form.Item>
      <Form.Item
        label="Thời gian làm việc"
        name="time_work"
        hasFeedback
        rules={[{ required: true, message: 'Vui lòng chọn lại!' }]}
      >
        <Select placeholder="Time">{optionToRender}</Select>
      </Form.Item>
    </div>
  )
}

export default DisableTime
