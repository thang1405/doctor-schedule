import React from 'react'
import { Modal, Form, Input, Button, InputNumber, TimePicker } from 'antd'
import moment from 'moment'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import '../css/ModalForm.css'

const { RangePicker } = TimePicker

export default function ModalFormRepair(props) {
  const { visible, onRepair, onCancel, info } = props
  const { workTime, first_name, last_name } = info

  let optionToRender
  if (workTime) {
    optionToRender = workTime.map((item) => {
      return (
        <Form.Item name={item.id} key={item.id}>
          <RangePicker
            initialValue={[
              moment(item.time_start, 'HH:mm'),
              moment(item.time_end, 'HH:mm'),
            ]}
            format="HH:mm"
          />
        </Form.Item>
      )
    })
  }

  const [form] = Form.useForm()

  const initialValues = {
    users: [
      { age: 19 }, // undefined will render the placeholder
    ],
  }

  return (
    <div className="button-schedule">
      <Modal
        title={`${first_name} ${last_name}`}
        style={{ top: 0 }}
        width={850}
        visible={visible}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields()
              onRepair(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <Form
          initialValues={initialValues}
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          labelAlign="left"
        >
          <Form.Item
            label="Họ"
            name="first-name"
            hasFeedback
            initialValue={info.first_name}
            rules={[
              {
                pattern: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
                message: 'Vui lòng nhập lại!',
              },
              {
                min: 1,
                message: 'Vui lòng nhập lại!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="last-name"
            initialValue={info.last_name}
            hasFeedback
            rules={[
              {
                pattern: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
                message: 'Vui lòng nhập lại!',
              },
              {
                min: 2,
                message: 'Vui lòng nhập lại!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            hasFeedback
            initialValue={info.address}
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập lại' }]}
          >
            <Input />
          </Form.Item>

          <Form.List name="workTime">
            {(fields,{add}) => {
                console.log(fields)
              return (
                <div>
                  <Form.Item label="Giờ làm việc">{optionToRender}</Form.Item>
                  <Button onClick={()=>{
                    add()
                  }}>add</Button>
                  
                </div>
              )
            }}
          </Form.List>

          <Form.Item
            label="Thông tin"
            initialValue={info.description}
            name="info"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Giá khám" initialValue={info.price} name="price">
            <InputNumber
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
