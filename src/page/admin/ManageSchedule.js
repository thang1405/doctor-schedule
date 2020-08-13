import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { Button, Table, Popconfirm, message } from 'antd'
import { notificationErrorNetwork } from '../../util/notification'
import LeftMenu from '../../components/LeftMenu'
import { getAll, deleteSchedule } from '../../service/ScheduleServices'

function ManageSchedule(props) {
  const [schedules, setSchedules] = useState([])
  const [isRender, setRender] = useState(false)
  useEffect(() => {
    getAll()
      .then((res) => {
        const { data } = res
        const list = data.map((i) => {
          return {
            ...i,
            key: i.id,
          }
        })
        setSchedules(list)
      })
      .catch((e) => {
        console.log(e)
        notificationErrorNetwork()
      })
  }, [isRender])

  //check login
  const token = localStorage.getItem('token')

  let isLoggedIn = true
  if (token == null) {
    isLoggedIn = false
  }

  if (!isLoggedIn) {
    return <Redirect to="/admin" />
  }

  const onDelete = (id) => {
    deleteSchedule(id)
      .then(() => {
        message.success('Xóa thành công')
        setRender(!isRender)
      })
      .catch((e) => {
        console.log(e)
        message.error('Xóa thất bại')
      })
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Id Bác sĩ',
      dataIndex: 'doctor_id',
      key: 'doctor',
      sorter: (a, b) => a.doctor_id - b.doctor_id,
    },
    {
      title: 'Họ tên bệnh nhân',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0),
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Ca khám',
      dataIndex: 'time_work',
      key: 'time_work',
      sorter: (a, b) => a.time_work - b.time_work,
    },
    {
      title: 'Ngày khám',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) =>
        schedules.length >= 1 ? (
          <Popconfirm
            placement="topRight"
            title="Sure to delete?"
            onConfirm={() => onDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Xóa</Button>
          </Popconfirm>
        ) : null,
    },
  ]

  return (
    <div>
      <LeftMenu />
      <div style={{ marginBottom: 16 }}>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <div>
                <p style={{ margin: 0 }}>Địa chỉ : {record.address}</p>
                <p style={{ margin: 0 }}>Lý do khám : {record.reason}</p>
              </div>
            ),
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          dataSource={schedules}
        />
      </div>
    </div>
  )
}

export default ManageSchedule
