import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Flower_Details = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("flower_id");

    const [flower, setFlower] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchFlowerDetails = async () => {
            try {
                const response = await fetch(`https://flower-seal-backend.vercel.app/api/v1/flower/flower_detail/${id}/`);
                if (!response.ok) {
                    throw new Error("Flower not found!");
                }
                const data = await response.json();
                setFlower(data);
            } catch (error) {
                console.error("Error fetching flower details:", error);
                setFlower(null);
            } finally {
                setLoading(false);
            }
        };
        fetchFlowerDetails();
    }, [id]);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="container mx-auto max-w-screen-xl px-6 py-3 pt-28">
            <Helmet><title>Flower Details</title></Helmet>
            {flower ? (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <figure>
                        <img src={flower.image} alt={flower.title} className="w-full h-72" />
                    </figure>
                    <div className="p-6">
                        <h1 className="text-2xl font-bold">{flower.title}</h1>
                        <p className="text-gray-600 mt-2">{flower.description}</p>
                        <p className="text-lg font-bold text-primary mt-2"><b>৳</b>{flower.price}</p>
                        <p className="text-gray-600 text-lg mt-2">Product In Stock {' -> '} {flower.stock}</p>
                        <p className="text-lg font-semibold mt-2 btn w-40">{flower.category}</p>
                        {/* Buttons */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <Link to={'/auth_home'} className="btn btn-primary w-full">Back To Auth Home</Link>
                            <button className="btn btn-secondary w-full" onClick={() => document.getElementById('orderModal').showModal()}>Order Now</button>
                            <button className="btn btn-accent w-full">Payment</button>
                            <button className="btn btn-warning w-full" onClick={() => document.getElementById('commentSection').classList.toggle('hidden')}>Comment</button>
                        </div>

                        {/* Comment Section */}
                        <div id="commentSection" className="hidden mt-4 p-4 border rounded-lg">
                            <h3 className="text-lg font-bold">Leave a Comment</h3>
                            <textarea className="textarea textarea-bordered w-full mt-2" placeholder="Your comment..."></textarea>
                            <button className="btn btn-success mt-2">Submit Comment</button>
                        </div>

                        {/* Order Modal */}
                        <dialog id="orderModal" className="modal">
                            <div className="modal-box">
                                <h3 className="text-lg font-bold">Place Your Order</h3>
                                <input type="number" className="input input-bordered w-full mt-2" placeholder="Enter Quantity" />
                                <div className="modal-action">
                                    <button className="btn btn-primary">Order</button>
                                    <button className="btn" onClick={() => document.getElementById('orderModal').close()}>Close</button>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            ) : (
                <p className="text-center text-red-500">Flower not found!</p>
            )}

        </div>
    );
};

export default Flower_Details;