import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AuthCard from '../components/AuthCard';
import SectionHeader from '../components/SectionHeader';
import Label from '../components/Label';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import { isEmptyInput, isInvalidEmailAddress, passwordDoNotMatch } from '../utilities/validation';
import { Helmet } from 'react-helmet';
import { register, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function Register() {
    const dispatch = useDispatch();    
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordRepeat: ''
    })
    const [showPassword, setShowPassword] = useState(false);    

    // side effects
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            toast.success('Registered successfully')
            dispatch(reset());                      
        }       
    }, [isError, isSuccess, message, dispatch, reset])

    // handle input change
    const handleChange = (evt) => {
        const field = evt.target.name;
        const value = evt.target.value;

        setFormData(prev => ({ ...prev, [field]: value }));
    }

    // submit registration
    const registerUser = (evt) => {
        evt.preventDefault();

        // validate input
        const { isInvalid, message } = validateForm(formData);

        if (isInvalid) {
            toast.error(message);
            return;
        }

        //start submit to API
        const { name, email, password } = formData;
        dispatch(register({ name, email, password }));
    }

    return (
        <AuthCard>
            <Helmet>
                <title>Register | Support Desk</title>
            </Helmet>
            <SectionHeader title={'Register an account'} description={'Completely fill out and submit the form below to get started'} isCentered={true} />
            <div className="w-full mt-4">
                <form onSubmit={registerUser}>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor={"name"} >Name</Label>
                        <Input
                            name="name"
                            id="name"
                            value={formData.name}
                            type="text"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
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
                    <div className="mt-4 flex flex-col gap-2">
                        <Label htmlFor={"passwordRepeat"} >Confirm Password</Label>
                        <Input
                            name="passwordRepeat"
                            id="passwordRepeat"
                            value={formData.passwordRepeat}
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
                        <Link to={'/login'} className='inline-flex items-center gap-2 roboto-semibold text-sm text-gray'>
                            <span>Login instead</span>
                            <FaSignInAlt />
                        </Link>
                    </div>
                    <div className="mt-6 flex flex-col w-full max-w-lg mx-auto">
                        <PrimaryButton type="submit" disabled={isLoading} >Register</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthCard>
    )
}

const validateForm = (form) => {
    const { name, email, password, passwordRepeat } = form;

    if (isEmptyInput(name, email, password, passwordRepeat)) return {
        isInvalid: true,
        message: "Please fill out all fields"
    }

    if (isInvalidEmailAddress(email)) return {
        isInvalid: true,
        message: "Please provide a valid email address"
    }

    if (passwordDoNotMatch(password, passwordRepeat)) return {
        isInvalid: true,
        message: "Passwords do not match"
    }

    return {
        isInvalid: false,
        message: "good"
    }
}