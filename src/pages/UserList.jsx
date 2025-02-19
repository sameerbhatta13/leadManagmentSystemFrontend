import React, { useEffect, useState } from 'react'
import { useGetUsersQuery, useUpdateUserMutation } from '../redux/api/userApi'
import { toast } from 'react-toastify'

const UserList = () => {
    const [selectedValue, setSelectedValue] = useState('')
    const [selectUser, setSelectUser] = useState({})
    const [followUp, setFollowUp] = useState({
        status: '',
        followUp: ''
    })
    const id = selectUser?._id
    console.log(id)

    const [updateUser, { error: updateErr, isError: isupdateErr }] = useUpdateUserMutation()
    console.log(updateErr, isupdateErr)


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


    const { data, error, isError, refetch } = useGetUsersQuery()
    // console.log("data", data)
    // console.log(isError, error)
    return (
        <>
            <div className=' '>
                <h1 className='text-center my-6 font-bold'>here is the list of Memeber</h1>
                <div className='flex justify-center items-center'>
                    <table className='table-auto border-collapse border border-gray-400 w-full p-2 mx-11 my-6'>
                        <thead >
                            <tr >
                                <th className='border border-gray-300 '>S.N</th>
                                <th className='border border-gray-300'>Name</th>
                                <th className='border border-gray-300 '>Email</th>
                                <th className='border border-gray-300 '>Phone Number</th>
                                <th className='border border-gray-300 '> status</th>
                                <th className='border border-gray-300 '>Change Status</th>


                            </tr>
                        </thead>

                        <tbody>
                            {
                                data?.data?.map((user, index) => {
                                    return <tr key={index}>
                                        <td className='border border-gray-300 text-center' >{index + 1}</td>
                                        <td className='border border-gray-300 text-center'>{user.name}</td>
                                        <td className='border border-gray-300 text-center'>{user.email}</td>
                                        <td className='border border-gray-300 text-center'>{user.phone}</td>
                                        <td className='border border-gray-300 text-center'>{user.status}</td>
                                        <td className='border border-gray-300 text-center'>
                                            <select
                                                onChange={(e) => {
                                                    setSelectedValue(e.target.value)
                                                    setSelectUser(user)
                                                    setFollowUp({ status: e.target.value })
                                                }}

                                                name="service" id="" className='border border-gray-300 rounded-lg my-3 p-1 w-[50%]'>
                                                <option value=" " disabled selected> select status</option>
                                                <option value="Follow Up">Follow Up</option>
                                                <option value="Cancel">Cancel</option>
                                                <option value="Client">Client</option>
                                                <option value="Student">Student</option>
                                            </select> </td>

                                        {selectedValue == 'Follow Up' && selectUser._id == user._id ? (
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
                                        ) : null}




                                    </tr>
                                })
                            }

                        </tbody>

                    </table>

                </div>
            </div>

        </>
    )
}

export default UserList