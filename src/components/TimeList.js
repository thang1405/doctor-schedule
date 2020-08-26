import React, { useState, useEffect } from 'react'
import { Form, Button, TimePicker, Space } from 'antd'
import moment from 'moment'

import '../css/ModalForm.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { RangePicker } = TimePicker

function TimeList({ workTime }) {
  const [shifts, setShifts] = useState({
    data: [],
    isRender: false,
  })

  useEffect(() => {
    if (workTime.length > 0) {
      setShifts({ data: workTime.map((i, index) => index) })
    } else {
      setShifts({ data: [0] })
    }
  }, [workTime])

  const renderShift = (fields, add) => {
    if (shifts.data && fields.length < shifts.data.length && !shifts.isRender) {
      //repair infomation doctor
      shifts.data.forEach((i) => {
        add()
        setShifts({ ...shifts, isRender: true })
      })
    }
  }
  return (
    <Form.List name="workTime">
      {(fields, { add, remove }) => {
        //add row time ranger
        renderShift(fields, add)
        return (
          <Form.Item label="Thời gian làm">
            {fields.map((field) => (
              <Space
                key={field.key}
                className="time-ranger-space"
                align="start"
              >
                <Form.Item
                  {...field}
                  initialValue={
                    workTime[field.key] && workTime
                      ? [
                          moment(workTime[field.key][0], 'HH:mm'),
                          moment(workTime[field.key][1], 'HH:mm'),
                        ]
                      : null
                  }
                  rules={[{ required: true, message: 'Vui lòng nhập lại!' }]}
                >
                  <RangePicker format="HH:mm" />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name)
                    }}
                  />
                ) : null}
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add()
                }}
                block
              >
                <PlusOutlined /> Add field
              </Button>
            </Form.Item>
          </Form.Item>
        )
      }}
    </Form.List>
  )
}

export default TimeList
