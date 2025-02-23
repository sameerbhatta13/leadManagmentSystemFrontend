import React, { useState } from 'react'
import Lead from '../assets/lead.jpg'
import { useAddUserMutation } from '../redux/api/userApi'
import { toast } from 'react-toastify'
import FilterStatus from '../components/FilterStatus'

const InputForm = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        service: ''
    })

    const [addUser, { isError, error }] = useAddUserMutation()
    console.log(isError, error)

    const handleChange = event => {
        setValues({ ...values, [event.target.name]: event.target.value })


    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await addUser(values)

            if (response.ok) {
                const data = await response.json()
                console.log(data)
            }
            toast.success('user add successfully')

        } catch (error) {
            console.log("error", error)
            toast.error("error", error)

        }

    }

    return (
        <>
            <div className=' h-screen '>


                <h1 className='font-bold flex md:flex-wrap items-center justify-center py-1 my-3 text-4xl underline '>Add Memeber</h1>
                <div className='  flex justify-center'>
                    <div className=' w-[40%]'>
                        <form onSubmit={handleSubmit} className=' m-6'>
                            <div className='flex flex-wrap lg:flex-row sm:flex-col justify-between my-6 '>
                                <div className='flex flex-col w-64 '>
                                    <label htmlFor="" className='font-semibold text-3xl'>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder='Enter Full Name'
                                        name='name'
                                        onChange={handleChange} className='border border-gray-400 rounded-lg w-full p-2 my-3 text-black' />
                                </div>
                                <div className='flex flex-col w-64'>
                                    <label htmlFor="" className='font-semibold text-3xl '>Email</label>
                                    <input type="text"
                                        placeholder='Enter Email'
                                        name='email'
                                        onChange={handleChange} className='border border-gray-400 rounded-lg w-full p-2 my-3 ' />
                                </div>

                            </div>

                            <div className='flex flex-wrap lg:flex-row sm:flex-col  justify-between my-6'>
                                <div className='flex flex-col w-64'>
                                    <label htmlFor="" className='font-semibold text-3xl '>Phone</label>
                                    <input type="text"
                                        placeholder='Enter Phone Number' name='phone'
                                        onChange={handleChange} className='border border-gray-400 rounded-lg w-full p-2 my-3 ' />
                                </div>
                                <div className='flex flex-col w-64'>
                                    <label htmlFor="" className='font-semibold text-3xl '>Service</label>
                                    <select name="service" id="" onChange={handleChange} className='border border-gray-400 rounded-lg w-full p-2 my-3'>
                                        <option value="">select service</option>
                                        <option value="MERN Stack">MERN Stack</option>
                                        <option value="Python Django">Python Django</option>
                                        <option value="Flutter">Flutter</option>
                                        <option value="Digital Marketing">Digital Marketing</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="App Development">App Development</option>
                                        <option value="Ui/Ux Design">Ui/Ux Design</option>
                                    </select>
                                    {/* <input type="text" placeholder='Enter Service' name='service'   /> */}
                                </div>

                            </div>
                            <div className='flex flex-col '>
                                <button className='bg-gradient-to-r from-red-800 to-red-800 p-2 rounded-lg transform transition-transform duration-300 hover:scale-105 text-3xl text-white font-bold '>Submit Now</button>

                            </div>

                        </form>
                    </div>

                </div>

                <FilterStatus />
            </div>
        </>
    )
}

export default InputForm