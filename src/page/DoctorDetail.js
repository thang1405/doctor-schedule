import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Breadcrumb, Avatar, Row, Col, Button } from 'antd'

import ModalForm from '../components/ModalForm'
import '../css/Doctor.css'

import { getId } from '../service/DoctorServices'

function DoctorDetail({ match }) {
  const [doctor, setDoctor] = useState({})
  const [visible, setVisible] = useState(false)
  const [schedule, setSchedule] = useState({
    
  })
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

  const onCreate = (values) => {
    //console.log('Received values of form: ', values)
    setSchedule(values) ;
    setSchedule(prev =>({
      ...prev,
      doctor_id:match.params.id
    })) ;
    setVisible(false)
  }
  // console.log(schedule)
  return (
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
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false)
            }}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default DoctorDetail
