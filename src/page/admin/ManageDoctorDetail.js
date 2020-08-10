import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Breadcrumb, Avatar, Row, Col, Button } from 'antd'

import '../../css/Doctor.css'
import LeftMenu from '../../components/LeftMenu'
import { getId } from '../../service/DoctorServices'
import ModalFormRepair from '../../components/ModalFormRepair'

function ManageDoctorDetail({ match }) {
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

  const onRepair = (values) => {
    console.log(values)
    setVisible(false)
  }

  return (
    <div>
      <LeftMenu />
      <Container>
        <Row>
          <Col className="bread-crumb">
            <Breadcrumb style={{ margin: '10px 0' }}>
              <Breadcrumb.Item>
                <Link to={'/admin'}>Admin</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={'/admin/manage-doctor'}>Bác sĩ</Link>
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
          <Col span={8}>
            <Button>Xóa</Button>
            <Button
              onClick={() => {
                setVisible(true)
              }}
            >
              Sửa
            </Button>
            <ModalFormRepair
              info={doctor}
              visible={visible}
              onRepair={onRepair}
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

export default ManageDoctorDetail
