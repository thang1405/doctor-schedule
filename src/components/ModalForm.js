import { Modal, Form, Select, Input, DatePicker } from 'antd'
import React from 'react'

import '../css/ModalForm.css'

export default function ModalForm({ visible, onCreate, onCancel, info }) {
  const { workTime, first_name, last_name } = info
  let optionToRender

  if (workTime) {
    optionToRender = workTime.map((item) => {
      return (
        <Select.Option value={item.id} key={item.id}>
          {item.time_start} - {item.time_end}
        </Select.Option>
      )
    })
  }

  const [form] = Form.useForm()

  return (
    <div className="button-schedule">
      <Modal
        title={`${first_name} ${last_name}`}
        style={{ top: 10 }}
        width={650}
        visible={visible}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields()
              onCreate(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          labelAlign="left"
        >
          <Form.Item
            label="Họ tên"
            hasFeedback
            name="name"
            rules={[{ required: true, message: 'Please select' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            hasFeedback
            rules={[{ required: true, message: 'Please select' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name="gender"
            hasFeedback
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select>
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
              <Select.Option value="orther">Khác</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="DatePicker"
            name="date"
            hasFeedback
            rules={[{ required: true, message: 'Please select' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Thời gian làm việc"
            name="timeWork"
            hasFeedback
            rules={[{ required: true, message: 'Please select ' }]}
          >
            <Select placeholder="Time">{optionToRender}</Select>
          </Form.Item>
          <Form.Item label="Lý do" hasFeedback name="reason">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
