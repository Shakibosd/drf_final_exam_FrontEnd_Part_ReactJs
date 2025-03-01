import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Profile = () => {
    const userId = localStorage.getItem("userId");

    const [profile, setProfile] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        profile_img: "",
    });

    const [, setSelectedFile] = useState(null);

    // প্রোফাইল ডেটা ফেচ করা
    const fetchProfile = () => {
        if (!userId) return;

        fetch(`https://flower-seal-backend.vercel.app/api/v1/user/user_detail/${userId}/`)
            .then((response) => response.json())
            .then((data) => {
                if (data && typeof data === "object") {
                    setProfile(data);
                } else {
                    toast.error("User not found!");
                }
            })
            .catch(() => toast.error("Failed to fetch profile data"));
    };

    useEffect(() => {
        fetchProfile();
    }, [userId]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedFile(file);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "first_time_using_cloudinary");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/daasda9rp/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.secure_url) {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    profile_img: data.secure_url,
                }));
                toast.success("Image uploaded successfully!");
            } else {
                toast.error("Image upload failed!");
            }
        } catch (error) {
            toast.error("Error uploading image!", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", profile.username);
        formData.append("first_name", profile.first_name);
        formData.append("last_name", profile.last_name);
        formData.append("email", profile.email);

        if (profile.profile_img) {
            formData.append("profile_img", profile.profile_img);
        }

        try {
            const response = await fetch(`https://flower-seal-backend.vercel.app/api/v1/user/user_detail/${userId}/`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                toast.success("Profile updated successfully!");
                fetchProfile();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to update profile!");
            }
        } catch {
            toast.error("Something went wrong!");
        }
    };

    return (
        <section className="pt-24">
            <h1 className="text-3xl font-bold text-center">Welcome {profile.username}</h1>
            <div className="flex justify-center items-center mt-6">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center">
                            <img
                                key={profile.profile_img}
                                src={profile.profile_img}
                                alt="Profile"
                                className="w-40 h-40 rounded-full mx-auto"
                            />
                            <button
                                type="button"
                                className="btn btn-sm btn-outline mt-2"
                                onClick={() => document.getElementById("fileInput").click()}
                            >
                                Change Photo
                            </button>
                            <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </div>
                        <div>
                            <label className="label font-semibold">Username</label>
                            <input type="text" className="input input-bordered w-full" name="username" value={profile.username} onChange={handleChange} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label font-semibold">First Name</label>
                                <input type="text" className="input input-bordered w-full" name="first_name" value={profile.first_name} onChange={handleChange} required />
                            </div>
                            <div>
                                <label className="label font-semibold">Last Name</label>
                                <input type="text" className="input input-bordered w-full" name="last_name" value={profile.last_name} onChange={handleChange} required />
                            </div>
                        </div>
                        <div>
                            <label className="label font-semibold">Email</label>
                            <input type="email" className="input input-bordered w-full" name="email" value={profile.email} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Update Profile</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Profile;