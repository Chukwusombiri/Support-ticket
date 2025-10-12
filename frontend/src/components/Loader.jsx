import React from 'react'
import { FaSpinner } from 'react-icons/fa'

export default function Loader() {
  return (
    <div className='flex justify-center items-center h-72'> 
      <FaSpinner className='animate-spin' size={28}/>
    </div>
  )
}
