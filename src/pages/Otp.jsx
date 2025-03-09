import React, { useState } from 'react'
import { useVerifyOtpMutation } from '../redux/Api/Admin'
import { useNavigate } from 'react-router'

const Otp = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState("")

    const [GetOtp] = useVerifyOtpMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await GetOtp({ otp })
            // console.log("first", response)

            if (response?.data?.message) {
                navigate('/update/admin')
            }


        } catch (error) {
            console.log(error)

        }


    }
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-semibold text-center mb-4">Enter OTP</h2>
                    <p className="text-gray-600 text-center mb-4">
                        Enter the OTP sent to your email.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            maxLength="6"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
                            placeholder="XXXXXX"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
                        >
                            Verify OTP
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Otp