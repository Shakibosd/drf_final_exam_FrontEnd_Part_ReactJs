import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { baseUrl } from "../../../constants/env.constants";

const Admin_Flower_Show = () => {
    const [posts, setPosts] = useState([]);
    const [editPost, setEditPost] = useState(null);
    const [deletePostId, setDeletePostId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${baseUrl}/flower/flower_all/`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (post) => {
        setEditPost(post);
    };

    const handleDeleteConfirmation = (postId) => {
        setDeletePostId(postId);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (deletePostId) {
            try {
                const response = await fetch(`${baseUrl}/flower/flower_detail/${deletePostId}/`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    fetchPosts();
                    toast.success("Flower deleted successfully!");
                } else {
                    toast.error("Failed to delete the post");
                }
            } catch (error) {
                console.error("Error deleting post:", error);
            } finally {
                setShowDeleteModal(false);
                setDeletePostId(null);
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/flower/flower_detail/${editPost.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editPost),
            });
            if (response.ok) {
                fetchPosts();
                toast.success("Flower updated successfully!");
                setEditPost(null);
            } else {
                toast.error("Failed to update the post");
            }
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center pt-28">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                <p className="mt-4 text-lg text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <div className="container max-w-screen-xl mx-auto px-6 py-6 pt-28">
            <Helmet>
                <title>Admin Flower Show And Edit</title>
            </Helmet>

            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">
                            Are you sure you want to delete this flower?
                        </h3>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="btn btn-outline"
                            >
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="btn btn-error">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Form */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Edit Flower Post</h2>
                {editPost && (
                    <form
                        onSubmit={handleUpdate}
                        className="bg-gray-50 p-6 rounded-lg shadow-md"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-semibold">
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    value={editPost.title}
                                    onChange={(e) =>
                                        setEditPost({ ...editPost, title: e.target.value })
                                    }
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold">
                                    Category:
                                </label>
                                <input
                                    type="text"
                                    value={editPost.category}
                                    onChange={(e) =>
                                        setEditPost({ ...editPost, category: e.target.value })
                                    }
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700 font-semibold">
                                Description:
                            </label>
                            <textarea
                                value={editPost.description}
                                onChange={(e) =>
                                    setEditPost({ ...editPost, description: e.target.value })
                                }
                                className="border p-2 w-full rounded-md"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-gray-700 font-semibold">
                                    Price:
                                </label>
                                <input
                                    type="number"
                                    value={editPost.price}
                                    onChange={(e) =>
                                        setEditPost({ ...editPost, price: e.target.value })
                                    }
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold">
                                    Stock:
                                </label>
                                <input
                                    type="number"
                                    value={editPost.stock}
                                    onChange={(e) =>
                                        setEditPost({ ...editPost, stock: e.target.value })
                                    }
                                    className="border p-2 w-full rounded-md"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700 font-semibold">Image:</label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setEditPost({ ...editPost, image: e.target.files[0] })
                                }
                                className="border p-2 w-full rounded-md"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 mt-4 w-full rounded-md font-semibold hover:bg-blue-600 transition"
                        >
                            Update Post
                        </button>
                    </form>
                )}
            </div>

            {/* Flower Posts Table */}
            <div className="container max-w-screen-xl mx-auto">
                <h1 className="text-center text-2xl font-bold mb-4">Flower Posts</h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Stock</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="border-t hover:bg-gray-100 transition">
                                    <td className="px-4 py-3 text-center">{post.id}</td>
                                    <td className="px-4 py-3 text-center">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-12 h-12 md:w-16 md:h-16 rounded-md mx-auto"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-center whitespace-nowrap">{post.title}</td>
                                    <td className="px-4 py-3 text-center truncate max-w-[150px] md:max-w-none">
                                        {post.description}
                                    </td>
                                    <td className="px-4 py-3 text-center whitespace-nowrap">{post.price} ৳</td>
                                    <td className="px-4 py-3 text-center">{post.category}</td>
                                    <td className="px-4 py-3 text-center">{post.stock}</td>
                                    <td className="px-4 py-3 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="bg-green-500 text-white px-3 py-1 rounded-md text-xs md:text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteConfirmation(post.id)}
                                            className="btn btn-error text-xs md:text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin_Flower_Show;