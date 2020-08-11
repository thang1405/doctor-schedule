import React from 'react'
import { Modal,Form, Input, InputNumber } from 'antd'

import '../css/ModalForm.css'
import TimeList from './TimeList'

export default function ModalFormRepair(props) {
  const { visible, onRepair, onCancel, info } = props
  const [form] = Form.useForm()

  return (
      <Modal
        style={{ top: 10 }}
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
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      labelAlign="left"
      onFinish={onRepair}
    >
      <Form.Item
        label="Họ"
        name="first_name"
        hasFeedback
        initialValue={info.first_name}
        rules={[
          {
            pattern: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
            message: 'Vui lòng nhập lại!',
          },
          {
            required:true,
            message: 'Vui lòng nhập lại!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tên"
        name="last_name"
        initialValue={info.last_name}
        hasFeedback
        rules={[
          {
            pattern: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
            message: 'Vui lòng nhập lại!',
          },
          {
            required:true,
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

      <TimeList workTime={info.workTime} />

      <Form.Item
        label="Giới thiệu bản thân"
        initialValue={info.description}
        name="description"
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
  )
}
