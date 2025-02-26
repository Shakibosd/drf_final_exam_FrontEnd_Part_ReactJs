import { Helmet } from "react-helmet-async";

const Hr_Login = () => {
    return (
        <>
            <Helmet><title>Hr Login</title></Helmet>
            <section>
                <div className="container max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between gap-10 pt-28">
                    {/* Left Side Image */}
                    <div className="w-full md:w-1/2">
                        <img className="w-full rounded-2xl shadow-lg" src="./image/login.png" alt="Login Illustration" />
                    </div>

                    {/* Right Side Form */}
                    <div className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-lg">
                        <form id="login-form" className="space-y-4">
                            <div>
                                <label htmlFor="username" className="font-bold block">Username</label>
                                <input type="text" id="username" name="username" placeholder="Please Enter Your Username" required
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" value={'flowersealadmin'}/>
                            </div>

                            <div>
                                <label htmlFor="password" className="font-bold block">Password</label>
                                <div className="relative">
                                    <input id="password" name="password"
                                        placeholder="Please Enter Your Password" required
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10" type="password" value={'flowersealadmin'} />
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-md font-bold">
                                    Hr Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hr_Login;