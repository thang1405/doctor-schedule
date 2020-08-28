import React from 'react'
import { Spin, Empty } from 'antd'
import HomeLayout from '../page/app/HomeLayout'
import AdminLayout from '../page/admin/AdminLayout'
import '../css/LoadingPage.css'

export const LoadingPage=()=> {
  return (
    <div>
      <HomeLayout>
        <div>
          <Spin size="large">
            <Empty />
          </Spin>
        </div>
      </HomeLayout>
    </div>
  )
}

export const LoadingPageAdmin = ()=> {
  return (
    <div>
      <AdminLayout>
        <div>
          <Spin size="large">
            <Empty />
          </Spin>
        </div>
      </AdminLayout>
    </div>
  )
}

