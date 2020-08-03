import React from 'react'
import {Container } from 'reactstrap'

import Slider from '../components/Slider'
import HorizontalScrolling from '../components/HorizontalScrolling'

function Home() {
  return (
    <div>
      <Slider />
      <Container>
        <HorizontalScrolling />
      </Container>
    </div>
  )
}

export default Home
