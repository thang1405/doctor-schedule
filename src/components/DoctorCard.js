import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap'

import '../css/Card.css'

function DoctorCard(props) {
  const {info} = props ;
  return (
    <Card className = 'card-main'>
      <CardImg top width="100%" src={info.imageUrl } alt="Card image" />
      <CardBody>
        <CardTitle>Bác sĩ : {info.first_name} {info.last_name}</CardTitle>
        <CardSubtitle>Địa chỉ : {info.address }</CardSubtitle>
        <CardText>Giá khám : {info.price }</CardText>
        <CardText>{info.description }</CardText>
      </CardBody>
    </Card>
  )
}

export default DoctorCard
