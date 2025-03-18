import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const User = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("auth_token");
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/v1/user/user_all",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `token ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center pt-28">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                <p className="mt-4 text-lg text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>User List</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-4 text-center pt-28">User List</h2>
            <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Profile</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">User ID</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Username</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">First Name</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Last Name</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img src={user.profile_img} alt="Profile" className="w-14 h-14 md:w-20 md:h-20 rounded-full mx-auto" />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.id}</td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.username}</td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.first_name}</td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.last_name}</td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default User;