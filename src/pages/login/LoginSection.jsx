import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaHeart, FaUser, FaLock, FaArrowLeft, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import { useLoginUserMutation } from "../../service/usersApi";


// export const store = configureStore({
//   reducer: {
//     [usersApi.reducerPath]: usersApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(usersApi.middleware),
// });

const LoginSection = () => {

  
  // State
  const [showModal, setShowModal] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    phone: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
  };

  const showMessageBox = (msg, type = "error") => {
    setMessage(msg);
    setMessageType(type);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 3000);
  };

  const showAlert = (title, text, icon, confirmButtonText = "OK") => {
    return new Promise((resolve) => {
      const alertDiv = document.createElement("div");
      alertDiv.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 10000;">
          <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <div style="font-size: 48px; margin-bottom: 20px; color: ${
              icon === "success"
                ? "#4CAF50"
                : icon === "error"
                ? "#f44336"
                : "#2196F3"
            };">
              ${icon === "success" ? "✓" : icon === "error" ? "✕" : "ⓘ"}
            </div>
            <h3 style="margin: 0 0 15px 0; color: #333; font-size: 20px;">${title}</h3>
            <p style="margin: 0 0 25px 0; color: #666; line-height: 1.5;">${text}</p>
            <button onclick="this.closest('div').parentElement.remove()" style="background: #e91e63; color: white; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-size: 16px;">${confirmButtonText}</button>
          </div>
        </div>
      `;
      document.body.appendChild(alertDiv);

      const button = alertDiv.querySelector("button");
      button.onclick = () => {
        alertDiv.remove();
        resolve(true);
      };
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      showMessageBox("Please enter email and password", "error");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showMessageBox("Please enter a valid email address", "error");
      return false;
    }

    if (formData.password.length < 5) {
      showMessageBox("Password must be at least 6 characters", "error");
      return false;
    }

    return true;
  };

  const openModal = () => {
    if (!validateForm()) {
      return;
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setAgreeToTerms(false);
  };

  const handleAgreeChange = () => setAgreeToTerms(!agreeToTerms);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);

const handleProceed = async () => {
  if (!agreeToTerms) return;

  try {
      const response = await loginUser(formData).unwrap();

      if (response?.token) {
        localStorage.setItem("token", response.token);
      }

      closeModal();
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      showMessageBox(error.data?.message || "Login unsuccessful");
    }
};


  const handleSendOTP = async () => {
    if (!forgotPasswordData.phone) {
      showMessageBox("Please enter your phone number", "error");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(forgotPasswordData.phone)) {
      showMessageBox("Please enter a valid 10-digit phone number", "error");
      return;
    }

    try {
      // API call to send OTP
      const response = await fetch('YOUR_API_ENDPOINT/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: forgotPasswordData.phone }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessageBox("OTP sent successfully to your phone", "success");
        setForgotPasswordStep(2);
      } else {
        showMessageBox(data.message || "Failed to send OTP", "error");
      }
    } catch (error) {
      showMessageBox("Failed to send OTP. Please try again.", "error");
    }
  };

  const handleVerifyOTP = async () => {
    if (!forgotPasswordData.otp) {
      showMessageBox("Please enter the OTP", "error");
      return;
    }

    if (forgotPasswordData.otp.length !== 6) {
      showMessageBox("Please enter a valid 6-digit OTP", "error");
      return;
    }

    try {
      // API call to verify OTP
      const response = await fetch('YOUR_API_ENDPOINT/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone: forgotPasswordData.phone,
          otp: forgotPasswordData.otp 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessageBox("OTP verified successfully", "success");
        setForgotPasswordStep(3);
      } else {
        showMessageBox(data.message || "Invalid OTP", "error");
      }
    } catch (error) {
      showMessageBox("OTP verification failed. Please try again.", "error");
    }
  };

  const handleResetPassword = async () => {
    if (!forgotPasswordData.newPassword || !forgotPasswordData.confirmPassword) {
      showMessageBox("Please fill all password fields", "error");
      return;
    }

    if (forgotPasswordData.newPassword.length < 5) {
      showMessageBox("Password must be at least 6 characters", "error");
      return;
    }

    if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
      showMessageBox("Passwords do not match", "error");
      return;
    }

    try {
      // API call to reset password
      const response = await fetch('YOUR_API_ENDPOINT/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone: forgotPasswordData.phone,
          otp: forgotPasswordData.otp,
          newPassword: forgotPasswordData.newPassword 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showAlert("Success!", "Your password has been reset successfully.", "success", "Login Now").then(() => {
          setShowForgotPassword(false);
          setForgotPasswordStep(1);
          setForgotPasswordData({
            phone: "",
            otp: "",
            newPassword: "",
            confirmPassword: ""
          });
        });
      } else {
        showMessageBox(data.message || "Failed to reset password", "error");
      }
    } catch (error) {
      showMessageBox("Password reset failed. Please try again.", "error");
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setForgotPasswordStep(1);
    setForgotPasswordData({
      phone: "",
      otp: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#fff3f3] via-[#ffe6f0] to-[#fff3f3] max-h-[450px] rounded-[20px] overflow-hidden">
      {/* Left Side - Enhanced Dynamic Image Section */}
      <div className="flex-1 bg-gradient-to-br from-[#e91e63] via-[#f786ac] to-[#ff4081] relative overflow-hidden flex items-center justify-center">
        <div className="w-full max-w-[450px] text-center relative z-[3]">
          <div className="relative p-[2rem] bg-[rgba(255,255,255,0.15)] rounded-[30px] backdrop-blur-[20px] border-2 border-[rgba(255,255,255,0.25)] shadow-[0_25px_50px_rgba(0,0,0,0.15)] animate-containerFloat">
            {/* Enhanced Floating Hearts */}
            <div className="absolute inset-0 overflow-hidden z-[1]">
              <FaHeart className="absolute top-[15%] left-[10%] text-[rgba(255,255,255,0.4)] animate-heartFloat transition-all duration-300 hover:text-[rgba(255,255,255,0.8)] hover:scale-[1.2] text-[24px]" />
              <FaHeart className="absolute top-[70%] right-[15%] text-[rgba(255,255,255,0.4)] animate-heartFloat transition-all duration-300 hover:text-[rgba(255,255,255,0.8)] hover:scale-[1.2] text-[18px]" />
              <FaHeart className="absolute bottom-[25%] left-[25%] text-[rgba(255,255,255,0.4)] animate-heartFloat transition-all duration-300 hover:text-[rgba(255,255,255,0.8)] hover:scale-[1.2] text-[28px]" />
              <FaHeart className="absolute top-[35%] right-[10%] text-[rgba(255,255,255,0.4)] animate-heartFloat transition-all duration-300 hover:text-[rgba(255,255,255,0.8)] hover:scale-[1.2] text-[20px]" />
            </div>

            {/* Animated Background Circles */}
            <div className="absolute inset-0 overflow-hidden z-[1]">
              <div className="absolute w-[100px] h-[100px] rounded-full bg-[rgba(255,255,255,0.1)] top-[10%] left-[10%] animate-float" />
              <div className="absolute w-[150px] h-[150px] rounded-full bg-[rgba(255,255,255,0.1)] bottom-[10%] right-[10%] animate-floatDelay1" />
              <div className="absolute w-[80px] h-[80px] rounded-full bg-[rgba(255,255,255,0.1)] top-[50%] left-[5%] animate-floatDelay2" />
            </div>

            {/* Enhanced Login Illustration */}
            <div className="login-illustration relative mb-[2rem] animate-coupleAnimation">
              <div className="flex justify-center items-end gap-[2.5rem]">
                <div className="person flex flex-col items-center animate-personBounce">
                  <div className="head w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[rgba(255,255,255,0.95)] to-[rgba(255,255,255,0.8)] mb-[0.5rem] relative shadow-[0_8px_16px_rgba(0,0,0,0.1)] border-[3px] border-[rgba(255,255,255,0.4)]">
                    <div className="face-details absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                      <div className="eye absolute w-[8px] h-[8px] bg-[#e91e63] rounded-full animate-eyeBlink top-[35%] left-[30%]" />
                      <div className="eye absolute w-[8px] h-[8px] bg-[#e91e63] rounded-full animate-eyeBlink top-[35%] right-[30%]" />
                      <div className="smile absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[20px] h-[10px] border-2 border-t-0 border-[#333] rounded-b-[20px]" />
                    </div>
                  </div>
                  <div className="body w-[40px] h-[80px] bg-gradient-to-br from-[rgba(255,255,255,0.95)] to-[rgba(255,255,255,0.8)] rounded-t-[25px] relative shadow-[0_8px_16px_rgba(0,0,0,0.1)] border-[3px] border-[rgba(255,255,255,0.4)]">
                    <div className="hand absolute w-[12px] h-[12px] bg-[rgba(255,255,255,0.9)] rounded-full border-2 border-[rgba(255,255,255,0.4)] top-[20%] left-[-8px] animate-handWave" />
                    <div className="hand absolute w-[12px] h-[12px] bg-[rgba(255,255,255,0.9)] rounded-full border-2 border-[rgba(255,255,255,0.4)] top-[20%] right-[-8px] animate-handWaveReverse" />
                  </div>
                </div>

                <div className="person flex flex-col items-center animate-personBounceDelay">
                  <div className="head w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[rgba(255,255,255,0.95)] to-[rgba(255,255,255,0.8)] mb-[0.5rem] relative shadow-[0_8px_16px_rgba(0,0,0,0.1)] border-[3px] border-[rgba(255,255,255,0.4)]">
                    <div className="face-details absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                      <div className="eye absolute w-[8px] h-[8px] bg-[#e91e63] rounded-full animate-eyeBlinkDelay top-[35%] left-[30%]" />
                      <div className="eye absolute w-[8px] h-[8px] bg-[#e91e63] rounded-full animate-eyeBlinkDelay top-[35%] right-[30%]" />
                      <div className="smile absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[20px] h-[10px] border-2 border-t-0 border-[#333] rounded-b-[20px]" />
                    </div>
                  </div>
                  <div className="body w-[40px] h-[80px] bg-gradient-to-br from-[rgba(255,255,255,0.95)] to-[rgba(255,255,255,0.8)] rounded-t-[25px] relative shadow-[0_8px_16px_rgba(0,0,0,0.1)] border-[3px] border-[rgba(255,255,255,0.4)]">
                    <div className="hand absolute w-[12px] h-[12px] bg-[rgba(255,255,255,0.9)] rounded-full border-2 border-[rgba(255,255,255,0.4)] top-[20%] left-[-8px] animate-handWaveDelay" />
                    <div className="hand absolute w-[12px] h-[12px] bg-[rgba(255,255,255,0.9)] rounded-full border-2 border-[rgba(255,255,255,0.4)] top-[20%] right-[-8px] animate-handWaveReverseDelay" />
                  </div>
                </div>

                <div className="connecting-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[3px] bg-gradient-to-r from-[rgba(255,255,255,0.3)] via-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.3)] rounded-[10px] flex items-center justify-between p-[0_10px]">
                  <div className="pulse-dot w-[8px] h-[8px] bg-[rgba(255,255,255,0.9)] rounded-full animate-pulseDot shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  <div className="pulse-dot w-[8px] h-[8px] bg-[rgba(255,255,255,0.9)] rounded-full animate-pulseDotDelay1 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  <div className="pulse-dot w-[8px] h-[8px] bg-[rgba(255,255,255,0.9)] rounded-full animate-pulseDotDelay2 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
              </div>

              {/* Enhanced Text with Animations */}
              <div className="welcome-content text-center animate-contentFadeIn mt-8">
                <h2 className="welcome-text text-[2.4rem] font-bold text-white mb-4 text-shadow-[0_2px_10px_rgba(0,0,0,0.3)] animate-textGlow">Find Your Perfect Match</h2>
                <p className="welcome-subtitle text-[1.1rem] text-[rgba(255,255,255,0.95)] leading-[1.6] mb-[1.2rem] text-shadow-[0_1px_5px_rgba(0,0,0,0.2)]">
                  Connect with like-minded people and discover meaningful relationships
                </p>
                <div className="romantic-quote mt-[1.5rem] p-[0.8rem] bg-[rgba(255,255,255,0.1)] rounded-[20px] border border-[rgba(255,255,255,0.2)]">
                  <span className="quote-text italic text-[rgba(255,255,255,0.9)] text-[0.9rem] leading-[1.4] relative">
                    "Love is not about finding someone to complete you, but finding someone to complement you"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login/Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center p-[1rem_2rem] bg-white rounded-[0_20px_20px_0] z-[2] shadow-[-10px_0_30px_rgba(0,0,0,0.1)]">
        <div className="login-form-container w-full max-w-[400px]">
          {!showForgotPassword ? (
            <>
              <div className="login-header text-center mb-[3rem]">
                {showMessage && (
                  <div className={`message-box ${messageType === 'error' ? 'bg-[#ff4757]' : 'bg-[#4CAF50]'} text-white p-[10px_15px] rounded-[10px] mb-[15px] text-center animate-slideDown`}>
                    {message}
                  </div>
                )}
                <h1 className="login-title text-[2.2rem] font-bold text-[maroon] mb-[0.5rem] flex items-center justify-center gap-[0.5rem]">
                  <FaHeart className="title-heart text-[#e91e63] text-[2rem] animate-heartBeat" />
                  Welcome to Shy-Eyes
                </h1>
                <p className="login-subtitle text-[#666] text-[1.1rem]">Sign in to your account</p>
              </div>

              <form className="modern-login-form mb-[2rem]" onSubmit={(e) => e.preventDefault()}>
                {/* Email Field */}
                <div className="form-group modern-input-group mb-[1.5rem]">
                  <div className="input-wrapper relative flex items-center">
                    <FaUser className="input-icon absolute left-[1rem] text-[#e91e63] text-[1.1rem] z-[2]" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="modern-input w-full p-[1rem_1rem_1rem_3rem] border-2 border-[#eee] rounded-[15px] text-base transition-all duration-300 bg-[#f8f9fa] focus:outline-none focus:border-[#e91e63] focus:bg-white focus:shadow-[0_0_0_4px_rgba(233,30,99,0.1)] placeholder:text-[#f1b7b7]"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="form-group modern-input-group mb-[1.5rem]">
                  <div className="input-wrapper password-input-wrapper relative flex items-center">
                    <FaLock className="input-icon absolute left-[1rem] text-[#e91e63] text-[1.1rem] z-[2]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="modern-input w-full p-[1rem_1rem_1rem_3rem] border-2 border-[#eee] rounded-[15px] text-base transition-all duration-300 bg-[#f8f9fa] focus:outline-none focus:border-[#e91e63] focus:bg-white focus:shadow-[0_0_0_4px_rgba(233,30,99,0.1)] placeholder:text-[#f1b7b7]"
                      required
                    />
                    <span
                      className="password-toggle absolute right-[1rem] text-[#e91e63] cursor-pointer text-[1.1rem] z-[2] transition-colors duration-300 hover:text-[#c2185b]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>

                {/* Remember Me + Forget Password */}
                <div className="form-options flex justify-between items-center mb-[2rem] flex-wrap gap-[1rem]">
                  <label className="remember-me flex items-center cursor-pointer text-[#666] text-[0.9rem]">
                    <input 
                      type="checkbox" 
                      name="remember"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                      className="hidden"
                    />
                    <span className={`checkmark w-[18px] h-[18px] border-2 rounded-[4px] mr-[0.5rem] inline-flex items-center justify-center transition-all duration-300 ${rememberMe ? 'bg-[#e91e63] border-[#e91e63]' : 'border-[#ddd] bg-white'}`}>
                      {rememberMe && <span className="text-white text-[12px]">✓</span>}
                    </span>
                    Remember Me
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="forgot-password text-[#e91e63] bg-transparent border-none text-[0.9rem] cursor-pointer transition-colors duration-300 hover:text-[#c2185b] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="button"
                  className="modern-login-btn w-full p-[1rem] bg-gradient-to-br from-[#e91e63] to-[#f06292] text-white border-none rounded-[15px] text-[1.1rem] font-bold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(233,30,99,0.3)] hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(233,30,99,0.4)]"
                  onClick={openModal}
                >
                  Login
                </button>
              </form>

              {/* Register Link */}
              <div className="register-link text-center text-[#666]">
                <p>
                  Don't have an account? <Link to="/register" className="text-[#e91e63] font-bold no-underline transition-colors duration-300 hover:text-[#c2185b] hover:underline">Create Account</Link>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Forgot Password Section */}
              <div className="forgot-password-section">
                <button
                  onClick={handleBackToLogin}
                  className="back-button flex items-center gap-[0.5rem] text-[#e91e63] bg-transparent border-none text-[1rem] cursor-pointer mb-[2rem] transition-colors duration-300 hover:text-[#c2185b]"
                >
                  <FaArrowLeft /> Back to Login
                </button>

                <div className="forgot-header text-center mb-[3rem]">
                  {showMessage && (
                    <div className={`message-box ${messageType === 'error' ? 'bg-[#ff4757]' : 'bg-[#4CAF50]'} text-white p-[10px_15px] rounded-[10px] mb-[15px] text-center animate-slideDown`}>
                      {message}
                    </div>
                  )}
                  <FaLock className="text-[3rem] text-[#e91e63] mb-[1rem] mx-auto" />
                  <h1 className="text-[2rem] font-bold text-[maroon] mb-[0.5rem]">Forgot Password?</h1>
                  <p className="text-[#666] text-[1rem]">
                    {forgotPasswordStep === 1 && "Enter your phone number to receive OTP"}
                    {forgotPasswordStep === 2 && "Enter the OTP sent to your phone"}
                    {forgotPasswordStep === 3 && "Set your new password"}
                  </p>
                </div>

                <form className="forgot-form" onSubmit={(e) => e.preventDefault()}>
                  {forgotPasswordStep === 1 && (
                    <>
                      <div className="form-group mb-[1.5rem]">
                        <div className="input-wrapper relative flex items-center">
                          <FaPhone className="input-icon absolute left-[1rem] text-[#e91e63] text-[1.1rem] z-[2]" />
                          <input
                            type="tel"
                            placeholder="Enter 10-digit phone number"
                            name="phone"
                            value={forgotPasswordData.phone}
                            onChange={handleForgotPasswordChange}
                            maxLength="10"
                            className="modern-input w-full p-[1rem_1rem_1rem_3rem] border-2 border-[#eee] rounded-[15px] text-base transition-all duration-300 bg-[#f8f9fa] focus:outline-none focus:border-[#e91e63] focus:bg-white focus:shadow-[0_0_0_4px_rgba(233,30,99,0.1)] placeholder:text-[#f1b7b7]"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        className="modern-login-btn w-full p-[1rem] bg-gradient-to-br from-[#e91e63] to-[#f06292] text-white border-none rounded-[15px] text-[1.1rem] font-bold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(233,30,99,0.3)] hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(233,30,99,0.4)]"
                      >
                        Send OTP
                      </button>
                    </>
                  )}

                  {forgotPasswordStep === 2 && (
                    <>
                      <div className="form-group mb-[1.5rem]">
                        <div className="input-wrapper relative flex items-center">
                          <FaLock className="input-icon absolute left-[1rem] text-[#e91e63] text-[1.1rem] z-[2]" />
                          <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            name="otp"
                            value={forgotPasswordData.otp}
                            onChange={handleForgotPasswordChange}
                            maxLength="6"
                            className="modern-input w-full p-[1rem_1rem_1rem_3rem] border-2 border-[#eee] rounded-[15px] text-base transition-all duration-300 bg-[#f8f9fa] focus:outline-none focus:border-[#e91e63] focus:bg-white focus:shadow-[0_0_0_4px_rgba(233,30,99,0.1)] placeholder:text-[#f1b7b7]"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleVerifyOTP}
                        className="modern-login-btn w-full p-[1rem] bg-gradient-to-br from-[#e91e63] to-[#f06292] text-white border-none rounded-[15px] text-[1.1rem] font-bold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(233,30,99,0.3)] hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(233,30,99,0.4)] mb-[1rem]"
                      >
                        Verify OTP
                      </button>
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        className="w-full p-[0.8rem] bg-transparent text-[#e91e63] border-2 border-[#e91e63] rounded-[15px] text-[1rem] font-bold cursor-pointer transition-all duration-300 hover:bg-[#e91e63] hover:text-white"
                      >
                        Resend OTP
                      </button>
                    </>
                  )}

                  {forgotPasswordStep === 3 && (
                    <>
                      <div className="form-group mb-[1.5rem]">
                        <div className="input-wrapper relative flex items-center">
                          <FaLock className="input-icon absolute left-[1rem] text-[#e91e63] text-[1.1rem] z-[2]" />
                          <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            name="newPassword"
                            value={forgotPasswordData.newPassword}
                            onChange={handleForgotPasswordChange}
                            className="modern-input w-full p-[1rem_1rem_1rem_3rem] border-2 border-[#eee] rounded-[15px] text-base transition-all duration-300 bg-[#f8f9fa] focus:outline-none focus:border-[#e91e63] focus:bg-white focus:shadow-[0_0_0_4px_rgba(233,30,99,0.1)] placeholder:text-[#f1b7b7]"
                            required
                          />
                          <span
                            className="password-toggle absolute right-[1rem] text-[#e91e63] cursor-pointer text-[1.1rem] z-[2] transition-colors duration-300 hover:text-[#c2185b]"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                      </div>

                      <div className="form-group mb-[2rem]">
                        <div className="input-wrapper relative flex items-center">
                          <FaLock className="input-icon absolute left-[1rem] text-[#e91e63] text-[1.1rem] z-[2]" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            name="confirmPassword"
                            value={forgotPasswordData.confirmPassword}
                            onChange={handleForgotPasswordChange}
                            className="modern-input w-full p-[1rem_1rem_1rem_3rem] border-2 border-[#eee] rounded-[15px] text-base transition-all duration-300 bg-[#f8f9fa] focus:outline-none focus:border-[#e91e63] focus:bg-white focus:shadow-[0_0_0_4px_rgba(233,30,99,0.1)] placeholder:text-[#f1b7b7]"
                            required
                          />
                          <span
                            className="password-toggle absolute right-[1rem] text-[#e91e63] cursor-pointer text-[1.1rem] z-[2] transition-colors duration-300 hover:text-[#c2185b]"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleResetPassword}
                        className="modern-login-btn w-full p-[1rem] bg-gradient-to-br from-[#e91e63] to-[#f06292] text-white border-none rounded-[15px] text-[1.1rem] font-bold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(233,30,99,0.3)] hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(233,30,99,0.4)]"
                      >
                        Reset Password
                      </button>
                    </>
                  )}
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Terms Modal */}
       {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative z-10 bg-white rounded-2xl max-w-md w-full shadow-2xl animate-modalSlideIn">
            <button className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-pink-600 transition-colors duration-300" onClick={closeModal}>×</button>
            
            <div className="p-6 border-b border-gray-200">
              <FaHeart className="text-4xl text-pink-600 mb-3 mx-auto animate-heartBeat" />
              <h2 className="text-pink-600 text-xl font-bold text-center mb-1">Terms & Conditions</h2>
              <h3 className="text-pink-700 text-sm text-center">Shy-Eyes Dating Platform</h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="w-7 h-7 bg-gradient-to-br from-pink-600 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
                  <div>
                    <strong className="text-gray-800 block mb-1 text-sm">Age Requirement</strong>
                    <p className="text-gray-600 text-xs leading-relaxed">Must be 18+ to use our platform</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <span className="w-7 h-7 bg-gradient-to-br from-pink-600 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
                  <div>
                    <strong className="text-gray-800 block mb-1 text-sm">Respectful Behavior</strong>
                    <p className="text-gray-600 text-xs leading-relaxed">No harassment or inappropriate content</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <label className="flex items-center mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={handleAgreeChange}
                  className="hidden"
                />
                <span className={`w-5 h-5 border-2 rounded mr-3 inline-flex items-center justify-center transition-all duration-300 ${agreeToTerms ? 'bg-pink-600 border-pink-600' : 'border-gray-300 bg-white'}`}>
                  {agreeToTerms && <span className="text-white text-sm font-bold">✓</span>}
                </span>
                <span className="text-gray-800 text-sm">I agree to the terms and conditions</span>
              </label>

              <button
                className={`w-full py-3 rounded-2xl text-base font-bold transition-all duration-300 ${agreeToTerms ? "bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-lg hover:-translate-y-1 hover:shadow-xl cursor-pointer" : "bg-gray-300 text-white cursor-not-allowed"}`}
                disabled={!agreeToTerms}
                onClick={handleProceed}
              >
                Proceed to Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes containerFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes heartFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-25px) rotate(-5deg); 
            opacity: 0.8;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes floatDelay1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }

        @keyframes floatDelay2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes coupleAnimation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes personBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }

        @keyframes personBounceDelay {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }

        @keyframes eyeBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }

        @keyframes eyeBlinkDelay {
          0%, 85%, 100% { transform: scaleY(1); }
          90% { transform: scaleY(0.1); }
        }

        @keyframes handWave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }

        @keyframes handWaveReverse {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-15deg); }
        }

        @keyframes handWaveDelay {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }

        @keyframes handWaveReverseDelay {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-20deg); }
        }

        @keyframes pulseDot {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.7;
          }
          50% { 
            transform: scale(1.5); 
            opacity: 1;
          }
        }

        @keyframes pulseDotDelay1 {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.7;
          }
          50% { 
            transform: scale(1.5); 
            opacity: 1;
          }
        }

        @keyframes pulseDotDelay2 {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.7;
          }
          50% { 
            transform: scale(1.5); 
            opacity: 1;
          }
        }

        @keyframes contentFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes textGlow {
          0%, 100% { text-shadow: 0 2px 10px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.2); }
          50% { text-shadow: 0 2px 15px rgba(0,0,0,0.4), 0 0 30px rgba(255,255,255,0.4); }
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-containerFloat {
          animation: containerFloat 3s ease-in-out infinite;
        }

        .animate-heartFloat {
          animation: heartFloat 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .animate-floatDelay1 {
          animation: floatDelay1 6s ease-in-out infinite;
        }

        .animate-floatDelay2 {
          animation: floatDelay2 4s ease-in-out infinite;
        }

        .animate-coupleAnimation {
          animation: coupleAnimation 2s ease-in-out infinite;
        }

        .animate-personBounce {
          animation: personBounce 2s ease-in-out infinite;
        }

        .animate-personBounceDelay {
          animation: personBounceDelay 2s ease-in-out infinite 0.5s;
        }

        .animate-eyeBlink {
          animation: eyeBlink 4s ease-in-out infinite;
        }

        .animate-eyeBlinkDelay {
          animation: eyeBlinkDelay 4s ease-in-out infinite;
        }

        .animate-handWave {
          animation: handWave 2s ease-in-out infinite;
        }

        .animate-handWaveReverse {
          animation: handWaveReverse 2s ease-in-out infinite;
        }

        .animate-handWaveDelay {
          animation: handWaveDelay 2s ease-in-out infinite 0.3s;
        }

        .animate-handWaveReverseDelay {
          animation: handWaveReverseDelay 2s ease-in-out infinite 0.3s;
        }

        .animate-pulseDot {
          animation: pulseDot 1.5s ease-in-out infinite;
        }

        .animate-pulseDotDelay1 {
          animation: pulseDotDelay1 1.5s ease-in-out infinite 0.3s;
        }

        .animate-pulseDotDelay2 {
          animation: pulseDotDelay2 1.5s ease-in-out infinite 0.6s;
        }

        .animate-contentFadeIn {
          animation: contentFadeIn 1s ease-out;
        }

        .animate-textGlow {
          animation: textGlow 2s ease-in-out infinite alternate;
        }

        .animate-heartBeat {
          animation: heartBeat 1.5s ease-in-out infinite;
        }

        .animate-modalSlideIn {
          animation: modalSlideIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .flex-1:first-child {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .login-title {
            font-size: 1.8rem;
          }
          
          .form-options {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          
          .modern-modal-content {
            margin: 1rem;
            max-width: none;
            border-radius: 15px;
          }
        }

        @media (max-width: 480px) {
          .login-title {
            font-size: 1.5rem;
            flex-direction: column;
            gap: 0.3rem;
          }
          
          .proceed-button {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginSection;