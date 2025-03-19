import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { baseUrl } from "../../../constants/env.constants";

const Order_History_Admin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const token = localStorage.getItem("auth_token");

    useEffect(() => {
        if (!token) {
            console.error("No auth token found.");
            setLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await fetch(`${baseUrl}/order/all_order/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `token ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching order history:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchStats = async () => {
            try {
                const response = await fetch(`${baseUrl}/order/user_order_stats/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `token ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching order stats:", error);
            }
        };

        fetchOrders();
        fetchStats();
    }, [token]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center pt-28">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                <p className="mt-4 text-lg text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <section>
            <Helmet>
                <title>Order History Admin</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-4 text-center pt-28">All User Order History</h2>

            {/* Statistics Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-xl mx-auto px-4">
                    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-semibold">Total Orders</h3>
                        <p className="text-2xl font-bold">{stats.Total_Orders}</p>
                    </div>
                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-semibold whitespace-nowrap">Complete Payment</h3>
                        <p className="text-2xl font-bold">{stats.Completed_Payments}</p>
                    </div>
                    <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-semibold">Pending Payment</h3>
                        <p className="text-2xl font-bold">{stats.Pending_Payments}</p>
                    </div>
                    <div className="bg-red-500 text-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-semibold whitespace-nowrap">Total Payment Amount</h3>
                        <p className="text-2xl font-bold">{stats["Total Payments Amount"]} ৳</p>
                    </div>
                    <div className="bg-red-800 text-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-semibold">Total Profit</h3>
                        <p className="text-2xl font-bold">{stats["Total Profit"]} ৳</p>
                    </div>
                    <div className="bg-yellow-800 text-white p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-semibold">Total Order Amount</h3>
                        <p className="text-2xl font-bold">{stats["Total Order Amount"]} ৳</p>
                    </div>
                </div>
            )}

            <div className="container max-w-screen-xl mx-auto px-4 py-6">
                {/* Responsive Scrollable Table */}
                <div className="overflow-x-auto bg-white p-3 shadow-md rounded-lg">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">User</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Flower</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Price</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Quantity</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Status</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Order Date</th>
                                <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{order.user}</td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{order.flower}</td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{order.price} ৳</td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{order.quantity}</td>
                                    <td className={`border border-gray-300 px-4 py-2 font-bold whitespace-nowrap ${order.status === "Completed" ? "text-green-500" : "text-red-500"}`}>
                                        {order.status}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                                        {new Date(order.order_date).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{order.transaction_id || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Order_History_Admin;