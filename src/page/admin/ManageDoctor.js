import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { Redirect ,Link} from 'react-router-dom'
import { Empty } from 'antd'

import LeftMenu from '../../components/LeftMenu'
import DoctorCard from '../../components/DoctorCard'
import PaginationCustom from '../../components/Pagination'
import { notificationErrorNetwork } from '../../util/notification'
import '../../css/Doctor.css'

import { getParams, getAll } from '../../service/DoctorServices'

function ManageDoctor(props) {
  const [doctor, setDoctor] = useState([])
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 9,
    _totalRow: 0,
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

  if (!pagination._totalRow) {
    return (
      <div>
        <LeftMenu />
        <Empty className="emplty" />
      </div>
    )
  }

  return (
    <div className='main'>
      <LeftMenu />
      <Container>
        <Row>
          {doctor.map((item) => (
            <Col sm="4">
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
