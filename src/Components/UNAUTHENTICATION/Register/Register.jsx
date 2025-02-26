import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePassword = (field) => {
        if (field === "password") {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const handleRegister = (event) => {
        event.preventDefault();
        console.log("Register Form Submitted");
    };

    return (
        <>
            <Helmet><title>Register</title></Helmet>
            <section>
                <div className="container mx-auto max-w-screen-xl px-6 py-3 flex flex-col md:flex-row justify-center items-center gap-10 pt-28">
                    
                    {/* Left Side Image (মোবাইলে উপরে, ডেস্কটপে পাশে) */}
                    <div className="w-full md:w-1/2 md:order-none">
                        <img className="w-full rounded-xl shadow-lg" src="./image/reg.png" alt="Register Image" />
                    </div>

                    {/* Right Side Form (মোবাইলে নিচে, ডেস্কটপে পাশে) */}
                    <div className="w-full md:w-1/2 p-6 bg-white rounded-xl shadow-lg">
                        <div className="text-center mb-4">
                            <Link to={'/hr_login'} className="w-full block bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-md font-bold">
                                Hr Login
                            </Link>
                        </div>

                        <form onSubmit={handleRegister} id="register-form" className="space-y-4">
                            <div>
                                <label htmlFor="username" className="font-bold">Username</label>
                                <input type="text" id="username" name="username" placeholder="Enter Your Username" required
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>

                            <div>
                                <label htmlFor="email" className="font-bold">Email</label>
                                <input type="email" id="email" name="email" placeholder="Enter Your Email" required
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>

                            <div>
                                <label htmlFor="first_name" className="font-bold">First Name</label>
                                <input type="text" id="first_name" name="first_name" placeholder="Enter Your First Name" required
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>

                            <div>
                                <label htmlFor="last_name" className="font-bold">Last Name</label>
                                <input type="text" id="last_name" name="last_name" placeholder="Enter Your Last Name" required
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="font-bold">Password</label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter A Password" required
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                    <span className="absolute right-3 top-3 cursor-pointer" onClick={() => togglePassword("password")}>
                                        {showPassword ? "👁️" : "🙈"}
                                    </span>
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label htmlFor="confirm_password" className="font-bold">Confirm Password</label>
                                <div className="relative">
                                    <input type={showConfirmPassword ? "text" : "password"} id="confirm_password" name="confirm_password" placeholder="Enter Confirm Password" required
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                    <span className="absolute right-3 top-3 cursor-pointer" onClick={() => togglePassword("confirm_password")}>
                                        {showConfirmPassword ? "👁️" : "🙈"}
                                    </span>
                                </div>
                            </div>

                            {/* Profile Image Upload */}
                            <div>
                                <label htmlFor="profile_img" className="font-bold">Profile Image</label>
                                <input type="file" id="profile_img" required
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>

                            {/* Register Button */}
                            <div>
                                <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-md font-bold">
                                    Register
                                </button>
                            </div>

                            {/* Already have an account */}
                            <Link to={'/login'}>
                                <br />
                                <b>You Have Already An Account? </b>
                                <a className="text-blue-500 underline">Login</a>
                            </Link>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;