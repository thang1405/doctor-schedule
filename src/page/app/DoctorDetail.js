import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, message, Card, Space } from 'antd'
import { PhoneFilled, MailFilled, AimOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import {LoadingPage} from '../../components/LoadingPage'
import ModalForm from '../../components/ModalForm'
import HomeLayout from '../../page/app/HomeLayout'

import '../../css/Doctor.css'

import { getId } from '../../service/DoctorServices'
import { postSchedule } from '../../service/ScheduleServices'
import { splitString,joinString } from '../../util/decription'
import { getSpecialist } from '../../util/content.js'
import { convertString } from '../../util/Validator'

const { Meta } = Card

function DoctorDetail({ match }) {
  const [doctor, setDoctor] = useState({})
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    setLoading(true)
    getId(match.params.id)
      .then((res) => {
        const { data } = res
        setDoctor(data)
        setLoading(false)
        if(convertString(data.name) !== match.params.doctor ){
          history.replace('/no-match')
        }
        window.scrollTo(0, 0)
      })
      .catch((error) => {
        console.log(error)
        history.push('/no-match')
      })
  }, [match,history])

  const onCreateSchedule = (values) => {
    const date = moment(values.date).format('YYYY-MM-DD')

    const data = { ...values, doctor_id: parseInt(match.params.id), date: date }
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
    return <LoadingPage />
  }

  const specialistDoctor = getSpecialist(doctor.specialist_id)
  return (
    <HomeLayout>
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
          <Col md={4} sm={12} className="card-avatar">
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
                        <Button
                          size="large"
                          onClick={() => {
                            setVisible(true)
                          }}
                          shape="round"
                          type="primary"
                          block
                        >
                          Đặt lịch khám
                        </Button>
                      </div>
                    </div>
                  }
                />
              </div>
            </Card>

            <ModalForm
              info={doctor}
              visible={visible}
              onCreate={onCreateSchedule}
              onCancel={() => {
                setVisible(false)
              }}
            />
          </Col>
          <Col md={8} sm={12}>
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
    </HomeLayout>
  )
}

export default DoctorDetail
