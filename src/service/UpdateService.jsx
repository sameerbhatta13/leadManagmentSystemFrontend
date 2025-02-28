import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useGetServiceQuery, useUpdateServiceMutation } from '../redux/Api/Service'
import { toast } from 'react-toastify'



const UpdateService = ({ id, setUpdateService, item }) => {
    console.log("first", setUpdateService)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const { refetch } = useGetServiceQuery()

    const [updateService] = useUpdateServiceMutation()

    const updateData = async (data) => {
        try {
            const response = await updateService(id, data)
            console.log(response)
            refetch()
            setUpdateService()
            toast.success('updated successfully')

        } catch (error) {

        }

    }

    useEffect(() => {
        if (item) {
            setValue('title', item.title || '')

        }

    })


    return (
        <>
            <div className="fixed top-0 left-0  w-full h-full flex justify-center items-center bg-black/50 ">
                <div className="bg-white p-6 flex rounded-lg shadow-lg">
                    <form action="" onSubmit={handleSubmit(updateData)} className='w-full ' noValidate>
                        <div className='flex flex-col text-start'>
                            <h1 className='font-semibold'>Add More Service</h1>

                            <label htmlFor="">Title</label>
                            <input type="text" placeholder='update the service title' className='my-2 border p-1 rounded-lg' {...register('title', {
                                required: {
                                    value: true,
                                    message: '* This field is required. *'
                                }
                            })} />
                            <p className='text-red-600'>{errors?.title?.message}</p>
                            <div className='flex gap-3.5'>
                                <button onClick={() => setUpdateService()} className='rounded-lg border p-2'>
                                    Cancel
                                </button>
                                <button className='rounded-lg border p-2' >
                                    Update Service
                                </button>
                            </div>
                        </div>


                    </form>
                </div >
            </div >


        </>
    )

}

export default UpdateService