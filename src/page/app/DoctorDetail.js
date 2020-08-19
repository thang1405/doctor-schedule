import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Breadcrumb, Avatar, Row, Col, Button, message, Spin , Empty } from 'antd'
import moment from 'moment'

import ModalForm from '../../components/ModalForm'
import HomeLayout from '../../page/app/HomeLayout'
import '../../css/Doctor.css'

import { getId } from '../../service/DoctorServices'
import { postSchedule } from '../../service/ScheduleServices'

function DoctorDetail({ match }) {
  const [doctor, setDoctor] = useState({})
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getId(match.params.id)
      .then((res) => {
        const { data } = res
        setDoctor(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [match])

  const onCreateSchedule = (values) => {
    const date = moment(values.date).format('YYYY-MM-DD')

    const data = {
      doctor_id: parseInt(match.params.id),
      date: date,
      time_work: values.time_work,
      name: values.name,
      gender: values.gender,
      phoneNumber: values.phoneNumber,
      address: values.address,
      reason: values.reason,
    }
    setVisible(false)
    postSchedule(data)
      .then((res) => {
        console.log(res)
        message.success('Đăng ký lịch khám thành công')
        window.location.reload()
      })
      .catch((e) => {
        console.log(e)
        message.error('Đăng ký lịch khám thất bại')
      })
  }
  if (loading) {
    return (
      <HomeLayout className="spin-loading">
        <Spin>
          <Empty className='empty'/>
        </Spin>
      </HomeLayout>
    )
  }

  return (
    <HomeLayout>
      <Container>
        <Row>
          <Col className="bread-crumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={'/'}>Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={'/doctor'}>Bác sĩ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {doctor.name}
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Avatar shape="square" size={250} src={doctor.imageUrl} />
            <h2>
              Bác sĩ : {doctor.name}
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
    </HomeLayout>
  )
}

export default DoctorDetail
