import React from 'react'
import { Modal, Form, Input, InputNumber,Select } from 'antd'

import '../css/ModalForm.css'
import TimeList from './TimeList'
import { vietnamese, phoneNumber } from '../util/Validator'
import { degreeList,specialist,getSpecialist } from '../util/content'

const { Option } = Select;

const degreeSelect = degreeList ? degreeList.map((item,index)=>{
  return (<Option key={index} value={item}>{item}</Option>)
}) : null

const specialistSelect = specialist ? specialist.map(item=>{
  return (<Option key={item.key} value={item.key}>{item.value}</Option>)
}) : null

export default function ModalFormAdmin(props) {
  const { visible, onSubmit, onCancel, info, label } = props
  const [form] = Form.useForm()
  const imageNull = 'https://i.imgur.com/D1Na1n8.jpg'
  return (
    <Modal
      style={{ top: 0 }}
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
          label="Họ Tên"
          name="name"
          hasFeedback
          initialValue={info ? info.name : null}
          rules={[
            {
              pattern: vietnamese,
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
          label="Email"
          initialValue={info ? info.email : null}
          name="email"
          rules={[
            {
              type: 'email',
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
          label="Số điện thoại"
          name="phone_number"
          initialValue={info ? info.phone_number : null}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ',
            },
            {
              pattern: phoneNumber,
              message: 'Vui lòng chỉ nhập 10 số',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Link ảnh"
          name="imageUrl"
          initialValue={info ? info.imageUrl : imageNull}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ',
            },
            {
              type: 'url',
              message: 'Vui lòng chỉ url ảnh',
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

        <Form.Item
          label="Bằng cấp "
          initialValue = {info ? info.degree : ["Bác sĩ"]}
          rules={[{ required: true, message: 'Vui lòng nhập lại' }]}
          name="degree"
        >
          <Select
            mode="tags"
            // style={{ width: '100%' }
          >
            {degreeSelect}
          </Select>
        </Form.Item>

        <Form.Item
          label="Chuyên khoa"
          initialValue={info && info.specialist_id ? getSpecialist(info.specialist_id).key : null}
          rules={[{ required: true, message: 'Vui lòng nhập lại' }]}
          name="specialist_id"
        >
          <Select>
            {specialistSelect}
          </Select>
        </Form.Item>

        <TimeList workTime={info ? info.workTime : []} />

        <Form.Item
          label="Năm kinh nghiệm"
          initialValue={info ? info.years_work : null}
          name="years_work"
          rules={[{ required: true, message: 'Vui lòng nhập lại' }]}
        >
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
        <Form.Item
          label="Thông tin cơ bản "
          initialValue={info ? info.description : null}
          rules={[{ required: true, message: 'Vui lòng nhập lại' }]}
          name="description"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Khám, điều trị các bệnh "
          initialValue={info ? info.treatment : null}
          rules={[{ required: true, message: 'Vui lòng nhập lại' }]}
          name="treatment"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Dịch vụ liên quan"
          initialValue={info ? info.related_services : null}
          name="related_services"
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
