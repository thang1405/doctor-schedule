import React from 'react'
import { Card } from 'antd'
import '../css/Horizontal.css'
import '../css/Card.css'
import { getSpecialist } from '../util/content'
import { joinString } from '../util/decription'
// list of items
const { Meta } = Card

function DoctorCard(props) {
  const { info } = props
  const specialist = getSpecialist(info.specialist_id)
  return (
    <div className="card-main">
      <Card
        cover={
          <img alt="example" className="avatar-doctor" src={info.imageUrl} />
        }
        hoverable
      >
        <div className="big-icon-doctor">
          <img
            alt="example"
            className="icon-specialist-doctor"
            src={specialist.icon}
          />
        </div>
        <div className="meta-doctor">
          <Meta
            title={<h4 className="meta-title">{info.name}</h4>}
            description={
              <div>
                <h5>{joinString(info.degree)}</h5>
                <p>Địa chỉ bệnh viện : {info.address}</p>
                <p>Năm kinh nghiệm : {info.years_work} </p>
              </div>
            }
          />
        </div>
      </Card>
    </div>
  )
}

export default DoctorCard
