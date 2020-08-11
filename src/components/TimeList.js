import React, { useState } from 'react'
import { Form, Button, TimePicker, Space } from 'antd'
import moment from 'moment'

import '../css/ModalForm.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { RangePicker } = TimePicker

function TimeList({ workTime }) {
  const [isRenderTime, setRenderTime] = useState(false)
  return (
    <Form.List name="workTime">
      {(fields, { add, remove }) => { 
        //add row time ranger
        if (workTime && fields.length < workTime.length && !isRenderTime) {
          workTime.forEach(() => {
            add()
            setRenderTime(true)
          })
        }
        return (
          <Form.Item label="Thời gian làm">
            {fields.map((field) => (
              <Space
                key={field.key}
                className='time-ranger-space'
                align="start"
              >
                <Form.Item
                  {...field}
                  initialValue={
                    workTime[field.key]
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
                <MinusCircleOutlined
                  onClick={() => {
                    remove(field.name)
                  }}
                />
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
