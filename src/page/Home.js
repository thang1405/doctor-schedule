import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Layout } from 'antd'

import Slider from '../components/Slider'
import SearchInput from '../components/SearchInput'
import HorizontalScrolling from '../components/HorizontalScrolling'
import { Row, Col } from 'antd'
import Footer from '../components/Footer'

const { Content } = Layout

function Home() {
  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:1000/doctors')
      .then((res) => {
        const { data } = res;
        setDoctors(data);
        console.log(doctors);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <Layout>
      <Content>
        <Slider />
        <Row>
          <Col span={2} />
          <Col span={20}>
            <SearchInput placeholder="Nhập tên bác sĩ" />
            <HorizontalScrolling />
          </Col>
          <Col span={2} />
        </Row>
      </Content>
      <Footer />
    </Layout>
  )
}

export default Home
