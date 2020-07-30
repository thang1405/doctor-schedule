import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import axios from 'axios'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

import SearchInput from '../components/SearchInput'
import DoctorCard from '../components/DoctorCard'
import Pagination from '../components/Pagination'

function Doctor() {
  const [doctors, setDoctors] = useState([])
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRow: 15,
  })
  const [filters, setFilter] = useState({
    _page: 1,
    _limit: 10,
  })
  useEffect(() => {
    axios
      .get(`http://localhost:1000/doctors?_page=${filters._page}`)
      .then((res) => {
        const { data } = res
        // console.log(res);
        setDoctors(data)
        setPagination({
          ...pagination,
          _page: filters._page,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [filters])

  const handerPageChange = (newPage) => {
    setFilter({
      ...filters,
      _page: newPage,
    })
  }

  return (
    <Container>
      <Row>
        <Col>
          <SearchInput placeholder="Nhập tên bác sĩ" />

          <Breadcrumb style={{ margin: '10px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Bác sĩ</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        {doctors.map((item) => (
          <Col sm="6">
            <Link to={`/doctor/${item.id}`}>
              <DoctorCard info={item} />
            </Link>
          </Col>
        ))}
        <Pagination pagination={pagination} onPageChange={handerPageChange} />
      </Row>
    </Container>
  )
}

export default Doctor
