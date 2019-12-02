import React from 'react';
import {Dropdown} from 'semantic-ui-react'

const Pagination = ({ rowsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / rowsPerPage); i++) 
  {
    pageNumbers.push(i);
    
  }
  const paginationOptions = pageNumbers.map(number =>({
    key: number,
    text: number,
    value: number,
  }))
  return ( 

    <Dropdown placeholder='Page' closeOnChange compact  selection 
    onChange={(e,data) => {paginate(data.value)}} options={paginationOptions} 
    
     />

  );
};

export default Pagination;