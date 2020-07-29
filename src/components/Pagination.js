import React from 'react'

function Pagination(props) {
  const { pagination, onPageChange } = props;
  const { _page, _limit,_totalRow } = pagination;
  const totalPages = Math.ceil(_totalRow/_limit);

  const handlePageChange=(newPage)=>{
    if(onPageChange){
      onPageChange(newPage);
    }
  }
  // console.log(props);
  return (
    <div style={{width:'100%',height : '30px'}}>
      <button 
        disabled={_page === 1} 
        onClick={()=> handlePageChange(_page - 1)}
      >
        Prev
      </button>
      <button 
        disabled={_page === totalPages } 
        onClick={()=> handlePageChange(_page + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
