import React, { useEffect, useRef, useState } from 'react'

import { FaEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { useGetUsersQuery } from '../redux/Api/UserApi';
import UpdateClient from '../updates/UpdateClient';

const StudentLead = () => {
    const popupRef = useRef()
    const [user, setUser] = useState('')
    const [updateUser, setUpdateUser] = useState('')
    const { data: student } = useGetUsersQuery()




    useEffect(() => {
        const handleClick = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setUser('')
                setUpdateUser('')
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }

    }, [])

    const handleClose = () => {
        setUser('');
        setUpdateUser('')
    }

    return (
        <>
            <div className="relative overflow-scroll flex flex-col w-full h-full shadow-md rounded-lg bg-clip-border">
                <div className='overflow-x-auto mt-6'>
                    {
                        (student?.length > 0 || student?.data?.some(user => user?.status === 'Student')) ? (

                            <table className='table-auto border-separate border-gray-400 w-full p-2 my-6 rounded-lg overflow-hidden'>
                                <thead >
                                    <tr>
                                        <th className='border border-gray-300 p-2'>S.N</th>
                                        <th className='border border-gray-300 p-2'>Name</th>
                                        <th className='border border-gray-300 p-2'>Email</th>
                                        <th className='border border-gray-300 p-2'>Phone</th>
                                        <th className='border border-gray-300 p-2'>follow Up Date</th>
                                        <th className='border border-gray-300 p-2'>Start Date</th>
                                        <th className='border border-gray-300 p-2'>End Date</th>
                                        <th className='border border-gray-300 p-2'>Action</th>

                                    </tr>
                                </thead>

                                <tbody className='bg-white text-black'>

                                    {
                                        student?.data?.filter(user => user.status === 'Student')?.map((items, index) => {
                                            return <tr key={index} className='text-center'>
                                                <td className='border border-gray-300 p-2'>{index + 1}</td>
                                                <td className='border border-gray-300 p-2'>{items.name}</td>
                                                <td className='border border-gray-300 p-2'>{items.email}</td>
                                                <td className='border border-gray-300 p-2'>{items.phone}</td>
                                                <td className='border border-gray-300 p-2'>{new Date(items.followUp).toLocaleDateString()}</td>
                                                <td className='border border-gray-300 p-2'>{new Date(items.startDate).toLocaleDateString()}</td>
                                                <td className='border border-gray-300 p-2'>{new Date(items.endDate).toLocaleDateString()}</td>
                                                <td className='border border-gray-300 p-2 '>
                                                    <div className='flex justify-center items-center gap-2'>
                                                        <button className='hover:scale-105' onClick={() => setUser(items._id)}><FaEye /></button>

                                                        <button className='hover:scale-105' onClick={() => setUpdateUser(items._id)}><MdModeEditOutline /></button>
                                                    </div>

                                                </td>
                                                {
                                                    (items.status === 'Student' && user === items._id)
                                                        ? (<div className="fixed top-0 left-0 w-full h-full  bg-black/60  ">
                                                            <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg flex flex-col ml-96 mt-60 w-[60%]">
                                                                <div className='flex justify-end'>
                                                                    <button onClick={handleClose} className='text-red-500 text-3xl -mt-5'>X</button>
                                                                </div>
                                                                <table className='table-auto border-collapse border border-gray-400 w-full p-2 '>
                                                                    <caption class="caption-top">
                                                                        <p>view Details of: <span className='font-bold my-1'> {items.name}</span></p>
                                                                    </caption>
                                                                    <thead>
                                                                        <tr>
                                                                            <th className='border border-gray-300 p-2'> Start Date</th>
                                                                            <th className='border border-gray-300  p-2'> End Date</th>
                                                                            <th className='border border-gray-300  p-2'>Total_Budget</th>
                                                                            <th className='border border-gray-300  p-2'>First Installment</th>
                                                                            <th className='border border-gray-300  p-2'>Second Installment</th>
                                                                            <th className='border border-gray-300  p-2'>Third Installment</th>
                                                                            <th className='border border-gray-300  p-2'>Remaining_Amount</th>
                                                                        </tr>

                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className='border border-gray-300 text-center  p-2'>{new Date(items.startDate).toLocaleDateString()}</td>
                                                                            <td className='border border-gray-300 text-center  p-2'>{new Date(items.endDate).toLocaleDateString()}</td>
                                                                            <td className='border border-gray-300 text-center  p-2'>{items.total_budget}</td>
                                                                            <td className='border border-gray-300 text-center  p-2'>{items.installment[0] || 0}</td>
                                                                            <td className='border border-gray-300 text-center  p-2'>{items.installment[1] || 0}</td>
                                                                            <td className='border border-gray-300 text-center  p-2'>{items.installment[2] || 0}</td>
                                                                            <td className='border border-gray-300 text-center  p-2'>{(items?.total_budget) - (items?.installment?.reduce((sum, val) => sum + (val || 0), 0))}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>) : (items.status === 'Student' && updateUser === items._id) ? (
                                                            <UpdateClient id={items._id} item={items} setUser={setUser} setUpdateUser={setUpdateUser} />
                                                        ) : null
                                                }


                                            </tr>

                                        })
                                    }
                                </tbody>
                            </table>) : (
                            <div>
                                <h1>No Records Found for Student</h1>
                            </div>
                        )}
                </div>
            </div>


        </>
    )
}

export default StudentLead