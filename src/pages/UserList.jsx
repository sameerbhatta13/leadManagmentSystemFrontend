import React, { useEffect, useState } from 'react'

import UpdateStatus from './UpdateStatus'
import UpdateCancel from './UpdateCancel'
import { useGetUsersQuery } from '../redux/Api/UserApi'
import UpdateForm from './UpdateForm'


const UserList = () => {
    const [selectedValue, setSelectedValue] = useState('')
    const [search, setSearch] = useState('')
    const [selectUser, setSelectUser] = useState({})

    const [currPage, setCurrPage] = useState(1)
    const itemPerPage = 4


    const { data: UserData, error, isError, refetch } = useGetUsersQuery()


    const users = UserData?.data?.filter((item) => item.status != 'Cancel') || null

    const filterData = users?.filter(item => {
        if (search == '') {
            return item
        }
        else {

            return item?.status.toLowerCase().includes(search.toLowerCase()) || item?.name.toLowerCase().includes(search.toLowerCase()) || String(item?.phone).includes(search)

        }
    })

    const totalPage = Math.ceil(filterData?.length / itemPerPage)
    const displayUser = filterData?.slice((currPage - 1) * itemPerPage, (currPage * itemPerPage))



    useEffect(() => {
        refetch()
    }, [])





    return (
        <>


            <div className="w-full flex justify-start items-center  mt-5 pl-3">
                <div className="ml-3">
                    <div className="w-full max-w-sm min-w-[200px] relative">
                        <div className="relative my-5">
                            <input
                                className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setCurrPage(1)
                                }}
                                placeholder="Search here..."
                            />
                            <button
                                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative flex flex-col w-full h-full overflow-scroll  shadow-md rounded-lg bg-clip-border">
                {displayUser?.length > 0 ? (
                    <table className="w-full text-left table-auto  min-w-max border-gray-400 ">
                        <thead className=''>
                            <tr>
                                <th className="p-4 border-b border-slate-300 text-black">
                                    <p className="block text-lg font-normal leading-none">
                                        S.N
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300">
                                    <p className="block text-lg font-normal leading-none ">
                                        Name
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300 ">
                                    <p className="block text-lg font-normal leading-non">
                                        Email
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300 ">
                                    <p className="block text-lg font-normal leading-none ">
                                        Phone
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300 ">
                                    <p className="block text-lg font-normal leading-none ">
                                        Status
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300 ">
                                    <p className="block text-lg font-normal leading-none ">
                                        Change Status
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody className=" bg-white hover:bg-slate-50">

                            {
                                displayUser?.map((user, index) => {
                                    return <tr key={index}>

                                        <td className="p-4 border-b border-slate-200 py-5">
                                            <p className="block font-semibold text-sm text-slate-800">{index + 1}</p>
                                        </td>
                                        <td className="p-4 border-b border-slate-200 py-5">
                                            <p className="">{user.name}</p>
                                        </td>
                                        <td className="p-4 border-b border-slate-200 py-5">
                                            <p className="">{user.email}</p>
                                        </td>
                                        <td className="p-4 border-b border-slate-200 py-5">
                                            <p className="">{user.phone}</p>
                                        </td>
                                        <td className="p-4 border-b border-slate-200 py-5">
                                            <p className="">{user.status}</p>
                                        </td>
                                        <td className="p-4 border-b border-slate-200 py-5 w-fit">
                                            {
                                                user.status == 'Active' ? (
                                                    <select
                                                        onChange={(e) => {
                                                            setSelectedValue(e.target.value)
                                                            setSelectUser(user)

                                                        }}

                                                        name="service" id="" className='border border-gray-300 rounded-lg my-3 p-1 w-fit'>
                                                        <option value="" disabled selected  > select status</option>
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

                                                                name="service" id="" className='border border-gray-300 rounded-lg my-3 p-1 w-fit'>
                                                                <option value="" disabled selected> select status</option>
                                                                <option value="Cancel">Cancel</option>

                                                            </select>
                                                        ) : (
                                                            <select
                                                                onChange={(e) => {
                                                                    setSelectedValue(e.target.value)
                                                                    setSelectUser(user)

                                                                }}

                                                                name="service" id="" className='border border-gray-300 rounded-lg my-3 p-1 w-fit'>
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


                    </table>) : (<div className='flex justify-center items-center my-9'>
                        <h1 className='font-bold text-5xl'>No Records Found</h1>
                    </div>)
                }


            </div>
            <div className='flex justify-between items-center m-4'>
                <button
                    disabled={currPage === 1}
                    onClick={() => setCurrPage(prev => Math.max(prev - 1, 1))}
                    className={` bg-[#b9c956] text-white font-bold border p-3 transform transition-transform rounded-lg ${currPage === 1 ? `hover:bg-slate-200` : ``}`}
                >
                    Previous
                </button>
                <span className='translate-x-5 lg:translate-x-0'>page {currPage} of {totalPage}</span>

                <button
                    disabled={currPage === totalPage}
                    onClick={() => setCurrPage(prev => Math.min(prev + 1, totalPage))}
                    className={`bg-[#608e4d] text-white font-bold   border p-3 translate-x-5 lg:translate-x-0 transform transition-transform rounded-lg ${currPage === totalPage ? `hover:bg-slate-200` : ``}`}
                >
                    Next</button>
            </div>


        </>
    )
}

export default UserList