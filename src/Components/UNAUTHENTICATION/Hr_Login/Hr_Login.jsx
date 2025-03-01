import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // Set default values for username and password
    const [formData, setFormData] = useState({ username: "flowersealadmin", password: "flowersealadmin" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const response = await fetch("https://flower-seal-backend.vercel.app/api/v1/user/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("auth_token", data.token);
                toast.success(`Login Successfully!`);
                navigate("/auth_home");
            } else {
                setError(data.detail || "Login failed. Please try again.");
            }
        } catch (error) {
            toast.error(error.message || "Failed To Login. Please Try Again");
        }
    };

    return (
        <>
            <Helmet><title>Hr Login</title></Helmet>
            <section>
                <div className="container max-w-screen-xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-10 pt-28">
                    {/* Left Side Image */}
                    <div className="w-full md:w-1/2">
                        <img className="w-full rounded-2xl shadow-lg" src="./image/login.png" alt="Login Illustration" />
                    </div>

                    {/* Right Side Form */}
                    <div className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-lg">
                        <form onSubmit={handleLogin} id="login-form" className="space-y-4">
                            {error && <p className="text-red-500 text-center">{error}</p>}

                            <div>
                                <label htmlFor="username" className="font-bold block">Username</label>
                                <input 
                                    id="username" 
                                    name="username" 
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full" 
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="font-bold block">Password</label>
                                <div className="relative">
                                    <input 
                                        id="password" 
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full" 
                                    />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-md font-bold">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;