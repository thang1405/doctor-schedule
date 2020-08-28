import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

import {LoadingPage} from '../../components/LoadingPage'
import HomeLayout from '../../page/app/HomeLayout'
import DoctorCard from '../../components/DoctorCard'
import PaginationCustom from '../../components/Pagination'
import '../../css/Doctor.css'
import { notificationErrorNetwork } from '../../util/notification'
import { convertString } from '../../util/Validator'

import { getParams, getAll } from '../../service/DoctorServices'

function Doctor() {
  const [doctors, setDoctors] = useState([])
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 12,
    _totalRow: 0,
  })
  const [filters, setFilter] = useState({
    _page: 1,
    _limit: 12,
  })

  useEffect(() => {
    getParams(filters)
      .then((res) => {
        const { data } = res
        setDoctors(data)
        setPagination((prev) => {
          return { ...prev, _page: filters._page }
        })
        window.scrollTo(0, 0)
      })
      .catch((e) => {
        console.log(e)
        notificationErrorNetwork()
      })
  }, [filters])

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
      })
  }, [])

  const handerPageChange = (newPage) => {
    setFilter({
      ...filters,
      _page: newPage,
    })
  }
  if (!pagination._totalRow) {
    return (
      <LoadingPage/>
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
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          {doctors.map((item) => (
            <Col className="col-12" sm={12} md={6} lg={4} xl={4} key={item.id}>
              <Link to={`/doctor/${item.id}-${convertString(item.name)}`}>
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
    </HomeLayout>
  )
}

export default Doctor
