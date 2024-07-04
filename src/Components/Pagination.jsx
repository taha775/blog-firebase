import React from 'react'

const Pagination = ({onPageChange,currentPage,blogs,pageSize}) => {
    const totalPages=  Math.ceil(blogs.length / pageSize)

    const renderPagination =()=>{
        return Array.from({length:totalPages},(_,i)=> i+1 ).map((pageNum)=>(
            <li className={pageNum === currentPage ? "activePagination" :""}  key={pageNum}>
                <a href="#" onClick={()=>onPageChange(pageNum)}>{pageNum}</a>
            </li>
        ))
    }
  return (
    <div>
        <ul className='pagination my-8 flex-wrap  gap-4 '>
            <li>
                <button onClick={()=>onPageChange(currentPage - 1)} disabled={currentPage ===1 }>Previous</button>
            </li>
            <div className='pages'>
                {renderPagination()}
            </div>
            <li>
                <button onClick={()=>onPageChange(currentPage + 1) } disabled={currentPage === totalPages}>Next </button>
            </li>
        </ul>
    </div>
  )
}

export default Pagination