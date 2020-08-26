import React from 'react'
import { Card } from 'antd'
import { Row, Col } from 'reactstrap'
import { specialist } from '../util/content'

import '../css/Horizontal.css'
// list of items
const list = specialist

const { Meta } = Card
function SpecialistCard({ current }) {
  const { key, value, decription, short_decription, imageUrl } = current
  return (
    <Col className="card-main col-12 col-sm-12 col-md-6 col-lg-3" key={key}>
      <Card
        cover={<img alt="example" className="avatar-img" src={imageUrl} />}
        hoverable
      >
        <Meta
          title={
            <div>
              <p>{short_decription}</p>
              <h3>{value}</h3>
            </div>
          }
          description={<p>{decription}</p>}
        />
      </Card>
    </Col>
  )
}

function HorizontalSpecialist(props) {
  return (
    <Row className="specialist">
      {list.map((i) => (
        <SpecialistCard key={i.key} current={i} />
      ))}
    </Row>
  )
}

export default HorizontalSpecialist
