import React, { useEffect, useRef, useState } from 'react'
import { useGetUsersQuery, useUpdateUserMutation } from '../redux/Api/UserApi'


const UpdateCancel = ({ id, status, setSelectedValue }) => {
    const popupRef = useRef()
    const [cancel, setCancel] = useState({
        status: status,
        remarks: ''
    })

    // console.log(id)
    const handleChange = (e) => {
        setCancel({ ...cancel, [e.target.name]: e.target.value })
    }

    const [updateUser, { isError, error }] = useUpdateUserMutation()

    const { refetch } = useGetUsersQuery()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const update = await updateUser({ id: id, data: cancel })
        refetch()
        setSelectedValue('')

    }
    useEffect(() => {
        const handleClick = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setSelectedValue('')
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    })

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/20">
                <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg">

                    <form action="" >
                        <label htmlFor="">Remarks</label>
                        <textarea name="remarks" id="" placeholder='write your message.....' className="w-full p-4 border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400" onChange={handleChange}></textarea>
                        <h2 className="text-lg font-semibold">Are You Sure?</h2>
                        <button
                            className=' bg-red-600 text-white rounded-lg p-2 mx-3.5 my-3 w-[25%] transform transition-transform   duration-150 hover:scale-105 font-bold '
                            onClick={() => setSelectedValue('')}
                        >
                            Close
                        </button>
                        <button onClick={handleSubmit} className='bg-[#059862] text-white rounded-lg p-2 mx-3.5 my-3 w-[25%] font-bold transform transition-transform  duration-150 hover:scale-105 '>Yes</button>
                    </form>
                </div>
            </div >
        </>
    )
}

export default UpdateCancel