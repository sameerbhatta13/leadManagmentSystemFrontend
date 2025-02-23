import React, { useEffect, useState } from 'react'
import { useGetUsersQuery, useUpdateUserMutation } from '../redux/api/userApi'
import { toast } from 'react-toastify'

const UpdateStatus = (props) => {
    const [followUp, setFollowUp] = useState({
        status: props.status,
        followUp: '',
        remarks: ''

    })
    // const stat = props.status
    // setSelectedValue(stat)

    const id = props.id
    console.log(id)

    const { refetch } = useGetUsersQuery()

    const [updateUser, { error: updateErr, isError: isupdateErr }] = useUpdateUserMutation()

    const handleChange = (e) => {
        setFollowUp({ ...followUp, [e.target.name]: e.target.value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const updateData = await updateUser({ id: id, data: followUp })
            console.log(updateData)
            refetch()
            toast.success('followup date updated')
            props.setSelectedValue('select status')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent">
                <div className="bg-white p-6 rounded-lg shadow-lg flex">
                    <form action="" onSubmit={handleSubmit} className='flex flex-col'>

                        <h2 className="text-lg font-semibold">Additional Information</h2>
                        <input type="date" placeholder="Follow Up Date" name='followUp' onChange={handleChange} className="border p-2 my-2 w-full" />

                        <h2 className='text-lg font-semibold'>Remarks</h2>
                        <textarea name="remarks" onChange={handleChange} id="" rows='3' cols='12' placeholder='write your message.....' className="w-full p-4 border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"></textarea>


                        <div className='flex flex-row'>
                            <button
                                className=' bg-gradient-to-r from-red-300 to-red-400 rounded-lg p-2 mx-3.5 my-3 transform transition-transform   duration-150 hover:scale-105 font-bold '
                                onClick={() => {
                                    props.setSelectedValue('')


                                }}
                            >
                                Close
                            </button>
                            <button className=' bg-gradient-to-r from-red-300 to-green-300 rounded-lg p-2 mx-3.5 my-3  font-bold transform transition-transform  duration-150 hover:scale-105 '>update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateStatus