import React, { useEffect, useState } from 'react'
import { Col } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import DoctorCard from '../components/DoctorCard'
import Carousel from 'react-multi-carousel'

import 'react-multi-carousel/lib/styles.css'
import '../css/Horizontal.css'

import {convertString} from '../util/Validator'
import { getParams } from '../service/DoctorServices'

const responsive = {
  desktop_xl: {
    breakpoint: { max: 3000, min: 1200 },
    items: 4,
  },
  desktop_lg: {
    breakpoint: { max: 1200, min: 992 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 992, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
}

function HorizonalDoctors(props) {
  const history = useHistory()
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    getParams({ _limit: 10 })
      .then((res) => {
        const { data } = res
        setDoctors(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <div>
      <div className="title-doctors">
        <h2>
          <span className="title-text">Bác sĩ</span>
        </h2>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        className="container-horizontal"
        draggable
        focusOnSelect={false}
        infinite={false}
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={true}
        renderDotsOutside={false}
        showDots={false}
        slidesToSlide={1}
        swipeable
        // itemClass={}
        responsive={responsive}
      >
        {doctors.map((item) => {
          return (
            <Col key={item.id}>
              <div
                onClick={() => {
                  history.push(`/doctor/${item.id}-${convertString(item.name)}`)
                }}
              >
                <DoctorCard info={item} />
              </div>
            </Col>
          )
        })}
      </Carousel>
    </div>
  )
}

export default HorizonalDoctors
