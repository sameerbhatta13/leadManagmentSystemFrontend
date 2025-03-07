import React, { useEffect, useState } from 'react'
import { useGetUsersQuery, useUpdateUserMutation } from '../redux/Api/UserApi'
import { FaEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import UpdateFollowup from '../updates/UpdateFollowup';
import Modal from 'react-modal'
import UpdateForm from '../pages/UpdateForm';


const FolloupLead = () => {
    const [selectedValue, setSelectedValue] = useState()
    const [selectUser, setSelectUser] = useState()
    console.log(selectedValue)
    console.log(selectUser)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [user, setUser] = useState('')

    const [updateUser, setUpdateUser] = useState('')

    const { data: folloupUser, refetch } = useGetUsersQuery()

    const [updateCancel] = useUpdateUserMutation()



    const handelCancel = async (e) => {
        e.preventDefault()
        try {
            const response = await updateCancel({ id: user, data: { status: 'Cancel' } })
            console.log(response)
            refetch()
            setIsModalOpen(false)
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <>
            <div className="relative overflow-scroll flex flex-col w-full h-full  shadow-md rounded-lg bg-clip-border">
                <div className='overflow-x-auto mt-6'>
                    {
                        folloupUser?.length > 0 || folloupUser?.data?.some(user => user?.status === 'Follow Up') ? (


                            <table className='table-auto border-separate border-gray-400 w-full p-2 my-6 rounded-lg overflow-hidden'>
                                <thead >
                                    <tr>
                                        <th className='border border-gray-300 p-2'>S.N</th>
                                        <th className='border border-gray-300 p-2'>Name</th>
                                        <th className='border border-gray-300 p-2'>Email</th>
                                        <th className='border border-gray-300 p-2'>Phone</th>
                                        <th className='border border-gray-300 p-2'>Followup Date</th>
                                        {
                                            folloupUser?.data?.some(user => user?.status === 'Follow Up') &&
                                            <th className='border border-gray-300 p-2'>Change Status</th>

                                        }
                                        <th className='border border-gray-300 p-2'>Action</th>

                                    </tr>
                                </thead>

                                <tbody className='bg-white text-black'>

                                    {
                                        folloupUser?.data?.filter(user => user.status === 'Follow Up')?.map((items, index) => {
                                            return <tr key={index} className='text-center'>
                                                <td className='border border-gray-300 p-2'>{index + 1}</td>
                                                <td className='border border-gray-300 p-2'>{items.name}</td>
                                                <td className='border border-gray-300 p-2'>{items.email}</td>
                                                <td className='border border-gray-300 p-2'>{items.phone}</td>

                                                <td className='border border-gray-300 p-2'>{new Date(items.followUp).toLocaleDateString()}</td>
                                                {items.status === 'Follow Up' &&
                                                    <td className='border border-gray-300 p-2 '>
                                                        <select name="service" id="" className='border border-gray-300 rounded-lg my-3 p-1 w-fit'
                                                            onChange={(e) => {
                                                                setSelectedValue(e.target.value)
                                                                setSelectUser(items._id)
                                                            }}
                                                        >
                                                            <option value=" " disabled selected>Change Status</option>
                                                            <option value="Client">Client</option>
                                                            <option value="Student">Student</option>
                                                        </select>
                                                    </td>

                                                }
                                                <td className='border border-gray-300 p-2 '>
                                                    <div className='flex justify-center items-center gap-2'>

                                                        <button className='hover:scale-105' onClick={() => setUpdateUser(items._id)}><MdModeEditOutline /></button>
                                                        {/* <button className='hover:scale-105' onClick={() => setUser(items._id)}><FaEye /></button> */}
                                                        <button className='hover:scale-105' value='cancel' onClick={() => {
                                                            // handelCancel(items._id)
                                                            setUser(items._id)
                                                            setIsModalOpen(true)
                                                        }}
                                                        ><MdCancel /></button>
                                                    </div>

                                                </td>
                                                {
                                                    items.status === 'Follow Up' && updateUser == items._id &&
                                                    <UpdateFollowup id={items._id} item={items} setUser={setUser} setUpdateUser={setUpdateUser} />
                                                }
                                                {
                                                    (selectedValue === 'Client' || selectedValue === 'Student') && selectUser === items._id &&
                                                    <UpdateForm id={items?._id} status={selectedValue} setSelectedValue={setSelectedValue} refetch={refetch} />


                                                }


                                            </tr>

                                        })
                                    }
                                </tbody>

                                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
                                    overlayClassName="fixed top-0 left-0 w-full bg-black/60 h-full"
                                    className='bg-white  relative p-6 rounded-lg shadow-lg w-96 mt-48 mx-auto'>
                                    <h1>Are you sure ??</h1>
                                    <div className='flex flex-row gap-3.5 my-5'>

                                        <button className='rounded-lg border p-2 bg-amber-50' onClick={() => setIsModalOpen(false)}>No</button>
                                        <button className='rounded-lg border p-2 bg-green-200' onClick={handelCancel} >Yes</button>
                                    </div>
                                </Modal>
                            </table>) :
                            (
                                <div>No Records found for the Follow Up</div>
                            )}
                </div>
            </div>

        </>
    )
}

export default FolloupLead