import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { Redirect, Link, useHistory } from 'react-router-dom'
import { Empty, Button, message } from 'antd'

import LeftMenu from '../../components/LeftMenu'
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
    _limit: 9,
    _totalRow: 0,
  })
  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 9,
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
    return (
      <div>
        <LeftMenu />
        <Empty className="emplty" />
      </div>
    )
  }

  const onAddDoctor = (values) => {
    const time = values.workTime.map((item) => {
      return [item[0].format('HH:mm'), item[1].format('HH:mm')]
    })
    const data = {
      ...values,
      workTime: time,
      imageUrl: 'http://dummyimage.com/400x300.jpg/ff4444/ffffff',
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
    <div className="main">
      <LeftMenu />
      <Container>
        <Row>
          <Button
            onClick={() => {
              setVisible(true)
            }}
          >
            Thêm
          </Button>
          <ModalFormAdmin
            label="Thêm bác sĩ"
            visible={visible}
            onSubmit={onAddDoctor}
            onCancel={() => {
              setVisible(false)
            }}
          />
        </Row>
        <Row>
          {doctor.map((item) => (
            <Col sm="4" key={item.id}>
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
    </div>
  )
}

export default ManageDoctor
