import React from 'react'
import '../css/Horizontal.css'

import { Row, Col } from 'reactstrap'
import { introduce } from '../util/content'
// list of items
const list = introduce

function Item({ current }) {
  const { key, value, decription } = current
  return (
    <Col className="introduce-col col-12 col-sm-12 col-md-6 col-lg-3" key={key}>
      <div className="title-div">
        <h3 className='title'>
          <span>{value}</span>
        </h3>
      </div>
      <p className="decription">{decription}</p>
    </Col>
  )
}

const HorizontalIntroduce = () => {
  return (
    <Row className="introduce">
      {list.map((i) => (
        <Item key={i.key} current={i} />
      ))}
    </Row>
  )
}

export default HorizontalIntroduce
