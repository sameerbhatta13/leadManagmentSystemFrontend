import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import UpdateStatus from './UpdateStatus'
import UpdateCancel from './UpdateCancel'
import { useGetUsersQuery } from '../redux/Api/UserApi'
import UpdateForm from './UpdateForm'

const UserList = () => {
    const [selectedValue, setSelectedValue] = useState('')
    const [search, setSearch] = useState('')
    const [selectUser, setSelectUser] = useState({})


    const { data: UserData, error, isError, refetch } = useGetUsersQuery()

    const users = UserData?.data || null

    const filterData = users?.filter(item => item?.status.toLowerCase().includes(search.toLowerCase()) || item?.name.toLowerCase().includes(search.toLowerCase()) || String(item?.phone).includes(search))


    useEffect(() => {
        refetch()
    }, [])




    return (
        <>


            <h1 className='text-center my-6 font-bold underline underline-offset-4'>Here is the list of Memeber</h1>
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search by status..."
                    className="w-full max-w-md p-2 border rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='bg-gray-50 flex justify-center items-center px-14'>
                {filterData?.length > 0 ? (
                    <table className='table-auto border-seperated border border-gray-400 w-full p-2  my-6 rounded-lg overflow-hidden'>
                        <thead >
                            <tr >
                                <th className='border border-gray-300 p-2 '>S.N</th>
                                <th className='border border-gray-300 p-2'>Name</th>
                                <th className='border border-gray-300 p-2 '>Email</th>
                                <th className='border border-gray-300 p-2 '>Phone Number</th>
                                <th className='border border-gray-300 p-2 '> Status</th>
                                <th className='border border-gray-300 p-2 '>Change Status</th>
                            </tr>
                        </thead>

                        <tbody className='bg-white text-black'>
                            {

                                filterData?.filter(user => user.status !== 'Cancel')?.map((user, index) => {
                                    return <tr key={index}>
                                        <td className='border border-gray-300 text-center p-2' >{index + 1}</td>
                                        <td className='border border-gray-300 text-center p-2'>{user.name}</td>
                                        <td className='border border-gray-300 text-center p-2'>{user.email}</td>
                                        <td className='border border-gray-300 text-center p-2'>{user.phone}</td>
                                        <td className='border border-gray-300 text-center p-2'>{user.status}</td>
                                        <td className='border border-gray-300 text-center p-2'>

                                            {
                                                user.status == 'Active' ? (
                                                    <select
                                                        onChange={(e) => {
                                                            setSelectedValue(e.target.value)
                                                            setSelectUser(user)

                                                        }}

                                                        name="service" id="" className='border border-gray-300 rounded-lg my-3 p-1 w-[50%]'>
                                                        <option value="" disabled selected> select status</option>
                                                        <option value="Follow Up">Follow Up</option>
                                                        <option value="Cancel">Cancel</option>
                                                    </select>
                                                ) :

                                                    user.status === 'Client' || user.status === 'Student'
                                                        ? (
                                                            <select
                                                                onChange={(e) => {
                                                                    setSelectedValue(e.target.value)
                                                                    setSelectUser(user)

                                                                }}

                                                                name="service" id="" className='border border-gray-300 rounded-lg my-3 p-1 w-[50%]'>
                                                                <option value="" disabled selected> select status</option>
                                                                <option value="Cancel">Cancel</option>

                                                            </select>
                                                        ) : (
                                                            <select
                                                                onChange={(e) => {
                                                                    setSelectedValue(e.target.value)
                                                                    setSelectUser(user)

                                                                }}

                                                                name="service" id="" className='border border-gray-300 rounded-lg my-3 p-1 w-[50%]'>
                                                                <option value="" disabled selected> select status</option>
                                                                <option value="Client">Client</option>
                                                                <option value="Student">Student</option>
                                                                <option value="Cancel">Cancel</option>

                                                            </select>
                                                        )
                                            }
                                        </td>

                                        {selectedValue == 'Follow Up' && selectUser._id == user._id ? (

                                            <UpdateStatus setSelectedValue={setSelectedValue} id={user?._id} status={selectedValue} />

                                        ) : (selectedValue == 'Client' || selectedValue == 'Student') && selectUser._id == user._id ? (
                                            <UpdateForm id={user?._id} status={selectedValue} setSelectedValue={setSelectedValue} />
                                        ) : (selectedValue == 'Cancel' &&
                                            <UpdateCancel status={selectedValue} id={selectUser?._id} setSelectedValue={setSelectedValue} />
                                        )}
                                    </tr>
                                })

                            }

                        </tbody>

                    </table>
                ) : (
                    <div className='flex justify-center items-center my-9'>
                        <h1 className='font-bold text-5xl'>No Records Found</h1>
                    </div>
                )
                }

            </div>


        </>
    )
}

export default UserList