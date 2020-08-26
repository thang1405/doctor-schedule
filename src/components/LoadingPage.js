import React from 'react'
import { Spin, Empty } from 'antd'
import HomeLayout from '../page/app/HomeLayout'
import '../css/LoadingPage.css'

function LoadingPage(props) {
  return (
    <div>
      <HomeLayout>
        <div className="empty">
          <Spin size="large">
            <Empty />
          </Spin>
        </div>
      </HomeLayout>
    </div>
  )
}

export default LoadingPage
