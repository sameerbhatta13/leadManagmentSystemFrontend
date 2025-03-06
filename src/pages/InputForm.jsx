import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { useAddUserMutation } from '../redux/Api/UserApi';
import { useGetServiceQuery } from '../redux/Api/Service';

const InputForm = ({ setIsModalOpen, refetch }) => {
    const { data: service } = useGetServiceQuery()
    // console.log(service)
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        service: ""
    });
    // console.log(values)

    const [addUser, { isError, error }] = useAddUserMutation();
    // console.log(isError, error);

    const handleChange = event => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values)



        try {
            const response = await addUser(values);
            console.log("first", response)
            refetch()
            setIsModalOpen(false)
            if (response?.data?.message) {

                toast.success(response?.data?.message)

            }
            else {
                toast.error(response?.error?.data?.message)

            }

        } catch (error) {
            console.log("error", error);
            toast.error("Error adding user");
        }
    };

    return (
        <>

            <h1 className='text-3xl font-bold text-center text-gray-800 mb-6 underline underline-offset-2'>Add Lead</h1>
            <form onSubmit={handleSubmit} className='space-y-5 rounded-lg'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex flex-col'>
                        <label className='text-lg font-semibold text-gray-700'>Full Name</label>
                        <input
                            type='text'
                            placeholder='Enter Full Name'
                            name='name'
                            onChange={handleChange}
                            className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg font-semibold text-gray-700'>Email</label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            name='email'
                            onChange={handleChange}
                            className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'
                        />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex flex-col'>
                        <label className='text-lg font-semibold text-gray-700'>Phone</label>
                        <input
                            type='tel'
                            placeholder='Enter Phone Number'
                            name='phone'
                            onChange={handleChange}
                            className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg font-semibold text-gray-700'>Service</label>
                        <select
                            name='service'
                            onChange={handleChange}
                            className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'>
                            <option value='' selected disabled >Select Service</option>
                            {
                                service?.data?.map((service, index) => (
                                    <option value={`${service?._id}`}>{service.title}</option>

                                ))
                            }

                        </select>
                    </div>
                </div>
                <button
                    type='submit'
                    className='w-full bg-red-600 text-white text-lg font-semibold py-2 rounded-lg hover:bg-red-700 transition-all'>
                    Submit Now
                </button>
            </form>


        </>
    );
};

export default InputForm;
