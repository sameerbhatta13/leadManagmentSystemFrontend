import React from 'react'

const UpdateForm = () => {

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent">
                <div className="bg-white p-6 flex  rounded-lg shadow-lg">
                    <form action="" onSubmit={handleSubmit}>
                        <h2 className="text-lg font-semibold">Add More Information</h2>
                        <div className='flex flex-row gap-6 my-5'>
                            <div className='flex flex-col flex-1'>
                                <label htmlFor="">Total Budget</label>
                                <input type="number" placeholder="Total Budget" name='total_budget' onChange={handleChange} className="border p-2 my-2 w-full rounded-lg" />
                            </div>
                            <div className='flex flex-col flex-1'>
                                <label htmlFor="">First Installment</label>
                                <input type="number" placeholder="First Installment" name='installment' onChange={handleChange} className="border p-2 my-2 w-full rounded-lg" />

                            </div>
                        </div>
                        <div className=' flex flex-row my-4 gap-6'>
                            <div className=' flex flex-col flex-1'>
                                <label htmlFor="">Start Date</label>
                                <input type="date" placeholder="start date" name='startDate' onChange={handleChange} className="border p-2 my-2 w-full rounded-lg " />
                            </div>
                            <div className=' flex flex-col flex-1'>
                                <label htmlFor="">End Date</label>
                                <input type="date" placeholder="End date" name='endDate' onChange={handleChange} className="border p-2 my-2 w-full rounded-lg" />
                            </div>
                        </div>



                        <button
                            className=' bg-gradient-to-r from-red-300 to-red-800 rounded-lg p-2 mx-4 my-3 transform transition-transform   duration-150 hover:scale-105 font-bold text-white '
                        // onClick={() => {
                        //     setSelectedValue('')

                        // }}
                        >
                            Close
                        </button>
                        <button className=' bg-gradient-to-r from-green-300 to-green-700 rounded-lg p-2 mx-3.5 my-3  font-bold transform transition-transform  duration-150 hover:scale-105 text-white'>update</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateForm