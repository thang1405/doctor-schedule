import { Modal, Form, Select, Input } from 'antd'
import React from 'react'

import '../css/ModalForm.css'
import DisableTime from './DisableTime'
import { name, phoneNumber } from '../util/Validator'

export default function ModalForm(props) {
  const { visible, onCreate, onCancel, info } = props
  const { workTime, first_name, last_name } = info

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
            name="name"
            hasFeedback
            rules={[
              {
                pattern: name,
                required: true,
                message: 'Vui lòng nhập lại!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Vui lòng nhập lại!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập đầy đủ',
              },
              {
                pattern: phoneNumber,
                message: 'Vui lòng chỉ nhập 10 số',
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            hasFeedback
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập lại' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name="gender"
            hasFeedback
            rules={[{ required: true, message: 'Vui lòng chọn lại!' }]}
          >
            <Select>
              <Select.Option value="Male">Nam</Select.Option>
              <Select.Option value="Female">Nữ</Select.Option>
              <Select.Option value="Orther">Khác</Select.Option>
            </Select>
          </Form.Item>

          <DisableTime workTime={workTime} doctorId={info.id} />

          <Form.Item label="Lý do" name="reason">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
