import React, { useEffect, useRef, useState } from 'react'
import { useGetUsersQuery, useUpdateUserMutation } from '../redux/Api/UserApi'
import { toast } from 'react-toastify'

const UpdateFollowup = ({ id, item, setUser, setUpdateUser }) => {

    const [updatefollowUp, setUpdateFollowUp] = useState({
        followUp: '',
        remarks: ''
    })
    const popupRef = useRef()

    const { refetch } = useGetUsersQuery()
    const [updateUser] = useUpdateUserMutation()


    const handleChange = (e) => {
        setUpdateFollowUp({ ...updatefollowUp, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const updateData = await updateUser({ id: id, data: updatefollowUp })
            console.log(updateData)
            refetch()
            toast.success('followup date updated')


        } catch (error) {
            console.log(error)
        }

    }



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
    }, [setUpdateUser])



    useEffect(() => {
        if (item) {
            setUpdateFollowUp({
                followUp: item.followUp ? item.followUp.split('T')[0] : '',
                remarks: item.remarks || ''
            })

        }
    }, [item])


    return (
        <>

            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/60 ">
                <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg flex ">
                    <form action="" onSubmit={handleSubmit} className='flex flex-col'>

                        <div className='flex flex-row gap-5' >
                            <div className='flex flex-col'>
                                <h2 className="text-lg font-semibold">Followup Date</h2>
                                <input type="date" placeholder="Follow Up Date" name='followUp' onChange={handleChange} value={updatefollowUp.followUp} className="border p-2 my-2 w-full" />

                            </div>
                            <div className='flex flex-col'>
                                <h2 className='text-lg font-semibold'>Remarks</h2>
                                <textarea name="remarks" onChange={handleChange} id="" rows='1' cols='12' placeholder='write your message.....' value={updatefollowUp.remarks} className="w-full p-2 border-2 mt-2  border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"></textarea>
                            </div>
                        </div>


                        <div className='flex flex-row'>
                            <button
                                className=' bg-gradient-to-r from-red-300 to-red-400 rounded-lg p-2 mx-3 my-3 transform transition-transform   duration-150 hover:scale-105 font-bold '
                                onClick={() => {
                                    setUpdateUser("")
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

export default UpdateFollowup