import React, { useEffect, useRef, useState } from 'react'
import { useGetUsersQuery, useUpdateUserMutation } from '../redux/Api/UserApi'
import { toast } from 'react-toastify'

const UpdateClient = ({ item, id, setUser, setUpdateUser }) => {
    //another way of doing enddate is new Date(endDate).toISOString().split('T')[0]
    console.log('installment', item.installment[0], item.installment[1], item.installment[2])
    const popupRef = useRef(null)

    const [updateClient, setUpdateClient] = useState({
        name: '',
        email: '',
        phone: '',
        total_budget: 0,
        first_installment: 0,
        second_installment: 0,
        third_installment: 0,
        endDate: '',
        remarks: ''

    })
    const { refetch } = useGetUsersQuery()

    const [update, { isError, error }] = useUpdateUserMutation()

    const handleChange = (e) => {
        setUpdateClient({ ...updateClient, [e.target.name]: e.target.value })

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(updateClient)
        try {
            const response = await update({
                id, data: {
                    name: updateClient.name,
                    email: updateClient.email,
                    phone: updateClient.phone,
                    total_budget: updateClient.total_budget,
                    installment: [Number(updateClient.first_installment), Number(updateClient.second_installment),
                    Number(updateClient.third_installment)
                    ],
                    endDate: updateClient.endDate,
                    remarks: updateClient.remarks

                }
            })
            console.log("response", response)
            // console.log(response?.data?.data.status)
            if (response?.data?.data?.status === 'Student') {
                toast.success('Student updated successfully');
            } else if (response?.data?.data?.status === 'Client') {
                toast.success('Client updated successfully');

            }
            setUpdateClient({});  // Reset form
            setUpdateUser(null);
            refetch()
        } catch (error) {
            toast.error(error)

        }

    }

    useEffect(() => {
        if (item) {
            setUpdateClient({
                name: item.name || '',
                email: item.email || '',
                phone: item.phone || '',
                total_budget: item.total_budget || 0,
                first_installment: item.installment[0] || 0,
                second_installment: item.installment[1] || 0,
                third_installment: item.installment[2] || 0,
                endDate: item.endDate ? item.endDate.split('T')[0] : '',
                remarks: item.remarks || ''

            })
        }

    }, [item])

    useEffect(() => {
        const handleClick = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setUpdateUser('')
            }
        }

        document.addEventListener('mousedown', handleClick)

        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])


    const handleClose = () => {
        setUpdateClient({});  // Reset form
        setUpdateUser(null);

    }

    return (
        <>


            <div className="fixed top-0  md:top-0 left-0 w-full h-full flex justify-center items-center overflow-scroll bg-black/60 ">
                <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg flex flex-col ">
                    <div className='flex flex-row justify-between'>

                        <h1 className='text-3xl font-bold text-center text-gray-800 mb-9'>Update Student/Client</h1>

                        <button onClick={handleClose} className='text-red-500 text-3xl -mt-5'>X</button>

                    </div>

                    <form onSubmit={handleSubmit} className='space-y-5 rounded-lg h-96 overflow-scroll'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            <div className='flex flex-col'>
                                <label className='text-left font-semibold my-1 text-gray-700'>Full Name</label>
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
                                <label className='text-left my-1 font-semibold text-gray-700'>Email</label>
                                <input
                                    type='email'
                                    placeholder='Enter Email'
                                    name='email'
                                    value={updateClient.email}
                                    onChange={handleChange}
                                    className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left my-1  font-semibold text-gray-700'>Phone</label>
                                <input
                                    type='tel'
                                    placeholder='Enter Phone Number'
                                    name='phone'
                                    value={updateClient.phone}
                                    onChange={handleChange}
                                    className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'
                                />
                            </div>


                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            <div className='flex flex-col'>
                                <label className='text-left my-1 font-semibold text-gray-700'>Total Budget</label>
                                <input
                                    type='number'
                                    placeholder='Enter the Budget'
                                    name='total_budget'
                                    value={updateClient.total_budget}
                                    onChange={handleChange}
                                    className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left my-1 font-semibold text-gray-700'>First Installment</label>
                                <input
                                    type='number'
                                    placeholder='Enter first Installment'
                                    name='first_installment'
                                    value={updateClient.first_installment}
                                    onChange={handleChange}
                                    className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left my-1 font-semibold text-gray-700'>Second Installment</label>
                                <input
                                    type='number'
                                    placeholder='Enter second Installment'
                                    name='second_installment'
                                    value={updateClient.second_installment}
                                    onChange={handleChange}
                                    className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            <div className='flex flex-col'>
                                <label className='text-left my-1  font-semibold text-gray-700'>Third Installment</label>
                                <input
                                    type='number'
                                    placeholder='Enter third Installment'
                                    name='third_installment'
                                    value={updateClient.third_installment}
                                    onChange={handleChange}
                                    className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left my-1 font-semibold text-gray-700'>End Date</label>
                                <input
                                    type='date'
                                    placeholder='Enter end date'
                                    name='endDate'
                                    value={updateClient.endDate}
                                    onChange={handleChange}
                                    className='border border-gray-300 rounded-lg p-2 focus:ring focus:ring-red-300 outline-none'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left my-1  font-semibold text-gray-700'>Remarks</label>
                                <textarea name="remarks" id="" rows='1' cols='10' value={updateClient.remarks} onChange={handleChange} placeholder='Remarks...' className="w-full p-2 border-1 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"></textarea>
                            </div>
                        </div>


                        <button className='flex justify-self-start border rounded-lg w-fit p-2 bg-[#059862] text-white  font-bold'>update</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default UpdateClient