import React from 'react'
import { Container } from 'reactstrap'

import Slider from '../../components/Slider'
import HorizontalScrolling from '../../components/HorizontalScrolling'
import HomeLayout from '../../page/app/HomeLayout'

function Home() {
  return (
    <HomeLayout>
      <Slider />
      <Container>
        <HorizontalScrolling />
      </Container>
    </HomeLayout>
  )
}

export default Home
