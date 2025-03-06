import React, { useEffect, useState } from "react";
import { useGetUsersQuery, useUpdateUserMutation } from "../redux/Api/UserApi";
import Modal from "react-modal";

const ActiveLead = () => {
    const [ismodalOpen, setIsModalOpen] = useState(false)

    const [updateFollowUp, setUpdateFollowUP] = useState({
        status: '',
        followUp: '',
        remarks: ''
    })

    const [id, setId] = useState();

    const { data: users, isError, refetch } = useGetUsersQuery();

    const [updateFollowup] = useUpdateUserMutation();

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdateFollowUP((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const update = await updateFollowup({
                id: id,
                data: updateFollowUp,
            });
            console.log(update);
            if (update?.data?.message) {
                console.log(update?.data?.data?.message);
                refetch();
            } else {
                console.log();
            }

            setIsModalOpen(false);
        } catch (error) {
            console.log("error ", error);
        }
    };

    // useEffect(() => {
    //     if (id && followup) {
    //         handleUpdate()
    //     }
    // }, [id, followup])

    return (
        <>
            <div className="relative overflow-scroll flex flex-col w-full h-full  shadow-md rounded-lg bg-clip-border">
                <div className="overflow-x-auto mt-6">
                    {users?.length > 0 ||
                        users?.data?.some((user) => user?.status === "Active") ? (
                        <table className="table-auto border-separate border-gray-400 w-full p-2 my-6 rounded-lg ">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2">S.N</th>
                                    <th className="border border-gray-300 p-2">Name</th>
                                    <th className="border border-gray-300 p-2">Email</th>
                                    <th className="border border-gray-300 p-2">Phone</th>
                                    <th className="border border-gray-300 p-2">Created At</th>
                                    <th className="border border-gray-300 p-2">Update Status</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white text-black">
                                {users?.data
                                    ?.filter((user) => user.status === "Active")
                                    ?.map((items, index) => {
                                        return (
                                            <tr key={index} className="text-center">
                                                <td className="border border-gray-300 p-2">
                                                    {index + 1}
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    {items.name}
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    {items.email}
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    {items.phone}
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    {new Date(items.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <button
                                                        className="rounded-lg border p-2 text-black bg-sky-200 "
                                                        onClick={() => {
                                                            setId(items._id);
                                                            setIsModalOpen(true);
                                                            setUpdateFollowUP(prev => ({
                                                                ...prev,
                                                                status: 'Follow Up'
                                                            }))
                                                        }}
                                                    >
                                                        Update Follow Up
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                            <Modal
                                isOpen={ismodalOpen}
                                onRequestClose={() => setIsModalOpen(false)}
                                className="bg-white shadow-lg p-6 w-96 mt-48 mx-auto rounded-lg"
                            >
                                <div>
                                    <form action="" onSubmit={handleUpdate}>
                                        <label htmlFor="">Follow Up Date</label>
                                        <input type="date" name="followUp" onChange={handleChange} className="border p-2 my-2 w-full" />

                                        <label htmlFor="">Remarks</label>
                                        <textarea name="remarks" onChange={handleChange} id="" rows='1' cols='12' placeholder='Remarks' className="w-full p-2 border-2 mt-2  border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"></textarea>
                                        <div className="flex flex-row gap-3.5 my-5">
                                            <button
                                                className="rounded-lg border p-2 bg-amber-50"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="rounded-lg border p-2 bg-green-200"

                                            >
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Modal>
                        </table>
                    ) : (
                        <div>No Records found for the Active Lead</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ActiveLead;
