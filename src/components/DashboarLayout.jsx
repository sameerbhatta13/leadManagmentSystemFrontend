import React from 'react';
import { GrHomeRounded } from "react-icons/gr";
import { FaPersonShelter } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet } from 'react-router';
import { useGetUsersQuery } from '../redux/Api/UserApi';
import { MdAddCircle } from "react-icons/md";
import { Tooltip } from 'react-tooltip';

const Dashboard = () => {

    const { data, isError, error, refetch } = useGetUsersQuery()


    const countOccurance = data?.data?.reduce((acc, person) => {
        acc[person?.status] = (acc[person?.status] || 0) + 1
        return acc
    }, {})



    return (
        <div className=" grid grid-cols-10 w-full gap-4 min-h-screen font-sans">
            {/* Left Panel (30%) */}
            <div className="col-span-2 bg-[#121418] p-4 ">
                <div className='mx-2'>
                    <NavLink to='/dashboard' className="text-[#F5F5F5] flex flex-row gap-3 mt-10 mb-7 text-xl"><GrHomeRounded className='my-1' /> <b >Dashboard</b> </NavLink>

                    <NavLink className='text-[#F5F5F5] flex flex-row gap-3 font-semibold my-3 text-xl'> <FaPersonShelter className='my-1' /> Manage Leads</NavLink>
                    <div className='flex flex-col'>

                        <NavLink to='/active' className='mx-8 my-1 text-[#E3B23C] hover:text-[#FFD700] transition duration-300'>Active</NavLink>
                        <NavLink to='/followup' className='mx-8 my-1 text-[#E3B23C]  hover:text-[#FFD700] transition duration-300'>Follow Up</NavLink>
                        <NavLink to='/client' className='mx-8 my-1 text-[#E3B23C]  hover:text-[#FFD700] transition duration-300'>Client</NavLink>
                        <NavLink to='/student' className='mx-8 my-1 text-[#E3B23C]  hover:text-[#FFD700] transition duration-300'>Student</NavLink>
                        <NavLink to='/cancel' className='mx-8 my-1 text-[#E3B23C]  hover:text-[#FFD700] transition duration-300'>Cancel</NavLink>
                    </div>

                    <NavLink to='/services' className='text-[#F5F5F5] text-xl my-3 flex flex-row gap-3'><FaUserCog className='my-1' />Services</NavLink>

                </div>


            </div>

            {/* Right Panel (70%) */}
            <div className="col-span-8 bg-[#F5F5F5] p-4 ">

                <div className='flex flex-row justify-between my-4 items-center'>
                    <NavLink to='/dashboard' className='bg-white text-black w-full'>Dashboard</NavLink>
                    <button id='profile' className='mr-5' ><CgProfile size={30} /></button>
                    <Tooltip anchorSelect='#profile' place='top' content='profile details' style={{ fontSize: "10px", padding: "4px" }} />
                </div>
                <div className='flex flex-row justify-between my-2 mx-4'>
                    <p className='font-semibold my-2'>Total Number of Leads: <b>{data?.data.length}</b> </p>

                    <NavLink to='/inputform'>  <button className='bg-[#679E02] flex flex-row p-2 mr-6 gap-1 rounded-lg font-bold text-white transform transition-transform duration-300 hover:scale-105'> <MdAddCircle className='mt-1 ' />
                        Add Member </button></NavLink>

                </div>



                {/* for number of lead */}

                <div className='grid grid-cols-5 mx-4 my-8'>
                    <div className='bg-white border flex flex-col rounded-lg w-fit p-6'>
                        <p><b>{countOccurance?.Active}</b></p>
                        <p className='backdrop-blur-xs'>Number of active</p>
                    </div>
                    <div className='bg-white border rounded-lg w-fit p-6'>
                        <p> <b> {countOccurance?.['Follow Up']}</b></p>
                        <p>Number of Follow Up </p>
                    </div>
                    <div className='bg-white border rounded-lg w-fit p-6'>
                        <p><b>{(countOccurance?.Client)}</b></p>
                        <p>Number of Client</p>
                    </div>
                    <div className='bg-white border rounded-lg w-fit p-6'>
                        <p><b>{(countOccurance?.Student)}</b></p>
                        <p>Number of Student</p>
                    </div>
                    <div className='bg-white border rounded-lg w-fit p-6'>
                        <p> <b>{countOccurance?.Cancel}</b></p>
                        <p>Number of cancel</p>
                    </div>

                </div>

                {/* remaining part */}
                <Outlet />
            </div>

        </div>
    );
}

export default Dashboard;