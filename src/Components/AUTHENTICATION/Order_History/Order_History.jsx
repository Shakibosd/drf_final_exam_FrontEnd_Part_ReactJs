import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import { baseUrl } from "../../../constants/env.constants";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const token = localStorage.getItem("auth_token");

    const fetchOrders = async () => {
        setLoading(true);
        const token = localStorage.getItem("auth_token");
        try {
            const response = await fetch(`${baseUrl}/order/my_order/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setOrders(data);

                if (data.length === 0) {
                    toast.error("❌ No orders found!", { duration: 3000 });
                }
            } else {
                toast.error("🚨 Failed to load orders.");
            }
        } catch (error) {
            toast.error("❌ Network error. Try again.");
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        window.addEventListener("orderUpdated", fetchOrders);

        return () => {
            window.removeEventListener("orderUpdated", fetchOrders);
        };
    }, []);

    useEffect(() => {
        if (!token) {
            console.error("No auth token found.");
            setLoading(false);
            return;
        }

        const fetchStats = async () => {
            try {
                const response = await fetch(
                    `${baseUrl}/order/one_user_order_stats/`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `token ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching order stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [token]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center pt-28">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                <p className="mt-4 text-lg text-gray-700">Loading...</p>
            </div>
        );
    }

    if (!stats) {
        return <p className="text-center text-gray-600 pt-10">No statistics available.</p>;
    }

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-3 container pt-28">
            <Helmet>
                <title>Order History</title>
            </Helmet>
            <Toaster position="top-center" reverseOrder={false} />

            <div className="bg-white shadow-xl rounded-xl p-6">
                {loading ? (
                    <div className="flex flex-col justify-center items-center pt-10">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                        <p className="mt-4 text-lg text-gray-700">Loading...</p>
                    </div>
                ) : (
                    <div>
                        {/* Responsive Cards Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center w-full">
                                <h3 className="text-lg font-semibold">Total Orders</h3>
                                <p className="text-2xl font-bold">{stats.total_orders}</p>
                            </div>
                            <div className="bg-green-500 text-white p-6 rounded-lg shadow-md text-center w-full">
                                <h3 className="text-lg font-semibold whitespace-nowrap">Complete Payment</h3>
                                <p className="text-2xl font-bold">{stats.completed_payments}</p>
                            </div>
                            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md text-center w-full">
                                <h3 className="text-lg font-semibold">Pending Payment</h3>
                                <p className="text-2xl font-bold">{stats.pending_payments}</p>
                            </div>
                            <div className="bg-red-500 text-white p-6 rounded-lg shadow-md text-center w-full">
                                <h3 className="text-lg font-semibold whitespace-nowrap">Total Payment Amount</h3>
                                <p className="text-2xl font-bold">{stats["total_payment_amount"]} ৳</p>
                            </div>
                            <div className="bg-red-900 text-white p-6 rounded-lg shadow-md text-center w-full">
                                <h3 className="text-lg font-semibold whitespace-nowrap">Total Order Flower Price</h3>
                                <p className="text-2xl font-bold">{stats["total_order_amount"]} ৳</p>
                            </div>
                        </div>

                        {/* Order History Table */}
                        <h2 className="text-center text-2xl mt-5 font-bold text-gray-800 mb-3 whitespace-nowrap">
                            Your Order History
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="table w-full border border-gray-300 rounded-lg">
                                <thead className="bg-gray-200 text-gray-700">
                                    <tr>
                                        <th className="p-3 text-lg">Flower</th>
                                        <th className="p-3 text-lg">Price</th>
                                        <th className="p-3 text-lg">Quantity</th>
                                        <th className="p-3 text-lg">Status</th>
                                        <th className="p-3 text-lg">Transaction ID</th>
                                        <th className="p-3 text-lg">Order Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length > 0 ? (
                                        orders.map((order) => (
                                            <tr key={order.id} className="border-b border-gray-200">
                                                <td className="p-3 whitespace-nowrap">{order.flower}</td>
                                                <td className="p-3 whitespace-nowrap">{order.price} ৳</td>
                                                <td className="p-3 whitespace-nowrap">{order.quantity}</td>
                                                <td className={`p-3 whitespace-nowrap font-semibold ${order.status === "Completed" ? "text-green-600" : "text-red-600"}`}>
                                                    {order.status}
                                                </td>
                                                <td className="p-3 whitespace-nowrap text-blue-600 font-medium">
                                                    {order.transaction_id || "N/A"}
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    {order.order_date}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center p-3 text-red-500">
                                                No orders found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};
export default OrderHistory;