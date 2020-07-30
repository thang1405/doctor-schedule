import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Layout } from 'antd'
import { Row, Col, Container } from 'reactstrap'

// import {getDoctor} from '../service/homeServices';
import Slider from '../components/Slider'
import SearchInput from '../components/SearchInput'
import HorizontalScrolling from '../components/HorizontalScrolling'

const { Content } = Layout

function Home() {
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:1000/doctors')
      .then((res) => {
        const { data } = res
        setDoctors(data)
        console.log(doctors)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <Slider />
      <Container>
        <SearchInput placeholder="Nhập tên bác sĩ" />
        <HorizontalScrolling />
      </Container>
    </div>
  )
}

export default Home
