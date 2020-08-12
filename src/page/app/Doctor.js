import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { Breadcrumb, Empty } from 'antd'
import { Link } from 'react-router-dom'

import TopMenu from '../../components/TopMenu'
import DoctorCard from '../../components/DoctorCard'
import PaginationCustom from '../../components/Pagination'
import '../../css/Doctor.css'
import { notificationErrorNetwork } from '../../util/notification'

import { getParams, getAll } from '../../service/DoctorServices'

function Doctor() {
  const [doctors, setDoctors] = useState([])
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 9,
    _totalRow: 0,
  })
  const [filters, setFilter] = useState({
    _page: 1,
    _limit: 9,
  })

  useEffect(() => {
    getParams(filters)
      .then((res) => {
        const { data } = res
        setDoctors(data)
        setPagination((prev) => {
          return { ...prev, _page: filters._page }
        })
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
      <div>
        <TopMenu />
        <Empty className='emplty'/>
      </div>
    )
  }
  return (
    <div>
      <TopMenu />
      <Container className="main">
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
            <Col sm="4">
              <Link to={`/doctor/${item.id}`}>
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

export default Doctor
