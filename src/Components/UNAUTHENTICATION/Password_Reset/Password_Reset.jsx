import { Helmet } from "react-helmet-async";

const Password_Reset = () => {
    return (
        <>
            <Helmet><title>Password Reset</title></Helmet>
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
                        <h3 className="text-center text-2xl font-bold mb-4">Password Reset</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold">Your Email</label>
                                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Please Enter Your Email" required />
                            </div>
                            <button type="submit" className="w-full bg-gray-300 text-black py-2 rounded-lg font-bold hover:bg-gray-400 transition">Password Reset</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Password_Reset;