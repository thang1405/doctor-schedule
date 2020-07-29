import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import axios from 'axios'
import { Layout, Breadcrumb } from 'antd'

import Footer from '../components/Footer'
import SearchInput from '../components/SearchInput'
import DoctorCard from '../components/DoctorCard'
import Pagination from '../components/Pagination'

const { Content } = Layout

function Doctor() {
  const [doctors, setDoctors] = useState([])
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRow: 15,
  })
  const [filters, setFilter] = useState({
    _page: 1,
    _limit: 10
  })
  useEffect(() => {
    axios
      .get(`http://localhost:1000/doctors?_page=${filters._page}`)
      .then((res) => {
        const { data } = res
        // console.log(res);
        setDoctors(data);
        setPagination({
          ...pagination,_page : filters._page
        });
      })
      .catch((error) => {
        console.log(error)
      })
  }, [filters]);

  const handerPageChange = (newPage) => {
    console.log(newPage);
    setFilter({
      ...filters,
      _page : newPage
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
            <DoctorCard info={item} />
          </Col>
        ))}
        <Pagination pagination={pagination} onPageChange={handerPageChange} />
      </Row>
      <Footer />
    </Container>
  )
}

export default Doctor
