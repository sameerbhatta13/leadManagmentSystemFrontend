import React from 'react'
import { useGetUsersQuery } from '../redux/Api/UserApi'


const CancelLead = () => {
    const { data: cancel } = useGetUsersQuery()
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


                    </tr>
                </thead>

                <tbody className='bg-white text-black'>

                    {
                        cancel?.data?.filter(user => user.status === 'Cancel')?.map((items, index) => {
                            return <tr key={index} className='text-center'>
                                <td className='border border-gray-300 p-2'>{index + 1}</td>
                                <td className='border border-gray-300 p-2'>{items.name}</td>
                                <td className='border border-gray-300 p-2'>{items.email}</td>
                                <td className='border border-gray-300 p-2'>{items.phone}</td>
                                <td className='border border-gray-300 p-2'>{new Date(items.followUp).toLocaleDateString()}</td>

                            </tr>

                        })
                    }
                </tbody>
            </table>



        </>
    )
}

export default CancelLead