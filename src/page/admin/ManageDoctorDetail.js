import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, message, Card, Space, Popconfirm } from 'antd'
import { PhoneFilled, MailFilled, AimOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

import {LoadingPageAdmin} from '../../components/LoadingPage'
import { getSpecialist } from '../../util/content.js'
import AdminLayout from './AdminLayout'
import ModalFormAdmin from '../../components/ModalFormAdmin'

import '../../css/Doctor.css'
import {
  getId,
  repairInfoDoctor,
  deleteDoctor,
} from '../../service/DoctorServices'
import { splitString, joinString } from '../../util/decription'

const { Meta } = Card

function ManageDoctorDetail({ match }) {
  const [doctor, setDoctor] = useState({})
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)

  const history = useHistory()

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

  if (loading) {
    return <LoadingPageAdmin />
  }

  const specialistDoctor = getSpecialist(doctor.specialist_id)
  return (
    <AdminLayout>
      <div className="background-doctor">
        <Container>
          <Row>
            <Col md={4} sm={12}></Col>
            <Col md={8} sm={12}>
              <h5 className="text ">{joinString(doctor.degree)}</h5>
              <h2 className="text-name">{doctor.name}</h2>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md={12} lg={4} className="card-avatar">
            <Card
              bordered
              cover={
                <img
                  className="avatar-doctor-detail"
                  alt="example"
                  src={doctor.imageUrl}
                />
              }
            >
              <div className="big-icon-doctor">
                <img
                  alt="example"
                  className="icon-specialist-doctor"
                  src={specialistDoctor.icon}
                />
              </div>
              <div className="meta-doctor">
                <Meta
                  description={
                    <div>
                      <h4>Thông tin liên hệ</h4>
                      <div>
                        <Space size="middle">
                          <PhoneFilled className="icon" />
                          <p className="contact-text">{doctor.phone_number}</p>
                        </Space>
                      </div>
                      <div>
                        <Space size="middle">
                          <MailFilled className="icon" />
                          <p className="contact-text">{doctor.email}</p>
                        </Space>
                      </div>
                      <div>
                        <Space size="middle">
                          <AimOutlined className="icon" />
                          <p className="contact-text">{doctor.address}</p>
                        </Space>
                      </div>
                      <div>
                        <Row>
                          <Col>
                            <Popconfirm
                              placement="top"
                              title="Sure to delete?"
                              onConfirm={onDelete}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                size="large"
                                shape="round"
                                type="primary"
                                block
                              >
                                Xóa
                              </Button>
                            </Popconfirm>
                          </Col>
                          <Col>
                            <Button
                              size="large"
                              shape="round"
                              type="primary"
                              block
                              onClick={() => {
                                setVisible(true)
                              }}
                            >
                              Sửa
                            </Button>
                          </Col>
                        </Row>

                        <ModalFormAdmin
                          label={doctor.name}
                          info={doctor}
                          visible={visible}
                          onSubmit={onRepair}
                          onCancel={() => {
                            setVisible(false)
                          }}
                        />
                      </div>
                    </div>
                  }
                />
              </div>
            </Card>
          </Col>
          <Col md={12} lg={8}>
            <ul className="div-description">
              {splitString(doctor.description).map((item, index) => {
                return (
                  <li className="short-decription text" key={index}>
                    {item}
                  </li>
                )
              })}
            </ul>
            <Row className="multi-col">
              <Col>
                <p className="short-decription text">Khám và điều trị</p>
                <ul>
                  {splitString(doctor.treatment).map((item, index) => {
                    return (
                      <li className="decription" key={index}>
                        {item}
                      </li>
                    )
                  })}
                </ul>
                {doctor.related_services ? (
                  <div>
                    <p className="short-decription text">Dịch vụ khác</p>
                    <ul>
                      {splitString(doctor.related_services).map(
                        (item, index) => {
                          return (
                            <li className="decription" key={index}>
                              {item}
                            </li>
                          )
                        }
                      )}
                    </ul>
                  </div>
                ) : null}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  )
}

export default ManageDoctorDetail

// <Popconfirm
//               placement="top"
//               title="Sure to delete?"
//               onConfirm={onDelete}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button>Xóa</Button>
//             </Popconfirm>
//             <Button
//               onClick={() => {
//                 setVisible(true)
//               }}
//             >
//               Sửa
//             </Button>
//             <ModalFormAdmin
//               label={doctor.name}
//               info={doctor}
//               visible={visible}
//               onSubmit={onRepair}
//               onCancel={() => {
//                 setVisible(false)
//               }}
//             />
