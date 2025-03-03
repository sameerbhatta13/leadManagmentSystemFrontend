import React, { useState } from 'react'
import { useDeleteUserMutation, useGetUsersQuery } from '../redux/Api/UserApi'
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from 'react-modal'


const CancelLead = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [id, setId] = useState()
    const { data: cancel, refetch } = useGetUsersQuery('')


    const [deleteUser] = useDeleteUserMutation()

    const handleDelete = async (e) => {
        e.preventDefault()

        try {
            const response = await deleteUser({ id: id })
            refetch()
            setIsModalOpen(false)
        } catch (error) {
            console.log(error)

        }

    }



    return (
        <>
            <table className='table-auto border-separate border-gray-400 w-full p-2 my-6 rounded-lg overflow-hidden'>
                <thead >
                    <tr>
                        <th className='border border-gray-300 p-2'>S.N</th>
                        <th className='border border-gray-300 p-2'>Name</th>
                        <th className='border border-gray-300 p-2'>Email</th>
                        <th className='border border-gray-300 p-2'>Phone</th>
                        <th className='border border-gray-300 p-2'>followup date</th>
                        <th className='border border-gray-300 p-2'>Action</th>


                    </tr>
                </thead>

                <tbody className='bg-white text-black'>

                    {
                        cancel?.data?.filter(user => user.status === 'Cancel')?.map((items, index) => {
                            return <tr key={index} className='text-center'>
                                <td className='border border-gray-300 p-2'>{index + 1}</td>
                                <td className='border border-gray-300 p-2'>{items.name}</td>
                                <td className='border border-gray-300 p-2'>{items.email}</td>
                                <td className='border border-gray-300 p-2'>{items.phone}</td>
                                <td className='border border-gray-300 p-2'>{new Date(items.followUp).toLocaleDateString()}</td>
                                <td className='border border-gray-300 p-2 '>
                                    <div className='flex justify-center items-center gap-2'>
                                        <button className='hover:scale-105' onClick={() => {
                                            setIsModalOpen(true)
                                            setId(items._id)
                                        }
                                        }><RiDeleteBin5Line /></button>

                                    </div>


                                </td>
                            </tr>



                        })
                    }


                </tbody>
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className='bg-white  relative p-6 rounded-lg shadow-lg w-96 mt-48 mx-auto'>
                    <h1>Are you sure ??</h1>
                    <div className='flex flex-row gap-3.5 my-5'>

                        <button className='rounded-lg border p-2 bg-amber-50' onClick={() => setIsModalOpen(false)}>No</button>
                        <button className='rounded-lg border p-2 bg-green-200' onClick={handleDelete} >Yes</button>
                    </div>
                </Modal>
            </table>





        </>
    )
}

export default CancelLead