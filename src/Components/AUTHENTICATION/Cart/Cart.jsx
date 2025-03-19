import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../../constants/env.constants";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState({});
  const token = localStorage.getItem("auth_token");
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    if (!token) {
      toast.error("You need to log in first!");
      setLoading(false);
      return;
    }
    fetch(`${baseUrl}/flower/cart/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCartItems(data);
        } else if (data.data && Array.isArray(data.data)) {
          setCartItems(data.data);
        } else {
          console.error("Unexpected API response:", data);
          toast.error("Failed to load cart!");
        }
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        toast.error("Failed to load cart!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleConfirmDelete = (id) => {
    setDeleteItemId(id);
    document.getElementById("confirmDeleteModal").showModal();
  };

  const handleRemoveFromCart = async () => {
    if (!deleteItemId) return;
    try {
      const response = await fetch(
        `${baseUrl}/flower/cart_remove/${deleteItemId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );

      if (response.ok) {
        setCartItems(cartItems.filter((item) => item.id !== deleteItemId));
        toast.success("Removed from cart!");
      } else {
        toast.error("Failed to remove!");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Something went wrong!");
    }
    document.getElementById("confirmDeleteModal").close();
  };

  const toggleDescription = (id) => {
    setShowFullDescription((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-3 container pt-28">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="bg-white h-auto shadow-xl rounded-xl p-6">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-5">
          Cart Items
        </h2>

        {loading ? (
          <div className="flex flex-col justify-center items-center pt-10">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg text-gray-700">Loading...</p>
          </div>
        ) : (
          <>
            <p className="text-center text-lg font-semibold mb-5 text-gray-600">
              Total Items : {cartItems?.length || 0} {" || "}
              Total Price : <b>৳</b>
              {cartItems
                ?.reduce(
                  (total, item) => total + Number(item.flower_price || 0),
                  0
                )
                .toFixed(2)}
            </p>

            {cartItems.length === 0 ? (
              <p className="text-center text-lg text-gray-600 mt-5">
                No items in the cart.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-300 rounded-lg text-sm sm:text-base">
                  <thead className="bg-gray-200 text-gray-700">
                    <tr>
                      <th className="px-2 py-2 whitespace-nowrap">Sl.</th>
                      <th className="px-2 py-2 whitespace-nowrap">Flower</th>
                      <th className="px-2 py-2 whitespace-nowrap">Title</th>
                      <th className="px-2 py-2 whitespace-nowrap">Price</th>
                      <th className="px-2 py-2 whitespace-nowrap">
                        Description
                      </th>
                      <th className="px-2 py-2 whitespace-nowrap">Stock</th>
                      <th className="px-2 py-2 whitespace-nowrap">Category</th>
                      <th className="px-2 py-2 whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-2 py-3 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap">
                          <img
                            src={item.flower_image}
                            alt={item.title}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover"
                          />
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap">
                          {item.flower}
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap">
                          <strong>৳</strong>
                          {item.flower_price}
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap">
                          {showFullDescription[item.id]
                            ? item.flower_description
                            : `${item.flower_description.slice(0, 20)}...`}
                          <button
                            onClick={() => toggleDescription(item.id)}
                            className="text-blue-400 underline"
                          >
                            {showFullDescription[item.id]
                              ? " See Less"
                              : " See All"}
                          </button>
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap">
                          {item.flower_stock}
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap">
                          {item.flower_category}
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleConfirmDelete(item.id);
                            }}
                          >
                            <Trash className="w-5 h-5 text-red-700" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      <dialog id="confirmDeleteModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">
            Do you really want to remove this item from the cart?
          </p>
          <div className="modal-action">
            <button onClick={handleRemoveFromCart} className="btn btn-error">
              Yes, Remove
            </button>
            <button
              onClick={() =>
                document.getElementById("confirmDeleteModal").close()
              }
              className="btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Cart;
