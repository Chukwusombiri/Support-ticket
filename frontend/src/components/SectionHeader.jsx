import React from 'react'

export default function SectionHeader({ title, description = null, isCentered = true}) {
  return (
    <div className={`w-full flex flex-col gap-3 ${isCentered && 'items-center' } `}>
        <h2 className={`text-3xl expletus-sans text-gray-800 capitalize ${isCentered && 'text-center'}`}>{title}</h2>
        {description && <p className={`text-lg text-gray-600 roboto-semibold ${isCentered && 'text-center'}`}>{description}</p>}
    </div>
  )
}
