import React, { useState } from 'react'
import { useGetUsersQuery, useUpdateUserMutation } from '../redux/api/userApi'

const UpdateCancel = ({ id, status, setSelectedValue }) => {

    console.log(id)




    const [updateUser, { isError, error }] = useUpdateUserMutation()

    const { refetch } = useGetUsersQuery()
    console.log(status)
    const handleSubmit = async (e) => {
        e.preventDefault()

        const update = await updateUser({ id: id, data: { status } })
        console.log(update)
        refetch()
        setSelectedValue('')

    }

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <button
                        className=' bg-gradient-to-r from-red-300 to-red-400 rounded-lg p-2 mx-3.5 my-3 transform transition-transform   duration-150 hover:scale-105 font-bold '
                        onClick={() => setSelectedValue('')}
                    >
                        Close
                    </button>
                    <form action="" >
                        <h2 className="text-lg font-semibold">Are You Sure?</h2>


                        <button onClick={handleSubmit} className=' bg-gradient-to-r from-red-300 to-green-300 rounded-lg p-2 mx-3.5 my-3  font-bold transform transition-transform  duration-150 hover:scale-105 '>Yes</button>
                    </form>
                </div>
            </div >
        </>
    )
}

export default UpdateCancel