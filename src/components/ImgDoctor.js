import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import '../css/ImgDoctor.css'
function ImgDoctor(props) {
  return (
    <div className="image-background card-main">
      <Container>
        <Row>
          <Col md={7} ms={12}>
            <div className="title-doctor">
              <h3 className="doctor-text">
                <span>Dr. Stephanie Wosniack</span>
              </h3>
            </div>
            <div>
              <h1>
                <span className="headlline">
                  <em>OUR</em>
                  <b className="animate"> TEAM </b>
                </span>
              </h1>
            </div>
            <div className="comment">
              Dr. Stephanie Wosniack is is dedicated to providing her patients
              with the best possible care. We at MediCare are focused on helping
              you. After receiving successful care for various aches and pains
              over the years, Dr. Woshiack found her calling to help others get
              well.
            </div>
          </Col>
          <Col md={5} ms={12}>
            <img
              className="image-doctor"
              src={
                'http://medicare.bold-themes.com/clinic/wp-content/uploads/sites/2/2015/12/doktorka.png'
              }
              alt="err"
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ImgDoctor
