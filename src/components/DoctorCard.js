import React from 'react'
import { Card} from 'antd'

import '../css/Card.css'

const { Meta } = Card
function DoctorCard(props) {
  const { info } = props
  return (
    <div className="card-main">
      <Card
        cover={<img alt="example" src={info.imageUrl} />}
        hoverable
      >
        <Meta
          title={`Bác sĩ : ${info.first_name} ${info.last_name}`}
          description={`Địa chỉ : ${info.address}`}
        />
      </Card>
    </div>
  )
}

export default DoctorCard
