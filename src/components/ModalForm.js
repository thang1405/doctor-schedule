import { Modal, Button, Form, Select ,Input,DatePicker,Radio } from 'antd'
import React, { useState } from 'react'

import '../css/ModalForm.css'

export default function ModalForm(props) {
  const [state, setState] = useState({
    ModalText: 'Nhập thông tin bệnh nhân',
    visible: false,
    confirmLoading: false,
  })

  const { workTime , first_name , last_name } = props.info
  let optionToRender
  if (workTime) {
    optionToRender = workTime.map((item) => {
      return (
        <Select.Option key={item.id}>
          {item.time_start} - {item.time_end}
        </Select.Option>
      )
    })
  }

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    })
  }

  const handleOk = () => {
    setState({
      ...state,
      ModalText: 'Waiting ...',
      confirmLoading: true,
    })
    setTimeout(() => {
      setState({
        ...state,
        visible: false,
        confirmLoading: false,
      })
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setState({
      ...state,
      visible: false,
    })
  }

  const { visible, confirmLoading, ModalText } = state
  return (
    <div className='button-schedule'>
      <Button type="primary" size='large' onClick={showModal}>Đặt lịch khám</Button>
      <Modal
        title={`${first_name} ${last_name}`}
        visible={visible}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item label="Họ tên">
            <Input />
          </Form.Item>
          <Form.Item label="Email">
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item label="Giới tính" name="gender">
          <Radio.Group>
            <Radio.Button value="male">Nam</Radio.Button>
            <Radio.Button value="female">Nữ</Radio.Button>
          </Radio.Group>
        </Form.Item>
          <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
          <Form.Item label="Thời gian làm việc">
            <Select placeholder="Time">{optionToRender}</Select>
          </Form.Item>
        </Form>
        <p>{ModalText}</p>
      </Modal>
    </div>
  )
}
