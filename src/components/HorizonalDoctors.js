import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import DoctorCard from '../components/DoctorCard'
import '../css/Horizontal.css'

import { getParams } from '../service/DoctorServices'

function HorizonalDoctors(props) {
  const history = useHistory()
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    getParams({ _limit: 4 })
      .then((res) => {
        const {data} = res
        setDoctors(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <Row className="specialist">
      {doctors.map((item) => {
        return (
          <Col
            className="card-main"
            sm={12}
            md={6}
            lg={3}
            onClick={() => {
              history.push(`/doctor/${item.id}`)
            }}
            key={item.id}
          >
            <DoctorCard info={item}/>
          </Col>
        )
      })}
    </Row>
  )
}

export default HorizonalDoctors
