import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SlideShow from '../components/SlideShow'
// import Search from '../components/Search'
import HorizontalScrolling from '../components/HorizontalScrolling'
import { Row, Col } from 'antd'
import Footer from '../components/Footer'

function Home() {
  const [state, setState] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:1000/doctors')
      .then((res) => {
        const { data } = res
        setState(data);
        console.log(state)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);
  return (
    <div>
      <SlideShow />
      <br/>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <HorizontalScrolling />
        </Col>
        <Col span={2}></Col>
      </Row>
      <br/>
      <Footer/>
    </div>
  )
}

export default Home
