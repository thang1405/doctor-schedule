import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Breadcrumb, Avatar, Row, Col, Button, message, Popconfirm } from 'antd'
import { useHistory } from 'react-router-dom'

import '../../css/Doctor.css'
import UploadAvatar from '../../components/UploadAvatar';
import AdminLayout from './AdminLayout';
import ModalFormAdmin from '../../components/ModalFormAdmin'
import {
  getId,
  repairInfoDoctor,
  deleteDoctor,
} from '../../service/DoctorServices'

function ManageDoctorDetail({ match }) {
  const [doctor, setDoctor] = useState({})
  const [visible, setVisible] = useState(false)

  const history = useHistory()

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
    const time = values.workTime.map((item) => {
      return [item[0].format('HH:mm'), item[1].format('HH:mm')]
    })
    const data = { ...values, workTime: time }
    repairInfoDoctor(data, match.params.id)
      .then((res) => {
        message.success('Đổi thông tin thành công')
        setVisible(false)
        window.location.reload()
      })
      .catch((e) => {
        message.error('Đổi thông tin thất bại')
        console.log(e)
      })
  }

  const onDelete = () => {
    deleteDoctor(match.params.id)
      .then(() => {
        message.success('Xóa thành công')
        history.replace('/admin/manage-doctor')
      })
      .catch((e) => {
        console.log(e)
        message.error('Xóa thất bại')
      })
  }

  return (
    <AdminLayout>
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
            <UploadAvatar/>
            <h2>
              Bác sĩ : {doctor.first_name} {doctor.last_name}
            </h2>
            <p>Thông tin : {doctor.description}</p>
            <p>Địa chỉ : {doctor.address}</p>
          </Col>
          <Col span={8}>
            <Popconfirm
              placement="top"
              title="Sure to delete?"
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button>Xóa</Button>
            </Popconfirm>
            <Button
              onClick={() => {
                setVisible(true)
              }}
            >
              Sửa
            </Button>
            <ModalFormAdmin
              label={`${doctor.first_name} ${doctor.last_name}`}
              info={doctor}
              visible={visible}
              onSubmit={onRepair}
              onCancel={() => {
                setVisible(false)
              }}
            />
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  )
}

export default ManageDoctorDetail
