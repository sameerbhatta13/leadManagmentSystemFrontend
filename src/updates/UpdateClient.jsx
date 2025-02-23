import React, { useEffect, useState } from 'react'

const UpdateClient = ({ item, id }) => {
    console.log('end DATE', item.endDate)
    const [updateClient, setUpdateClient] = useState({
        name: '',
        email: '',
        phone: '',
        total_budget: '',
        endDate: '',
        remarks: ''

    })


    const handleChange = (e) => {
        setUpdateClient({ ...updateClient, [e.target.name]: e.target.value })

    }
    const handleSubmit = () => {

    }

    useEffect(() => {
        if (item) {
            setUpdateClient({
                name: item.name,
                email: item.email,
                phone: item.phone,
                total_budget: item.total_budget,
                endDate: item.endDate,
                remarks: item.remarks

            })
        }

    }, [item])



    return (
        <>


            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                    <h1 className='text-3xl font-bold text-center text-gray-800 mb-9'>Update Student/Client</h1>
                    <form onSubmit={handleSubmit} className='space-y-5 rounded-lg'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex flex-col'>
                                <label className='text-lg font-semibold text-gray-700'>Full Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter Full Name'
                                    name='name'
                                    value={updateClient.name}
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
                                    value={updateClient.email}
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
                                    value={updateClient.phone}
                                    onChange={handleChange}
                                    className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-lg font-semibold text-gray-700'>Total Budget</label>
                                <input
                                    type='number'
                                    placeholder='Enter the Budget'
                                    name='total_budget'
                                    value={updateClient.total_budget}
                                    onChange={handleChange}
                                    className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex flex-col'>
                                <label className='text-lg font-semibold text-gray-700'>End Date</label>
                                <input
                                    type='date'
                                    placeholder='Enter Phone Number'
                                    name='endDate'
                                    value={updateClient.endDate}
                                    onChange={handleChange}
                                    className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-lg font-semibold text-gray-700'>Remarks</label>
                                <textarea name="remarks" id="" rows='1' cols='10' value={updateClient.remarks} onChange={handleChange} placeholder='Remarks...' className="w-full p-2 border-1 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"></textarea>
                            </div>
                        </div>
                        <button className='flex justify-self-start border rounded-lg w-fit p-2 bg-gradient-to-r from-green-300 to-red-400 text-white font-bold'>update</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default UpdateClient