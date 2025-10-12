import React from 'react'

export default function PrimaryButton({ children, ...props }) {
    return (
        <button
        {...props}
        className={`inline-flex justify-center items-center gap-2 px-5 py-2.5 bg-gray-900 text-xs roboto-bold uppercase tracking-wide rounded-xl border-2 border-gray-900 hover:bg-gray-700 hover:border-gray-700 tranform focus:translate-y-1 disabled:bg-gray-600 disabled:border-gray-600 text-gray-100 cursor-pointer disabled:cursor-not-allowed transition-all duration-150`}
        >
            {children}
        </button>
    )
}
