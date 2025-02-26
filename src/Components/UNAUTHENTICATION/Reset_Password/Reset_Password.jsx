import { Helmet } from "react-helmet-async";
import { useState } from "react";

const Reset_Password = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <Helmet><title>Reset Password</title></Helmet>
            <section>
                <div className="container max-w-screen-xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between pt-28 gap-10">
                    
                    {/* Image Column (মোবাইলে উপরে, ডেস্কটপে পাশে) */}
                    <div className="w-full md:w-1/2 md:order-none">
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                            <img className="w-full" src="./image/password.png" alt="Password Reset Image" />
                        </div>
                    </div>

                    {/* Password Reset Form (মোবাইলে নিচে, ডেস্কটপে পাশে) */}
                    <div className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-6">
                        <h3 className="text-center text-2xl font-bold mb-6 text-gray-800">Reset Password</h3>
                        <form className="space-y-4">

                            {/* New Password */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="New Password"
                                    required
                                />
                                <span
                                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </span>
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Confirm Password"
                                    required
                                />
                                <span
                                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? "🙈" : "👁️"}
                                </span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition duration-300"
                            >
                                Change Password
                            </button>

                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Reset_Password;