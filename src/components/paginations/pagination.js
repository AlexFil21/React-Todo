import React from 'react';

import './paginations.css'


const Paginat = ({items, handlePageChange}) => {
  
  function btnCount () {
    const count = Math.ceil(items.length/3);
    const number = [];
    for (let i=0; i<count; i++) {
      number.push(i+1);
    }

    const itemsCount = number.map((num) => {
       return <li key = {num} className="paginat paginat-group">{num}</li>
    })

    return itemsCount;
   }


    return(
      <div className = "paginatContainer">
          <div>
            <ul className="paginat" onClick = {handlePageChange}>
            <li className="paginat paginat-group leftbtn">
                 &laquo;
            </li>
                {btnCount()}
            <li className="paginat paginat-group rightbtn">
                  &raquo;
            </li>    
            </ul>
          </div>
      </div>
    )
  
}

export default Paginat;