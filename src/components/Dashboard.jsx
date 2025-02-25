import React from 'react';
import { GrHomeRounded } from "react-icons/gr";
import { NavLink } from 'react-router';
import { useGetUsersQuery } from '../redux/Api/UserApi';
import { MdAddCircle } from "react-icons/md";
import UserList from '../pages/UserList'

const Dashboard = () => {

    const { data, isError, error, refetch } = useGetUsersQuery()


    const countOccurance = data?.data?.reduce((acc, person) => {
        acc[person?.status] = (acc[person?.status] || 0) + 1
        return acc
    }, {})



    return (
        <div className=" grid grid-cols-10 w-full gap-4 min-h-screen font-sans">
            {/* Left Panel (30%) */}
            <div className="col-span-2 bg-[#001529] p-4 ">
                <NavLink to='/dashboard' className="text-white flex flex-row gap-2 mt-10"><GrHomeRounded className='my-1' /> <b >Dashboard</b> </NavLink>
            </div>

            {/* Right Panel (70%) */}
            <div className="col-span-8 bg-[#F5F5F5] p-4 ">

                <h1 className='bg-white text-black'>Dashboard</h1>
                <div className='flex flex-row justify-between my-2'>
                    <p className='font-semibold my-2'>Total Number of Leads: <b>{data?.data.length}</b> </p>

                    <NavLink to='/inputform'>  <button className='bg-[#679E02] flex flex-row p-2 gap-1 rounded-lg font-bold text-white transform transition-transform duration-300 hover:scale-105'> <MdAddCircle className='mt-1' />
                        Add Member </button></NavLink>

                </div>



                {/* for number of lead */}

                <div className='grid grid-cols-4 mx-10 my-8'>
                    <div className='bg-white border flex flex-col rounded-lg w-fit p-6'>
                        <p><b>{countOccurance?.Active}</b></p>
                        <p className='backdrop-blur-xs'>Number of active</p>
                    </div>
                    <div className='bg-white border rounded-lg w-fit p-6'>
                        <p> <b> {countOccurance?.['Follow Up']}</b></p>
                        <p>Number of Follow Up </p>
                    </div>
                    <div className='bg-white border rounded-lg w-fit p-6'>
                        <p><b>{(countOccurance?.Client) + (countOccurance?.Student)}</b></p>
                        <p>Number of Client</p>
                    </div>
                    <div className='bg-white border rounded-lg w-fit p-6'>
                        <p> <b>{countOccurance?.Cancel}</b></p>
                        <p>Number of cancel</p>
                    </div>

                </div>

                <div>
                    <UserList />
                </div>
            </div>

        </div>
    );
}

export default Dashboard;