import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

import TopMenu from '../../components/TopMenu'
import DoctorCard from '../../components/DoctorCard'
import PaginationCustom from '../../components/Pagination'
import '../../css/Doctor.css';

import { getParams, getAll } from '../../service/DoctorServices'

function Doctor() {
  const [doctors, setDoctors] = useState([])
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 9,
    _totalRow: 1,
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

  return (
    <div>
    <TopMenu/>
    <Container className='main'>
      <Row>
        <Col className='bread-crumb'>
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
        <PaginationCustom
          pagination={pagination}
          onPageChange={handerPageChange}
        />
      </Row>
    </Container>
    </div>
  )
}

export default Doctor