import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Camera,
  UserPlus,
  MessageCircle,
  X,
  Heart,
  Share2,
  Send,
  Facebook,
  Instagram,
  Upload,
  FileText,
  Image,
  Paperclip,
  PhoneCall,
  Video,
  ThumbsUp,
  EllipsisVertical,
  UserX,
  Ban,
} from "lucide-react";

import defaultimge from "../../../assets/images/profile/01.jpg";
import defaultPhoto from "../../../assets/images/profile/02.jpg";
import DefaultImg from "../../../assets/images/profile/default-img.jpg";

import {
  useGetUserFriendsListQuery,
  useLikeprofileMutation,
  useGetFriendProfileQuery,
  useLikeUserMutation,
  useUnfriendFriendMutation,
  useBlockFriendMutation,
  useSendFriendRequestMutation,
} from "../../../service/usersApi";

import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaBan, FaHourglassHalf, FaUserCheck, FaUserPlus } from "react-icons/fa";

// Mock data and images
const defaultAvatar = defaultPhoto;
const defaultCover = defaultimge;

const mockFriends = [
  {
    id: 1,
    name: "Jennifer Guido",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    active: "1 Day",
  },
  {
    id: 2,
    name: "Andrea Guido",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    active: "2 Day",
  },
  {
    id: 3,
    name: "Anna Hawk",
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    active: "5 Day",
  },
  {
    id: 4,
    name: "Andreas Adam",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    active: "4 Day",
  },
  {
    id: 5,
    name: "Alaina T",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    active: "1 Day",
  },
  {
    id: 6,
    name: "Aron Smith",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    active: "3 Day",
  },
];
const mockGroupMembers = [
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face",
];

const ProfileHeader = ({
  userData,
  onAddFriend,
  onPrivateMessage,
  onProfileImageChange,
  onCoverImageChange,
  profileImage,
  coverImage,
}) => {
  const profileFileInputRef = useRef(null);
  console.log("UserData in profileHeader: ", userData);

  const status = userData?.friendshipStatus;

  const renderButton = () => {
    if (status === "Requested") {
      return (
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-lg cursor-not-allowed" disabled>
          <FaHourglassHalf className="w-4 h-4" /> Requested
        </button>
      );
    } else if (status === "Friend") {
      return (
        <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg cursor-not-allowed" disabled>
          <FaUserCheck className="w-4 h-4" /> Friends
        </button>
      );
    } else if (status === "Blocked") {
      return (
        <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg cursor-not-allowed" disabled>
          <FaBan className="w-4 h-4" /> Blocked
        </button>
      );
    } else if (status === "Pending") {
      return (
        <button className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-600 rounded-lg cursor-not-allowed" disabled>
          <FaHourglassHalf className="w-4 h-4" /> Pending
        </button>
      );
    }
    return (
      <button
        className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        onClick={() => onAddFriend(userData?._id)}
      >
        <FaUserPlus className="w-4 h-4" /> Add Friend
      </button>
    );
  };

  return (
    <div className="bg-white mb-0">
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={coverImage}
          alt={userData?.full_name || "profile cover"}
          className="w-full h-full object-cover rounded-b-3xl opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/70 to-transparent rounded-b-3xl"></div>

        <div className="absolute bottom-5 left-0 right-0 px-8 flex justify-between items-end">
          <div className="flex items-end gap-5">
            <div className="relative">
              <img
                src={
                  `https://shyeyes-b.onrender.com/uploads/${userData?.profilePic}` ||
                  "images/default-img.jpg"
                }
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DefaultImg;
                }}
                alt={userData?.full_name || "Profile Pic"}
                className="w-40 h-48 rounded-2xl border-4 border-white shadow-xl object-cover"
              />
              <input
                type="file"
                ref={profileFileInputRef}
                className="hidden"
                accept="image/*"
                onChange={onProfileImageChange}
              />
            </div>

            <div className="mb-2">
              <h1 className="text-lg font-bold text-black">
                {userData?.Name?.firstName || userData?.name || "William Smith"}
                <span> {userData?.Name?.lastName || ""}</span>
              </h1>
              <p className="text-gray-600 text-sm">Active 2 Minutes Ago</p>
              <p className="flex items-center gap-2 text-2xl font-bold">
                <ThumbsUp size={22} />
                <span>{userData?.likeCount}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-3 mb-2">{renderButton()}</div>
        </div>
      </div>
    </div>
  );
};

