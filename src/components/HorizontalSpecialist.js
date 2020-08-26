import React from 'react'
import { Card } from 'antd'
import { Row, Col } from 'reactstrap'
import { specialist } from '../util/content'
import { useHistory } from 'react-router-dom'

import '../css/Horizontal.css'
// list of items
const list = specialist

const { Meta } = Card
function SpecialistCard({ current }) {
  const history = useHistory()
  const { key, value, decription, short_decription, imageUrl,icon } = current
  return (
    <Col className="card-main" sm={12} md={6} lg={3} key={key}>
      <Card
        cover={<img alt="example" className="avatar-specialist" src={imageUrl} />}
        hoverable
        onClick={()=>{history.push(`/specialist/${key}`)}}
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
    <Row className="specialist">
      {list.map((i) => (
        <SpecialistCard key={i.key} current={i} />
      ))}
    </Row>
  )
}

export default HorizontalSpecialist
