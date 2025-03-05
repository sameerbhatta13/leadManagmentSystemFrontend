import React, { useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { FaPersonShelter } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useGetUsersQuery } from "../redux/Api/UserApi";
import { MdAddCircle } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { useGetAdminQuery } from "../redux/Api/Admin";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Slice/AdminSlice";
import { toast } from "react-toastify";
import Modal from "react-modal";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(isModalOpen);

    const { data, isError, error, refetch } = useGetUsersQuery();

    const countOccurance = data?.data?.reduce((acc, person) => {
        acc[person?.status] = (acc[person?.status] || 0) + 1;
        return acc;
    }, {});

    const { data: admin, refetch: adminrefetch } = useGetAdminQuery();
    // console.log("admin", admin)

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
        toast.info("logged Out");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest("#profile, #profile-popup")) {
                setShowProfile(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);
    useEffect(() => {
        adminrefetch();
    }, []);

    useEffect(() => {
        refetch();
    }, [admin, data]);


    const statuses = [
        { key: "Active", },
        { key: "Follow Up" },
        { key: "Client" },
        { key: "Student" },
        { key: "Cancel" },
    ];


    return (
        <div className=" grid grid-cols-10 w-full gap-4 min-h-screen font-sans">
            {/* Left Panel (30%) */}
            <div className="hidden md:block col-span-2 bg-[#121418] p-4 ">
                <div className="mx-2">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `text-[#F5F5F5] flex flex-row gap-3 mt-10 mb-7 text-xl ${isActive ? "font-bold text-[#FFD700]" : ""
                            }`
                        }
                    >
                        <GrHomeRounded className="my-1" /> <b>Dashboard</b>{" "}
                    </NavLink>

                    <NavLink className="text-[#F5F5F5] flex flex-row gap-3 font-semibold my-3 text-xl">
                        {" "}
                        <FaPersonShelter className="my-1" /> Manage Leads
                    </NavLink>
                    <div className="flex flex-col">
                        <NavLink
                            to="/active"
                            className={({ isActive }) =>
                                `mx-8 my-1 text-[#E3B23C] transition duration-300 ${isActive ? "text-[#FFD700] font-bold" : "hover:text-[#FFD700]"
                                }`
                            }
                        >
                            Active
                        </NavLink>
                        <NavLink
                            to="/followup"
                            className={({ isActive }) =>
                                `mx-8 my-1 text-[#E3B23C] transition duration-300 ${isActive ? "text-[#FFD700] font-bold" : "hover:text-[#FFD700]"
                                }`
                            }
                        >
                            Follow Up
                        </NavLink>
                        <NavLink
                            to="/client"
                            className={({ isActive }) =>
                                `mx-8 my-1 text-[#E3B23C] transition duration-300 ${isActive ? "text-[#FFD700] font-bold" : "hover:text-[#FFD700]"
                                }`
                            }
                        >
                            Client
                        </NavLink>
                        <NavLink
                            to="/student"
                            className={({ isActive }) =>
                                `mx-8 my-1 text-[#E3B23C] transition duration-300 ${isActive ? "text-[#FFD700] font-bold" : "hover:text-[#FFD700]"
                                }`
                            }
                        >
                            Student
                        </NavLink>
                        <NavLink
                            to="/cancel"
                            className={({ isActive }) =>
                                `mx-8 my-1 text-[#E3B23C] transition duration-300 ${isActive ? "text-[#FFD700] font-bold" : "hover:text-[#FFD700]"
                                }`
                            }
                        >
                            Cancel
                        </NavLink>
                    </div>

                    <NavLink
                        to="/services"
                        className="text-[#F5F5F5] text-xl my-3 flex flex-row gap-3"
                    >
                        <FaUserCog className="my-1" />
                        Services
                    </NavLink>
                </div>
            </div>

            {/* Right Panel (70%) */}
            <div className="col-span-10 md:col-span-8 bg-[#F5F5F5] p-4 ">
                <div className="flex flex-row justify-between my-4 items-center ">
                    <NavLink to="/dashboard" className="bg-white text-black w-full px-4 py-2 mr-4 text-2xl">
                        Dashboard
                    </NavLink>
                    <button
                        id="profile"
                        className="mr-5"
                        onClick={() => setShowProfile(!showProfile)}
                    >
                        <CgProfile size={30} />
                    </button>
                    <Tooltip
                        anchorSelect="#profile"
                        place="top"
                        content="profile details"
                        style={{ fontSize: "10px", padding: "4px", zIndex: 50 }}
                    />

                    {showProfile && (
                        <div
                            id="profile-popup"
                            className="absolute right-16 top-12 bg-white shadow-lg rounded-lg w-72 p-4 border z-50 "
                        >
                            <p className="text-gray-700 font-semibold">
                                Name: {admin?.data?.email.split("@")[0]}
                            </p>
                            <p className="text-gray-500 text-sm ">
                                Email: {admin?.data.email}
                            </p>
                            <button
                                onClick={handleLogout}
                                className="mt-3 w-full bg-red-500 text-white py-1 rounded-md text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex flex-row justify-between my-2 mx-4">
                    <p className="font-semibold my-2">
                        Total Number of Leads: <b>{data?.data.length}</b>{" "}
                    </p>

                    <button
                        className="bg-[#679E02] flex flex-row p-2 px-4 gap-1 rounded-lg font-bold text-white transform transition-transform duration-300 hover:scale-105"
                        onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                        {" "}
                        <MdAddCircle className="mt-1 " />
                        Add Lead{" "}
                    </button>
                </div>

                <Modal
                    isOpen={isModalOpen}
                    className="bg-white  relative p-6 rounded-lg shadow-lg w-96 mt-48 mx-auto"
                >
                    <h1>Are you sure ??</h1>
                    <div className="flex flex-row gap-3.5 my-5">
                        <button
                            className="rounded-lg border p-2 bg-amber-50"
                            onClick={() => setIsModalOpen(!isModalOpen)}
                        >
                            No
                        </button>
                        <button className="rounded-lg border p-2 bg-green-200">Yes</button>
                    </div>
                </Modal>

                {/* for number of lead */}

                <div className="grid grid-cols-2 gap-5 md:grid-cols-5 mx-4 pt-4 ">
                    {statuses.map(({ key, textSize }) => (
                        <div
                            key={key}
                            className="bg-white border-2 flex flex-col  items-center justify-around rounded-lg w-auto p-6  "
                        >
                            <p className="text-4xl pb-2">
                                <b>{countOccurance?.[key]}</b>
                            </p>
                            <p className="backdrop-blur-xs text-xl text-center">{key}</p>
                        </div>
                    ))}
                </div>

                {/* remaining part */}
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
