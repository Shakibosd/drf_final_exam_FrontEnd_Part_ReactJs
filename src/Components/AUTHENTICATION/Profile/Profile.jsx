/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../../constants/env.constants";
import Loader from "../../../ConstData/Loader";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    profile_img: "",
  });

  const fetchProfile = () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`${baseUrl}/user/user_detail/${userId}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Profile Data (After Update):", data);
        if (data && typeof data === "object") {
          setProfile({
            ...data,
            profile_img: data.profile_img || "",
          });
        } else {
          toast.error("User not found!");
        }
      })
      .catch(() => toast.error("Failed to fetch profile data"))
      .finally(() => setLoading(false));
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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "first_time_using_cloudinary");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/daasda9rp/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Uploaded Image URL:", data.secure_url);

      if (data.secure_url) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profile_img: data.secure_url,
        }));

        toast.success("Image uploaded successfully!");

        const token = localStorage.getItem("auth_token");
        const updatedProfile = {
          profile: {
            profile_img: data.secure_url,
          },
        };

        const saveResponse = await fetch(
          `${baseUrl}/user/user_detail/${userId}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `token ${token}`,
            },
            body: JSON.stringify(updatedProfile),
          }
        );

        if (saveResponse.ok) {
          toast.success("Profile image updated in database!");
          fetchProfile();
        } else {
          const errorData = await saveResponse.json();
          console.error("Error updating profile:", errorData);
          toast.error("Failed to update profile image in database!");
        }
      } else {
        toast.error("Image upload failed!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      username: profile.username,
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      profile: {
        profile_img: profile.profile_img,
      },
    };

    const token = localStorage.getItem("auth_token");

    try {
      const response = await fetch(`${baseUrl}/user/user_detail/${userId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!");
        fetchProfile();
      } else {
        const errorData = await response.json();
        console.error("Error updating profile:", errorData);
        toast.error(errorData.message || "Failed to update profile!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <section>
      <div className="pt-24">
        <Helmet>
          <title>Profile</title>
        </Helmet>
        {loading ? (
          // Loading Spinner
          <Loader />
        ) : (
          // Profile Form
          <>
            <h1 className="text-3xl font-bold text-center">
              Welcome {profile.username}
            </h1>
            <div className="flex justify-center items-center mt-6">
              <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
                <form
                  encType="multipart/form-data"
                  className="space-y-4"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col items-center">
                    <img
                      key={profile.profile_img}
                      src={`${profile.profile_img}?t=${new Date().getTime()}`}
                      alt="Profile"
                      className="w-60 h-60 object-cover rounded-full mx-auto"
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline mt-2"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      Change Photo
                    </button>
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    <label className="label font-semibold">Username</label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      name="username"
                      value={profile.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label font-semibold">First Name</label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        name="first_name"
                        value={profile.first_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="label font-semibold">Last Name</label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        name="last_name"
                        value={profile.last_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label font-semibold">Email</label>
                    <input
                      type="email"
                      className="input input-bordered w-full"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Profile;