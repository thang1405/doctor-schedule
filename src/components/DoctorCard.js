import React from 'react'
import { Card} from 'antd'

import '../css/Card.css'

const { Meta } = Card
function DoctorCard(props) {
  const { info } = props
  return (
    <div className="card-main">
      <Card
        cover={<img alt="example" className='avatar-img' src={info.imageUrl} />}
        hoverable
      >
        <Meta
          title={`Bác sĩ : ${info.name}`}
          description={`Địa chỉ : ${info.address}`}
        />
      </Card>
    </div>
  )
}

export default DoctorCard
