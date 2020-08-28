import React from 'react'
import { Card } from 'antd'
import { Col } from 'reactstrap'
import { specialist } from '../util/content'
import { useHistory } from 'react-router-dom'
import Carousel from 'react-multi-carousel'

import 'react-multi-carousel/lib/styles.css'
import {convertString} from '../util/Validator'
import '../css/Horizontal.css'

// list of items
const list = specialist

const { Meta } = Card

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

function SpecialistCard({ current }) {
  const history = useHistory()
  const { key, value, decription, short_decription, imageUrl,icon } = current
  return (
    <Col className='card-main' key={key}>
      <Card
        cover={<img alt="example" className="avatar-specialist" src={imageUrl} />}
        hoverable
        onClick={()=>{history.push(`/specialist/${key}-${convertString(value)}`)}}
      >
        <div className="big-icon">
          <img
            alt="example"
            className="icon-specialist"
            src={icon}
          />
        </div>
        <div className="meta-specialist">
          <Meta
            title={
              <div>
                <p className='short-decription'>{short_decription}</p>
                <h4 className='meta-title'>{value}</h4>
              </div>
            }
            description={<p>{decription}</p>}
            
          />
        </div>
      </Card>
    </Col>
  )
}

function HorizontalSpecialist(props) {
  return (
    <div>
    <div className="title-doctors">
        <h2>
          <span className="title-text">Chuyên Khoa</span>
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
      {list.map((item) => {
        return (
          <SpecialistCard key={item.key} current={item} />
        )
      })}
    </Carousel>
    </div>
  )
}

export default HorizontalSpecialist
