import React from 'react'
import {Container } from 'reactstrap'

import Slider from '../../components/Slider'
import HorizontalScrolling from '../../components/HorizontalScrolling'

import TopMenu from '../../components/TopMenu'

function Home() {
  return (
    <div>
    <TopMenu />
      <Slider />
      <Container>
        <HorizontalScrolling />
      </Container>
    </div>
  )
}

export default Home
