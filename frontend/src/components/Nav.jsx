import React from 'react'
import AppLogo from './AppLogo'
import { RiLoginCircleLine } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';



export default function Nav() {
    const {pathname} = useLocation()
    const {authUser} = useSelector((state) => state.auth)
    const navItems = [
        {
            href: '/login',
            label: 'Login',
            icon: <RiLoginCircleLine />,
            isActive: pathname == '/login'
        },
        {
            href: '/register',
            label: 'Register',
            icon: <FaUserPlus />,
            isActive: pathname == '/register'
        },
    ];
    return (
        <div className='relative h-14 flex bg-white shadow'>
            <div className="w-full h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-10">
                <AppLogo />
                <div className="ml-auto flex items-center gap-3">
                    {
                        !authUser 
                        ? navItems.map((item, idx) => <Link key={idx} to={item.href} className={`inline-flex items-center gap-1 text-sm tracking-wide ${item.isActive ? 'text-gray-900 roboto-semibold ' : 'text-gray-600'}`}>
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>)
                        : <LogoutButton />
                    }
                </div>
            </div>
        </div>
    )
}
