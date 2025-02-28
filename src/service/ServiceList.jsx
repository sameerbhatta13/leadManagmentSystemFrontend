import React, { useState } from 'react'
import { useAddServiceMutation, useGetServiceQuery } from '../redux/Api/Service'
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdLibraryAdd } from "react-icons/md";
import AddService from './AddService';
import UpdateService from './UpdateService';

const ServiceList = () => {
    const [updateService, setUpdateService] = useState()
    const [addService, setAddService] = useState('')
    console.log("addservice", addService)

    console.log("updateService", updateService)
    const { data: service, refetch } = useGetServiceQuery()

    const [add, { }] = useAddServiceMutation()
    return (
        <>

            <div className='flex justify-end mt-9 mr-6'>
                <button onClick={() => setAddService('addservice')} className=' flex flex-row border rounded-lg p-2 gap-2' ><MdLibraryAdd className='my-1' />Add Service</button>
            </div>
            <table className='table-auto border-separate border-gray-400 w-full p-2 my-6 rounded-lg overflow-hidden'>
                <thead >
                    <tr>
                        <th className='border border-gray-300 p-2'>S.N</th>
                        <th className='border border-gray-300 p-2'>Title</th>
                        <th className='border border-gray-300 p-2'>Created At</th>
                        <th className='border border-gray-300 p-2'>Action</th>

                    </tr>
                </thead>

                <tbody className='bg-white text-black'>

                    {
                        service?.data?.map((items, index) => {
                            return <tr key={index} className='text-center'>
                                <td className='border border-gray-300 p-2'>{index + 1}</td>
                                <td className='border border-gray-300 p-2'>{items.title}</td>
                                <td className='border border-gray-300 p-2'>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td className='border border-gray-300 p-2 '>
                                    <div className='flex justify-center items-center gap-2'>
                                        <button className='hover:scale-105' onClick={() => setUpdateService(items._id)}><MdModeEditOutline /></button>
                                        <button className='hover:scale-105' onClick={() => setUpdateService(items._id)}><RiDeleteBin5Line /></button>
                                    </div>

                                </td>

                                {
                                    (addService === 'addservice') &&
                                    <AddService setAddService={setAddService} />
                                }

                                {
                                    (updateService === items._id) &&
                                    <UpdateService setUpdateService={setUpdateService} />
                                }
                            </tr>

                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ServiceList