import React from 'react'

export default function Label({ children, htmlFor }) {
    return (
        <label
            className='text-md roboto-semibold text-gray-700'
            htmlFor={htmlFor}>
            {children}
        </label>
    )
}
