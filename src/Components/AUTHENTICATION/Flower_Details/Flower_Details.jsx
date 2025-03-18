import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Flower_Details = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("flower_id");
    const [flower, setFlower] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [canComment, setCanComment] = useState(false);
    const [quantity, setQuantity] = useState();
    const [editingComment, setEditingComment] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("UserName");
        if (user) {
            setLoggedInUser(user);
        }
    }, []);

    useEffect(() => {
        // Fetch flower details
        if (!id) return;

        const fetchFlowerDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/flower/flower_detail/${id}`);
                if (!response.ok) throw new Error("Flower not found!");
                const data = await response.json();
                setFlower(data);
            } catch (error) {
                console.error("Error fetching flower details:", error);
                setFlower(null);
            } finally {
                setLoading(false);
            }
        };

        // Check order status
        const checkOrder = async () => {
            const token = localStorage.getItem('auth_token');

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/flower/comment_check_order/?flower_id=${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `token ${token}`
                    },
                });
                const data = await response.json();
                console.log("Order check response:", data);
                setCanComment(data.can_comment);
            } catch (error) {
                console.error("Error checking order status:", error);
            }
        };

        // Fetch comments
        const fetchComments = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const response = await fetch(`http://127.0.0.1:8000/api/v1/flower/comment_show/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `token ${token}`,
                    }
                });
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchFlowerDetails();
        checkOrder();
        fetchComments();
    }, [id]);

    //comment post submit
    const handleCommentSubmit = async () => {
        if (!canComment) {
            toast.error("❌ You must order this flower to comment!");
            return;
        }

        const token = localStorage.getItem('auth_token');
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/flower/comment_all", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({ flower: id, body: newComment }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                toast.success("✅ Comment added successfully!");
                setNewComment("");
                setComments(prevComments => [...prevComments, responseData]);
            } else {
                const errorData = await response.json();
                console.error("Error response:", errorData);
                toast.error("❌ Failed to add comment!");
            }
        } catch (error) {
            toast.error("🚨 Network error. Please try again.");
            console.error("Error submitting comment:", error);
        }
    };

    //flower order
    const handleOrder = async () => {
        const token = localStorage.getItem('auth_token');
        if (!flower) {
            toast.error("❌ Flower data not found!");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/order/create_order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({ flower: flower.id, quantity: parseInt(quantity) }),
            });

            if (response.ok) {
                toast.success("✅ Order placed successfully! Please Check Your Email.");
                navigate('/order_history');
                document.getElementById("orderModal").close();
                window.dispatchEvent(new Event("orderUpdated"));
            } else {
                const data = await response.json();
                toast.error(`❌ Failed: ${data.message || "Try again!"}`);
            }
        } catch (error) {
            toast.error("🚨 Network error. Please try again.");
            console.error("Error placing order:", error);
        }
    };


    //payment
    const handlePayment = async () => {
        const token = localStorage.getItem('auth_token');

        if (!flower) {
            toast.error("❌ Flower data not found!");
            return;
        }

        try {
            const checkOrderResponse = await fetch(`http://127.0.0.1:8000/api/v1/flower/comment_check_order/?flower_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${token}`,
                },
            });

            const orderData = await checkOrderResponse.json();

            if (!orderData.can_comment) {
                toast.error("❌ You must order this flower before making a payment!");
                return;
            }

            // Proceed to payment
            const paymentResponse = await fetch(`http://127.0.0.1:8000/api/v1/payments/payment_detail/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${token}`,
                },
            });

            if (paymentResponse.ok) {
                const paymentData = await paymentResponse.json();
                window.location.href = paymentData.redirect_url;
            } else {
                const errorData = await paymentResponse.json();
                toast.error(`❌ Payment failed: ${errorData.message || "Try again!"}`);
            }
        } catch (error) {
            toast.error("🚨 Network error. Please try again.");
            console.error("Error processing payment:", error);
        }
    };


    // Edit comment
    const handleEditComment = async (commentId) => {
        const token = localStorage.getItem('auth_token');
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/flower/comment_edit/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${token}`,
                },
                body: JSON.stringify({ body: editCommentText }),
            });

            if (response.ok) {
                toast.success("✅ Comment updated successfully!");
                setComments(prevComments =>
                    prevComments.map(comment =>
                        comment.id === commentId ? { ...comment, body: editCommentText } : comment
                    )
                );
                document.getElementById("editModal").close();
            } else {
                const errorData = await response.json();
                toast.error(`❌ Failed to update comment: ${errorData.message || "Try again!"}`);
            }
        } catch (error) {
            toast.error("🚨 Network error. Please try again.");
            console.error("Error updating comment:", error);
        }
    };

    // Delete comment
    const handleDeleteComment = async (commentId) => {
        const token = localStorage.getItem("auth_token");

        if (!token) {
            toast.error("🚨 Authentication failed! Please log in.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/flower/comment_delete/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${token}`,
                },
            });

            if (response.ok) {
                toast.success("✅ Comment deleted successfully!");
                setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
            } else {
                const errorData = await response.json();
                toast.error(`❌ Failed to delete comment: ${errorData.message || "Try again!"}`);
            }
        } catch (error) {
            toast.error("🚨 Network error. Please try again.");
            console.error("Error deleting comment:", error);
        }
    };

    if (loading) return (
        <div className="flex flex-col justify-center items-center pt-28">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg text-gray-700">Loading...</p>
        </div>
    );

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
                        <p className="text-lg font-bold text-primary mt-2">৳{flower.price}</p>
                        <p className="text-gray-600 text-lg mt-2">Stock: {flower.stock}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <Link to={'/auth_home'} className="btn btn-primary w-full">Back</Link>
                            <button className="btn btn-secondary w-full" onClick={() => document.getElementById('orderModal').showModal()}>Order Now</button>
                            <button className="btn btn-accent w-full" onClick={handlePayment}>Payment</button>
                            <button className="btn btn-warning w-full" onClick={() => document.getElementById('commentSection').classList.toggle('hidden')}>Comment</button>
                        </div>

                        {/* Comment Section */}
                        <div id="commentSection" className="hidden mt-4 p-4 border rounded-lg">
                            <h3 className="text-lg font-bold">Leave a Comment</h3>
                            <textarea className="textarea textarea-bordered w-full mt-2" placeholder="Your comment..." onChange={(e) => setNewComment(e.target.value)} value={newComment}></textarea>
                            <button className="btn btn-success mt-2" onClick={handleCommentSubmit}>
                                Submit Comment
                            </button>
                        </div>
                    </div>
                </div>
            ) : (<p className="text-center text-red-500">Flower not found!</p>)}

            {/* Display Comments */}
            <h3 className="text-2xl font-bold text-center mt-4">User Review</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {comments.map((comment, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-100 shadow-md">
                        <div className="flex items-center gap-3">
                            <img className="rounded-full object-cover w-12 h-12" alt={comment.user} src={comment.profile_img} />
                            <p className="text-lg font-semibold">{comment.user}</p>
                        </div>
                        <p className="mt-2 text-gray-700">{comment.body}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {new Date(comment.created_on).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}
                        </p>

                        {comment.user === loggedInUser && (
                            <div className="flex gap-3 mt-3">
                                <button className="btn btn-sm btn-accent" onClick={() => {
                                    setEditingComment(comment.id);
                                    setEditCommentText(comment.body);
                                    document.getElementById("editModal").showModal();
                                }}>Edit</button>

                                <button className="btn btn-sm btn-error" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Edit Comment Modal */}
            <dialog id="editModal" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Edit Comment</h3>
                    <textarea className="textarea textarea-bordered w-full mt-2" value={editCommentText} onChange={(e) => setEditCommentText(e.target.value)}></textarea>
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={() => handleEditComment(editingComment)}>Save</button>
                        <button className="btn" onClick={() => document.getElementById("editModal").close()}>Close</button>
                    </div>
                </div>
            </dialog>

            {/* Only one Toaster component */}
            <Toaster position="top-center" reverseOrder={false} />

            {/* Order Modal */}
            <dialog id="orderModal" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Place Your Order</h3>
                    <input type="number" className="input input-bordered w-full mt-2" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1"
                    />
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={handleOrder}>Order</button>
                        <button className="btn" onClick={() => document.getElementById("orderModal").close()}>Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Flower_Details;