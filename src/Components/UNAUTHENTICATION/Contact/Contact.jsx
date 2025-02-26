import { Helmet } from "react-helmet-async";

const Contact = () => {
    return (
        <>
            <Helmet><title>Contact</title></Helmet>
            <section>
                <div className="container max-w-screen-xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between pt-28 gap-10">
                    
                    {/* Image Column (মোবাইলে উপরে, ডেস্কটপে পাশে) */}
                    <div className="w-full md:w-1/2 md:order-none">
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                            <img className="w-full" src="./image/contact.png" alt="Contact Image" />
                        </div>
                    </div>

                    {/* Contact Form (মোবাইলে নিচে, ডেস্কটপে পাশে) */}
                    <div className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-6">
                        <h3 className="text-center text-2xl font-bold mb-4">Contact Me</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold">Your Name</label>
                                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Please Enter Your Name" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Email</label>
                                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Please Enter Your Email" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold">Message</label>
                                <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" rows="4" placeholder="Please Enter Message Here" required></textarea>
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="w-1/2 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">Submit</button>
                                <button type="reset" className="w-1/2 bg-gray-300 text-black py-2 rounded-lg font-bold hover:bg-gray-400 transition">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;