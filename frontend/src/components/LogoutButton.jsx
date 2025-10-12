import React, { useEffect } from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
    const dispatch = useDispatch();
    const {authUser} = useSelector((state) => state.auth)
    const navigate = useNavigate();

    const handleLogout = (evt) => {
        dispatch(logout());       
        navigate('/');
    }

    if (!authUser) {
        return null;
    }

    return (
        <button onClick={handleLogout} type='button' className={`inline-flex items-center gap-1 text-sm tracking-wide text-gray-600 cursor-pointer`}>
            <RiLogoutCircleLine />
            <span>Logout</span>
        </button>
    )
}
