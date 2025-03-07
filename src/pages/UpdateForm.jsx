import React, { useState } from 'react'

import { toast } from 'react-toastify'
import { useGetUsersQuery, useUpdateUserMutation } from '../redux/Api/UserApi'

const UpdateForm = ({ id, status, setSelectedValue }) => {

    const [updateForm, setUpdateForm] = useState({
        status: status,
        total_budget: '',
        installment: '',
        startDate: '',
        endDate: ''
    })
    const { refetch } = useGetUsersQuery()
    const [updateUser, { isError, error }] = useUpdateUserMutation()

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdateForm((prev) => ({
            ...prev,
            [name]: name === 'installment' ? [Number(value)] : value

        }))

        //second options !!
        // setUpdateForm({ ...updateForm, [e.target.name]: e.target.value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const updateData = await updateUser({ id: id, data: updateForm })
            console.log("first", updateData)
            refetch()
            if (updateData.ok) {
                status === 'Client'
                    ? toast.success('client is added')
                    : status === 'Student'
                        ? toast.success('student is added')
                        : toast.success('followup is canceled')
                refetch()
                setSelectedValue('')
            }
        } catch (error) {

        }

    }


    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center  bg-black/60 ">
                <div className="bg-white p-6 flex  rounded-lg shadow-lg">
                    <form action="" onSubmit={handleSubmit}>
                        <h2 className="text-lg font-semibold">Add More Information</h2>
                        <div className='flex flex-row gap-6 my-5'>
                            <div className='flex flex-col flex-1'>
                                <label htmlFor="">Total Budget</label>
                                <input type="number" placeholder="Total Budget" name='total_budget' onChange={handleChange} className="border p-2 my-2 w-full rounded-lg" />
                            </div>
                            <div className='flex flex-col flex-1'>
                                <label htmlFor="">First Installment</label>
                                <input type="number" placeholder="First Installment" name='installment' onChange={handleChange} className="border p-2 my-2 w-full rounded-lg" />

                            </div>
                        </div>
                        <div className=' flex flex-row my-4 gap-6'>
                            <div className=' flex flex-col flex-1'>
                                <label htmlFor="">Start Date</label>
                                <input type="date" placeholder="start date" name='startDate' onChange={handleChange} className="border p-2 my-2 w-full rounded-lg " />
                            </div>
                            <div className=' flex flex-col flex-1'>
                                <label htmlFor="">End Date</label>
                                <input type="date" placeholder="End date" name='endDate' onChange={handleChange} className="border p-2 my-2 w-full rounded-lg" />
                            </div>
                        </div>



                        <button
                            className=' bg-red-600 text-white rounded-lg p-2 mx-4 my-3 transform transition-transform   duration-150 hover:scale-105 font-bold '
                            onClick={() => {
                                setSelectedValue('')
                                refetch()

                            }}
                        >
                            Close
                        </button>
                        <button className='rounded-lg p-2 mx-3.5 my-3 bg-[#059862] text-white  font-bold transform transition-transform  duration-150 hover:scale-105 '>update</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateForm