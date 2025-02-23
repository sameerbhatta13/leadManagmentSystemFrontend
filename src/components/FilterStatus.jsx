import React, { useState } from 'react'
import { useFilterUserQuery } from '../redux/api/userApi'
import { MdDelete } from "react-icons/md";
import { LuView } from "react-icons/lu";
import { NavLink } from 'react-router'

const FilterStatus = () => {
    const [user, setUser] = useState('')
    const [value, setValue] = useState('')
    const [status, setStatus] = useState('Client')
    // console.log("status", status)
    console.log("value", value)
    console.log("user", user)


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

    const { data: filterUser, isError, error } = useFilterUserQuery(status)
    console.log("filterUser", filterUser)
    console.log(isError)


    return (
        <>
            <div className=' flex flex-wrap justify-evenly gap-4'>
                <div className='flex lg:flex-col flex-wrap sm:flex-row gap-2 justify-center'>

                    {
                        data.map((item, index) => (
                            <p className={`cursor-pointer p-2 bg-blue-200 rounded-md hover:bg-blue-500 my-3 ${status === item.value ? `bg-blue-700 text-white` : ``} `} onClick={() => setStatus(item.value)}  >{item.value}</p>
                        ))
                    }

                </div>
                <div className="bg-amber-200 p-4 rounded-md w-3/4">
                    {/* Header Row */}
                    <div className="grid grid-cols-6 font-bold text-white bg-gray-700 p-2">
                        <h1 className="text-center">Index</h1>
                        <h1 className="text-center">Name</h1>
                        <h1 className="text-center">Email</h1>
                        <h1 className="text-center">Phone</h1>
                        <h1 className="text-center">Service</h1>
                        <h1 className="text-center">Action</h1>

                    </div>
                    {
                        filterUser?.data?.map((items, index) => {
                            return <div key={index} className="grid grid-cols-6 text-center p-2 border-b border-gray-400">
                                <h1>{index + 1}</h1>
                                <h1>{items.name}</h1>
                                <h1>{items.email}</h1>
                                <h1>{items.phone}</h1>
                                <h1>{items.service}</h1>
                                <div className='flex justify-center items-center gap-2'>
                                    <button className='hover:scale-105' ><MdDelete /> </button>
                                    <button className='hover:scale-105' onClick={(e) => {
                                        setValue(e.target.value)
                                        setUser(items._id)
                                    }} ><LuView /> </button>
                                    <button > </button>

                                </div>



                            </div>

                        })
                    }

                </div>

            </div >

        </>
    )
}

export default FilterStatus