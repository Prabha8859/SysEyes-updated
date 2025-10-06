import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa6";
import menuData from "./menuData";
import Logo from "../../assets/images/logo/shylogo.png";
import DefaultImg from '../../assets/images/logo/default-img.jpg';
import { Logout, Notifications, Close, Search } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import NotificationSidebar from "./Notification/NotificationSidebar";
import HangingDownloadButton from '../../pages/APKButton/HeartDownloadButton';
import {
  FaStar,
  FaUsers,
  FaClock,
  FaBan,
  FaFileAlt,
  FaListAlt,
  FaUser
} from "react-icons/fa";

// API
import { useGetUserProfileQuery } from "../../service/usersApi";

const IMG_BASE_URL = "https://shyeyes-b.onrender.com/uploads/";

// Search Component
const SearchBox = ({ isOpen, onSearch, onToggle }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery("");
      onToggle();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`search-form ${isOpen ? 'search-form-open' : ''}`}>
      <div className="search-input-wrapper">
        <Search className="search-icon-inside" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search users, matches, profiles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search"
            onClick={() => setSearchQuery("")}
          >
            <Close style={{ fontSize: 18 }} />
          </button>
        )}
      </div>
    </form>
  );
};

// Profile Sidebar Component
const ProfileSidebar = ({ userData, onClose, onLogout, isOpen }) => {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".profile-trigger")
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubscribe = () => {
    navigate("/pricing-plan");
    onClose();
  };

  const menuItems = [
    { 
      section: "Action",
      items: [
        { 
          icon: <FaUser className="sidebar-icon" />, 
          label: "My Profile", 
          path: "/profile",
        }
      ]
    },
    {
      section: "Friend List",
      items: [
        { icon: <FaStar className="sidebar-icon" />, label: "Favorites", path: "/favorites" },
        { icon: <FaUsers className="sidebar-icon" />, label: "Invitations", path: "/invitations" },
        { icon: <FaClock className="sidebar-icon" />, label: "Pending Requests", path: "/pending-requests" },
        { icon: <FaBan className="sidebar-icon" />, label: "Block List", path: "/block-list" },
      ]
    },
    {
      section: "Settings",
      items: [
        { icon: <FaFileAlt className="sidebar-icon" />, label: "Terms & Conditions", path: "/terms" },
        { icon: <FaListAlt className="sidebar-icon" />, label: "My Plans", path: "/my-plan" },
      ]
    },
    {
      section: "Account",
      items: [
        { icon: <Logout className="sidebar-icon" />, label: "Logout", action: onLogout }
      ]
    }
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      
      <div className={`profile-sidebar ${isOpen ? 'active' : ''}`} ref={sidebarRef}>
        <div className="sidebar-header">
          <div className="user-info">
            <div className="user-avatar">
              <img
                src={userData?.profilePic ? `${IMG_BASE_URL}${userData.profilePic}` : DefaultImg}
                alt="Profile"
                className="avatar-img"
                onError={(e) => (e.currentTarget.src = DefaultImg)}
              />
              {userData?.isOnline && <span className="status-dot"></span>}
            </div>
            <div className="user-details">
              <div className="user-name">{userData?.Name?.firstName || "Guest"}</div>
              <div className="user-phone">{userData?.phoneNo || ""}</div>
            </div>
          </div>
          <button className="close-sidebar-btn" onClick={onClose}>
            <Close />
          </button>
        </div>

        <div className="subscription-section">
          <div className="subscription-content">
            <div className="subscription-text">
              <div className="subscribe-title">Subscribe to enjoy premium plans</div>
              <div className="phone-number">{userData?.phoneNo}</div>
            </div>
            <button className="subscribe-sidebar-btn" onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>
        </div>

        <div className="sidebar-content">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="sidebar-section">
              {section.section && (
                <div className="section-title">
                  {section.section}
                </div>
              )}
              
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="sidebar-item">
                  {item.path ? (
                    <Link 
                      to={item.path} 
                      className="sidebar-link"
                      state={{ userData }}
                      onClick={onClose}
                    >
                      <div className="item-icon">
                        {item.icon}
                      </div>
                      <div className="item-label">{item.label}</div>
                    </Link>
                  ) : (
                    <button 
                      className="sidebar-link sidebar-btn"
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                    >
                      <div className="item-icon">
                        {item.icon}
                      </div>
                      <div className="item-label">{item.label}</div>
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// User Controls Component
const UserControls = ({ userData, onLogout, onNotifications, onProfileSidebar, scrolled }) => {
  return (
    <div className="flex items-center gap-5">
      <IconButton 
        className={`transition-all duration-300 ${scrolled ? '!text-pink-600' : '!text-pink-600'}`} 
        onClick={onNotifications}
      >
        <Badge badgeContent={2} color="error">
          <Notifications />
        </Badge>
      </IconButton>

      <div className="relative">
        <button 
          className="flex items-center gap-2 cursor-pointer profile-trigger"
          onClick={onProfileSidebar}
        >
          <div className="relative w-12 h-12">
            <img
              src={userData?.profilePic ? `${IMG_BASE_URL}${userData.profilePic}` : DefaultImg}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-pink-500"
              onError={(e) => (e.currentTarget.src = DefaultImg)}
            />
            {userData?.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

// Search Controls Component
const SearchControls = ({ onSearchToggle, searchOpen, scrolled }) => {
  return (
    <div className="search-controls-wrapper">
      <SearchBox 
        isOpen={searchOpen} 
        onSearch={(query) => console.log("Searching for:", query)} 
        onToggle={onSearchToggle} 
      />
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLogin = !!token;
  const { data: profileData, error } = useGetUserProfileQuery();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const userData = profileData?.data?.user || null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const menuArea = document.querySelector(".menu-area");
      if (menuArea && !menuArea.contains(e.target)) setOpenSubmenu(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("requestedUsers");
    navigate("/login");
  };

  const handleNotificationClick = () => {
    setNotificationOpen(true);
    closeMenu();
  };
  const handleCloseNotification = () => setNotificationOpen(false);
  const handleProfileSidebar = () => {
    setProfileSidebarOpen(true);
    closeMenu();
  };
  const handleCloseProfileSidebar = () => setProfileSidebarOpen(false);
  const handleSearchToggle = () => setSearchOpen(prev => !prev);
  const toggleSubmenu = (index) => setOpenSubmenu(prev => (prev === index ? null : index));
  const closeMenu = () => { setMenuOpen(false); setOpenSubmenu(null); };

  const loggedInMenuItems = [
    { label: "Home", path: "/" },
    { label: "Matches", path: "/profile2" },
  ];

  return (
    <>
      <style jsx>{`
        body {
          padding-top: 0 !important;
        }

        /* Enhanced Search Styles */
        .search-controls-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 300px;
          width: 100%;
        }

        .search-form {
          display: flex;
          align-items: center;
          width: 100%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-input-wrapper {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          background: white;
          border: 2px solid #ff096f21;
          border-radius: 30px;
          padding: 0 16px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .search-input-wrapper:focus-within {
          border-color: #f781b2;
          box-shadow: 0 4px 16px rgba(247, 129, 178, 0.25);
        }

        .search-icon-inside {
          color: #999;
          font-size: 20px !important;
          margin-right: 10px;
          flex-shrink: 0;
          transition: color 0.3s ease;
        }

        .search-input-wrapper:focus-within .search-icon-inside {
          color: #f781b2;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 7px 8px;
          font-size: 14px;
          background: transparent;
          color: #333;
          min-width: 0;
        }

        .search-input::placeholder {
          color: #999;
          font-size: 14px;
        }

        .clear-search {
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          margin-left: 8px;
          flex-shrink: 0;
        }

        .clear-search:hover {
          background: #f8f9fa;
          color: #f781b2;
        }

        /* Upgrade Button with Animated Border */
        .upgrade-btn {
          position: relative;
          background: none;
          border: none;
          width: 140px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #df2f79;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 300ms ease;
          text-decoration: none;
        }

        .upgrade-btn:hover {
          color: #f781b2;
          transform: scale(1.05);
          filter: drop-shadow(0 4px 12px rgba(247, 129, 178, 0.4));
        }

        .upgrade-btn-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .upgrade-btn-line--outer {
          stroke-dasharray: 336.05 336.05;
          stroke-dashoffset: 0;
          animation: outer-dashoffset 6s linear infinite;
        }

        .upgrade-btn-line--inner {
          stroke-dasharray: 336.05 336.05;
          stroke-dashoffset: 0;
          animation: inner-dashoffset 5s linear infinite;
        }

        @keyframes outer-dashoffset {
          0% {
            stroke-dashoffset: 0;
            stroke-dasharray: 336.05 336.05;
          }
          50% {
            stroke-dasharray: 224.033 448.067;
          }
          100% {
            stroke-dashoffset: 672.1;
            stroke-dasharray: 336.05 336.05;
          }
        }

        @keyframes inner-dashoffset {
          0% {
            stroke-dashoffset: 0;
            stroke-dasharray: 336.05 336.05;
          }
          50% {
            stroke-dasharray: 224.033 448.067;
          }
          100% {
            stroke-dashoffset: -672.1;
            stroke-dasharray: 336.05 336.05;
          }
        }

        .upgrade-btn:hover .upgrade-btn-line {
          animation-play-state: paused;
        }

        .upgrade-btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          height: 100%;
          line-height: 1;
          position: relative;
          z-index: 1;
        }

        /* Hanging Download Button Styles */
        .hanging-download-wrapper {
          position: fixed;
          top: 60px;
          right: 20px;
          z-index: 997;
          animation: wrapperSwing 4s ease-in-out infinite;
          transform-origin: top center;
        }

        @keyframes wrapperSwing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
        }

        .hanging-rope {
          width: 4px;
          height: 50px;
          background: linear-gradient(180deg, rgba(223, 47, 121, 0.8) 0%, rgba(255, 107, 188, 0.9) 100%);
          margin: 0 auto 2px;
          border-radius: 2px;
          box-shadow: 0 2px 6px rgba(223, 47, 121, 0.3);
          position: relative;
        }

        .hanging-rope::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: #df2f79;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .hanging-download-button {
          position: relative;
          background: linear-gradient(135deg, #ff6bbc 0%, #f8358d 100%);
          border: none;
          border-radius: 50px;
          padding: 14px 28px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 8px 25px rgba(255, 107, 188, 0.4),
            0 0 0 3px rgba(255, 255, 255, 0.1),
            inset 0 2px 8px rgba(255, 255, 255, 0.2);
          overflow: hidden;
          animation: buttonPulse 2.5s ease-in-out infinite;
        }

        @keyframes buttonPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        .hanging-download-button:hover {
          background: linear-gradient(135deg, #ff52b0 0%, #ff1a7a 100%);
          transform: scale(1.08) !important;
          box-shadow: 
            0 12px 35px rgba(255, 107, 188, 0.6),
            0 0 0 5px rgba(255, 255, 255, 0.15),
            inset 0 2px 12px rgba(255, 255, 255, 0.3);
        }

        .hanging-download-button:active {
          transform: scale(0.96) !important;
        }

        .hanging-download-button.loading {
          pointer-events: none;
          animation: buttonPulse 1.5s ease-in-out infinite;
        }

        .hanging-download-button.success {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%) !important;
          animation: successPulse 0.5s ease 3;
        }

        @keyframes successPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .button-content {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 2;
        }

        .heart-icon {
          color: white;
          font-size: 22px !important;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
          animation: heartBeat 2s ease-in-out infinite;
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.15); }
          20% { transform: scale(1); }
        }

        .heart-icon.spinning {
          animation: spin 1.2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .hanging-download-button:hover .heart-icon {
          animation: heartBeatFast 1s ease-in-out infinite;
        }

        @keyframes heartBeatFast {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.25); }
        }

        .button-text {
          color: white;
          font-weight: 700;
          font-size: 15px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          white-space: nowrap;
        }

        .sparkles-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          opacity: 0;
          animation: sparkleAnimation 3s ease-in-out infinite;
        }

        .sparkle:nth-child(1) {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }

        .sparkle:nth-child(2) {
          top: 25%;
          right: 20%;
          animation-delay: 0.7s;
        }

        .sparkle:nth-child(3) {
          bottom: 25%;
          left: 25%;
          animation-delay: 1.4s;
        }

        .sparkle:nth-child(4) {
          bottom: 20%;
          right: 15%;
          animation-delay: 2.1s;
        }

        @keyframes sparkleAnimation {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
        }

        .pulse-ring {
          position: absolute;
          inset: -8px;
          border: 2px solid rgba(255, 107, 188, 0.5);
          border-radius: 50px;
          animation: pulseRingAnimation 2.5s ease-out infinite;
          pointer-events: none;
        }

        @keyframes pulseRingAnimation {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.15);
            opacity: 0;
          }
        }

        .floating-hearts-container {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 80px;
          pointer-events: none;
        }

        .floating-heart {
          position: absolute;
          font-size: 16px;
          opacity: 0;
          animation: floatHeartAnimation 5s ease-in infinite;
        }

        .floating-heart:nth-child(1) {
          left: 10%;
          animation-delay: 0s;
          color: #ff9ec5;
        }

        .floating-heart:nth-child(2) {
          left: 45%;
          animation-delay: 1.7s;
          color: #ff7bb3;
        }

        .floating-heart:nth-child(3) {
          right: 10%;
          animation-delay: 3.4s;
          color: #ff5ca1;
        }

        @keyframes floatHeartAnimation {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translateY(-60px) rotate(360deg) scale(1.2);
            opacity: 0;
          }
        }

        .menu-item-link {
          position: relative;
        }

        .menu-item-link::before {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #df2f79;
          transition: width 0.3s ease;
        }

        .menu-item-link:hover::before {
          width: 80%;
        }

        .header-transparent .menu-item-link {
          color: #df2f79 !important;
        }

        .header-white .menu-item-link {
          color: #1a004e !important;
        }

        .login-btn {
          position: relative;
          z-index: 1;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .header-transparent .login-btn {
          color: #df2f79 !important;
          border-color: #df2f79 !important;
        }

        .header-transparent .login-btn:hover {
          color: white !important;
          background-color: #df2f79 !important;
        }

        .header-white .login-btn {
          color: #df2f79 !important;
          border-color: #df2f79 !important;
        }

        .header-white .login-btn:hover {
          color: white !important;
          background-color: #df2f79 !important;
        }

        .register-btn {
          position: relative;
          z-index: 1;
        }

        .register-btn::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 250%;
          height: 100%;
          background-color: #df2f79;
          transform: translate(-50%, -50%) rotate(0deg);
          transition: all 0.4s ease;
          z-index: -1;
          opacity: 1;
        }

        .register-btn:hover::before {
          width: 0;
          opacity: 0;
          transform: translate(-50%, -50%) rotate(-45deg);
        }

        .register-btn:hover {
          background: transparent !important;
          color: #df314d !important;
          border-color: #df314d !important;
        }

        .arrow {
          display: inline-block;
          margin-left: 4px;
          transition: transform 0.3s ease;
          font-size: 10px;
        }

        .arrow::after {
          content: "▲";
        }

        .arrow.open {
          transform: rotate(180deg);
        }

        .header-transparent .arrow {
          color: #df2f79 !important;
        }

        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1098;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .profile-sidebar {
          position: fixed;
          top: 50px;
          right: -380px;
          width: 340px;
          height: calc(100vh - 70px);
          background: #fff;
          box-shadow: -5px 0 20px rgba(0, 0, 0, 0.15);
          z-index: 1099;
          transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-top-left-radius: 12px;
        }

        .profile-sidebar.active {
          right: 0;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: linear-gradient(135deg, #ef4075, #f4318c);
          color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .user-avatar {
          position: relative;
          flex-shrink: 0;
        }

        .avatar-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(255, 255, 255, 0.9);
        }

        .status-dot {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          background: #4ade80;
          border: 2px solid white;
          border-radius: 50%;
        }

        .user-details {
          flex: 1;
          min-width: 0;
        }

        .user-name {
          font-weight: 600;
          font-size: 15px;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-phone {
          font-size: 12px;
          opacity: 0.9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .close-sidebar-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .close-sidebar-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }

        .subscription-section {
          padding: 12px 16px;
          background: linear-gradient(135deg, #fff9c4, #ffeb3b);
          border-bottom: 1px solid rgba(223, 47, 121, 0.1);
        }

        .subscription-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .subscription-text {
          flex: 1;
          min-width: 0;
        }

        .subscribe-title {
          font-weight: 600;
          font-size: 13px;
          color: #333;
          line-height: 1.3;
        }

        .subscribe-sidebar-btn {
          background: #f4528d;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(244, 82, 141, 0.3);
          flex-shrink: 0;
        }

        .subscribe-sidebar-btn:hover {
          background: #e84379;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(244, 82, 141, 0.4);
        }

        .sidebar-content {
          flex: 1;
          padding: 8px 0;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #df2f79 #f5f5f5;
        }

        .sidebar-content::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar-content::-webkit-scrollbar-track {
          background: #f5f5f5;
        }

        .sidebar-content::-webkit-scrollbar-thumb {
          background: #df2f79;
          border-radius: 3px;
        }

        .sidebar-section {
          margin-bottom: 4px;
        }

        .section-title {
          padding: 12px 16px 6px;
          font-size: 11px;
          font-weight: 700;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .sidebar-item {
          margin: 0;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          text-decoration: none;
          color: #333;
          border: none;
          background: none;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
        }

        .sidebar-link:hover {
          background: #f8f9fa;
          border-left-color: #df2f79;
          padding-left: 20px;
        }

        .item-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f53c89;
          flex-shrink: 0;
          font-size: 18px;
        }

        .item-label {
          font-weight: 500;
          font-size: 14px;
          color: #333;
        }

        .sidebar-link:hover .item-label {
          color: #df2f79;
        }

        /* Responsive Styles */
        @media (max-width: 1200px) {
          .search-controls-wrapper {
            max-width: 350px;
          }

          .hanging-download-wrapper {
            right: 15px;
          }
        }

        @media (max-width: 991.98px) {
          .menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 280px;
            height: 100vh;
            background: #fff;
            flex-direction: column;
            align-items: flex-start;
            padding: 2rem;
            gap: 1rem;
            transition: right 0.3s ease;
            box-shadow: -2px 0 10px rgba(0,0,0,0.1);
          }

          .menu.active {
            right: 0;
          }

          .profile-sidebar {
            width: 100%;
            max-width: 340px;
            top: 60px;
            height: calc(100vh - 60px);
          }

          .search-controls-wrapper {
            max-width: 300px;
          }

          .hanging-download-wrapper {
            top: 55px;
            right: 12px;
          }

          .hanging-rope {
            height: 40px;
            width: 3px;
          }

          .hanging-download-button {
            padding: 11px 22px;
          }

          .heart-icon {
            font-size: 19px !important;
          }

          .button-text {
            font-size: 13px;
          }
        }

        @media (max-width: 767.98px) {
          .search-controls-wrapper {
            max-width: 280px;
          }

          .search-input {
            font-size: 13px;
            padding: 10px 8px;
          }

          .search-input::placeholder {
            font-size: 13px;
          }

          .hanging-download-wrapper {
            top: 50px;
            right: 10px;
          }

          .hanging-rope {
            height: 35px;
          }

          .hanging-download-button {
            padding: 9px 18px;
          }

          .heart-icon {
            font-size: 17px !important;
          }

          .button-text {
            font-size: 12px;
          }

          .floating-heart {
            font-size: 13px;
          }
        }

        @media (max-width: 575.98px) {
          .sidebar-header {
            padding: 14px;
          }

          .avatar-img {
            width: 45px;
            height: 45px;
          }

          .user-name {
            font-size: 14px;
          }

          .user-phone {
            font-size: 11px;
          }

          .subscription-section {
            padding: 10px 14px;
          }

          .subscribe-title {
            font-size: 12px;
          }

          .subscribe-sidebar-btn {
            padding: 6px 14px;
            font-size: 12px;
          }

          .sidebar-link {
            padding: 10px 14px;
          }

          .section-title {
            padding: 10px 14px 5px;
          }

          .item-label {
            font-size: 13px;
          }

          .search-controls-wrapper {
            max-width: 240px;
          }

          .search-input {
            font-size: 12px;
            padding: 8px 6px;
          }

          .search-input::placeholder {
            font-size: 12px;
          }

          .search-input-wrapper {
            padding: 0 12px;
          }

          .search-icon-inside {
            font-size: 18px !important;
            margin-right: 8px;
          }

          .hanging-download-wrapper {
            top: 48px;
            right: 8px;
          }

          .hanging-rope {
            height: 30px;
            width: 2px;
          }

          .hanging-download-button {
            padding: 8px 16px;
          }

          .heart-icon {
            font-size: 15px !important;
          }

          .button-text {
            font-size: 11px;
          }

          .upgrade-btn {
            width: 120px;
            height: 36px;
            font-size: 12px;
          }
        }

        .hamburger-line {
          display: block;
          height: 2px;
          width: 100%;
          background: #1a004e;
          transition: all 0.3s ease;
          position: absolute;
        }

        .header-transparent .hamburger-line {
          background: #df2f79;
        }

        .hamburger-line:first-child {
          top: 0;
        }

        .hamburger-line:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
        }

        .hamburger-line:last-child {
          bottom: 0;
        }

        .hamburger.active .hamburger-line:first-child {
          transform: rotate(45deg) translateY(7px);
          background: #df2f79;
        }

        .hamburger.active .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active .hamburger-line:last-child {
          transform: rotate(-45deg) translateY(-7px);
          background: #df2f79;
        }

        @media (min-width: 1024px) {
          .desktop-hover:hover .submenu {
            display: block !important;
            opacity: 1 !important;
            transform: translateY(0) !important;
            margin-top: -7px !important;
          }

          .submenu {
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            z-index: 1000;
          }
        }
      `}</style>

      <header className={`fixed top-0 left-0 w-full z-[999] transition-all duration-400 ${
        scrolled ? 'bg-white shadow-lg header-white' : 'bg-transparent header-transparent'
      }`}>
        <div className="transition-all duration-300 py-1">
          <div className="container mx-auto px-12 sm:px-6 lg:px-18">
            <div className="w-full flex items-center justify-between h-14 sm:h-15">
              <div className="flex-none logo">
                <Link to="/">
                  <img 
                    src={Logo} 
                    alt="logo" 
                    className="max-w-full h-auto w-20 xs:w-24 sm:w-28 md:w-32 lg:w-36 mt-1" 
                  /> 
                </Link>
              </div>

              <div className="flex-1 flex justify-end items-center">
                <ul className={`list-none m-0 p-0 ${
                  menuOpen 
                    ? 'mobile-menu flex flex-col absolute top-full right-0 w-80 sm:w-96 bg-white bg-opacity-98 backdrop-blur-md max-h-[500px] py-2 rounded-b-2xl shadow-2xl z-[1000] overflow-y-auto' 
                    : 'hidden lg:flex lg:flex-row items-center gap-3'
                }`}>
                  
                  {!isLogin ? (
                    menuData.map((item, index) => (
                      <li
                        key={index}
                        className={`relative w-full lg:w-auto ${
                          openSubmenu === index ? "submenu-open" : ""
                        } desktop-hover`}
                      >
                        {item.path ? (
                          <Link 
                            to={item.path} 
                            onClick={closeMenu}
                            className={`menu-item-link block lg:inline-block font-semibold no-underline relative transition-all duration-300 cursor-pointer py-1 px-4 lg:py-1 lg:px-3 text-sm lg:text-sm rounded hover:bg-pink-50 lg:hover:bg-transparent ${
                              scrolled ? 'text-[#1a004e]' : 'text-pink'
                            }`}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <>
                            <span
                              role="button"
                              className={`menu-item-link block lg:inline-block font-semibold no-underline relative transition-all duration-300 cursor-pointer py-1 px-4 lg:py-1 lg:px-3 text-sm lg:text-sm rounded hover:bg-pink-50 lg:hover:bg-transparent ${
                                scrolled ? 'text-[#1a004e]' : 'text-pink'
                              } hover:text-pink-600`}
                              onClick={() => toggleSubmenu(index)}
                            >
                              {item.label}
                              <span className={`arrow ${openSubmenu === index ? 'open' : ''} ${
                                scrolled ? 'text-[#1a004e]' : 'text-pink'
                              }`}></span>
                            </span>

                            <ul className={`-mt-10 submenu list-none bg-white p-2 min-w-52 shadow-xl rounded-lg m-0 overflow-hidden transition-all duration-300 ease-in-out border border-gray-100 ${
                              menuOpen 
                                ? (openSubmenu === index ? 'block static bg-pink-50 bg-opacity-80 max-h-96 py-3 mt-2' : 'hidden max-h-0')
                                : 'hidden lg:absolute lg:bg-white lg:shadow-xl lg:mt-0'
                            }`}>
                              {item.subMenu?.map((sub, subIndex) => (
                                <li key={subIndex} className="py-0 lg:py-0">
                                  <Link 
                                    to={sub.path} 
                                    onClick={closeMenu}
                                    className={`block py-3 px-4 no-underline text-sm transition-all duration-300 hover:bg-pink-600 hover:text-white ${
                                      scrolled ? 'text-gray-700' : 'text-[#1a004e]'
                                    }`}
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </li>
                    ))
                  ) : (
                    <>
                      {loggedInMenuItems.map((item, index) => (
                        <li key={index} className="relative w-full lg:w-auto">
                          <Link 
                            to={item.path} 
                            onClick={closeMenu}
                            className={`menu-item-link block lg:inline-block font-semibold no-underline relative transition-all duration-300 cursor-pointer py-3 px-4 lg:py-2 lg:px-3 text-sm lg:text-sm rounded hover:bg-pink-50 lg:hover:bg-transparent ${
                              scrolled ? 'text-[#1a004e]' : 'text-pink'
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}

                      <li className="w-full lg:w-auto">
                        <Link to="/pricing-plan" className="upgrade-btn w-full lg:w-auto" onClick={closeMenu}>
                          <svg className="upgrade-btn-svg" width="140" height="40" viewBox="0 0 140 40">
                            <rect
                              className="upgrade-btn-line upgrade-btn-line--outer"
                              strokeWidth="4"
                              stroke="#df2f79"
                              strokeLinecap="round"
                              fill="none"
                              x="2"
                              y="2"
                              width="136"
                              height="36"
                              rx="18"
                            />
                            <rect
                              className="upgrade-btn-line upgrade-btn-line--inner"
                              strokeWidth="2"
                              stroke="#df2f79"
                              strokeLinecap="round"
                              fill="none"
                              x="2"
                              y="2"
                              width="136"
                              height="36"
                              rx="18"
                            />
                          </svg>
                          <div className="upgrade-btn-content">
                            <FaCrown className="text-xl " />
                            Upgrade
                          </div>
                        </Link>
                      </li>
                    </>
                  )}

                  {!isLogin && (
                    <>
                      <li className="w-full lg:w-auto">
                        <Link 
                          to="/login" 
                          className={`login-btn block lg:inline-block border-2 rounded-md py-2 px-9 ml-0 lg:ml-3 mt-2 lg:mt-0 mx-5 lg:mx-0 text-center font-semibold transition-all duration-300 ${
                            scrolled 
                              ? 'border-[#df2f79] text-[#df2f79] bg-transparent hover:bg-[#df2f79] hover:text-white' 
                              : 'border-[#df2f79] text-[#df2f79] bg-transparent hover:bg-[#df2f79] hover:text-white'
                          }`}
                          onClick={closeMenu}
                        >
                          Login
                        </Link>
                      </li>
                      <li className="w-full lg:w-auto">
                        <Link 
                          to="/register" 
                          className={`register-btn block lg:inline-block border-2 rounded-md py-2 px-9 ml-0 lg:ml-3 mt-2 lg:mt-0 mx-5 lg:mx-0 text-center font-semibold transition-all duration-300 relative overflow-hidden z-[1] ${
                            scrolled 
                              ? 'text-white bg-[#f0437a] border-[#f0437a]' 
                              : 'text-white bg-[#f0437a] border-white lg:bg-transparent lg:border-white'
                          }`}
                          onClick={closeMenu}
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}

                  {isLogin && (
                    <div className="lg:hidden p-4 border-t">
                      {/* <div className="mb-4">
                        <SearchControls
                          onSearchToggle={handleSearchToggle}
                          searchOpen={searchOpen}
                          scrolled={scrolled}
                        />
                      </div> */}
                      <UserControls
                        userData={userData}
                        onLogout={handleLogout}
                        onNotifications={handleNotificationClick}
                        onProfileSidebar={handleProfileSidebar}
                        scrolled={scrolled}
                      />
                    </div>
                  )}
                </ul>
                
              </div>

              <div className="flex-none flex items-center gap-5 menu-area ml-4">
                {isLogin && (
                  <SearchControls
                    onSearchToggle={handleSearchToggle}
                    searchOpen={searchOpen}
                    scrolled={scrolled}
                  />
                )}

                {isLogin && (
                  <div className="hidden lg:flex items-center gap-5">
                    <UserControls
                      userData={userData}
                      onLogout={handleLogout}
                      onNotifications={handleNotificationClick}
                      onProfileSidebar={handleProfileSidebar}
                      scrolled={scrolled}
                    />
                  </div>
                )}

                <div
                  className={`hamburger lg:hidden cursor-pointer w-5 h-4 relative ${menuOpen ? 'active' : ''} ${
                    !scrolled ? 'header-transparent' : ''
                  }`}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span className="hamburger-line"></span>
                  <span className="hamburger-line"></span>
                  <span className="hamburger-line"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isLogin && <HangingDownloadButton />}

      <ProfileSidebar
        userData={userData}
        onClose={handleCloseProfileSidebar}
        onLogout={handleLogout}
        isOpen={profileSidebarOpen}
      />

      <NotificationSidebar 
        isOpen={notificationOpen} 
        onClose={handleCloseNotification} 
      />
    </>
  );
};

export default Header;