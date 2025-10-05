import React, { useEffect, useState, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Calendar,
} from "lucide-react";
import image1 from "../../assets/images/image.png";
import { Link, useNavigate } from "react-router-dom";
import {
  useRegisterationStep1Mutation,
  useRegisterationStep2Mutation,
} from "../../service/usersApi";

const MultiStepRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirm_password: "",
  });
  
  const [registerationStep1] = useRegisterationStep1Mutation();
  const [registerationStep2] = useRegisterationStep2Mutation();
  
  // Validation errors
  const [errors, setErrors] = useState({});
  
  const [personalData, setPersonalData] = useState({
    dob: "",
    age: "",
    gender: "Male",
    hobbies: "",
    location: { street: "", city: "", state: "", country: "" },
    bio: "",
    profilePic: "",
    file: null,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  
  const dobRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone number is required";
    } else if (formData.phoneNo.length !== 10 || !/^\d+$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "Phone number must be exactly 10 digits";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!formData.confirm_password.trim()) {
      newErrors.confirm_password = "Confirm password is required";
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirm_password") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const showMessageBox = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 2000);
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    
    if (!validateStep1()) {
      return;
    }

    try {
      setLoading(true);
      const res = await registerationStep1(formData).unwrap();
      showMessageBox(res.message || "Step 1 completed successfully!");
      setCurrentStep(2);
      setEmail(res.email || formData.email);
    } catch (error) {
      console.error(error);
      showMessageBox(error.data?.message || "Error during Step 1 registration");
    } finally {
      setLoading(false);
    }
  };

  const handleDobChange = (e) => {
    const selectedDate = e.target.value;
    const newPersonalData = { ...personalData, dob: selectedDate };

    const birthDate = new Date(selectedDate);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }
    newPersonalData.age = calculatedAge;
    setPersonalData(newPersonalData);
  };

  const handleProfileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const newPersonalData = { ...personalData };
      newPersonalData.file = uploadedFile;
      const reader = new FileReader();
      reader.onload = () => {
        newPersonalData.profilePic = reader.result;
        setPersonalData(newPersonalData);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleLocationChange = (field, value) => {
    setPersonalData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  const handleFinalSubmit = async () => {
    try {
      setLoading(true);

      if (personalData.file && personalData.file.size > 2 * 1024 * 1024) {
        showMessageBox("Profile image must be less than 2MB.");
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      if (personalData.file)
        formDataToSend.append("profilePic", personalData.file);
      formDataToSend.append("dob", personalData.dob);
      formDataToSend.append("age", personalData.age);
      formDataToSend.append("gender", personalData.gender);
      formDataToSend.append("bio", personalData.bio || "");
      formDataToSend.append("hobbies", personalData.hobbies || "");
      formDataToSend.append("location", JSON.stringify(personalData.location));
      formDataToSend.append("email", email);

      const res = await registerationStep2(formDataToSend).unwrap();
      showMessageBox(res.message || "Registration Completed Successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      showMessageBox(error.data?.message || "Error completing registration");
    } finally {
      setLoading(false);
    }
  };

  const goBackToStep1 = () => {
    setCurrentStep(1);
  };

  // Heart animation effect
  useEffect(() => {
    const heartContainer = document.getElementById("hearts-container");
    if (!heartContainer) return;

    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "fixed bottom-0 w-5 h-5 bg-pink-400 transform rotate-45 animate-pulse opacity-80 pointer-events-none";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.animation = `floatUp ${Math.random() * 5 + 3}s linear infinite`;
      
      const beforeElement = document.createElement("div");
      beforeElement.className = "absolute -top-2.5 left-0 w-5 h-5 bg-pink-400 rounded-full";
      const afterElement = document.createElement("div");
      afterElement.className = "absolute top-0 -left-2.5 w-5 h-5 bg-pink-400 rounded-full";
      
      heart.appendChild(beforeElement);
      heart.appendChild(afterElement);
      
      heartContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 8000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-roboto p-8 min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-rose-200">
      {/* Heart Container */}
      <div 
        id="hearts-container" 
        className="fixed inset-0 w-full h-full pointer-events-none z-1"
      />

      {/* Message Box */}
      {showMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-rose-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 transition-opacity duration-500">
          {message}
        </div>
      )}

      <div className="flex h-[100vh] rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Image Section - Hidden on mobile */}
        <div className="flex-1 relative overflow-hidden max-w-full hidden lg:block">
          <img
            src={image1}
            alt="Registration illustration"
            className="w-full h-full object-cover"
            style={{
              animation: 'float 6s ease-in-out infinite'
            }}
          />
          {/* Hearts overlay on image */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-4 h-4 bg-white opacity-60 transform rotate-45 rounded-tl-full">
              <div className="absolute -top-2 left-0 w-4 h-4 bg-white opacity-60 rounded-full"></div>
              <div className="absolute top-0 -left-2 w-4 h-4 bg-white opacity-60 rounded-full"></div>
            </div>
            <div className="absolute top-20 right-16 w-3 h-3 bg-white opacity-40 transform rotate-45 rounded-tl-full">
              <div className="absolute -top-1.5 left-0 w-3 h-3 bg-white opacity-40 rounded-full"></div>
              <div className="absolute top-0 -left-1.5 w-3 h-3 bg-white opacity-40 rounded-full"></div>
            </div>
            <div className="absolute bottom-32 left-20 w-5 h-5 bg-white opacity-50 transform rotate-45 rounded-tl-full">
              <div className="absolute -top-2.5 left-0 w-5 h-5 bg-white opacity-50 rounded-full"></div>
              <div className="absolute top-0 -left-2.5 w-5 h-5 bg-white opacity-50 rounded-full"></div>
            </div>
            <div className="absolute bottom-16 right-12 w-4 h-4 bg-white opacity-60 transform rotate-45 rounded-tl-full">
              <div className="absolute -top-2 left-0 w-4 h-4 bg-white opacity-60 rounded-full"></div>
              <div className="absolute top-0 -left-2 w-4 h-4 bg-white opacity-60 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 lg:flex-[1.5] p-5 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl flex flex-col overflow-y-auto scrollbar-hide">
          
          {/* Step Indicator - Horizontal Layout */}
          <div className="flex items-center justify-center mb-1">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                currentStep >= 1 ? 'bg-rose-500 text-white shadow-lg' : 'bg-white bg-opacity-70 text-gray-600'
              }`}>
                {currentStep > 1 ? "✓" : "1"}
              </div>
              <span className="ml-2 text-sm font-semibold text-gray-700">Basic Information</span>
            </div>
            
            <div className={`w-16 h-0.5 mx-4 ${currentStep > 1 ? 'bg-green-500' : 'bg-white bg-opacity-50'}`} />
            
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                currentStep === 2 ? 'bg-rose-500 text-white shadow-lg' : currentStep > 2 ? 'bg-green-500 text-white' : 'bg-white bg-opacity-70 text-gray-600'
              }`}>
                {currentStep === 2 ? "2" : currentStep > 2 ? "✓" : "2"}
              </div>
              <span className="ml-2 text-sm font-semibold text-gray-700">Personal Details</span>
            </div>
          </div>

          {currentStep === 1 ? (
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-center text-rose-500 text-3xl font-bold mb-4">Create Account</h2>

              <form onSubmit={handleStep1Submit} className="space-y-6">
                {/* Name Fields */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="firstname" className="block text-sm font-bold text-rose-500">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-500 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        id="firstname"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-white bg-opacity-80 text-gray-700 placeholder-rose-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:shadow-lg transition-all ${
                          errors.firstName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-pink-200'
                        }`}
                        required
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div className="flex-1">
                    <label htmlFor="lastname" className="block text-sm font-bold text-rose-500">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-500 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        id="lastname"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-white bg-opacity-80 text-gray-700 placeholder-rose-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:shadow-lg transition-all ${
                          errors.lastName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-pink-200'
                        }`}
                        required
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-rose-500">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-500 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-white bg-opacity-80 text-gray-700 placeholder-rose-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:shadow-lg transition-all ${
                        errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-pink-200'
                      }`}
                      required
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-rose-500">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-500 w-5 h-5" />
                    <input
                      type="tel"
                      placeholder="10 Digit Phone Number"
                      name="phoneNo"
                      id="phone"
                      value={formData.phoneNo}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData(prev => ({ ...prev, phoneNo: value }));
                        if (errors.phoneNo) {
                          setErrors(prev => ({ ...prev, phoneNo: "" }));
                        }
                      }}
                      maxLength={10}
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-white bg-opacity-80 text-gray-700 placeholder-rose-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:shadow-lg transition-all ${
                        errors.phoneNo ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-pink-200'
                      }`}
                      required
                    />
                  </div>
                  {errors.phoneNo && <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>}
                </div>

                {/* Password Fields */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="password" className="block text-sm font-bold text-rose-500">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-500 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter 8+ characters"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-12 py-3 border rounded-xl bg-white bg-opacity-80 text-gray-700 placeholder-rose-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:shadow-lg transition-all ${
                          errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-pink-200'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePassword("password")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rose-500 hover:text-rose-600 cursor-pointer"
                      >
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>
                  
                  <div className="flex-1">
                    <label htmlFor="confirm_password" className="block text-sm font-bold text-rose-500">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-500 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        name="confirm_password"
                        id="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-12 py-3 border rounded-xl bg-white bg-opacity-80 text-gray-700 placeholder-rose-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:shadow-lg transition-all ${
                          errors.confirm_password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-pink-200'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePassword("confirm_password")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rose-500 hover:text-rose-600 cursor-pointer"
                      >
                        {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-rose-500 text-white py-4 rounded-xl text-lg font-bold hover:bg-rose-600 transition-colors disabled:bg-pink-300 disabled:cursor-not-allowed shadow-lg cursor-pointer"
                >
                  {loading ? "Please wait..." : "Continue to Step 2"}
                </button>

                <div className="text-center text-rose-500">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium hover:text-rose-600 cursor-pointer hover:underline">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <h2 className="text-center text-rose-500 text-3xl font-bold mb-8">Personal Information</h2>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-6 flex-1">
                {/* Profile Pic Upload */}
                <div className="flex justify-center mb-6">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 bg-rose-100 border-2 border-dashed border-rose-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-rose-200 hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    {personalData.profilePic ? (
                      <img
                        src={personalData.profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Camera className="text-rose-500 w-6 h-6" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleProfileUpload}
                    className="hidden"
                  />
                </div>

                {/* Date of Birth & Age */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-rose-500 mb-2">Date of Birth</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={personalData.dob}
                        onChange={handleDobChange}
                        ref={dobRef}
                        className="w-full pl-4 pr-12 py-3 border border-pink-200 rounded-xl bg-white bg-opacity-80 text-gray-700 focus:outline-none focus:border-rose-500 focus:bg-white focus:shadow-lg transition-all"
                      />
                      <Calendar
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rose-500 w-5 h-5 cursor-pointer"
                        onClick={() => dobRef.current?.showPicker?.()}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-rose-500 mb-2">Age</label>
                    <input
                      type="number"
                      value={personalData.age}
                      readOnly
                      className="w-full px-4 py-3 border border-pink-200 rounded-xl bg-gray-100 text-gray-700 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-bold text-rose-500 mb-3">Gender</label>
                  <div className="flex justify-around gap-4">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={personalData.gender === g}
                          onChange={(e) =>
                            setPersonalData({
                              ...personalData,
                              gender: e.target.value,
                            })
                          }
                          className="mr-2 text-rose-500 focus:ring-rose-400 cursor-pointer"
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-bold text-rose-500 mb-3">Location</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["street", "city", "state", "country"].map((field) => (
                      <input
                        key={field}
                        type="text"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={personalData.location[field]}
                        onChange={(e) => handleLocationChange(field, e.target.value)}
                        className="w-full px-4 py-3 border border-pink-200 rounded-xl bg-white bg-opacity-80 text-gray-700 placeholder-rose-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:shadow-lg transition-all"
                      />
                    ))}
                  </div>
                </div>

                {/* About */}
                <div>
                  <label className="block text-sm font-bold text-rose-500 mb-2">About</label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    value={personalData.bio}
                    onChange={(e) =>
                      setPersonalData({ ...personalData, bio: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl bg-white bg-opacity-80 text-gray-700 placeholder-rose-400 focus:outline-none focus:border-rose-500 focus:bg-white focus:shadow-lg transition-all resize-vertical min-h-[80px]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={goBackToStep1}
                    disabled={loading}
                    className="bg-gray-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-gray-600 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Back to Step 1
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={loading}
                    className="flex-1 bg-rose-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-rose-600 transition-colors disabled:bg-pink-300 disabled:cursor-not-allowed shadow-lg cursor-pointer"
                  >
                    {loading ? "Creating Account..." : "Complete Registration"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(45deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(45deg); opacity: 0; }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0;
          position: absolute;
          right: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default MultiStepRegistration;
                  