import React, { useState } from 'react'
import { useGetAdminQuery, useResetPasswordMutation, useSigninAdminMutation } from '../redux/Api/Admin'
import { NavLink, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import Modal from 'react-modal';

Modal.setAppElement('#root');
const Login = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const { refetch } = useGetAdminQuery()

    const [loginAdmin, { isError, }] = useSigninAdminMutation()

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
            // toast.success('logged successfully')
            navigate('/dashboard')

        } catch (error) {
            console.log('error', response.message)
        }


    }


    //for reset password
    const [resetPassword, { error }] = useResetPasswordMutation()
    console.log(error)
    const handleForgotPassword = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPassword({ email })
            console.log("first", response)

            if (response?.data?.message) {
                navigate('/otp')
                localStorage.setItem('Id', response?.data?.data?.adminId)
            }
            else {
                setErrorMessage('enter a correct email')
            }

        } catch (error) {


        }
        // setIsModalOpen(false);
    };
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

                        <p className='font-bold flex flex-row gap-1'>Foget Password ? <button onClick={handleForgotPassword} className='hover:text-blue-600 hover:underline underline-offset-2'>
                            Click Here
                        </button> </p>



                    </form>

                </div>
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
                overlayClassName="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center"
                className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-40">
                <h2 className='text-xl font-semibold text-center mb-4'>Reset Password</h2>
                <p className='text-gray-600 text-center mb-4'>Enter your email to receive a password reset link.</p>
                <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setErrorMessage('')
                    }
                    }
                    className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center'
                />
                {errorMessage && <p className='text-red-500 text-sm mt-2 text-center'>{errorMessage}</p>}
                <div className='flex justify-between mt-4'>
                    <button onClick={() => {
                        setIsModalOpen(false)
                        setErrorMessage('')
                    }} className='bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500'>Cancel</button>
                    <button onClick={handleSendEmail} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Send Email</button>
                </div>
            </Modal>
        </>
    )
}

export default Login