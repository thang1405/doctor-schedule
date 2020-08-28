import React from 'react'
import { Container } from 'reactstrap'

import Slider from '../../components/Slider'
import HorizontalIntroduce from '../../components/HorizontalIntroduce'
import HorizontalSpecialist from '../../components/HorizontalSpecialist'
import HorizonalDoctors from '../../components/HorizonalDoctors'
import ImgDoctor from '../../components/ImgDoctor'
import HomeLayout from '../../page/app/HomeLayout'

function Home() {
  return (
    <HomeLayout>
      <Slider />
      <Container>
        <HorizontalIntroduce />
        <HorizontalSpecialist />
      </Container>
      <ImgDoctor/>
      <Container>
        <HorizonalDoctors />
      </Container>
    </HomeLayout>
  )
}

export default Home
