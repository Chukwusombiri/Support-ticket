import React, { useEffect, useState } from 'react'
import AuthCard from '../components/AuthCard'
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import PrimaryButton from '../components/PrimaryButton';
import Input from '../components/Input';
import Label from '../components/Label';
import SectionHeader from '../components/SectionHeader';
import { Link } from 'react-router-dom';
import { isEmptyInput, isInvalidEmailAddress } from '../utilities/validation';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (evt) => {
        const field = evt.target.name;
        const value = evt.target.value;

        setFormData(prev => ({ ...prev, [field]: value }));
    }

    const loginUser = (evt) => {
        evt.preventDefault();

        // validate input
        const { isInvalid, message } = validateForm(formData);

        if (isInvalid) {
            toast.error(message);
            return;
        }

        //start submit to API
        dispatch(login(formData));
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {   
            dispatch(reset());                     
        }         
    }, [isError, isSuccess, message, dispatch, reset])

    return (
        <AuthCard>
            <SectionHeader title={'Login to do more'} description={'Fill form below to login and access your account'} isCentered={true} />
            <div className="w-full mt-4">
                <form onSubmit={loginUser}>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor={"email"} >Email</Label>
                        <Input
                            name="email"
                            id="email"
                            value={formData.email}
                            type="text"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        <Label htmlFor={"password"} >Password</Label>
                        <Input
                            name="password"
                            id="password"
                            value={formData.password}
                            type={showPassword ? 'text' : 'password'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <button onClick={() => setShowPassword(!showPassword)} type='button' className='inline-flex items-center gap-2 text-sm text-gray-700 roboto-semibold cursor-pointer'>
                            {
                                showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                            <span>{!showPassword ? 'Show' : 'Hide'} Password</span>
                        </button>
                        <Link to={'/register'} className='inline-flex items-center gap-2 roboto-semibold text-sm text-gray'>
                            <span>Register now</span>
                            <FaUserPlus />
                        </Link>
                    </div>
                    <div className="mt-6 flex flex-col w-full max-w-lg mx-auto">
                        <PrimaryButton
                            type="submit"
                            disabled={isLoading}
                        >Login</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthCard>
    )
}


const validateForm = (form) => {
    const { email, password } = form;

    if (isEmptyInput(email, password)) return {
        isInvalid: true,
        message: "Please fill out all fields"
    }

    if (isInvalidEmailAddress(email)) return {
        isInvalid: true,
        message: "Please provide a valid email address"
    }

    return {
        isInvalid: false,
        message: "good"
    }
}