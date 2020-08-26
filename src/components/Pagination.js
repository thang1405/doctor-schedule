import React from 'react'
import { Pagination } from 'antd'
import '../css/Pagination.css'

function PaginationCustom(props) {
  const { pagination, onPageChange } = props
  const { _page, _limit, _totalRow } = pagination

  function onChange(page, pageSize) {
    handlePageChange(page)
  }

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage)
    }
  }

  return (
    <div className='pagination'>
      <Pagination
        pageSize={_limit}
        defaultCurrent={_page}
        total={_totalRow}
        onChange={onChange}
      />
    </div>
  )
}

export default PaginationCustom
