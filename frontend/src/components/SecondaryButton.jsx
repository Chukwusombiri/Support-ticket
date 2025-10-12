import React from 'react'

export default function SecondaryButton({ children, ...props }) {
    return (
        <button
            {...props}
            className='inline-flex justify-center items-center gap-2 bg-gray-50 shadow-sm text-xs px-5 py-2.5 roboto-bold uppercase tracking-wide rounded-xl border-2 border-gray-900 hover:bg-gray-200 hover:border-gray-700 tranform focus:translate-y-1 disabled:bg-gray-300 text-gray-900 hover:text-gray-700 cursor-pointer'
        >
            {children}
        </button>
    )
}
