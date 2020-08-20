import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { Breadcrumb, Empty, Spin } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import HomeLayout from '../../page/app/HomeLayout'
import DoctorCard from '../../components/DoctorCard'
import PaginationCustom from '../../components/Pagination'
import '../../css/Doctor.css'
import { notificationErrorNetwork } from '../../util/notification'

import { getParams } from '../../service/DoctorServices'

function Searching(props) {
  const location = useLocation()

  const queryValue = queryString.parse(location.search).name

  const [loading, setLoading] = useState(true)
  const [searchList, setSearchList] = useState({})
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 12,
    _totalRow: 0,
  })

  const [filters, setFilter] = useState({
    _page: 1,
    _limit: 12,
    name_like: queryValue,
  })

  useEffect(() => {
    getParams(filters)
      .then((res) => {
        const { data } = res
        setSearchList(data)
        setLoading(false)
        setPagination((prev) => {
          return { ...prev, _page: filters._page }
        })
        window.scrollTo(0, 0)
      })
      .catch((e) => {
        console.log(e)
        notificationErrorNetwork()
      })
  }, [filters, queryValue])

  useEffect(() => {
    if (!pagination._totalRow) {
      getParams({ name_like: queryValue })
        .then((res) => {
          const { data } = res
          setPagination((prev) => {
            return { ...prev, _totalRow: data.length }
          })
        })
        .catch((e) => {
          console.log(e)
        })
    } else if (queryValue !== filters.name_like) {
      window.location.reload()
    }
  }, [queryValue, pagination._totalRow, filters.name_like])

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

  if (loading || !searchList.length) {
    return (
      <HomeLayout>
        <div className="empty">
          <Spin size='large'>
            <Empty />
          </Spin>
        </div>
      </HomeLayout>
    )
  }

  const handerPageChange = (newPage) => {
    setFilter({
      ...filters,
      _page: newPage,
    })
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
              <Breadcrumb.Item>Tìm kiếm</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>{cardRender}</Row>
        {pagination._totalRow > pagination._limit ? (
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

export default Searching
