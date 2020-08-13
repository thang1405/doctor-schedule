import React from 'react'
import { Modal, Form, Input, InputNumber } from 'antd'

import '../css/ModalForm.css'
import TimeList from './TimeList'
import { name } from '../util/Validator'

export default function ModalFormAdmin(props) {
  const { visible, onSubmit, onCancel, info, label } = props
  const [form] = Form.useForm()

  return (
    <Modal
      style={{ top: 10 }}
      width={850}
      visible={visible}
      title={label}
      okText="Xác nhận"
      cancelText="Hủy bỏ"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onSubmit(values)
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
        onFinish={onSubmit}
      >
        <Form.Item
          label="Họ"
          name="first_name"
          hasFeedback
          initialValue={info ? info.first_name : null}
          rules={[
            {
              pattern: name,
              message: 'Vui lòng nhập lại!',
            },
            {
              required: true,
              message: 'Vui lòng nhập lại!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên"
          name="last_name"
          initialValue={info ? info.last_name : null}
          hasFeedback
          rules={[
            {
              pattern: name,
              message: 'Vui lòng nhập lại!',
            },
            {
              required: true,
              message: 'Vui lòng nhập lại!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          hasFeedback
          initialValue={info ? info.address : null}
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập lại' }]}
        >
          <Input />
        </Form.Item>

        <TimeList workTime={info ? info.workTime : []} />

        <Form.Item
          label="Giới thiệu bản thân"
          initialValue={info ? info.description : null}
          rules={[{ required: true, message: 'Vui lòng nhập lại' }]}
          name="description"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Giá khám"
          initialValue={info ? info.price : null}
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập lại' }]}
        >
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
