import React, { useEffect, useState } from 'react'
import { Form, Select, DatePicker, Row, Col,Space } from 'antd'
import moment from 'moment'
import '../css/ModalForm.css'

import { getScheduleDoctor } from '../service/ScheduleServices'

function DisableTime({ workTime, doctorId }) {
  const [scheduled, setScheduled] = useState({})
  const [disabledShifts, setDisabledShifts] = useState({
    isDayEmpty: true,
    list: [],
  })

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

  //date

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

  //shift

  const disabledListShifts = (currentDay) => {
    const convertDay = moment(currentDay).format('YYYY-MM-DD')
    const listOfShift = scheduled
      ? scheduled.filter((i) => {
          return i.date === convertDay
        })
      : []
    return listOfShift.map((i) => {
      return i.time_work
    })
  }

  const isDisabledShifts = (currentIndex) => {
    return disabledShifts.list.indexOf(currentIndex) === -1 &&
      !disabledShifts.isDayEmpty
      ? false
      : true
  }

  const onChangeDate = (current) => {
    setDisabledShifts({ isDayEmpty: false, list: disabledListShifts(current) })
  }

  let optionToRender
  if (workTime) {
    optionToRender = workTime.map((item, index) => {
      return (
        <Select.Option
          value={index}
          disabled={isDisabledShifts(index)}
          key={index}
        >
          {item[0]} - {item[1]}
        </Select.Option>
      )
    })
  }

  return (
    <Form.Item label="Chọn ngày">
      <Row>
        <Space className="time-ranger-space" align="start">
          <Col>
            <Form.Item
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
          </Col>
          <Col>
            <Form.Item
              name="time_work"
              hasFeedback
              rules={[{ required: true, message: 'Vui lòng chọn lại!' }]}
            >
              <Select placeholder="Chọn ca khám bệnh">{optionToRender}</Select>
            </Form.Item>
          </Col>
        </Space>
      </Row>
    </Form.Item>
  )
}

export default DisableTime
