import React from 'react'
import { useGetUsersQuery } from '../redux/Api/UserApi'
import { FaEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";



const FolloupLead = () => {
    const { data: folloupUser } = useGetUsersQuery()


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
                        folloupUser?.data?.filter(user => user.status === 'Follow Up')?.map((items, index) => {
                            return <tr key={index} className='text-center'>
                                <td className='border border-gray-300 p-2'>{index + 1}</td>
                                <td className='border border-gray-300 p-2'>{items.name}</td>
                                <td className='border border-gray-300 p-2'>{items.email}</td>
                                <td className='border border-gray-300 p-2'>{items.phone}</td>
                                <td className='border border-gray-300 p-2'>{new Date(items.followUp).toLocaleDateString()}</td>
                                <td className='border border-gray-300 p-2 '>
                                    <div className='flex justify-center items-center gap-2'>
                                        <button className='hover:scale-105' onClick={() => setUser(items._id)}><FaEye /></button>

                                        <button className='hover:scale-105' onClick={() => setUpdateUser(items._id)}><MdModeEditOutline /></button>
                                    </div>

                                </td>
                            </tr>

                        })
                    }
                </tbody>
            </table>

        </>
    )
}

export default FolloupLead