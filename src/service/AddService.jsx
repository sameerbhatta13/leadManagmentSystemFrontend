import React, { useEffect, useRef } from 'react'
import { useAddServiceMutation, useGetServiceQuery } from '../redux/Api/Service'
import { useForm } from 'react-hook-form'

const AddService = ({ setAddService }) => {
    const { register, handleSubmit, formState } = useForm()
    const { errors } = formState
    const popupRef = useRef(null)

    const [addService] = useAddServiceMutation()
    const { refetch } = useGetServiceQuery()




    const sendData = async (data) => {
        try {
            const response = await addService(data)
            console.log(response)
            refetch()

        } catch (error) {
            console.log(error)

        }
    }

    return (
        <>
            <div className="fixed top-0 left-0  w-full h-full flex justify-center items-center bg-black/50 ">
                <div className="bg-white p-6 flex rounded-lg shadow-lg">
                    <form action="" onSubmit={handleSubmit(sendData)} className='w-full ' noValidate>
                        <div className='flex flex-col text-start'>
                            <h1 className='font-semibold'>Add More Service</h1>

                            <label htmlFor="">Title</label>
                            <input type="text" placeholder='Enter The Service Tilte' className='my-2 border p-1 rounded-lg' {...register('title', {
                                required: {
                                    value: true,
                                    message: '* This field is required. *'
                                }
                            })} />
                            <p className='text-red-600'>{errors?.title?.message}</p>
                            <div className='flex gap-3.5'>
                                <button onClick={() => setAddService()} className='rounded-lg border p-2'>
                                    Cancel
                                </button>
                                <button className='rounded-lg border p-2' >
                                    Add Service
                                </button>
                            </div>
                        </div>


                    </form>
                </div >
            </div >

        </>
    )
}

export default AddService