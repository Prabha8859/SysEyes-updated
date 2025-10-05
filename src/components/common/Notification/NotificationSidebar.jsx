import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  FaHeart,
  FaComment,
  FaEnvelope,
  FaCheckCircle,
  FaUserCheck,
  FaUserTimes,
  FaClock,
  FaUsers,
  FaBell,
  FaTrash,
} from "react-icons/fa";
import { Close } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {
  useGetFriendRequestsQuery,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useReceiveLikesQuery,
} from "../../../service/usersApi";

const NotificationSidebar = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [optimisticUpdates, setOptimisticUpdates] = useState(new Set());
  const defaultImage = "https://dummyimage.com/150x150/000/fff";

  // RTK Query hooks
  const {
    data: friendRequestsData,
    isLoading,
    error,
    refetch,
  } = useGetFriendRequestsQuery();

  // RTK hook for likes
  const { data: likesData, isLoading: likesLoading, error: likesError } = useReceiveLikesQuery();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [rejectFriendRequest] = useRejectFriendRequestMutation();

  // Extract requests from API with optimistic filtering
  const friendRequests = (friendRequestsData?.requests || []).filter(
    request => !optimisticUpdates.has(request._id)
  );

  // ✅ Handle Accept with optimistic update
  const handleAccept = async (requestId) => {
    setOptimisticUpdates(prev => new Set(prev).add(requestId));

    try {
      const res = await acceptFriendRequest(requestId).unwrap();

      setOptimisticUpdates(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });

      Swal.fire({
        icon: "success",
        title: "Friend Request Accepted",
        text: res.message || "You are now friends!",
        timer: 2000,
        showConfirmButton: false,
        background: "#f8f9fa",
        color: "#198754",
        iconColor: "#198754",
      });

      refetch();
    } catch (err) {
      console.error("❌ Accept failed:", err);

      setOptimisticUpdates(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });

      Swal.fire({
        icon: "error",
        title: "Failed to Accept",
        text: err?.data?.message || "Something went wrong!",
        background: "#f8f9fa",
        color: "#dc3545",
        iconColor: "#dc3545",
      });
    }
  };

  // ✅ Handle Reject with optimistic update
  const handleReject = async (requestId) => {
    setOptimisticUpdates(prev => new Set(prev).add(requestId));

    try {
      const res = await rejectFriendRequest(requestId).unwrap();
      console.log("❌ Rejected:", res);

      setOptimisticUpdates(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });

      Swal.fire({
        icon: "success",
        title: "Friend Request Rejected",
        text: res.message || "Request has been rejected",
        timer: 2000,
        showConfirmButton: false,
        background: "#f8f9fa",
        color: "#6c757d",
        iconColor: "#6c757d",
      });

      refetch();
    } catch (err) {
      console.error("Reject failed:", err);

      setOptimisticUpdates(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });

      Swal.fire({
        icon: "error",
        title: "Failed to Reject",
        text: err?.data?.message || "Something went wrong!",
        background: "#f8f9fa",
        color: "#dc3545",
        iconColor: "#dc3545",
      });
    }
  };

  // ✅ Clear All Notifications
  const handleClearAll = () => {
    Swal.fire({
      title: "Clear All Notifications?",
      text: "This will remove all your notifications.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff6b9d",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, clear all!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Cleared!",
          text: "All notifications have been cleared.",
          timer: 2000,
          showConfirmButton: false,
        });
        // Add your clear logic here if you have an API endpoint
      }
    });
  };

  // Like notifications
  const likeNotifications = (likesData?.likes || [])
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((like) => {
      const likerName = like.liker
        ? `${like.liker.Name.firstName} ${like.liker.Name.lastName}`
        : "Someone";

      return {
        id: like._id,
        type: "like",
        title: `${likerName} sent you a like 💖`,
        time: new Date(like.createdAt).toLocaleString(),
        avatar: like.liker?.profilePic
          ? `https://shyeyes-b.onrender.com/uploads/${like.liker.profilePic}`
          : "https://dummyimage.com/150x150/000/fff",
      };
    });

  const allNotifications = [...likeNotifications];

  // Example static messages
  const messages = [
    {
      id: 1,
      user: "Neha",
      message: "Hey! How are you? 😊",
      time: "5 mins ago"
    },
    {
      id: 2,
      user: "Aman",
      message: "I liked your photo, wanna chat?",
      time: "1 hour ago",
    },
  ];

  const iconByType = (type) => {
    const icons = {
      like: <FaHeart className="text-pink-500" />,
      comment: <FaComment className="text-blue-500" />,
      match: <FaCheckCircle className="text-green-500" />,
      review: <FaCheckCircle className="text-yellow-500" />,
    };
    return icons[type] || <FaHeart className="text-pink-500" />;
  };

  const getTimeIcon = (timeText) => {
    if (timeText.includes("mins") || timeText.includes("min"))
      return <FaClock className="text-blue-500 mr-1" size={12} />;
    if (timeText.includes("hour"))
      return <FaClock className="text-yellow-500 mr-1" size={12} />;
    return <FaClock className="text-gray-500 mr-1" size={12} />;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay with smooth fade */}
      <div 
        className={`fixed top-0 left-0 w-full h-full bg-black z-[1040] transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar with smooth slide animation */}
      <div 
        className={`fixed h-screen bg-white z-[1050] shadow-2xl border-l border-gray-200 
          w-full sm:w-96 md:w-[450px] lg:w-[480px]
          transition-all duration-500 ease-in-out
          ${isOpen ? 'right-0 top-12' : 'right-[-100%] sm:right-[-24rem] md:right-[-450px] lg:right-[-480px] top-16'}`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          height: 'calc(100vh - 4rem)'
        }}
      >
        <div className="flex flex-col h-full bg-white overflow-hidden rounded-tl-xl">
          {/* Header */}
          <div className="flex-shrink-0 bg-gradient-to-br from-pink-500 to-pink-400 text-white p-2 sm:p-3 flex justify-between items-center shadow-lg">
            <div className="flex items-center">
              <FaBell className="mr-3 text-xl sm:text-2xl" />
              <h4 className="mb-0 font-bold text-lg sm:text-xl">Notifications</h4>
              {friendRequests.length > 0 && (
                <span 
                  className="ml-3 bg-white text-pink-500 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm"
                  style={{ animation: 'pulse 2s infinite' }}
                >
                  {friendRequests.length}
                </span>
              )}
            </div>
            <IconButton
              onClick={onClose}
              className="text-white hover:scale-110 transition-transform duration-300"
              size="small"
            >
              <Close className="text-2xl" />
            </IconButton>
          </div>

          {/* Tabs */}
          <div className="flex-shrink-0 border-b bg-gray-50 shadow-sm">
            <div className="flex justify-around p-3 gap-2">
              <button
                className={`cursor-pointer flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 sm:px-4 rounded-xl transition-all duration-300 text-xs sm:text-sm font-semibold
                  ${activeTab === "all" 
                    ? "bg-pink-500 text-white shadow-lg scale-105" 
                    : "text-gray-700 hover:bg-pink-50 hover:text-pink-500 hover:scale-105"}`}
                onClick={() => setActiveTab("all")}
              >
                <FaBell className="text-sm" />
                <span>All</span>
              </button>
              <button
                className={`cursor-pointer flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 sm:px-4 rounded-xl transition-all duration-300 text-xs sm:text-sm font-semibold
                  ${activeTab === "messages" 
                    ? "bg-pink-500 text-white shadow-lg scale-105" 
                    : "text-gray-700 hover:bg-pink-50 hover:text-pink-500 hover:scale-105"}`}
                onClick={() => setActiveTab("messages")}
              >
                <FaEnvelope className="text-sm" />
                <span>Messages</span>
              </button>
              <button
                className={`cursor-pointer flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 sm:px-4 rounded-xl transition-all duration-300 text-xs sm:text-sm font-semibold
                  ${activeTab === "friendRequests" 
                    ? "bg-pink-500 text-white shadow-lg scale-105" 
                    : "text-gray-700 hover:bg-pink-50 hover:text-pink-500 hover:scale-105"}`}
                onClick={() => setActiveTab("friendRequests")}
              >
                <FaUsers className="text-sm" />
                <span>Requests</span>
                {friendRequests.length > 0 && (
                  <span className="bg-white text-pink-500 px-1.5 py-0.5 rounded-full text-[10px] font-semibold">
                    {friendRequests.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar">
            {/* All Notifications */}
            {activeTab === "all" && (
              <div>
                {/* Clear All Button */}
                {allNotifications.length > 0 && (
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={handleClearAll}
                      className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm bg-red-50 text-red-600 rounded-xl hover:bg-red-100 hover:scale-105 transition-all duration-300 font-semibold border border-red-200 shadow-sm"
                    >
                      <FaTrash className="text-xs" />
                      Clear All
                    </button>
                  </div>
                )}

                {allNotifications.length > 0 ? (
                  allNotifications.map((n) => (
                    <div
                      key={n.id}
                      className={`bg-white rounded-2xl mb-4 border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                        ${n.type === "match" ? "border-pink-300" : "border-gray-200 hover:border-pink-200"}`}
                    >
                      <div className="p-4 flex items-start">
                        <div className="mr-3 flex-shrink-0">
                          <img
                            src={n.avatar}
                            alt={n.title}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-pink-200 hover:border-pink-500 transition-all duration-300 hover:scale-110 shadow-md"
                            onError={(e) => {
                              e.currentTarget.src = "https://dummyimage.com/150x150/000/fff";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h6 className="font-bold text-gray-800 mb-1.5 text-sm sm:text-base">{n.title}</h6>
                          <p className="text-gray-600 text-xs sm:text-sm mb-2">{n.message}</p>
                          <div className="flex items-center text-gray-500 text-xs">
                            {getTimeIcon(n.time)}
                            <span>{n.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 sm:py-16 text-gray-500 bg-pink-50 rounded-2xl">
                    <FaBell size={48} className="mb-4 text-pink-500 opacity-50 mx-auto" />
                    <p className="mb-1 text-base sm:text-lg font-semibold">No notifications yet.</p>
                    <small className="text-gray-400 text-sm">
                      We'll notify you when something arrives
                    </small>
                  </div>
                )}
              </div>
            )}

            {/* Messages */}
            {activeTab === "messages" && (
              <div>
                {messages.length > 0 ? (
                  messages.map((m) => (
                    <div key={m.id} className="bg-white rounded-2xl mb-4 border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-pink-200">
                      <div className="p-4 flex items-start">
                        <div className="mr-3 flex-shrink-0">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 shadow-md">
                            <FaEnvelope className="text-xl sm:text-2xl" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h6 className="font-bold text-gray-800 mb-1.5 text-sm sm:text-base">{m.user}</h6>
                          <p className="text-gray-600 mb-2 text-xs sm:text-sm">{m.message}</p>
                          <div className="flex items-center text-gray-500 text-xs">
                            {getTimeIcon(m.time)}
                            <span>{m.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 sm:py-16 text-gray-500 bg-pink-50 rounded-2xl">
                    <FaEnvelope size={48} className="mb-4 text-pink-500 opacity-50 mx-auto" />
                    <p className="mb-1 text-base sm:text-lg font-semibold">No messages yet.</p>
                    <small className="text-gray-400 text-sm">Your messages will appear here</small>
                  </div>
                )}
              </div>
            )}

            {/* Friend Requests */}
            {activeTab === "friendRequests" && (
              <div>
                {isLoading ? (
                  <div className="text-center py-12 sm:py-16">
                    <div className="inline-block w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-3 text-gray-600 text-sm font-medium">Loading friend requests...</p>
                  </div>
                ) : error ? (
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl text-center text-sm">
                    <FaUsers className="inline mr-2" />
                    Failed to load friend requests
                  </div>
                ) : friendRequests.length > 0 ? (
                  friendRequests.map((f) => (
                    <div key={f._id} className="bg-white rounded-2xl mb-4 border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-pink-200">
                      <div className="p-4">
                        <div className="flex items-start">
                          <div className="mr-3 flex-shrink-0">
                            <img
                              src={f.user1?.profilePic || defaultImage}
                              alt={`${f.user1?.Name?.firstName || "User"}'s avatar`}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-pink-300 object-cover hover:border-pink-500 transition-all duration-300 hover:scale-110 shadow-md"
                              onError={(e) => (e.target.src = defaultImage)}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h6 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                              {f.user1?.Name?.firstName} {f.user1?.Name?.lastName}
                            </h6>
                            <div className="flex items-center text-gray-600 text-xs mb-2">
                              <FaUsers className="mr-1.5 text-pink-500" />
                              <span>{f.user1?.mutualFriends || 0} mutual friends</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-xs mb-4">
                              <FaClock className="mr-1.5" />
                              <span>{new Date(f.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex gap-3">
                              <button
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:scale-105 border-0"
                                onClick={() => handleAccept(f.user1._id)}
                              >
                                <FaUserCheck className="text-sm" />
                                <span>Accept</span>
                              </button>
                              <button
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white border-2 border-red-500 text-red-500 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-red-50 hover:scale-105"
                                onClick={() => handleReject(f.user1._id)}
                              >
                                <FaUserTimes className="text-sm" />
                                <span>Decline</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 sm:py-16 text-gray-500 bg-pink-50 rounded-2xl">
                    <FaUsers size={48} className="mb-4 text-pink-500 opacity-50 mx-auto" />
                    <p className="mb-1 text-base sm:text-lg font-semibold">No friend requests yet.</p>
                    <small className="text-gray-400 text-sm">
                      When you receive friend requests, they'll show up here
                    </small>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ff6b9d;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e55a8a;
        }
      `}</style>
    </>
  );
};

export default NotificationSidebar;