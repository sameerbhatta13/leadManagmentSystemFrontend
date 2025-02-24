import React, { useEffect, useRef, useState } from 'react'

import { toast } from 'react-toastify'
import { useGetUsersQuery, useUpdateUserMutation } from '../redux/Api/UserApi'

const UpdateStatus = ({ id, setSelectedValue, status, }) => {
    const popupRef = useRef()
    const [followUp, setFollowUp] = useState({
        status: status,
        followUp: '',
        remarks: ''

    })



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
            setSelectedValue('')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const handleClick = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setSelectedValue('')
                refetch()
            }
        }
        document.addEventListener('mousedown', handleClick)

        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])


    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center  bg-black/60 ">
                <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg flex ">
                    <form action="" onSubmit={handleSubmit} className='flex flex-col'>

                        <div className='flex flex-row gap-5' >
                            <div className='flex flex-col'>
                                <h2 className="text-lg font-semibold">Followup Date</h2>
                                <input type="date" placeholder="Follow Up Date" name='followUp' onChange={handleChange} className="border p-2 my-2 w-full" />

                            </div>
                            <div className='flex flex-col'>
                                <h2 className='text-lg font-semibold'>Remarks</h2>
                                <textarea name="remarks" onChange={handleChange} id="" rows='1' cols='12' placeholder='write your message.....' className="w-full p-2 border-2 mt-2  border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"></textarea>
                            </div>
                        </div>


                        <div className='flex flex-row'>
                            <button
                                className=' bg-gradient-to-r from-red-300 to-red-400 rounded-lg p-2 mx-3 my-3 transform transition-transform   duration-150 hover:scale-105 font-bold '
                                onClick={() => {
                                    setSelectedValue('')
                                    refetch()
                                }}
                            >
                                Close
                            </button>
                            <button className=' bg-gradient-to-r from-red-300 to-green-300 rounded-lg p-2 mx-3 my-3  font-bold transform transition-transform  duration-150 hover:scale-105 '>update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateStatus