import React, { useEffect, useState } from 'react'
import { useGetUsersQuery, useUpdateUserMutation } from '../redux/Api/UserApi'
import Modal from 'react-modal'



const ActiveLead = () => {
    // const [followup, setFollowup] = useState()
    const [ismodalOpen, setIsModalOpen] = useState(false)
    const [id, setId] = useState()
    console.log(id)
    // console.log("first", followup)

    const { data: users, isError, refetch } = useGetUsersQuery()


    const [updateFollowup] = useUpdateUserMutation()

    const handleUpdate = async (e) => {
        // e.preventDefault()
        try {
            const update = await updateFollowup({ id: id, data: { status: 'Follow Up' } })
            console.log(update)
            refetch()

            setIsModalOpen(false)

        } catch (error) {
            console.log("error ", error)

        }

    }

    // useEffect(() => {
    //     if (id && followup) {
    //         handleUpdate()
    //     }
    // }, [id, followup])



    return (
        <>
            <table className='table-auto border-separate border-gray-400 w-full p-2 my-6 rounded-lg overflow-hidden'>
                <thead >
                    <tr>
                        <th className='border border-gray-300 p-2'>S.N</th>
                        <th className='border border-gray-300 p-2'>Name</th>
                        <th className='border border-gray-300 p-2'>Email</th>
                        <th className='border border-gray-300 p-2'>Phone</th>
                        <th className='border border-gray-300 p-2'>Created At</th>
                        <th className='border border-gray-300 p-2'>Updated At</th>
                        <th className='border border-gray-300 p-2'>Update Status</th>

                    </tr>
                </thead>

                <tbody className='bg-white text-black'>

                    {
                        users?.data?.filter(user => user.status === 'Active')?.map((items, index) => {
                            return <tr key={index} className='text-center'>
                                <td className='border border-gray-300 p-2'>{index + 1}</td>
                                <td className='border border-gray-300 p-2'>{items.name}</td>
                                <td className='border border-gray-300 p-2'>{items.email}</td>
                                <td className='border border-gray-300 p-2'>{items.phone}</td>
                                <td className='border border-gray-300 p-2'>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td className='border border-gray-300 p-2'>{new Date(items.updatedAt).toLocaleDateString()}</td>
                                <td className='border border-gray-300 p-2'><button className='rounded-lg border p-2 text-black bg-sky-200 ' onClick={() => {
                                    setId(items._id)
                                    setIsModalOpen(true)
                                }}>Update Follow Up</button></td>

                            </tr>
                        })
                    }
                </tbody>
                <Modal isOpen={ismodalOpen} onRequestClose={() => setIsModalOpen(false)} className='bg-white shadow-lg p-6 w-96 mt-48 mx-auto rounded-lg'>
                    <div>
                        <h1>Are you Sure</h1>
                        <div className='flex flex-row gap-3.5 my-5'>

                            <button className='rounded-lg border p-2 bg-amber-50' onClick={() => setIsModalOpen(false)}>No</button>
                            <button className='rounded-lg border p-2 bg-green-200' onClick={handleUpdate} >Yes</button>
                        </div>
                    </div>
                </Modal>
            </table>
        </>
    )
}

export default ActiveLead