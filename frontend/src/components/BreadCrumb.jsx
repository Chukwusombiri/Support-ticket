import React from 'react'
import { Link } from 'react-router-dom'

export default function BreadCrumb({items = []}) {
  return (
    <div className='w-full flex items-center gap-2 text-sm text-gray-600 roboto-regular py-4'>        
        {items.map((item, index) => (
            <React.Fragment key={index}>
                {(index!==0) && <span>/</span>} { !item.url ? <span className='text-sm capitalize text-gray-600'>{item.label}</span> : <Link to={item.url} className={`text-sm capitalize roboto-semibold text-gray-800 hover:underline`}>{item.label}</Link>  }
            </React.Fragment>
        ))}
    </div>
  )
}
