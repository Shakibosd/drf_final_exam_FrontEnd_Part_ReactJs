import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('auth_token'));
    const navigate = useNavigate();
    const logoutModalRef = useRef(null);

    useEffect(() => {
        const checkLoginStatus = () => {
            setIsLoggedIn(!!localStorage.getItem('auth_token'));
        };

        window.addEventListener("storage", checkLoginStatus);
        return () => {
            window.removeEventListener("storage", checkLoginStatus);
        };
    }, []);

    const token = localStorage.getItem('auth_token');
    const userName = localStorage.getItem("UserName");

    const handleLogout = async () => {
        try {
            const response = await fetch("https://flower-seal-backend.vercel.app/api/v1/user/logout/", {
                method: "GET",
                headers: {
                    Authorization: `token ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("userId");
                localStorage.removeItem("UserName");
                setIsLoggedIn(false);
                toast.success("Logged out successfully!");
                navigate('/');
            } else {
                toast.error("Logout failed!");
            }
        } catch (error) {
            toast.error(error.message || "Logout Error");
        }
    };

    return (
        <nav className="bg-base-100 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
                <Link to={'/'}>
                    <img style={{ width: '50px', height: '50px', borderRadius: '10px' }} src="image/flower2_zRK7PI8.png" alt="logo-img" />
                </Link>

                <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu */}
                <ul className={`lg:flex lg:space-x-6 ${isOpen ? "absolute top-full left-1/2 transform -translate-x-1/2 w-full bg-white shadow-lg flex flex-col items-center text-center space-y-4 py-4 px-6" : "hidden lg:flex"}`}>
                    {isLoggedIn ? (
                        <>
                            <li><Link to={'/auth_home'} className="hover:text-primary block"><b>Auth Home</b></Link></li>
                            <li><Link to={`/profile/${userName}`} className="hover:text-primary block"><b>Profile</b></Link></li>
                            <li>
                                <button
                                    onClick={() => logoutModalRef.current.showModal()}
                                    className="hover:text-primary cursor-pointer block">
                                    <b>Logout</b>
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to={'/'} className="hover:text-primary block"><b>Home</b></Link></li>
                            <li><Link to={'/register'} className="hover:text-primary block"><b>Register</b></Link></li>
                            <li><Link to={'/contact'} className="hover:text-primary block"><b>Contact</b></Link></li>
                            <li><Link to={'/login'} className="hover:text-primary block"><b>Login</b></Link></li>
                        </>
                    )}
                </ul>
            </div>

            {/* DaisyUI Logout Confirmation Modal */}
            <dialog ref={logoutModalRef} className="modal">
                <div className="modal-box">
                    <h2 className="font-bold text-lg">Confirm Logout</h2>
                    <p className="py-4">Are you sure you want to log out?</p>
                    <div className="modal-action">
                        <form method="dialog" className="flex gap-4">
                            <button onClick={handleLogout} className="btn btn-error">Logout</button>
                            <button className="btn" onClick={() => logoutModalRef.current.close()}>Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </nav>
    );
};

export default Navbar;