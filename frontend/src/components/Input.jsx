import React from 'react'

export default function Input({ ...props }) {
  return (
    <input
    {...props}
    className='text-gray-700 text-md p-2 border border-gray-300 ring-0 rounded-xl placeholder:text-gray-500 focus:border-gray-500'
     />
  )
}
