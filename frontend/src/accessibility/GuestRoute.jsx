import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function GuestRoute({ children }) {
    const {authUser} = useSelector((state) => state.auth)

    if(authUser) {
        return <Navigate to='/' />
    }

    return (
        <div>
            {children}
        </div>
    )
}
