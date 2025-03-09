import React, { useState } from 'react'
import { useDeleteServiceMutation, useGetServiceQuery } from '../redux/Api/Service'
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdLibraryAdd } from "react-icons/md";
import AddService from './AddService';
import UpdateService from './UpdateService';
import Modal from 'react-modal';

const ServiceList = () => {
    const [updateService, setUpdateService] = useState()
    const [id, setId] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [addService, setAddService] = useState(false)


    console.log("addservice", addService)

    // console.log("updateService", updateService)
    const { data: service, refetch } = useGetServiceQuery()

    const [deleteService] = useDeleteServiceMutation()



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await deleteService({ id: id })
            // console.log("response", response)
            refetch()
            setIsModalOpen(false)
        } catch (error) {
            console.log(error)

        }
    }

    return (
        <>

            <div className='flex justify-end mt-10 mr-3'>
                <button onClick={() => setAddService(true)} className=' flex flex-row border rounded-lg p-2 gap-2 shadow-[-7px_7px_0px_#000000]' ><MdLibraryAdd className='my-1' />Add Service</button>
            </div>
            <div className="relative overflow-scroll flex flex-col w-full h-full  shadow-md rounded-lg bg-clip-border">
                <div className='overflow-x-auto mt-6'>
                    <table className='table-auto border-separate border-gray-400 w-full p-2 my-2 rounded-lg overflow-hidden'>
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
                                                <button className='hover:scale-105' onClick={() => {
                                                    setIsModalOpen(true)
                                                    setId(items._id)
                                                }}><RiDeleteBin5Line /></button>
                                            </div>

                                        </td>



                                        {
                                            (updateService === items._id) &&
                                            <UpdateService id={items._id} item={items} setUpdateService={setUpdateService} />
                                        }

                                    </tr>


                                })
                            }
                        </tbody>

                        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
                            overlayClassName="fixed top-0 left-0 w-full bg-black/60 h-full"
                            className='bg-white  relative p-6 rounded-lg shadow-lg w-[300px] md:w-96 mt-56 mx-auto '>
                            <h1>Are you sure ?</h1>
                            <div className='flex flex-row gap-3.5 my-5'>

                                <button className='rounded-lg border p-2 bg-red-600 text-white' onClick={() => setIsModalOpen(false)}>No</button>
                                <button className='rounded-lg border p-2 bg-[#059862] text-white' onClick={handleSubmit} >Yes</button>
                            </div>
                        </Modal>


                    </table>
                </div>
            </div>

            {
                (addService === true) &&
                <AddService setAddService={setAddService} />
            }
        </>
    )
}

export default ServiceList