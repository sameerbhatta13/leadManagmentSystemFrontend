import React, { useState } from 'react'
import { useUpdateUserMutation } from '../redux/api/userApi'

const UpdateStatus = (props) => {
    const [followUp, setFollowUp] = useState({
        status: '',
        followUp: ''
    })
    const id = props.id
    console.log(id)

    const [updateUser, { error: updateErr, isError: isupdateErr }] = useUpdateUserMutation()

    const handleChange = (e) => {
        setFollowUp({ ...followUp, [e.target.name]: e.target.value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(followUp)
        try {
            const updateData = await updateUser({ id: id, data: followUp })
            console.log(updateData)
            refetch()
            toast.success('followup date updated')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <form action="" onSubmit={handleSubmit}>
                        <h2 className="text-lg font-semibold">Additional Information</h2>

                        <input type="date" placeholder="Follow Up Date" name='followUp' onChange={handleChange} className="border p-2 my-2 w-full" />


                        <button
                            className=' bg-gradient-to-r from-red-300 to-red-400 rounded-lg p-2 mx-3.5 my-3 transform transition-transform   duration-150 hover:scale-105 font-bold '
                            onClick={() => {
                                setSelectedValue('')

                            }}
                        >
                            Close
                        </button>
                        <button className=' bg-gradient-to-r from-red-300 to-green-300 rounded-lg p-2 mx-3.5 my-3  font-bold transform transition-transform  duration-150 hover:scale-105 '>update</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateStatus