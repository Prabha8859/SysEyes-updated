import React, { useState, useRef, useEffect } from "react";
import "./ProfilePage.css"; // Keep this for any custom CSS if needed, but mostly use Tailwind
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

import defaultimge from "../../assets/images/profile/01.jpg";
import defaultPhoto from "../../assets/images/profile/02.jpg";
import DefaultImg from "../../assets/images/profile/default-img.jpg";

import {
  useGetUserProfileQuery,
  useGetUserFriendsListQuery,
  useAddPhotosMutation,
  useLikeprofileMutation,
  useSetPhotoAsProfileMutation,
  useDeletePhotoMutation,
  useGetFriendProfileQuery,
  useLikeUserMutation,
  useUnfriendFriendMutation,
  useGetBlockedFriendsQuery,
  useBlockFriendMutation,
} from "../../service/usersApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

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
const mockPhotos = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=300&fit=crop",
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
  const coverFileInputRef = useRef(null);

  console.log("UserData in profileHeader: ", userData);

  const handleProfileCameraClick = () => {
    profileFileInputRef.current.click();
  };

  const handleCoverEditClick = () => {
    coverFileInputRef.current.click();
  };

  return (
    <div className="relative bg-white mb-0">
      <div className="relative h-[250px] xs:h-[300px] sm:h-[350px] md:h-[450px] overflow-hidden">
        <img
          src={coverImage}
          alt={userData?.full_name || "profile cover"}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 to-transparent"></div>

        <button className="absolute top-4 right-2 bg-white/90 text-gray-700 px-2 py-2 rounded-[10px] border-none flex items-center gap-2 cursor-pointer backdrop-blur-[10px] transition-all duration-300 font-medium hover:bg-white hover:-translate-y-0.5 hover:shadow-lg" onClick={handleCoverEditClick}>
          <Camera size={20} />
          {/* <span>Edit Photo</span> */}
        </button>
        <input
          type="file"
          ref={coverFileInputRef}
          className="hidden"
          accept="image/*"
          onChange={onCoverImageChange}
        />
          <div class="relative">
             <div class="absolute bottom-10 left-0 right-0 px-4 sm:px-[8%] flex items-end justify-start gap-4 flex-wrap mt-32 xs:mt-24 sm:mt-20 md:mt-8">
              <div className="flex items-end gap-5">
                <div className="relative">
                  <img
                    src={
                      `https://shyeyes-b.onrender.com/uploads/${userData?.profilePic}` ||
                      "images/default-img.jpg"
                    }
                    onError={(e) => {
                      e.currentTarget.onerror = null; // prevent infinite loop
                      e.currentTarget.src = DefaultImg;
                    }}
                    alt={userData?.full_name || "Profile Pic"}
                    className="w-24 h-32 sm:w-40 sm:h-52 rounded-[15px] border-4 border-white object-cover shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                  />
                  <button
                    className="absolute bottom-2.5 right-2.5 bg-white text-pink-500 p-2 rounded-full border-none cursor-pointer transition-all duration-300 shadow-lg hover:bg-pink-500 hover:text-white hover:scale-110"
                    onClick={handleProfileCameraClick}
                  >
                    <Camera size={16} />
                  </button>
                  <input
                    type="file"
                    ref={profileFileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={onProfileImageChange}
                  />
                </div>

                <div className="text-white mb-2.5 text-left">
                  <h1 className="text-3xl sm:text-4xl font-bold text-black">
                    {userData?.Name?.firstName || userData?.name || "William Smith"}
                    <span> {userData?.Name?.lastName || ""}</span>
                  </h1>
                  <p className="text-[1rem] sm:text-[1.1rem] opacity-90 text-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">Active 2 Minutes Ago</p>
                  <p
                    className="text-[20px] sm:text-[25px] font-bold flex gap-[5px] items-center justify-start"
                  >
                    <span>
                      <ThumbsUp size={22} />
                    </span>
                    <span>{userData?.likeCount}</span>
                  </p>
                </div>
              </div>

              <div className="ml-auto flex gap-3">
                <Link to="/edit-profile">
                  <button className="px-4 py-2 sm:px-5 sm:py-3 rounded-xl border-none cursor-pointer flex items-center gap-2 font-semibold transition-all duration-300 text-[14px] bg-white/20 text-white backdrop-blur-[10px] border border-white/30 hover:bg-white/30 hover:-translate-y-0.5">
                    <span>Edit Profile</span>
                  </button>
                </Link>

                <button
                  onClick={onPrivateMessage}
                  className="px-4 py-2 sm:px-5 sm:py-3 rounded-xl border-none cursor-pointer flex items-center gap-2 font-semibold transition-all duration-300 text-[14px] bg-white/20 text-white backdrop-blur-[10px] border border-white/30 hover:bg-white/30 hover:-translate-y-0.5"
                >
                  <MessageCircle size={18} />
                  <span>Message</span>
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// Add Friends Popup Component
const AddFriendsPopup = ({isOpen, onClose}) => {
  const suggestedFriends = mockFriends.slice(0, 6).map((friend) => ({
    ...friend,
    mutualFriends: `${Math.floor(Math.random() * 10) + 1} mutual friends`,
  }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-[15px] p-[15px] sm:p-[25px] w-[90%] sm:w-[500px] max-h-[80vh] sm:max-h-[600px] overflow-y-auto animate-slideInUp shadow-[0_20px_40px_rgba(0,0,0,0.15)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-5 pb-[15px] border-b border-gray-200">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Add Friends</h3>
          <button onClick={onClose} className="bg-none border-none text-gray-500 cursor-pointer p-2 rounded-full transition-all duration-300 hover:bg-gray-100 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-[15px]">
          {suggestedFriends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between p-[10px] sm:p-[0px_15px] bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center gap-4">
                <img
                  src={friend.image}
                  alt={friend.name}
                  className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full object-cover border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-0.5">{friend.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 mb-0">{friend.mutualFriends}</p>
                </div>
              </div>
              <button className="bg-pink-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg border-none cursor-pointer text-xs sm:text-sm font-semibold transition-all duration-300 hover:bg-pink-600 hover:-translate-y-0.5">Add Friend</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Chat Box Component
const ChatBox = ({isOpen, onClose, userData}) => {
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

      // Auto reply after 2 seconds
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
    <div className="fixed right-2 bottom-2 sm:right-5 sm:bottom-5 w-[90%] sm:w-[350px] bg-white rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-[1000] animate-slideInRight overflow-hidden">
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-[10px_15px] sm:p-[15px_20px] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={userData.profilePic || defaultAvatar}
            alt="Profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
          />
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-0">
              {userData?.name || "William Smith"}
            </h4>
            <p className="text-xs opacity-90 mb-0">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="bg-none border-none text-white cursor-pointer p-2 rounded-full transition-all duration-300 hover:bg-white/20">
          <X size={18} />
        </button>
      </div>

      <div className="h-[250px] sm:h-[300px] overflow-y-auto p-3 sm:p-5 bg-gray-50">
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex max-w-[80%] ${msg.sender === 'received' ? 'justify-start' : 'justify-end ml-auto'}`}>
              <div className={`p-[8px_12px] sm:p-[10px_15px] rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] max-w-full ${msg.sender === 'received' ? 'bg-white text-gray-800' : 'bg-pink-500 text-white'}`}>
                <p className="mb-0 text-xs sm:text-sm leading-tight">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1 mb-0">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-[10px_15px] sm:p-[15px_20px] border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-[20px] px-[10px] text-sm outline-none focus:border-pink-500 focus:shadow-[0_0_0_3px_rgba(236,72,153,0.1)]"
          />
          <button onClick={sendMessage} className="bg-pink-500 text-white rounded-full p-[10px] border-none cursor-pointer transition-all duration-300 min-w-[40px] h-10 flex items-center justify-center hover:bg-pink-600 hover:scale-105">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Activity Tab Component
const ActivityTab = ({userData}) => {
  console.log("userData in Activity tab: ", userData);
  const [activeSubTab, setActiveSubTab] = useState("personal");
  const [filterOption, setFilterOption] = useState("Everything");
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: "Just finished an amazing project with the team! Feeling grateful for all the hard work and collaboration that made this possible. Excited to share the results soon! 🚀",
      author: userData?.Name.firstName || "William Smith",
      avatar: userData?.image || defaultAvatar,
      time: "6 Minutes Ago",
      likes: 306,
      comments: 136,
      images: [],
    },
    {
      id: 2,
      text: "Beautiful sunset from my evening walk! Sometimes the simple moments are the most rewarding. Nature never fails to inspire creativity and peace of mind.",
      author: userData?.name || "William Smith",
      avatar: userData?.image || defaultAvatar,
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
        <div key={post.id} className="bg-white rounded-[15px] p-[15px] sm:p-[25px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 cursor-pointer">
          <div className="flex items-center gap-3 mb-[15px] relative">
            <img src={post.avatar} alt="Profile" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-100" />
            <div className="flex-grow">
              <h4 className="font-semibold text-gray-900 mb-0 text-sm sm:text-base">{post.author}</h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-xl">Public</span>
                <span className="text-xs text-gray-400">{post.time}</span>
              </div>
            </div>
          </div>

          <div className="my-[15px] leading-relaxed text-gray-700 text-sm sm:text-base">
            <p>{post.text}</p>

            {post.images.length > 0 && (
              <div
                className={
                  post.images.length > 1 ? "grid grid-cols-1 sm:grid-cols-2 gap-[10px] my-[15px]" : "my-[15px]"
                }
              >
                {post.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Post"
                    className={
                      post.images.length > 1
                        ? "w-full h-[150px] sm:h-[200px] object-cover rounded-[10px]"
                        : "w-full h-[200px] sm:h-[300px] object-cover rounded-[10px]"
                    }
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-5">
            <div className="flex flex-col sm:flex-row justify-between items-center py-3 border-t border-b border-gray-100 my-[15px]">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <span className="text-sm">👍 ❤️ 😍</span>
                <span className="text-sm text-gray-500">
                  You and {post.likes} others like this
                </span>
              </div>
              <span className="text-sm text-gray-400">
                {post.comments} Comments
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[30px]">
              <button className="bg-none border-none text-gray-500 flex items-center gap-2 cursor-pointer p-[8px_12px] rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-gray-700">
                <Heart size={18} />
                <span>Like</span>
              </button>
              <button className="bg-none border-none text-gray-500 flex items-center gap-2 cursor-pointer p-[8px_12px] rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-gray-700">
                <MessageCircle size={18} />
                <span>Comment</span>
              </button>
              <button className="bg-none border-none text-gray-500 flex items-center gap-2 cursor-pointer p-[8px_12px] rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-gray-700">
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      {filteredPosts.length === 0 && (
        <div className="text-center p-10 text-gray-500 bg-white rounded-[15px] border border-gray-100">
          <p>No posts found for the selected filter.</p>
        </div>
      )}

      {/* Load More Button */}
      <div className="text-center mt-[30px]">
        <button className="bg-pink-500 text-white border-none px-[20px] sm:px-[30px] py-3 rounded-[25px] font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_12px_rgba(236,72,153,0.2)] hover:bg-pink-600 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(236,72,153,0.3)]">Load More Posts</button>
      </div>
    </div>
  );

  const renderMentionsContent = () => (
    <div className="mentions-content">
      <div className="bg-white rounded-[15px] p-[15px] sm:p-[25px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100">
        <div className="flex items-center gap-3 mb-[15px] relative">
          <img
            src={mockFriends[1].image}
            alt="Profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-100"
          />
          <div className="flex-grow">
            <h4 className="font-semibold text-gray-900 mb-0 text-sm sm:text-base">Andrea Guido</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-xl">Public</span>
              <span className="text-xs text-gray-400">1 Hour Ago</span>
            </div>
          </div>
        </div>

        <div className="my-[15px] leading-relaxed text-gray-700 text-sm sm:text-base">
          <p>
            Had a great time with{" "}
            <span className="text-pink-500 font-semibold">
              @{userData?.name || "William Smith"}
            </span>{" "}
            at the conference today! Looking forward to collaborating on future
            projects.
          </p>
        </div>

        <div className="mt-5">
          <div className="flex flex-col sm:flex-row justify-between items-center py-3 border-t border-b border-gray-100 my-[15px]">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <span className="text-sm">👍 ❤️</span>
              <span className="text-sm text-gray-500">
                You and 45 others like this
              </span>
            </div>
            <span className="text-sm text-gray-400">
              12 Comments
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[30px]">
            <button className="bg-none border-none text-gray-500 flex items-center gap-2 cursor-pointer p-[8px_12px] rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-gray-700">
              <Heart size={18} />
              <span>Like</span>
            </button>
            <button className="bg-none border-none text-gray-500 flex items-center gap-2 cursor-pointer p-[8px_12px] rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-gray-700">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="bg-none border-none text-gray-500 flex items-center gap-2 cursor-pointer p-[8px_12px] rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-gray-700">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFavoritesContent = () => (
    <div className="favorites-content">
      <div className="bg-gradient-to-br from-amber-50 to-amber-200 border-amber-400 bg-white rounded-[15px] p-[15px] sm:p-[25px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100">
        <div className="flex items-center gap-3 mb-[15px] relative">
          <img
            src={userData?.image || defaultAvatar}
            alt="Profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-100"
          />
          <div className="flex-grow">
            <h4 className="font-semibold text-gray-900 mb-0 text-sm sm:text-base">
              {userData?.name || "William Smith"}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-xl">Public</span>
              <span className="text-xs text-gray-400">2 Days Ago</span>
            </div>
          </div>
          <div className="absolute right-0 top-0 bg-amber-400 text-white px-3 py-1 rounded-xl text-xs flex items-center gap-1">
            <Heart size={16} className="text-amber-600" />
            <span>Favorite</span>
          </div>
        </div>

        <div className="my-[15px] leading-relaxed text-gray-700 text-sm sm:text-base">
          <p>
            This is one of my favorite memories! Sharing some beautiful moments
            from my recent trip to the mountains. The sunset was absolutely
            breathtaking and reminded me why I love traveling.
          </p>

          <div className="my-[15px]">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
              alt="Mountain sunset"
              className="w-full h-[200px] sm:h-[300px] object-cover rounded-[10px]"
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="flex flex-col sm:flex-row justify-between items-center py-3 border-t border-b border-gray-100 my-[15px]">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <span className="text-sm">👍 ❤️ 😍 🔥</span>
              <span className="text-sm text-gray-500">
                Sarah, Mike and 152 others like this
              </span>
            </div>
            <span className="text-sm text-gray-400">
              89 Comments
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[30px]">
            <button className="bg-none border-none text-amber-500 flex items-center gap-2 cursor-pointer p-[8px_12px] rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-amber-600">
              <Heart size={18} />
              <span>Like</span>
            </button>
            <button className="bg-none border-none text-gray-500 flex items-center gap-2 cursor-pointer p-[8px_12px] rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-gray-700">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="bg-none border-none text-gray-500 flex items-center gap-2 cursor-pointer p-[8px_12px] rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-gray-700">
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
    <div className="bg-transparent pt-4 sm:pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-[20px] sm:gap-[30px]">
        <div className="flex flex-col gap-5">
          {/* Activity Sub Navigation */}
          <div className="bg-white p-[10px_15px] sm:p-[15px_20px] rounded-[15px] flex flex-wrap items-center gap-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
            <button
              className={`bg-transparent border-none text-gray-800 px-3 py-2 sm:px-4 sm:py-2 rounded-lg cursor-pointer font-medium transition-all duration-300 hover:bg-pink-50 hover:text-pink-500 ${activeSubTab === "personal" ? "bg-pink-500 text-pink-600" : ""}`}
              onClick={() => setActiveSubTab("personal")}
            >
              Personal
            </button>
            <button
              className={`bg-transparent border-none text-gray-500 px-3 py-2 sm:px-4 sm:py-2 rounded-lg cursor-pointer font-medium transition-all duration-300 hover:bg-pink-50 hover:text-pink-500 ${activeSubTab === "mentions" ? "bg-pink-500 text-pink-600" : ""}`}
              onClick={() => setActiveSubTab("mentions")}
            >
              Mentions
            </button>
            <button
              className={`bg-transparent border-none text-gray-500 px-3 py-2 sm:px-4 sm:py-2 rounded-lg cursor-pointer font-medium transition-all duration-300 hover:bg-pink-50 hover:text-pink-500 ${activeSubTab === "favorites" ? "bg-pink-500 text-pink-600" : ""}`}
              onClick={() => setActiveSubTab("favorites")}
            >
              Favorites
            </button>
            <div className="ml-auto">
              <select
                className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg cursor-pointer text-sm"
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

          {/* Post Creation - Only show for personal tab */}
          {activeSubTab === "personal" && (
            <div className="bg-white rounded-[15px] p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100">
              <div className="flex gap-[10px] sm:gap-[15px]">
                <img
                  src={userData?.image || defaultAvatar}
                  alt="Profile"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="flex-1">
                  <div className="mb-[10px]">
                    <span className="bg-pink-50 text-pink-500 px-3 py-1 rounded-full text-xs border border-pink-100">Public</span>
                  </div>
                  <textarea
                    placeholder="What's on your mind?"
                    className="w-full bg-transparent border-none text-gray-700 text-sm sm:text-base resize-none outline-none min-h-[60px] sm:min-h-[80px]"
                    rows="3"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-[15px] pt-[15px] border-t border-gray-100 gap-3 sm:gap-0">
                    <div className="flex flex-wrap gap-3 sm:gap-5">
                      <button
                        className="bg-none border-none text-gray-500 flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => handleFileUpload("text")}
                      >
                        <FileText size={16} />
                        <span>Text</span>
                      </button>
                      <button
                        className="bg-none border-none text-gray-500 flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => handleFileUpload("photo")}
                      >
                        <Image size={16} />
                        <span>Photo</span>
                      </button>
                      <button
                        className="bg-none border-none text-gray-500 flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => handleFileUpload("file")}
                      >
                        <Paperclip size={16} />
                        <span>File</span>
                      </button>
                    </div>
                    <button
                      className="bg-pink-500 text-white border-none px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-pink-600 hover:-translate-y-0.5"
                      onClick={handlePostSubmit}
                    >
                      POST
                    </button>
                  </div>
                </div>
              </div>

              {/* Hidden file inputs */}
              <input
                type="file"
                ref={photoInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={(e) =>
                  console.log("Photos selected:", e.target.files)
                }
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) =>
                  console.log("File selected:", e.target.files[0])
                }
              />
            </div>
          )}

          {/* Sub Tab Content */}
          {renderSubTabContent()}
        </div>

        {/* Activity Sidebar */}
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
const ProfileTab = ({userData}) => {
  return (
    <div className="bg-transparent pt-4 sm:pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-[20px] sm:gap-[30px]">
        <div className="flex flex-col gap-5">
          {/* Base Info Card */}
          <div className="bg-white rounded-[15px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="bg-gradient-to-r from-pink-500 to-pink-300 text-white p-[10px_20px] sm:p-[15px_25px]">
              <h6 className="text-base font-semibold mb-0">Basic Information</h6>
            </div>
            <div className="p-[15px] sm:p-[25px]">
              <div className="flex flex-col gap-3 text-sm sm:text-base">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-500">Name</span>
                  <span className="text-gray-800 font-medium">
                    {userData?.Name?.firstName}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-500">Gender</span>
                  <span className="text-gray-800 font-medium">{userData?.gender}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-500">Age</span>
                  <span className="text-gray-800 font-medium">{userData?.age || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-500">Location</span>
                  <span className="text-gray-800 font-medium">
                    {userData?.location?.city || "New York, USA"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-500">Joined</span>
                  <span className="text-gray-800 font-medium">January 2023</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Me Card */}
          <div className="bg-white rounded-[15px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="bg-gradient-to-r from-pink-500 to-pink-300 text-white p-[10px_20px] sm:p-[15px_25px]">
              <h6 className="text-base font-semibold mb-0">About Me</h6>
            </div>
            <div className="p-[15px] sm:p-[25px]">
              <p className="text-gray-600 leading-[1.7] text-[14px] sm:text-[15px]">
                Passionate about technology, travel, and connecting with people
                from around the world. I love exploring new places, trying
                different cuisines, and sharing experiences with friends. Always
                looking for new adventures and opportunities to learn and grow.
              </p>
            </div>
          </div>

          {/* Interests Card */}
          <div className="bg-white rounded-[15px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="bg-gradient-to-r from-pink-500 to-pink-300 text-white p-[10px_20px] sm:p-[15px_25px]">
              <h6 className="text-base font-semibold mb-0">Interests & Hobbies</h6>
            </div>
            <div className="p-[15px] sm:p-[25px]">
              <div className="flex flex-col gap-3 text-sm sm:text-base">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-500">Hobbies</span>
                  <span className="text-gray-800 font-medium">
                    Photography, Reading, Hiking
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-500">Music</span>
                  <span className="text-gray-800 font-medium">Jazz, Rock, Electronic</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-500">Movies</span>
                  <span className="text-gray-800 font-medium">
                    Sci-Fi, Drama, Documentaries
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
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
  const {
    data: friendList,
    isLoading: isLoadingFriends,
    error: errorFriends,
  } = useGetUserFriendsListQuery();

  const [likeProfile] = useLikeprofileMutation();
  const [unfriendFriend] = useUnfriendFriendMutation();
  const [blockFriend] = useBlockFriendMutation();

  // which friend's dropdown is open (userId) or null
  const [activeDropdown, setActiveDropdown] = useState(null);
  // pointer to the currently-open card element (for outside click checks)
  const openCardRef = useRef(null);

  const allFriendsList = friendList?.data?.friends ?? [];
  // console.log("AllFriendList: ", allFriendsList);

  const handleToggleDropdown = (event, friendId) => {
    event.stopPropagation();
    // find the friend-card element that contains the clicked button:
    const cardEl = event.currentTarget.closest(".friend-card");
    if (activeDropdown === friendId) {
      setActiveDropdown(null);
      openCardRef.current = null;
    } else {
      setActiveDropdown(friendId);
      openCardRef.current = cardEl;
    }
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
    openCardRef.current = null;
  };

  // close when clicking outside the open card or pressing Escape
  useEffect(() => {
    const onDocDown = (e) => {
      if (!activeDropdown) return;
      if (openCardRef.current && !openCardRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") closeDropdown();
    };

    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("touchstart", onDocDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("touchstart", onDocDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [activeDropdown]);

  const handleLike = async (userId) => {
    try {
      await likeProfile(userId).unwrap();
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleUnfriend = async (userId) => {
    const result = await Swal.fire({
      title: "Unfriend friend?",
      text: "Are you sure you want to unfriend this friend?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        closeDropdown();

        Swal.fire({
          title: "Unfriending...",
          text: "Please wait",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await unfriendFriend(userId).unwrap();

        Swal.fire(
          "✅ Unfriended!",
          "You have unfriended this friend.",
          "success"
        );
      } catch (error) {
        console.error("Unfriend friend error:", error);
        Swal.fire("❌ Error", "Failed to unfriend friend.", "error");
      }
    }
  };

  const handleBlock = async (userId) => {
    try {
      closeDropdown();

      Swal.fire({
        title: "Blocking...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await blockFriend(userId).unwrap();

      Swal.fire("✅ Blocked!", "You have blocked this friend.", "success");
    } catch (error) {
      console.error("Block friend error:", error);
      Swal.fire("❌ Error", "Failed to block friend.", "error");
    }
  };

  if (isLoadingFriends) return <p>Loading...</p>;
  if (!allFriendsList.length) return <p>No friends found.</p>;

  return (
    <div className="bg-transparent py-4 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 sm:gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allFriendsList.map((friend) => (
            <div key={friend?.userId} className="group relative bg-white rounded-3xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-[280px] sm:h-[310px]"
             ref={activeDropdown === friend?.userId ? openCardRef : null}>
              <div className="relative">
                <img
                  src={`https://shyeyes-b.onrender.com/uploads/${friend?.profilePic}`}
                  alt={friend?.name}
                  className="w-full h-40 sm:h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DefaultImg;
                  }}
                />

                <button
                  className="absolute top-3 right-3 bg-white/70 backdrop-blur-md cursor-pointer p-2 rounded-full text-gray-700 hover:bg-white transition-all duration-300"
                  onClick={(e) => handleToggleDropdown(e, friend?._id)}
                  title="Options"
                >
                  <EllipsisVertical size={18} />
                </button>

                {activeDropdown === friend?._id && (
                  <div
                    className="absolute top-12 right-3 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl z-50 animate-pop"
                  >
                    <button
                      className="w-full px-4 py-3 text-center flex items-center gap-3 hover:bg-gray-50 transition-colors"
                      onClick={() => handleUnfriend(friend?._id)}
                    >
                      <UserX size={18} className="text-gray-700" />
                      <span>Unfriend</span>
                    </button>
                    <div className="h-px bg-gray-200"></div>
                    <button
                      className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors text-red-600"
                      onClick={() => handleBlock(friend?._id)}
                    >
                      <Ban size={18} />
                      <span>Block</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="px-4 sm:px-5 text-center">
                <h6 className="font-bold text-base sm:text-lg text-gray-900 mb-1">{friend?.name}</h6>
                <p className="text-xs sm:text-sm text-gray-600">Active {friend?.active}</p>

               <div className="flex justify-center gap-3 sm:gap-4 mt-2">
                  <Link to="/pricing-plan">
                    <button className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-500 text-white hover:bg-pink-500 transition-all duration-300 shadow-sm hover:shadow-md">
                      <PhoneCall size={18} sm:size={20} />
                    </button>
                  </Link>
                  <Link to="/chat">
                    <button className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-500 text-white hover:bg-pink-500 transition-all duration-300 shadow-sm hover:shadow-md">
                      <MessageCircle size={18} sm:size={20} />
                    </button>
                  </Link>
                  <Link to="/pricing-plan">
                    <button className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-500 text-white hover:bg-pink-500 transition-all duration-300 shadow-sm hover:shadow-md">
                      <Video size={18} sm:size={20} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <SearchWidget />
          <YouMayLikeWidget />
        </div>
      </div>
    </div>
  );
};

// Photos Tab Component
const PhotosTab = ({photos}) => {
  const [addPhotos] = useAddPhotosMutation();
  const [setPhotoAsProfile] = useSetPhotoAsProfileMutation();
  const [deletePhoto] = useDeletePhotoMutation();

  // pagination states
  const [visibleCount, setVisibleCount] = useState(6);
  const photosPerPage = 6;

  const [activeDropdown, setActiveDropdown] = useState(null);
  const openCardRef = useRef(null);

  const handleAddPhoto = async () => {
    const {value: file} = await Swal.fire({
      title: "Upload a Photo",
      html: `
        <input type="file" id="swal-photo-input" accept="image/*" class="swal2-file" />
        <div id="swal-preview" style="margin-top:15px;"></div>
      `,
      showCancelButton: true,
      confirmButtonText: "Upload",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      didOpen: () => {
        const fileInput = Swal.getPopup().querySelector("#swal-photo-input");
        const preview = Swal.getPopup().querySelector("#swal-preview");

        fileInput.addEventListener("change", () => {
          const file = fileInput.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              preview.innerHTML = `
                <img src="${e.target.result}" 
                     style="max-width: 100%; max-height: 200px; border-radius:8px;" />
              `;
            };
            reader.readAsDataURL(file);
          } else {
            preview.innerHTML = "";
          }
        });
      },
      preConfirm: () => {
        const fileInput = Swal.getPopup().querySelector("#swal-photo-input");
        if (!fileInput.files.length) {
          Swal.showValidationMessage("Please select a photo!");
          return false;
        }
        return fileInput.files[0];
      },
    });

    if (file) {
      try {
        const formData = new FormData();
        formData.append("photos", file);

        Swal.fire({
          title: "Uploading...",
          text: "Please wait while your photo is being uploaded.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await addPhotos(formData).unwrap();

        Swal.fire("✅ Uploaded!", "Your photo has been added.", "success");
      } catch (error) {
        Swal.fire("❌ Error", "Failed to upload photo.", "error");
        console.error("Upload error:", error);
      }
    }
  };

  // handle load more
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + photosPerPage);
  };

  const handleToggleDropdown = (event, photoId) => {
    event.stopPropagation();
    const cardEl = event.currentTarget.closest(".photo-item");
    if (activeDropdown === photoId) {
      setActiveDropdown(null);
      openCardRef.current = null;
    } else {
      setActiveDropdown(photoId);
      openCardRef.current = cardEl;
    }
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
    openCardRef.current = null;
  };

  // close when clicking outside the open card or pressing Escape
  useEffect(() => {
    const onDocDown = (e) => {
      if (!activeDropdown) return;
      if (openCardRef.current && !openCardRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") closeDropdown();
    };

    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("touchstart", onDocDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("touchstart", onDocDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [activeDropdown]);

  const handleSetProfile = async (photoId) => {
    try {
      closeDropdown();

      Swal.fire({
        title: "Setting Profile Photo...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await setPhotoAsProfile(photoId).unwrap();

      Swal.fire(
        "✅ Success!",
        "Profile photo updated successfully.",
        "success"
      );
    } catch (error) {
      console.error("Set profile error:", error);
      Swal.fire("❌ Error", "Failed to set profile photo.", "error");
    }
  };

  const handleDeletePhoto = async (photoId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This photo will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        closeDropdown();

        Swal.fire({
          title: "Deleting...",
          text: "Please wait",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await deletePhoto(photoId).unwrap();

        Swal.fire("✅ Deleted!", "Your photo has been deleted.", "success");
      } catch (error) {
        console.error("Delete photo error:", error);
        Swal.fire("❌ Error", "Failed to delete photo.", "error");
      }
    }
  };

  return (
    <div className="bg-white rounded-[15px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 pt-4 sm:pt-6">
      <div className="flex flex-col sm:flex-row justify-between bg-gradient-to-r from-pink-500 to-pink-300 text-white p-4 sm:p-5 text-center">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-0">Photo Gallery</h2>
        <button
          className="border-none px-[10px] py-2 rounded-md"
          onClick={handleAddPhoto}
        >
          Add Photos
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-[10px] sm:gap-[15px] p-[15px] sm:p-[25px]">
        {photos.length === 0 && <p>No photos found.</p>}
        {photos.slice(0, visibleCount).map((photo, index) => (
          <div
            key={index}
            className="aspect-square cursor-pointer transition-transform duration-300 rounded-[10px] overflow-hidden hover:scale-105 relative"
          >
            <img
              src={`https://shyeyes-b.onrender.com/uploads/${photo}`}
              alt={`Photo ${index + 1}`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = DefaultImg;
              }}
              className="w-full h-full object-cover"
            />

            {/* three-dot button */}
            <button
              className="absolute top-2 right-2 bg-white/30 backdrop-blur-[10px] p-[6px] rounded-full cursor-pointer flex items-center justify-center"
              onClick={(e) => handleToggleDropdown(e, photo)}
              aria-haspopup="true"
              aria-expanded={activeDropdown === photo}
              aria-controls={
                activeDropdown === photo ? `dropdown-${photo}` : undefined
              }
              title="Options"
            >
              <EllipsisVertical />
            </button>

            {/* Dropdown rendered INSIDE this card so it scrolls with it */}
            {activeDropdown === photo && (
              <div
                id={`dropdown-${photo}`}
                className="absolute top-[44px] right-2 min-w-[150px] bg-white/60 backdrop-blur-[10px] rounded-[10px] shadow-[0_8px_24px_rgba(19,23,28,0.12)] z-40 overflow-hidden transform-origin-top-right animate-pop"
                role="menu"
                aria-label={`Options for ${photo}`}
              >
                <button
                  className="flex items-center gap-[10px] w-full px-3 py-2.5 bg-transparent border-none text-left cursor-pointer text-sm text-gray-800 hover:bg-gray-100/40"
                  onClick={() => handleSetProfile(photo)}
                  role="menuitem"
                >
                  <span>Set as Profile</span>
                </button>

                <div className="h-px bg-gray-200 my-1" />

                <button
                  className="flex items-center gap-[10px] w-full px-3 py-2.5 bg-transparent border-none text-left cursor-pointer text-sm text-red-600 hover:bg-gray-100/40"
                  onClick={() => handleDeletePhoto(photo)}
                  role="menuitem"
                >
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {visibleCount < photos.length && (
        <div className="text-center mt-[30px] pb-5">
          <button className="bg-pink-500 text-white border-none px-[20px] sm:px-[30px] py-3 rounded-[25px] font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_12px_rgba(236,72,153,0.2)] hover:bg-pink-600 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(236,72,153,0.3)]" onClick={handleLoadMore}>
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
    <div className="bg-white rounded-[15px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100">
      <div className="bg-gradient-to-r from-pink-500 to-pink-300 text-white p-[10px_15px] sm:p-[15px_20px]">
        <h5 className="text-base font-semibold mb-0">Find People</h5>
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-gray-500 text-sm mb-5 leading-relaxed">
          Connect with people who share your interests
        </p>
        <form className="flex flex-col gap-3 text-sm">
          <select className="w-full p-[10px] border border-gray-300 rounded-lg bg-white text-gray-700 outline-none focus:border-pink-500 focus:shadow-[0_0_0_3px_rgba(236,72,153,0.1)]">
            <option value="">I am a</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select className="w-full p-[10px] border border-gray-300 rounded-lg bg-white text-gray-700 outline-none focus:border-pink-500 focus:shadow-[0_0_0_3px_rgba(236,72,153,0.1)]">
            <option value="">Looking for</option>
            <option value="friends">Friends</option>
            <option value="networking">Networking</option>
            <option value="dating">Dating</option>
          </select>
          <div className="grid grid-cols-2 gap-[10px]">
            <select className="w-full p-[10px] border border-gray-300 rounded-lg bg-white text-gray-700 outline-none focus:border-pink-500 focus:shadow-[0_0_0_3px_rgba(236,72,153,0.1)]">
              <option value="">Age from</option>
              <option value="18">18</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
            <select className="w-full p-[10px] border border-gray-300 rounded-lg bg-white text-gray-700 outline-none focus:border-pink-500 focus:shadow-[0_0_0_3px_rgba(236,72,153,0.1)]">
              <option value="">Age to</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
          <select className="w-full p-[10px] border border-gray-300 rounded-lg bg-white text-gray-700 outline-none focus:border-pink-500 focus:shadow-[0_0_0_3px_rgba(236,72,153,0.1)]">
            <option value="">Location</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
          </select>
          <button type="button" className="bg-pink-500 text-white border-none p-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-pink-600 hover:-translate-y-0.5">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

const YouMayLikeWidget = () => {
  const suggestions = mockFriends.slice(0, 9);

  return (
    <div className="bg-white rounded-[15px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100">
      <div className="bg-gradient-to-r from-pink-500 to-pink-300 text-white p-[10px_15px] sm:p-[15px_20px]">
        <h5 className="text-base font-semibold mb-0">People You May Know</h5>
      </div>
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-[10px]">
          {suggestions.map((person, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden relative">
              <img src={person.image} alt="suggestion" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 flex items-center justify-center transition-all duration-300 hover:bg-black/50">
                <Heart size={20} className="text-white opacity-0 transition-opacity duration-300 hover:opacity-100" />
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
    <div className="bg-white rounded-[15px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100">
      <div className="bg-gradient-to-r from-pink-500 to-pink-300 text-white p-[10px_15px] sm:p-[15px_20px]">
        <h5 className="text-base font-semibold mb-0">Join The Friends</h5>
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-5 pb-5 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
          <h6 className="text-base font-semibold text-gray-800 mb-2">Active Friends A1</h6>
          <p className="text-gray-500 text-sm mb-3 leading-relaxed">
            Collaboratively fabricate best breed and applications through
            visionary
          </p>
          <div className="flex items-center gap-[10px] mb-3">
            <div className="flex -ml-[5px]">
              {mockGroupMembers.map((avatar, i) => (
                <img key={i} src={avatar} alt="Member" className="w-6 h-6 rounded-full border-2 border-white -ml-[5px] object-cover" />
              ))}
            </div>
            <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-[10px]">12+</span>
          </div>
          <button className="bg-gradient-to-r from-pink-500 to-pink-300 text-white border-none px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-500 hover:-translate-y-0.5">View Friends</button>
        </div>

        <div className="mb-5 pb-5 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
          <h6 className="text-base font-semibold text-gray-800 mb-2">Active Friends A2</h6>
          <p className="text-gray-500 text-sm mb-3 leading-relaxed">
            Collaboratively fabricate best breed and applications through
            visionary
          </p>
          <div className="flex items-center gap-[10px] mb-3">
            <div className="flex -ml-[5px]">
              {mockGroupMembers.map((avatar, i) => (
                <img key={i} src={avatar} alt="Member" className="w-6 h-6 rounded-full border-2 border-white -ml-[5px] object-cover" />
              ))}
            </div>
            <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-[10px]">16+</span>
          </div>
          <button className="bg-gradient-to-r from-pink-500 to-pink-300 text-white border-none px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-500 hover:-translate-y-0.5">View Friends</button>
        </div>
      </div>
    </div>
  );
};

// Main Profile Page Component
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [coverImage, setCoverImage] = useState(defaultCover);

  const { id } = useParams();
  const [isBlockedListOpen, setIsBlockedListOpen] = useState(false);
  const openBlockedList = () => setIsBlockedListOpen(true);
  const closeBlockedList = () => setIsBlockedListOpen(false);

  const { data: blockedUsersData = [], isLoading: isLoadingBlocked, refetch: refetchBlocked } = useGetBlockedFriendsQuery();
  const [blockFriend] = useBlockFriendMutation();

  const {
    data: userDataRes,
    isLoading: userLoading,
    error: userError,
  } = useGetUserProfileQuery();

  const {
    data: friendDataRes,
    isLoading: friendLoading,
    error: friendError,
  } = useGetFriendProfileQuery(id, {skip: !id});

  const {
    data: friendList,
    isLoading: isLoadingFriends,
    error: errorFriends,
  } = useGetUserFriendsListQuery();

  const userData = id ? friendDataRes?.user : userDataRes?.data?.user;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  useEffect(() => {
    const onDocDown = (e) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        closeDropdown();
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") closeDropdown();
    };

    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("touchstart", onDocDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("touchstart", onDocDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isDropdownOpen]);

  if (userLoading || friendLoading || isLoadingFriends) {
    return <h1>Loading...</h1>;
  }

  if (userError || friendError || errorFriends) {
    return <h1>Something went wrong. Please try again.</h1>;
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProfileImage(newImageUrl);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setCoverImage(newImageUrl);
    }
  };

  const totalFriends = friendList?.data?.friends?.length;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-200 font-sans pt-4 sm:pt-6">
      <ProfileHeader
        userData={userData}
        onAddFriend={() => setShowAddFriends(true)}
        onPrivateMessage={() => setShowChat(true)}
        onProfileImageChange={handleProfileImageChange}
        onCoverImageChange={handleCoverImageChange}
        profileImage={profileImage}
        coverImage={coverImage}
      />

      {/* Profile Navigation */}
      <div className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto p-[0_10px] sm:p-[0_20px]">
          <nav className="flex flex-wrap gap-2 sm:gap-0 cursor-pointer items-center">
            <button
              className={`px-4 py-3 sm:px-6 sm:py-4 bg-none border-none cursor-pointer font-medium text-gray-500 relative transition-all duration-300 flex items-center gap-2 hover:text-pink-500 hover:bg-pink-50 ${activeTab === "activity" ? "text-pink-500" : ""}`}
              onClick={() => setActiveTab("activity")}
            >
              Activity
              {activeTab === "activity" && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-500 to-pink-300 rounded-t-[2px]"></div>}
            </button>
            <button
              className={`px-4 py-3 sm:px-6 sm:py-4 bg-none border-none cursor-pointer font-medium text-gray-500 relative transition-all duration-300 flex items-center gap-2 hover:text-pink-500 hover:bg-pink-50 ${activeTab === "profile" ? "text-pink-500" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
              {activeTab === "profile" && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-500 to-pink-300 rounded-t-[2px]"></div>}
            </button>
            <button
              className={`px-4 py-3 sm:px-6 sm:py-4 bg-none border-none cursor-pointer font-medium text-gray-500 relative transition-all duration-300 flex items-center gap-2 hover:text-pink-500 hover:bg-pink-50 ${activeTab === "friends" ? "text-pink-500" : ""}`}
              onClick={() => setActiveTab("friends")}
            >
              Friends <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">{totalFriends}</span>
              {activeTab === "friends" && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-500 to-pink-300 rounded-t-[2px]"></div>}
            </button>
            <button
              className={`px-4 py-3 sm:px-6 sm:py-4 bg-none border-none cursor-pointer font-medium text-gray-500 relative transition-all duration-300 flex items-center gap-2 hover:text-pink-500 hover:bg-pink-50 ${activeTab === "photos" ? "text-pink-500" : ""}`}
              onClick={() => setActiveTab("photos")}
            >
              Photos
              {activeTab === "photos" && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-500 to-pink-300 rounded-t-[2px]"></div>}
            </button>

            {/* Dropdown */}
            <div className="relative flex items-center" ref={dropdownRef}>
              <button
                className="border-2 border-pink-500/50 bg-white/30 backdrop-blur-[10px] p-[6px] rounded-full cursor-pointer flex items-center justify-center ml-[10px] active:scale-90 active:bg-gray-200/90"
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                aria-controls={isDropdownOpen ? "global-dropdown" : undefined}
                title="Options"
              >
                <EllipsisVertical />
              </button>

              {isDropdownOpen && (
                <div
                  id="global-dropdown"
                  className="absolute top-[44px] right-2 min-w-[150px] bg-white/60 backdrop-blur-[10px] rounded-[10px] shadow-[0_8px_24px_rgba(19,23,28,0.12)] z-40 overflow-hidden transform-origin-top-right animate-pop"
                  role="menu"
                >
                  <button
                    className="flex items-center gap-[10px] w-full px-3 py-2.5 bg-transparent border-none text-left cursor-pointer text-sm text-gray-800 hover:bg-gray-100/40 font-bold"
                    role="menuitem"
                    onClick={openBlockedList}
                  >
                    <span>Blocked List</span>
                  </button>
                  <div className="h-px bg-gray-200 my-1" />
                  <button className="flex items-center gap-[10px] w-full px-3 py-2.5 bg-transparent border-none text-left cursor-pointer text-sm text-gray-800 hover:bg-gray-100/40 font-bold" role="menuitem">
                    <span>All Notifications</span>
                  </button>
                </div>
              )}
            </div>

            {/* Off-canvas Blocked List */}
            {isBlockedListOpen && (
              <>
                {/* Overlay */}
                <div
                  className="fixed inset-0 bg-black/50 z-[200] backdrop-blur-sm transition-opacity duration-300"
                  onClick={closeBlockedList}
                />

                {/* Sidebar */}
                <div className="fixed top-16 right-0 w-[90%] sm:w-96 h-[calc(100vh-4rem)] bg-white shadow-2xl z-[300] overflow-hidden transition-transform duration-300">
                  
                  {/* Header */}
                  <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-pink-400 text-white p-4 sm:p-5 flex justify-between items-center shadow-lg ">
                    <h2 className="text-lg sm:text-xl font-bold">Blocked Users</h2>
                    <button
                      onClick={closeBlockedList}
                      className="p-2 rounded-full hover:bg-white/20 transition-colors active:scale-95"
                    >
                      &times;
                    </button>
                  </div>

                  {/* Content */}
                  <div className="overflow-y-auto h-[calc(100%-5rem)] p-4">
                    {isLoadingBlocked ? (
                      <p className="text-center text-gray-500">Loading...</p>
                    ) : !blockedUsersData?.blockedUsers || blockedUsersData.blockedUsers.length === 0 ? (
                      <div className="text-center py-16">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-auto h-14 w-14 text-gray-300 mb-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
                        </svg>
                        <p className="text-gray-500 font-medium">No blocked users</p>
                        <p className="text-gray-400 text-sm mt-2">Users you block will appear here</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {blockedUsersData.blockedUsers.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-gray-100"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={user.profilePic
                                  ? `https://yourcdn.com/${user.profilePic}`
                                  : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                alt={user.email || "User"}
                                onError={(e) => {
                                  e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
                                }}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                              />
                              <div>
                                <p className="font-medium text-gray-800 text-sm sm:text-base">{user.email}</p>
                                <p className="text-xs text-gray-500">Blocked user</p>
                              </div>
                            </div>
                            <button
                              className="px-3 py-1 sm:px-4 sm:py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-all duration-200 hover:shadow-md active:scale-95"
                              onClick={async () => {
                                try {
                                  await blockFriend({ friendId: user.id, action: "unblock" }).unwrap();
                                  refetchBlocked();
                                } catch (err) {
                                  console.error("Failed to unblock:", err);
                                }
                              }}
                            >
                              Unblock
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}


          </nav>
        </div>
      </div>



      <div className="max-w-[1200px] mx-auto p-[20px_10px] sm:p-[30px_20px] pt-8 xs:pt-10 sm:pt-12">
        {renderTabContent()}
      </div>

      <AddFriendsPopup isOpen={showAddFriends} onClose={() => setShowAddFriends(false)} userData={userData} />
      <ChatBox isOpen={showChat} onClose={() => setShowChat(false)} userData={userData} />
    </div>
  );
};

export default ProfilePage;