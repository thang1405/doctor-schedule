import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Breadcrumb, Avatar, Row, Col, Button, message } from 'antd'
import moment from 'moment'

import ModalForm from '../../components/ModalForm'
import TopMenu from '../../components/TopMenu'
import '../../css/Doctor.css'

import { getId } from '../../service/DoctorServices'
import { postSchedule } from '../../service/ScheduleServices'

function DoctorDetail({ match }) {
  const [doctor, setDoctor] = useState({})
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    getId(match.params.id)
      .then((res) => {
        const { data } = res
        setDoctor(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [match])

  const onCreateSchedule = (values) => {
    const date = moment(values.date).format('YYYY-MM-DD')

    const data = {
      doctor_id: parseInt(match.params.id),
      time_work_id: values.time_work_id,
      date: date,
      name: values.name,
      gender: values.gender,
      phoneNumber: values.phoneNumber,
      address: values.address,
      reason: values.reason,
    }
    postSchedule(data)
      .then((res) => {
        console.log(res)
        message.success('Đăng ký lịch khám thành công')
      })
      .catch((e) => {
        console.log(e)
        message.error('Đăng ký lịch khám thất bại')
      })

    setVisible(false)
  }

  return (
    <div><TopMenu/>
    <Container>
      <Row>
        <Col className="bread-crumb">
          <Breadcrumb style={{ margin: '10px 0' }}>
            <Breadcrumb.Item>
              <Link to={'/'}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={'/doctor'}>Bác sĩ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {doctor.first_name} {doctor.last_name}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <Avatar shape="square" size={250} src={doctor.imageUrl} />
          <h2>
            Bác sĩ : {doctor.first_name} {doctor.last_name}
          </h2>
          <p>Thông tin : {doctor.description}</p>
          <p>Địa chỉ : {doctor.address}</p>
        </Col>
        <Col span={5}>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setVisible(true)
            }}
          >
            Đặt lịch khám
          </Button>
          <ModalForm
            info={doctor}
            visible={visible}
            onCreate={onCreateSchedule}
            onCancel={() => {
              setVisible(false)
            }}
          />
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default DoctorDetail
