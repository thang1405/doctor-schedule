import React from 'react'
import '../css/HorizontalScrolling.css'

import { Row, Col } from 'reactstrap'
import { introduce } from '../util/content'
// list of items
const list = introduce

function Item ({current}) {
  const { key, value, decription } = current
  return (
    <Col span={3} className='introduce-col' key={key}>
      <span className='title'>{value}</span>
      <p className='decription'>{decription}</p>
    </Col>
  )
}

const HorizontalScrolling = () => {
  return (
    <Row className='introduce'>
    {
      list.map(i=><Item key={i.key} current={i}/>)
    }
    </Row>
  )
}

export default HorizontalScrolling
