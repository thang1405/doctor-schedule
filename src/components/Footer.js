import React from 'react'
import '../css/Footer.css'
import { Row, Col } from 'antd'
import {
  FacebookFilled,
  YoutubeOutlined,
  GoogleCircleFilled,
  TwitterCircleFilled,
} from '@ant-design/icons'

export default function () {
  return (
    <Row className="footer">
      <Col span={2} />
      <Col span={16}>
      <p className = 'copyright'>@2020-Mock Project</p>
      </Col>
      <Col span={1} >
        <FacebookFilled className = 'icon' style={{ color: '#fff' }}/>
      </Col>
      <Col span={1}>
        <YoutubeOutlined className = 'icon' style={{ color: '#fff' }}/>
      </Col>
      <Col span={1}>
        <GoogleCircleFilled className = 'icon' style={{ color: '#fff' }}/>
      </Col>
      <Col span={1}>
        <TwitterCircleFilled className = 'icon' style={{ color: '#fff' }}/>
      </Col>
      <Col span={2} />
    </Row>
  )
}
