import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("Login Form Submitted");
    };

    return (
        <>
            <Helmet><title>Login</title></Helmet>
            <section>
                <div className="container max-w-screen-xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-10 pt-28">
                    {/* Left Side Image */}
                    <div className="w-full md:w-1/2">
                        <img className="w-full rounded-2xl shadow-lg" src="./image/login.png" alt="Login Illustration" />
                    </div>

                    {/* Right Side Form */}
                    <div className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-lg">
                        <form onSubmit={handleLogin} id="login-form" className="space-y-4">
                            <div>
                                <label htmlFor="username" className="font-bold block">Username</label>
                                <input type="text" id="username" name="username" placeholder="Please Enter Your Username" required
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            </div>

                            <div>
                                <label htmlFor="password" className="font-bold block">Password</label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} id="password" name="password"
                                        placeholder="Please Enter Your Password" required
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10" />
                                    <span className="absolute right-3 top-3 cursor-pointer text-gray-600" onClick={togglePassword}>
                                        {showPassword ? "👁️" : "🙈"}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-md font-bold">
                                    Login
                                </button>
                            </div>

                            <div className="text-center mt-4">
                                <p className="flex flex-col md:flex-row justify-center items-center text-gray-700">
                                    <Link to={'/password_reset'} className="mb-2 md:mb-0 text-blue-500 underline">
                                        <b>Forgotten Password?</b>
                                    </Link>
                                    <span className="hidden md:inline-block">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                                    <Link to={'/register'} className="text-blue-500 underline">
                                        <b>Sign Up For Smart City</b>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;