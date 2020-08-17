import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { Breadcrumb, Empty } from 'antd'
import { Link,useParams } from 'react-router-dom'

import HomeLayout from '../../components/TopMenu'
import DoctorCard from '../../components/DoctorCard'
import PaginationCustom from '../../components/Pagination'
import '../../css/Doctor.css'
import { notificationErrorNetwork } from '../../util/notification'

import { getParams } from '../../service/DoctorServices'

function Speacialist(props) {
  const params = useParams()

  const [doctors, setDoctors] = useState([])
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 9,
    _totalRow: 0,
  })
  const [filters, setFilter] = useState({
    specialist_id:params.id,
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
        window.scrollTo(0, 0)
      })
      .catch((e) => {
        console.log(e)
        notificationErrorNetwork()
      })
  }, [filters,params])

  useEffect(() => {
    getParams({specialist_id:params.id})
      .then((res) => {
        const { data } = res
        setPagination((prev) => {
          return { ...prev, _totalRow: data.length }
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }, [params])
  console.log(params,filters)
  const handerPageChange = (newPage) => {
    setFilter({
      ...filters,
      _page: newPage,
    })
  }
  if (!pagination._totalRow ) {
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
                <Link to={'/doctor'}>Bác sĩ</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          {doctors.map((item) => (
            <Col sm="4" key={item.id}>
              <Link to={`/doctor/${item.id}`}>
                <DoctorCard key={item.id} info={item} />
              </Link>
            </Col>
          ))}
        </Row>
        {pagination._totalRow > filters._limit ? (
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

export default Speacialist