// Add Friends Popup Component
const AddFriendsPopup = ({ isOpen, onClose }) => {
  const suggestedFriends = mockFriends.slice(0, 6).map((friend) => ({
    ...friend,
    mutualFriends: `${Math.floor(Math.random() * 10) + 1} mutual friends`,
  }));

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[500px] max-h-[600px] overflow-y-auto shadow-2xl animate-slideInUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Add Friends</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {suggestedFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={friend.image}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{friend.name}</h4>
                  <p className="text-sm text-gray-500">{friend.mutualFriends}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
                Add Friend
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Chat Box Component
const ChatBox = ({ isOpen, onClose, userData }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! How are you doing?",
      sender: "received",
      time: "2:30 PM",
    },
    {
      id: 2,
      text: "Hello! I'm doing great, thanks for asking. How about you?",
      sender: "sent",
      time: "2:32 PM",
    },
    {
      id: 3,
      text: "I'm doing well too. What are your plans for today?",
      sender: "received",
      time: "2:35 PM",
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "sent",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      setTimeout(() => {
        const autoReply = {
          id: messages.length + 2,
          text: "Thanks for your message! I'll get back to you soon.",
          sender: "received",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, autoReply]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-5 bottom-5 w-[350px] bg-white rounded-2xl shadow-2xl z-[1000] overflow-hidden animate-slideInRight">
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={userData.profilePic || defaultAvatar}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
          <div>
            <h4 className="font-semibold text-base">
              {userData?.name || "William Smith"}
            </h4>
            <p className="text-xs opacity-90">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20">
          <X size={18} />
        </button>
      </div>

      <div className="h-[300px] overflow-y-auto p-5 bg-gray-50">
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex max-w-[80%] ${msg.sender === "sent" ? "ml-auto justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-2xl shadow-sm ${
                  msg.sender === "received" ? "bg-white text-gray-800" : "bg-pink-500 text-white"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
          />
          <button
            onClick={sendMessage}
            className="bg-pink-500 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-pink-600 transition"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Activity Tab Component
const ActivityTab = ({ userData }) => {
  console.log("userData in Activity tab: ", userData);
  const [activeSubTab, setActiveSubTab] = useState("personal");
  const [filterOption, setFilterOption] = useState("Everything");
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: "Just finished an amazing project with the team! Feeling grateful for all the hard work and collaboration that made this possible. Excited to share the results soon! 🚀",
      author: userData?.Name?.firstName || "William Smith",
      avatar: userData?.profilePic || defaultAvatar,
      time: "6 Minutes Ago",
      likes: 306,
      comments: 136,
      images: [],
    },
    {
      id: 2,
      text: "Beautiful sunset from my evening walk! Sometimes the simple moments are the most rewarding. Nature never fails to inspire creativity and peace of mind.",
      author: userData?.Name?.firstName || "William Smith",
      avatar: userData?.profilePic || defaultAvatar,
      time: "2 Hours Ago",
      likes: 178,
      comments: 89,
      images: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop",
      ],
    },
  ]);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterOption(value);

    let filtered = [...posts];
    switch (value) {
      case "Recently":
        filtered = posts.filter(
          (post) => post.time.includes("Minutes") || post.time.includes("Hour")
        );
        break;
      case "Popular":
        filtered = posts.filter((post) => post.likes > 200);
        break;
      case "Relevant":
        filtered = posts.filter((post) => post.author === userData?.name);
        break;
      default:
        filtered = posts;
    }
    setFilteredPosts(filtered);
  };

  const handlePostSubmit = () => {
    if (postText.trim()) {
      const newPost = {
        id: posts.length + 1,
        text: postText,
        author: userData?.name || "William Smith",
        avatar: userData?.image || defaultAvatar,
        time: "Just now",
        likes: 0,
        comments: 0,
        images: [],
      };

      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
      setPostText("");
    }
  };

  const handleFileUpload = (type) => {
    if (type === "photo") {
      photoInputRef.current?.click();
    } else if (type === "file") {
      fileInputRef.current?.click();
    }
  };

  const renderPersonalContent = () => (
    <div className="flex flex-col gap-5">
      {filteredPosts.map((post) => (
        <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={post.avatar}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            />
            <div>
              <h4 className="font-semibold text-gray-800">{post.author}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Public</span>
                <span className="text-xs text-gray-400">{post.time}</span>
              </div>
            </div>
          </div>

          <div className="mb-4 text-gray-700 leading-relaxed">
            <p>{post.text}</p>

            {post.images.length > 0 && (
              <div className={post.images.length > 1 ? "grid grid-cols-2 gap-3 mt-4" : "mt-4"}>
                {post.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Post"
                    className={post.images.length > 1 ? "w-full h-48 object-cover rounded-lg" : "w-full h-72 object-cover rounded-lg"}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-5">
            <div className="flex justify-between items-center py-3 border-y border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-sm">👍 ❤️ 😍</span>
                <span className="text-sm text-gray-500">You and {post.likes} others like this</span>
              </div>
              <span className="text-sm text-gray-400">{post.comments} Comments</span>
            </div>

            <div className="flex gap-8 mt-4">
              <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition">
                <Heart size={18} />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition">
                <MessageCircle size={18} />
                <span>Comment</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition">
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      {filteredPosts.length === 0 && (
        <div className="text-center py-10 text-gray-500 bg-white rounded-2xl border border-gray-100">
          <p>No posts found for the selected filter.</p>
        </div>
      )}

      <div className="text-center mt-8">
        <button className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition shadow-lg">
          Load More Posts
        </button>
      </div>
    </div>
  );

  const renderMentionsContent = () => (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={mockFriends[1].image}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
          />
          <div>
            <h4 className="font-semibold text-gray-800">Andrea Guido</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Public</span>
              <span className="text-xs text-gray-400">1 Hour Ago</span>
            </div>
          </div>
        </div>

        <div className="mb-4 text-gray-700 leading-relaxed">
          <p>
            Had a great time with{" "}
            <span className="text-pink-500 font-semibold">
              @{userData?.name || "William Smith"}
            </span>{" "}
            at the conference today! Looking forward to collaborating on future projects.
          </p>
        </div>

        <div className="mt-5">
          <div className="flex justify-between items-center py-3 border-y border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-sm">👍 ❤️</span>
              <span className="text-sm text-gray-500">You and 45 others like this</span>
            </div>
            <span className="text-sm text-gray-400">12 Comments</span>
          </div>

          <div className="flex gap-8 mt-4">
            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition">
              <Heart size={18} />
              <span>Like</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFavoritesContent = () => (
    <div className="flex flex-col gap-5">
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 shadow-sm border border-amber-200">
        <div className="flex items-center gap-3 mb-4 relative">
          <img
            src={userData?.image || defaultAvatar}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
          />
          <div>
            <h4 className="font-semibold text-gray-800">{userData?.name || "William Smith"}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Public</span>
              <span className="text-xs text-gray-400">2 Days Ago</span>
            </div>
          </div>
          <div className="absolute right-0 top-0 bg-amber-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
            <Heart size={16} />
            <span>Favorite</span>
          </div>
        </div>

        <div className="mb-4 text-gray-700 leading-relaxed">
          <p>
            This is one of my favorite memories! Sharing some beautiful moments from my recent trip to the mountains. The sunset was absolutely breathtaking and reminded me why I love traveling.
          </p>

          <div className="mt-4">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
              alt="Mountain sunset"
              className="w-full h-72 object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between items-center py-3 border-y border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-sm">👍 ❤️ 😍 🔥</span>
              <span className="text-sm text-gray-500">Sarah, Mike and 152 others like this</span>
            </div>
            <span className="text-sm text-gray-400">89 Comments</span>
          </div>

          <div className="flex gap-8 mt-4">
            <button className="flex items-center gap-2 text-amber-500 hover:bg-amber-100 p-2 rounded-lg transition">
              <Heart size={18} />
              <span>Like</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "personal":
        return renderPersonalContent();
      case "mentions":
        return renderMentionsContent();
      case "favorites":
        return renderFavoritesContent();
      default:
        return renderPersonalContent();
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="flex flex-col gap-5">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-2 items-center">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeSubTab === "personal"
                  ? "bg-pink-500 text-white"
                  : "text-gray-500 hover:bg-pink-50 hover:text-pink-500"
              } transition`}
              onClick={() => setActiveSubTab("personal")}
            >
              Personal
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeSubTab === "mentions"
                  ? "bg-pink-500 text-white"
                  : "text-gray-500 hover:bg-pink-50 hover:text-pink-500"
              } transition`}
              onClick={() => setActiveSubTab("mentions")}
            >
              Mentions
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeSubTab === "favorites"
                  ? "bg-pink-500 text-white"
                  : "text-gray-500 hover:bg-pink-50 hover:text-pink-500"
              } transition`}
              onClick={() => setActiveSubTab("favorites")}
            >
              Favorites
            </button>
            <div className="ml-auto">
              <select
                className="border border-gray-200 rounded-lg p-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                value={filterOption}
                onChange={handleFilterChange}
              >
                <option>Recently</option>
                <option>Everything</option>
                <option>Popular</option>
                <option>Relevant</option>
              </select>
            </div>
          </div>

          {activeSubTab === "personal" && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex gap-4">
                <img
                  src={userData?.image || defaultAvatar}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="flex-1">
                  <div className="mb-3">
                    <span className="bg-pink-50 text-pink-500 px-3 py-1 rounded-full text-xs">Public</span>
                  </div>
                  <textarea
                    placeholder="What's on your mind?"
                    className="w-full bg-transparent border-none text-gray-700 text-base resize-none outline-none min-h-[80px]"
                    rows="3"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-5">
                      <button
                        className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition"
                        onClick={() => handleFileUpload("text")}
                      >
                        <FileText size={16} />
                        <span>Text</span>
                      </button>
                      <button
                        className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition"
                        onClick={() => handleFileUpload("photo")}
                      >
                        <Image size={16} />
                        <span>Photo</span>
                      </button>
                      <button
                        className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition"
                        onClick={() => handleFileUpload("file")}
                      >
                        <Paperclip size={16} />
                        <span>File</span>
                      </button>
                    </div>
                    <button
                      className="bg-pink-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
                      onClick={handlePostSubmit}
                    >
                      POST
                    </button>
                  </div>
                </div>
              </div>

              <input
                type="file"
                ref={photoInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={(e) => console.log("Photos selected:", e.target.files)}
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => console.log("File selected:", e.target.files[0])}
              />
            </div>
          )}

          {renderSubTabContent()}
        </div>

        <div className="flex flex-col gap-5">
          <SearchWidget />
          <YouMayLikeWidget />
          <JoinFriendsWidget />
        </div>
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = ({ userData }) => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-4">
              <h6 className="text-base font-semibold">Basic Information</h6>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-500">Name</span>
                  <span className="text-gray-800 font-medium">
                    {userData?.Name?.firstName} {userData?.Name?.lastName}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-500">Gender</span>
                  <span className="text-gray-800 font-medium">{userData?.gender}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-500">Age</span>
                  <span className="text-gray-800 font-medium">{userData?.age || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-500">Location</span>
                  <span className="text-gray-800 font-medium">{userData?.location?.city || "New York, USA"}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-500">Joined</span>
                  <span className="text-gray-800 font-medium">January 2023</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-4">
              <h6 className="text-base font-semibold">About Me</h6>
            </div>
            <div className="p-6">
              <p className="text-gray-600 leading-relaxed text-sm">
                Passionate about technology, travel, and connecting with people from around the world. I love exploring new places, trying different cuisines, and sharing experiences with friends. Always looking for new adventures and opportunities to learn and grow.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-4">
              <h6 className="text-base font-semibold">Interests & Hobbies</h6>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-500">Hobbies</span>
                  <span className="text-gray-800 font-medium">Photography, Reading, Hiking</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-500">Music</span>
                  <span className="text-gray-800 font-medium">Jazz, Rock, Electronic</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-500">Movies</span>
                  <span className="text-gray-800 font-medium">Sci-Fi, Drama, Documentaries</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-500">Languages</span>
                  <span className="text-gray-800 font-medium">English, Spanish, French</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <SearchWidget />
          <YouMayLikeWidget />
        </div>
      </div>
    </div>
  );
};

// Friends Tab Component
const FriendsTab = () => {
  const { id } = useParams();
  const {
    data: friendDataRes,
    isLoading: isLoadingFriends,
    error: errorFriends,
  } = useGetFriendProfileQuery(id, { skip: !id });

  const [likeProfile] = useLikeprofileMutation();
  console.log(friendDataRes);

  const allFriendsList = friendDataRes?.user?.friendsList ?? [];

  console.log("AllFriendList: ", allFriendsList);

  const handleLike = async (userId) => {
    try {
      await likeProfile(userId).unwrap();
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  if (isLoadingFriends) return <p className="text-center text-gray-600">Loading...</p>;
  if (errorFriends) return <p className="text-center text-red-500">Error: {errorFriends.message}</p>;
  if (!allFriendsList.length) return <p className="text-center text-gray-600">No friends found.</p>;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {allFriendsList.map((friend) => (
            <div
              key={friend?._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition cursor-pointer h-[250px]"
            >
              <div className="relative">
                <img
                  src={`https://shyeyes-b.onrender.com/uploads/${friend?.profilePic}`}
                  alt={friend?.Name?.firstName}
                  className="w-full h-44 object-cover rounded-t-2xl"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DefaultImg;
                  }}
                />
              </div>

              <div className="p-4 text-center">
                <h6 className="font-semibold text-gray-800">
                  {friend?.Name?.firstName} {friend?.Name?.lastName || ""}
                </h6>
                <p className="text-sm text-gray-500">Active {friend?.active}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <SearchWidget />
          <YouMayLikeWidget />
        </div>
      </div>
    </div>
  );
};

// Photos Tab Component
const PhotosTab = ({ photos }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const photosPerPage = 6;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + photosPerPage);
  };

  console.log("Photos: ", photos);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-5 text-center">
        <h2 className="text-xl font-bold">Photo Gallery</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {photos?.length === 0 && <p className="col-span-full text-center text-gray-600">No photos found.</p>}
        {photos.slice(0, visibleCount).map((photo, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer">
            <img
              src={`https://shyeyes-b.onrender.com/uploads/${photo}`}
              alt={`Photo ${index + 1}`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = DefaultImg;
              }}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {visibleCount < photos?.length && (
        <div className="text-center pb-5">
          <button
            className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition shadow-lg"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

// Widget Components
const SearchWidget = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-4">
        <h5 className="text-base font-semibold">Find People</h5>
      </div>
      <div className="p-5">
        <p className="text-gray-500 text-sm mb-5">
          Connect with people who share your interests
        </p>
        <div className="flex flex-col gap-3">
          <select className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20">
            <option value="">I am a</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20">
            <option value="">Looking for</option>
            <option value="friends">Friends</option>
            <option value="networking">Networking</option>
            <option value="dating">Dating</option>
          </select>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20">
              <option value="">Age from</option>
              <option value="18">18</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
            <select className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20">
              <option value="">Age to</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
          <select className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20">
            <option value="">Location</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
          </select>
          <button className="bg-pink-500 text-white p-3 rounded-lg font-semibold hover:bg-pink-600 transition">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

const YouMayLikeWidget = () => {
  const suggestions = mockFriends.slice(0, 9);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-4">
        <h5 className="text-base font-semibold">People You May Know</h5>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3">
          {suggestions.map((person, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
              <img src={person.image} alt="suggestion" className="w-full h-full object-cover hover:scale-110 transition" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/50 transition">
                <Heart size={20} className="text-white opacity-0 hover:opacity-100 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const JoinFriendsWidget = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-4">
        <h5 className="text-base font-semibold">Join The Friends</h5>
      </div>
      <div className="p-5">
        <div className="mb-5 pb-5 border-b border-gray-100">
          <h6 className="text-base font-semibold text-gray-800">Active Friends A1</h6>
          <p className="text-gray-500 text-sm mb-3">
            Collaboratively fabricate best breed and applications through visionary
          </p>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex -space-x-2">
              {mockGroupMembers.map((avatar, i) => (
                <img key={i} src={avatar} alt="Member" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">12+</span>
          </div>
          <button className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-600 transition">
            View Friends
          </button>
        </div>

        <div>
          <h6 className="text-base font-semibold text-gray-800">Active Friends A2</h6>
          <p className="text-gray-500 text-sm mb-3">
            Collaboratively fabricate best breed and applications through visionary
          </p>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex -space-x-2">
              {mockGroupMembers.map((avatar, i) => (
                <img key={i} src={avatar} alt="Member" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">16+</span>
          </div>
          <button className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-600 transition">
            View Friends
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Profile Page Component
const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [coverImage, setCoverImage] = useState(defaultCover);

  const { id } = useParams();
  const [sendRequest] = useSendFriendRequestMutation();

  const {
    data: friendDataRes,
    isLoading: friendLoading,
    error: friendError,
  } = useGetFriendProfileQuery(id, { skip: !id });

  console.log("friendDataRes: ", friendDataRes);

  const userData = friendDataRes?.user;
  console.log("userData in ProfilePage: ", userData);

  if (friendLoading) {
    return <h1 className="text-center text-2xl text-gray-600">Loading...</h1>;
  }

  if (friendError) {
    return <h1 className="text-center text-2xl text-red-500">Something went wrong. Please try again.</h1>;
  }

  const totalFriends = friendDataRes?.user?.friendsList?.length || 0;

  const renderTabContent = () => {
    switch (activeTab) {
      case "activity":
        return <ActivityTab userData={userData} />;
      case "profile":
        return <ProfileTab userData={userData} />;
      case "friends":
        return <FriendsTab friends={userData?.friends} />;
      case "photos":
        return <PhotosTab photos={userData?.photos} />;
      default:
        return <ActivityTab userData={userData} />;
    }
  };

  const handleRequest = async (receiverId) => {
    try {
      Swal.fire({
        title: "Sending Request...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      let response = await sendRequest(receiverId).unwrap();
      Swal.close();

      if (response.sent === true) {
        Swal.fire("Success", "Request sent successfully", "success");
      } else {
        Swal.fire("Error", `${response.message}`, "error");
      }
    } catch (error) {
      Swal.close();
      console.log("Error while sending request:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-sans">
      <ProfileHeader
        userData={userData}
        onAddFriend={() => handleRequest(userData?._id)}
        onPrivateMessage={() => setShowChat(true)}
        profileImage={profileImage}
        coverImage={coverImage}
      />

      <div className="bg-white shadow-sm sticky top-0 ">
        <div className="max-w-6xl mx-auto px-5">
          <nav className="flex gap-0">
            <button
              className={`px-6 py-4 font-medium text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition relative ${
                activeTab === "activity" ? "text-pink-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-pink-500 after:to-pink-400 after:rounded-t" : ""
              }`}
              onClick={() => setActiveTab("activity")}
            >
              Activity
            </button>
            <button
              className={`px-6 py-4 font-medium text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition relative ${
                activeTab === "profile" ? "text-pink-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-pink-500 after:to-pink-400 after:rounded-t" : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`px-6 py-4 font-medium text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition relative ${
                activeTab === "friends" ? "text-pink-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-pink-500 after:to-pink-400 after:rounded-t" : ""
              }`}
              onClick={() => setActiveTab("friends")}
            >
              Friends <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{totalFriends || "0"}</span>
            </button>
            <button
              className={`px-6 py-4 font-medium text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition relative ${
                activeTab === "photos" ? "text-pink-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-pink-500 after:to-pink-400 after:rounded-t" : ""
              }`}
              onClick={() => setActiveTab("photos")}
            >
              Photos
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-5 cursor-pointer">{renderTabContent()}</div>

      <AddFriendsPopup
        isOpen={showAddFriends}
        onClose={() => setShowAddFriends(false)}
        userData={userData}
      />

      <ChatBox
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        userData={userData}
      />
    </div>
  );
};

export default UserProfilePage;