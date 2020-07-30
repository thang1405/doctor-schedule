import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'reactstrap'
import {Link} from 'react-router-dom'
import { Breadcrumb, Avatar, Row, Col } from 'antd'
import SearchInput from '../components/SearchInput'
import ModalForm from '../components/ModalForm'


function DoctorDetail({ match }) {
  const [doctor, setDoctor] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:1000/doctors/${match.params.id}`)
      .then((res) => {
        const { data } = res
        setDoctor(data);
        console.log('hi')
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return (
    <Container>
    <SearchInput placeholder="Nhập tên bác sĩ" />
      <Row>
        <Col>
          <Breadcrumb style={{ margin: '10px 0' }}>
            <Breadcrumb.Item><Link to ={'/'}>Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to ={'/doctor'}>Bác sĩ</Link></Breadcrumb.Item>
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
          <ModalForm info ={doctor}/>
        </Col>
      </Row>
      
    </Container>
  )
}

export default DoctorDetail
