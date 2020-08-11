import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import {Breadcrumb} from 'antd';

import LeftMenu from '../../components/LeftMenu'
import DoctorCard from '../../components/DoctorCard'
import PaginationCustom from '../../components/Pagination'
import {notificationErrorNetwork} from '../../util/notification';

import { getParams, getAll } from '../../service/DoctorServices'

function ManageDoctor(props) {
  const [doctor, setDoctor] = useState([])
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 9,
    _totalRow: 1,
  })
  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 9,
  })

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
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          {doctor.map((item) => (
            <Col sm="4">
              <Link to={`/admin/manage-doctor/${item.id}`}>
                <DoctorCard key={item.id} info={item} />
              </Link>
            </Col>
          ))}
        </Row>
        <Row>
          <PaginationCustom
            pagination={pagination}
            onPageChange={handerPageChange}
          />
        </Row>
      </Container>
    </div>
  )
}

export default ManageDoctor
