import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { Breadcrumb, Empty } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import HomeLayout from '../../page/app/HomeLayout'
import DoctorCard from '../../components/DoctorCard'
import '../../css/Doctor.css'
import { notificationErrorNetwork } from '../../util/notification'

import { getSearchParams } from '../../service/DoctorServices'

function Searching(props) {
  const location = useLocation()

  const [searchList, setSearchList] = useState({})

  useEffect(() => {
    const queryValue = queryString.parse(location.search)
    const { name } = queryValue
    getSearchParams(name)
      .then((res) => {
        const { data } = res
        const list = FilterData(data, name)
        console.log(list)
        setSearchList(list)
      })
      .catch((e) => {
        console.log(e)
        notificationErrorNetwork()
      })
  }, [location])

  const FilterData = (data, name) => {
    return data.filter((i) => {
      const full_name = (i.first_name + ' ' + i.last_name).toLowerCase()
      return full_name.indexOf(name) !== -1
    })
  }

  let cardRender =
    searchList.length > 0
      ? searchList.map((item) => (
          <Col sm="4" key={item.id}>
            <Link to={`/doctor/${item.id}`}>
              <DoctorCard key={item.id} info={item} />
            </Link>
          </Col>
        ))
      : null

  if (!searchList.length) {
    return (
      <HomeLayout>
        <Empty className="empty" />
      </HomeLayout>
    )
  }

  return (
    <HomeLayout>
      <Container className="main">
        <Row>
          <Col className="bread-crumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={'/'}>Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Tìm kiếm
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>{cardRender}</Row>
      </Container>
    </HomeLayout>
  )
}

export default Searching
