import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear()
  return (
    <div className='flex items-center justify-center py-4 bg-gray-200'>
      <p className='text-sm text-gray-500'>&copy; All rights reserved | Support-Desk {currentYear}</p>
    </div>
  )
}
