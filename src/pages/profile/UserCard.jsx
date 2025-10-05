import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaCommentDots,
  FaVideo,
  FaHeart,
  FaUserCheck,
  FaUserPlus,
  FaHourglassHalf,
  FaBan,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLikeUserMutation } from "../../service/usersApi";
import DefaultImg from "../../assets/images/profile/Women-Avtar.jpg";

const UserCard = ({ user, onChatClick, onRequest,onCancelRequest,onShowAlert }) => {
  const [showBurst, setShowBurst] = useState(false);
  const [liked, setLiked] = useState(user.isLiked || false);

  const [likeUser] = useLikeUserMutation();

  const handleLike = async () => {
    try {
      const updatedLiked = !liked;
      setLiked(updatedLiked);
      setShowBurst(updatedLiked);

      // call backend API
      await likeUser(user.id).unwrap();
      
      // Hide burst after animation
      if (updatedLiked) {
        setTimeout(() => setShowBurst(false), 800);
      }
    } catch (err) {
      console.error("Like API error:", err);
      // rollback state if API fails
      setLiked((prev) => !prev);
    }
  };

  const status = user?.raw?.friendshipStatus;

  const renderButton = () => {
    if (status === "Requested") {
      return (
        <button 
          className="w-full mb-2 px-6 py-3 rounded-full font-semibold text-sm tracking-wide text-white flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-br from-[#FFB74D] to-[#FFA726] shadow-[0_4px_15px_rgba(255,183,77,0.3)] hover:from-[#FB8C00] hover:to-[#FF9800] hover:-translate-y-0.1 hover:shadow-[0_8px_25px_rgba(255,152,0,0.3)] cursor-pointer" 
           onClick={() => onCancelRequest(user.id)}
        >
          <FaHourglassHalf className="text-sm" /> Cancel Request
        </button>
      );
    } else if (status === "Friend") {
      return (
        <button 
          className="w-full mb-2 px-6 py-3 rounded-full font-semibold text-sm tracking-wide text-white flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] shadow-[0_4px_15px_rgba(76,175,80,0.3)] hover:from-[#43A047] hover:to-[#5CB85C] hover:-translate-y-0.1 hover:shadow-[0_8px_25px_rgba(76,175,80,0.3)] cursor-pointer" 
          disabled
        >
          <FaUserCheck className="text-sm" /> Friends
        </button>
      );
    } else if (status === "None") {
      return (
        <button 
          className="w-full mb-2 px-6 py-3 rounded-full font-semibold text-sm tracking-wide text-white flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-br from-[#4a4a4a] to-[#232323] shadow-[0_4px_15px_rgba(14,14,14,0.3)] hover:from-[#1e1e1e] hover:to-[#080808] hover:-translate-y-0.1 hover:shadow-[0_8px_25px_rgba(29,29,29,0.3)] cursor-pointer" 
          disabled
        >
          <FaBan className="text-sm" /> Blocked
        </button>
      );
    }else if (status === "Pending") {
      return (
        <button className="send-btn pending" disabled>
          <FaHourglassHalf className="icon" /> Pending
        </button>
      );
    } else {
          return (
           <button 
                className="w-full mb-2 px-6 py-3 rounded-full font-semibold text-sm tracking-wide text-white flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-br from-[#ff4d8d] to-[#ff6b9d] shadow-[0_4px_15px_rgba(255,77,141,0.3)] hover:from-[#ff357d] hover:to-[#ff5a8d] hover:-translate-y-0.1 hover:shadow-[0_8px_25px_rgba(255,77,141,0.3)] backdrop-blur-[5px] cursor-pointer"
                onClick={() => onRequest(user.id)}
              >
                <FaUserPlus className="text-sm" /> Send Request
            </button>
          );
      }
  };

    // return (
    //   <button 
    //     className="w-full mb-4 px-6 py-3 rounded-full font-semibold text-sm tracking-wide text-white flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-br from-[#ff4d8d] to-[#ff6b9d] shadow-[0_4px_15px_rgba(255,77,141,0.3)] hover:from-[#ff357d] hover:to-[#ff5a8d] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,77,141,0.4)] backdrop-blur-[10px]"
    //     onClick={() => onRequest(user.id)}
    //   >
    //     <FaUserPlus className="text-sm" /> Send Request
    //   </button>
    // );

  return (
    <>
      <div className="w-full max-w-[320px] mx-auto relative overflow-hidden rounded-[20px] bg-white/95 backdrop-blur-[15px] border border-white/30 shadow-[0_8px_25px_rgba(223,49,77,0.1)] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-3 hover:scale-[1] hover:shadow-[0_20px_50px_rgba(223,49,77,0.25)] hover:border-[rgba(255,77,141,0.4)] hover:bg-white/98 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(255,77,141,0.05)] before:to-[rgba(255,107,157,0.03)] before:opacity-0 before:transition-opacity before:duration-300 before:rounded-[20px] before:z-[1] hover:before:opacity-100">
        
        {/* User Image */}
        <div className="relative h-[200px] overflow-hidden  group">
          <img
            src={user.image}
            alt={user.name}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-[400ms] ease-out  "
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DefaultImg;
            }}
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 z-[1000] bg-gradient-to-br from-[rgba(223,49,77,0.7)] to-[rgba(255,77,141,0.6)] backdrop-blur-[3px] flex items-center justify-center opacity-0 transition-all duration-[400ms] group-hover:opacity-100">
            <Link
              to={`/profile/${user?.id}`}
              className="text-white no-underline bg-white/25 px-6 py-2 rounded-full backdrop-blur-[10px] border border-white/30 transition-all duration-300 font-semibold text-sm tracking-wide translate-y-2 group-hover:translate-y-0 group-hover:bg-white/35 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:bg-white/45 hover:-translate-y-0.1 hover:scale-105"
            >
              View Profile
            </Link>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 text-center relative z-[2] bg-white/5 backdrop-blur-[5px]">
          {renderButton()}

          <div className="mb-1">
            {user.online ? (
              <div className="flex items-center justify-center gap-2">
                <h4 className="text-[#333] m-0 text-xl font-bold tracking-wide [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]">
                  {user.name}
                </h4>
                <span 
                  className="w-3 h-3 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-full inline-block border-2 border-white shadow-[0_0_0_0_rgba(76,175,80,0.7)] animate-[pulse_2s_infinite]" 
                  title="Online"
                />
              </div>
            ) : (
                <h4 className="text-[#333] m-0 text-xl font-bold tracking-wide [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]">
                  {user.name}
                </h4>
              )}
          </div>

           <div className="flex items-center justify-center gap-2 mb-2">
              {user.age && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#fff0f5] to-[#ffe4ec] rounded-full border border-[#ffcdd9]">
                  <span className="text-[#ff4d8d] text-xs font-bold">AGE: </span>
                  <span className="text-[#666] text-sm font-semibold">{user.age}</span>
                </div>
              )}

              {/* {user.location && (
                <div className="flex items-center gap-1.5 px-1 py-1.5 bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] rounded-full border border-[#b3e5fc]">
                  <span className="text-[#0288d1] text-sm">📍</span>
                  <span className="text-[#666] text-sm font-medium truncate max-w-[150px]" title={user.location}>
                    {user.location}
                  </span>
                </div>
              )} */}
            </div>

          {/* Button Group */}
          <div className="flex justify-center gap-3">
            {/* Like Button */}
            <div className="relative inline-block">
              <button
                className={`relative w-[45px] h-[45px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-base shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:bg-gradient-to-br before:from-[#ff4d8d] before:to-[#ff6b9d] before:rounded-full before:transition-all before:duration-300 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[1] hover:before:w-full hover:before:h-full hover:text-white hover:border-[#ff4d8d] hover:-translate-y-[3px] hover:scale-110 hover:shadow-[0_8px_25px_rgba(255,77,141,0.3)] ${
                  liked 
                    ? 'bg-white text-red-500 border-2 border-[#ff4d6d]' 
                    : 'bg-[rgba(248,249,250,0.9)] backdrop-blur-[10px] border-2 border-[rgba(223,49,77,0.1)] text-[#666]'
                }`}
                onClick={handleLike}
              >
                <FaHeart className="relative z-[2] transition-all duration-300 hover:scale-110" />
              </button>

              {showBurst && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute text-lg text-red-500 opacity-90 animate-[fly_0.8s_ease_forwards]"
                      style={{
                        transform: i === 0 ? 'translate(0, 0)' : 
                                  i === 1 ? 'translate(-10px, -10px)' :
                                  i === 2 ? 'translate(10px, -15px)' :
                                  i === 3 ? 'translate(-15px, 5px)' :
                                  i === 4 ? 'translate(15px, 10px)' :
                                  'translate(0, -20px)',
                        animationDelay: `${i * 0.05}s`,
                        '--x': i === 0 ? '20px' : 
                               i === 1 ? '-30px' :
                               i === 2 ? '40px' :
                               i === 3 ? '-35px' :
                               i === 4 ? '45px' :
                               '0px',
                        '--y': i === 0 ? '-30px' : 
                               i === 1 ? '-40px' :
                               i === 2 ? '-45px' :
                               i === 3 ? '-35px' :
                               i === 4 ? '-40px' :
                               '-50px',
                      }}
                    >
                      ❤️
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Audio Call Button */}
            <button
              className="relative w-[45px] h-[45px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-[#666] text-base shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden bg-[rgba(248,249,250,0.9)] backdrop-blur-[10px] border-2 border-[rgba(223,49,77,0.1)] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:bg-gradient-to-br before:from-[#ff4d8d] before:to-[#ff6b9d] before:rounded-full before:transition-all before:duration-300 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[1] hover:before:w-full hover:before:h-full hover:text-white hover:border-[#ff4d8d] hover:-translate-y-[3px] hover:scale-110 hover:shadow-[0_8px_25px_rgba(255,77,141,0.3)]"
              onClick={() => onShowAlert("Audio")}
            >
              <FaPhoneAlt className="relative z-[2] transition-all duration-300 hover:scale-110" />
            </button>

            {/* Chat Button */}
            <button
              className="relative w-[45px] h-[45px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-[#666] text-base shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden bg-[rgba(248,249,250,0.9)] backdrop-blur-[10px] border-2 border-[rgba(223,49,77,0.1)] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:bg-gradient-to-br before:from-[#ff4d8d] before:to-[#ff6b9d] before:rounded-full before:transition-all before:duration-300 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[1] hover:before:w-full hover:before:h-full hover:text-white hover:border-[#ff4d8d] hover:-translate-y-[3px] hover:scale-110 hover:shadow-[0_8px_25px_rgba(255,77,141,0.3)]"
              onClick={() => onChatClick(user)}
            >
              <FaCommentDots className="relative z-[2] transition-all duration-300 hover:scale-110" />
            </button>

            {/* Video Call Button */}
            <button
              className="relative w-[45px] h-[45px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-[#666] text-base shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden bg-[rgba(248,249,250,0.9)] backdrop-blur-[10px] border-2 border-[rgba(223,49,77,0.1)] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:bg-gradient-to-br before:from-[#ff4d8d] before:to-[#ff6b9d] before:rounded-full before:transition-all before:duration-300 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[1] hover:before:w-full hover:before:h-full hover:text-white hover:border-[#ff4d8d] hover:-translate-y-[3px] hover:scale-110 hover:shadow-[0_8px_25px_rgba(255,77,141,0.3)]"
              onClick={() => onShowAlert("Video")}
            >
              <FaVideo className="relative z-[2] transition-all duration-300 hover:scale-110" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 0 8px rgba(76, 175, 80, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
          }
        }

        @keyframes fly {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y)) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default UserCard;