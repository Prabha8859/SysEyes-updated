import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Camera, User, Phone, Calendar, MapPin } from "lucide-react";

const DefaultImage =
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    age: "",
    gender: "",
    location: "",
    dob: "",
    bio: "",
  });

  const [profileImage, setProfileImage] = useState(DefaultImage);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const mockUserData = {
    Name: { firstName: "John", lastName: "Doe" },
    phoneNo: "+1234567890",
    age: "28",
    gender: "Male",
    location: "New York, USA",
    dob: "1995-06-15",
    bio: "Hi, there I'm using ShyEyes!",
    profilePic: null,
  };

  useEffect(() => {
    const data = mockUserData;
    if (data) {
      setFormData({
        firstName: data?.Name?.firstName || "",
        lastName: data?.Name?.lastName || "",
        phoneNo: data?.phoneNo || "",
        age: data?.age || "",
        gender: data?.gender || "",
        location: data?.location || "",
        dob: data?.dob || "",
        bio: data?.bio || "Hi, there I'm using ShyEyes",
      });

      if (data?.profilePic) {
        setProfileImage(
          `https://shyeyes-b.onrender.com/uploads/${data.profilePic}`
        );
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (fileInputRef.current?.files?.[0]) {
        formDataToSend.append("profilePic", fileInputRef.current.files[0]);
      }

      console.log("Profile updated successfully");
      alert("✅ Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const data = mockUserData;
    if (data) {
      setFormData({
        firstName: data?.Name?.firstName || "",
        lastName: data?.Name?.lastName || "",
        phoneNo: data?.phoneNo || "",
        age: data?.age || "",
        gender: data?.gender || "",
        location: data?.location || "",
        dob: data?.dob || "",
        bio: data?.bio || "Hi, there I'm using ShyEyes",
      });

      if (data?.profilePic) {
        setProfileImage(
          `https://shyeyes-b.onrender.com/uploads/${data.profilePic}`
        );
      } else {
        setProfileImage(DefaultImage);
      }
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-pink-400 p-2">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-full hover:bg-white/20 transition-all active:scale-95"
              >
                <ArrowLeft size={24} className="text-white" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
                <p className="text-pink-100 text-sm mt-1">
                  Update your personal information
                </p>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-2">
              {/* Left: Profile Image */}
              <div className="relative group px-10 pb-2">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-pink-100 shadow-lg transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DefaultImage;
                  }}
                />
                {isEditing && (
                  <button
                    type="button"
                    className="absolute bottom-0 right-10  bg-pink-500 text-white p-2 rounded-full shadow-lg hover:bg-pink-600 transition-all hover:scale-110 active:scale-95"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera size={18} />
                  </button>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={!isEditing}
                />
              </div>

              {/* Right: Name & Bio */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-gray-500">{formData.bio}</p>
              </div>
            </div>

            {/* Rest Same (View/Edit Mode) */}
            {!isEditing ? (
              <div className="max-w-3xl mx-auto ">
                {/* ... same cards for phone, gender, dob, etc ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="bg-gradient-to-br from-pink-50 to-white p-5 rounded-xl border border-pink-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-pink-500 rounded-lg">
                        <Phone size={18} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        Phone
                      </span>
                    </div>
                    <p className="text-gray-900 font-semibold ml-12">
                      {formData.phoneNo || "Not provided"}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-white p-5 rounded-xl border border-pink-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-pink-500 rounded-lg">
                        <User size={18} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        Gender
                      </span>
                    </div>
                    <p className="text-gray-900 font-semibold ml-12">
                      {formData.gender || "Not provided"}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-white p-5 rounded-xl border border-pink-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-pink-500 rounded-lg">
                        <Calendar size={18} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        Age
                      </span>
                    </div>
                    <p className="text-gray-900 font-semibold ml-12">
                      {formData.age || "Not provided"} years
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-white p-5 rounded-xl border border-pink-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-pink-500 rounded-lg">
                        <Calendar size={18} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        Date of Birth
                      </span>
                    </div>
                    <p className="text-gray-900 font-semibold ml-12">
                      {formData.dob || "Not provided"}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-white p-5 rounded-xl border border-pink-100 md:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-pink-500 rounded-lg">
                        <MapPin size={18} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        Location
                      </span>
                    </div>
                    <p className="text-gray-900 font-semibold ml-12">
                      {formData.location || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="my-2 text-center">
                  <button
                    type="button"
                    className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter location"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself"
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-pink-400 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;