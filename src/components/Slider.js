import React, { useState } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap'
import moment from 'moment'
import ModalForm from './ModalForm'

import { Button,message } from 'antd'

import { postSchedule } from '../service/ScheduleServices'
import '../css/Slider.css'

const items = [
  {
    src: 'https://i.imgur.com/2rMR6TB.jpg',
    altText: 'Slide 1',
    caption: 'Healthy heart,healthy family',
    key: '1',
    text:
      'Globally harness multimedia based collaboration and idea-sharing with backend products. Continually whiteboard superior opportunities via covalent scenarios.',
  },
  {
    src: 'https://i.imgur.com/NjsLNWk.jpg',
    altText: 'Slide 2',
    caption: 'Your wealth,is your health',
    key: '2',
    text:
      'Globally harness multimedia based collaboration and idea-sharing with backend products. Continually whiteboard superior opportunities via covalent scenarios.',
  },
]

const Slider = (props) => {
  const [visible, setVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const next = () => {
    if (animating) return
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = (newIndex) => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  const onCreateSchedule = (values) => {
    const date = moment(values.date).format('YYYY-MM-DD')

    const data = { ...values, date: date }
    console.log(data)
    setVisible(false)
    postSchedule(data)
      .then((res) => {
        console.log(res)
        message.success('Đăng ký lịch khám thành công')
        window.location.reload()
      })
      .catch((e) => {
        console.log(e)
        message.error('Đăng ký lịch khám thất bại')
      })
  }

  const slides = items.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        
        <img src={item.src} className="image-slider" alt={item.altText} />
        <CarouselCaption captionText={item.text} captionHeader={!index ? (
          <Button
            onClick={() => {
              setVisible(true)
              setAnimating(false)
            }}
          >
            Đăng ký khám ngay
          </Button>
        ) : null} />
        <ModalForm
          info={null}
          visible={visible}
          onCreate={onCreateSchedule}
          onCancel={() => {
            setVisible(false)
          }}
        />
      </CarouselItem>
    )
  })

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  )
}
export default Slider
