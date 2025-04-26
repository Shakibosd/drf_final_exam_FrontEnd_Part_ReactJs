import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../ConstData/Loader";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../../constants/env.constants";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

const fetchVisitorCount = async () => {
  const response = await axios.get(`${baseUrl}/visit_website/`);
  return response.data;
};

const incrementVisitorCount = async () => {
  const response = await axios.post(`${baseUrl}/visit_website/`);
  return response.data;
};

const VisitorCounter = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["visitor-count"],
    queryFn: fetchVisitorCount,
  });

  const mutation = useMutation({
    mutationFn: incrementVisitorCount,
    onError: () => {
      toast.error("Failed to increment visitor count");
    },
  });

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      mutation.mutate();  // প্রথমবার আসলে POST করে কাউন্ট বাড়াবে
      sessionStorage.setItem("hasVisited", "true");  // এরপর থেকে এক ট্যাবে আর কাউন্ট হবে না
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error("Error fetching visitor count");
    return <p className="text-red-500 text-center mt-10 text-lg">Something went wrong!</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Helmet>
        <title>Visitor Counter</title>
      </Helmet>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Total Visitors</h2>
        <p className="text-5xl font-extrabold text-indigo-600 mb-6">{data.count}</p>
        <p className="text-gray-500">Thanks for visiting our website!</p>
      </div>
    </div>
  );
};

export default VisitorCounter;
