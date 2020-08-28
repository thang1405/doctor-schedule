import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { Redirect, Link, useHistory } from 'react-router-dom'
import { message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'

import { LoadingPageAdmin } from '../../components/LoadingPage'
import AdminLayout from './AdminLayout'
import DoctorCard from '../../components/DoctorCard'
import PaginationCustom from '../../components/Pagination'
import ModalFormAdmin from '../../components/ModalFormAdmin'
import { notificationErrorNetwork } from '../../util/notification'
import '../../css/Doctor.css'

import { getParams, getAll, postDoctor } from '../../service/DoctorServices'



function ManageDoctor(props) {
  const [doctor, setDoctor] = useState([])
  const [visible, setVisible] = useState(false)
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 12,
    _totalRow: 0,
  })
  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 12,
  })

  const history = useHistory()

  useEffect(() => {
    getParams(filter)
      .then((res) => {
        const { data } = res
        setDoctor(data)
        setPagination((prev) => {
          return { ...prev, _page: filter._page }
        })
        window.scrollTo(0, 0)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [filter])

  useEffect(() => {
    getAll()
      .then((res) => {
        const { data } = res
        setPagination((prev) => {
          return { ...prev, _totalRow: data.length }
        })
      })
      .catch((e) => {
        console.log(e)
        notificationErrorNetwork()
      })
  }, [])
  //check login
  const token = localStorage.getItem('token')

  let isLoggedIn = true
  if (token == null) {
    isLoggedIn = false
  }

  if (!isLoggedIn) {
    return <Redirect to="/admin" />
  }

  const handerPageChange = (newPage) => {
    setFilter({
      ...filter,
      _page: newPage,
    })
  }

  if (!pagination._totalRow) {
    return <LoadingPageAdmin />
  }

  const onAddDoctor = (values) => {
    const time = values.workTime.map((item) => {
      return [item[0].format('HH:mm'), item[1].format('HH:mm')]
    })
    const imageNull = 'https://i.imgur.com/D1Na1n8.jpg'
    const data = {
      ...values,
      workTime: time,
      imageUrl: values.imageUrl ? values.imageUrl : imageNull,
    }
    // console.log(data)
    postDoctor(data)
      .then((res) => {
        message.success('Thêm bác sĩ thành công')
        setVisible(false)
        history.push(`/admin/manage-doctor/${res.data.id}`)
      })
      .catch((e) => {
        message.error('Thêm bác sĩ thất bại')
        console.log(e)
      })
  }

  return (
    <AdminLayout>
      <Container>
        
        <Row>
          <div
            onClick={() => {
              setVisible(true)
            }}
            className="btn-add"
          >
            <UserAddOutlined className="add-icon" style={{ color: 'white' }} />
          </div>
          <ModalFormAdmin
            label="Thêm bác sĩ"
            visible={visible}
            isNew={true}
            onSubmit={onAddDoctor}
            onCancel={() => {
              setVisible(false)
            }}
          />
        </Row>
        <Row>
          {doctor.map((item) => (
            <Col className="col-12" sm={12} md={6} lg={6} xl={4} key={item.id}>
              <Link to={`/admin/manage-doctor/${item.id}`}>
                <DoctorCard key={item.id} info={item} />
              </Link>
            </Col>
          ))}
        </Row>
        {pagination._totalRow ? (
          <Row>
            <PaginationCustom
              pagination={pagination}
              onPageChange={handerPageChange}
            />
          </Row>
        ) : null}
      </Container>
    </AdminLayout>
  )
}

export default ManageDoctor
