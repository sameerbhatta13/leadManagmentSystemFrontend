import React, { useEffect, useRef, useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { NavLink, useNavigate } from 'react-router'
import UpdateClient from '../updates/UpdateClient';
import { useFilterUserQuery, useGetUsersQuery } from '../redux/Api/UserApi';
import UpdateFollowup from '../updates/UpdateFollowup';
import UpdateStatus from '../pages/UpdateStatus';

const FilterStatus = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [updateUser, setUpdateUser] = useState('')


    const [status, setStatus] = useState('Client')
    // console.log("status", status)
    // console.log("user", user)

    const popupRef = useRef(null)

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



    const data = [
        {
            id: 1,
            value: 'Client',
        },
        {
            id: 2,

            value: 'Follow Up',

        },
        {
            id: 3,
            value: 'Student'
        },
        {
            id: 4,
            value: 'Cancel'
        }
    ]

    const { refetch } = useGetUsersQuery()
    const { data: filterUser, isError, error } = useFilterUserQuery(status)

    useEffect(() => {

        refetch()


    }, [])



    return (
        <>
            <div className=' flex flex-wrap gap-48 my-11 px-20'>
                <div className='flex lg:flex-col flex-wrap sm:flex-row gap-4 justify-items-start mt-8'>

                    {
                        data.map((item, index) => (
                            <p className={`cursor-pointer px-4 py-1.5 bg-blue-200 rounded-md hover:bg-blue-500 my-0.5 ${status === item.value ? `bg-blue-700 text-white` : ``} `} onClick={() => setStatus(item.value)}  >{item.value}</p>
                        ))
                    }

                </div>
                <div className="bg-gray-50 w-3/4">
                    <table className='table-auto border-separate border-gray-400 w-full p-2 my-6 rounded-lg overflow-hidden'>
                        <thead >
                            <tr>
                                <th className='border border-gray-300 p-2'>S.N</th>
                                <th className='border border-gray-300 p-2'>Name</th>
                                <th className='border border-gray-300 p-2'>Email</th>
                                <th className='border border-gray-300 p-2'>Phone</th>
                                <th className='border border-gray-300 p-2'>Service</th>
                                <th className='border border-gray-300 p-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white text-black'>
                            {filterUser?.data?.map((items, index) => (
                                <tr key={index} className='text-center'>
                                    <td className='border border-gray-300 p-2'>{index + 1}</td>
                                    <td className='border border-gray-300 p-2'>{items.name}</td>
                                    <td className='border border-gray-300 p-2'>{items.email}</td>
                                    <td className='border border-gray-300 p-2'>{items.phone}</td>
                                    <td className='border border-gray-300 p-2'>{items.service}</td>
                                    <td className='border border-gray-300 p-2'>
                                        {(items.status === "Student" || items.status === "Client") && (
                                            <div className='flex justify-center items-center gap-2'>
                                                <button className='hover:scale-105' onClick={() => setUser(items._id)}><FaEye /></button>
                                                <button className='hover:scale-105' onClick={() => setUpdateUser(items._id)}><MdModeEditOutline /></button>
                                            </div>
                                        )}
                                        {items.status === "Follow Up" && (
                                            <div className='flex justify-center items-center gap-2'>
                                                <button className='hover:scale-105' onClick={() => setUpdateUser(items._id)}><MdModeEditOutline /></button>
                                            </div>
                                        )}
                                    </td>

                                    {
                                        ((status === 'Client' || status === 'Student') && user === items._id) ?
                                            (
                                                <div className="fixed top-0 left-0 w-full h-full flex justify-center  items-center  bg-black/60  ">
                                                    <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                                                        <table className='table-auto border-collapse border border-gray-400 w-full p-2  my-6'>
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
                                                </div>) : ((status === 'Client' || status === 'Student') && updateUser === items._id ? (

                                                    <UpdateClient id={items._id} item={items} setUser={setUser} setUpdateUser={setUpdateUser} />) :

                                                    (status === 'Follow Up') && updateUser === items._id &&
                                                    <UpdateFollowup id={items._id} item={items} setUser={setUser} setUpdateUser={setUpdateUser}
                                                    />
                                            )
                                    }
                                </tr>


                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default FilterStatus