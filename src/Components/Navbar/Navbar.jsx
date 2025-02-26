import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-base-100 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
                <a className="text-xl font-bold"><img style={{ width: '50px', height: '50px', borderRadius: '10px' }} src="./image/flower2_zRK7PI8.png" alt="logo-img" /></a>

                {/* Mobile Menu Button */}
                <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex space-x-6">
                    <li>
                        <Link to={'/'} className="hover:text-primary"><b>Home</b></Link>
                    </li>
                    <li className="relative group">
                        <Link to={'/register'} className="hover:text-primary cursor-pointer"><b>Register</b></Link>
                    </li>
                    <li className="relative group">
                        <Link to={'/contact'} className="hover:text-primary cursor-pointer"><b>Contact</b></Link>
                    </li>
                    <li className="relative group">
                        <Link to={'/login'} className="hover:text-primary cursor-pointer"><b>Login</b></Link>
                    </li>
                </ul>

                {/* Mobile Menu */}
                {isOpen && (
                    <ul className="absolute top-16 left-0 w-full text-center bg-base-100 p-4 space-y-3 shadow-md lg:hidden">
                        <li>
                            <Link to={'/'} className="hover:text-primary"><b>Home</b></Link>
                        </li>
                        <li className="relative group">
                            <Link to={'/register'} className="hover:text-primary cursor-pointer"><b>Register</b></Link>
                        </li>
                        <li className="relative group">
                            <Link to={'/contact'} className="hover:text-primary cursor-pointer"><b>Contact</b></Link>
                        </li>
                        <li className="relative group">
                            <Link to={'/login'} className="hover:text-primary cursor-pointer"><b>Login</b></Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;