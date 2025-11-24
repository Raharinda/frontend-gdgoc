import React from 'react'
import { RiArrowRightSLine } from "react-icons/ri";

function Breadcrumb() {
  return (
    <div>
      <h1 className='flex max-w-7xl mx-auto px-6 py-2'>Home <RiArrowRightSLine size={23} /> Shop</h1>
    </div>
  )
}

export default Breadcrumb