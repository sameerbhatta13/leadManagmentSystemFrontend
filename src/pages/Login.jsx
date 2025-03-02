import React, { useState } from 'react'
import { useGetAdminQuery, useSigninAdminMutation } from '../redux/Api/Admin'
import { NavLink, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'


const Login = () => {
    const navigate = useNavigate()


    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const { refetch } = useGetAdminQuery()

    const [loginAdmin, { isError, error }] = useSigninAdminMutation()

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await loginAdmin(loginData)
            console.log(response)
            localStorage.setItem('admin', response?.data?.data)
            // dispatch(setAdminProfile(response?.data?.data))
            refetch()
            toast.success('logged successfully')
            navigate('/dashboard')

        } catch (error) {
            console.log('error', response.message)
        }


    }
    return (
        <>

            <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
                <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl'>
                    <h1 className='text-3xl font-bold text-center text-gray-800 mb-6 underline underline-offset-8'>Admin Login</h1>
                    <form onSubmit={handleSubmit} className='space-y-5 rounded-lg'>
                        <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
                            <div className='flex flex-col'>
                                <label className='text-lg font-semibold text-gray-700'>Email</label>
                                <input
                                    type='email'
                                    placeholder='Enter Email'
                                    name='email'
                                    onChange={handleChange}
                                    className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none my-2'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-lg font-semibold text-gray-700'>Password</label>
                                <input
                                    type='text'
                                    placeholder='Enter Password'
                                    name='password'
                                    onChange={handleChange}
                                    className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none my-2'
                                />
                            </div>

                        </div>
                        <button
                            type='submit'
                            className='w-full bg-red-600 text-white text-lg font-semibold py-2 rounded-lg hover:bg-red-700 transition-all'>
                            Submit Now
                        </button>

                        <p className='font-bold flex flex-row gap-1'>Foget Password ?<NavLink className='hover:text-blue-600 hover:underline underline-offset-2'>click Here</NavLink> </p>

                    </form>

                </div>
            </div>
        </>
    )
}

export default Login