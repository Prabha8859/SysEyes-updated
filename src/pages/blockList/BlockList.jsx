import { useState } from "react";
import { X } from "lucide-react";
import {
  useGetBlockedFriendsQuery,
  useBlockFriendMutation,
} from "../../service/usersApi";
import DefaultImg from "../../assets/images/profile/default-img.jpg";
import Swal from "sweetalert2";

const IMG_BASE_URL = "https://shyeyes-b.onrender.com/uploads/";

export default function BlockList() {
  const {
    data: blockedUsersList,
    isLoading,
    isError,
  } = useGetBlockedFriendsQuery();
  const blockedUsers = blockedUsersList?.blockedUsers ?? [];
  console.log("BlockedUserList", blockedUsers);

  const [blockFriend] = useBlockFriendMutation();

  const handleUnblock = async (userId) => {
    console.log("Unblocking user with ID:", userId);
    try {
      Swal.fire({
        title: "Unblocking...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await blockFriend(userId).unwrap();

      Swal.fire("✅ UnBlocked!", "You have unblocked this friend.", "success");
    } catch (error) {
      console.error("Unblock friend error:", error);
      Swal.fire("❌ Error", "Failed to Unblock friend.", "error");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center px-8 py-16 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 font-['Poppins',sans-serif]">
      {/* Background effect */}
      <div className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] pointer-events-none z-0"
           style={{
             background: 'radial-gradient(circle at 30% 30%, rgba(255, 182, 193, 0.15), transparent 70%)'
           }}>
      </div>

      {/* Page Title */}
      <h2 className="text-5xl font-extrabold text-pink-900 mb-12 text-center relative z-10">
        🚫 Blocked Users
      </h2>

      {isLoading ? (
        <h3 className="text-xl text-pink-800">Loading...</h3>
      ) : blockedUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl relative z-10">
          {blockedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white/[0.18] backdrop-blur-xl rounded-[1.8rem] p-8 text-center shadow-lg transition-all duration-400 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
              style={{
                boxShadow: '0 8px 25px rgba(155, 28, 107, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(155, 28, 107, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(155, 28, 107, 0.15)';
              }}
            >
              {/* Avatar Wrapper */}
              <div className="relative mb-4">
                <img
                  src={`${IMG_BASE_URL}/${user?.profilePic}`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DefaultImg;
                  }}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full border-4 border-pink-600 object-cover mx-auto transition-all duration-300 ease-in-out shadow-lg hover:scale-110"
                  style={{
                    boxShadow: '0 5px 15px rgba(214, 51, 132, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(214, 51, 132, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(214, 51, 132, 0.3)';
                  }}
                />
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-purple-900 mb-1">
                {user.name}
              </h3>

              {/* Blocked Date */}
              <p className="text-sm text-pink-700 mb-6">
                Blocked on:{" "}
                {new Date(user?.blockedAt).toLocaleString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>

              {/* Unblock Button */}
              <button
                onClick={() => handleUnblock(user?.id)}
                className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-pink-600 to-pink-900 text-white border-none rounded-full text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-lg hover:-translate-y-0.5 hover:scale-105"
                style={{
                  boxShadow: '0 5px 20px rgba(214, 51, 132, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(214, 51, 132, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(214, 51, 132, 0.3)';
                }}
              >
                <X size={16} />
                Unblock
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h6 className="mt-20 text-center text-xl text-pink-900">
          ✨ You haven't blocked anyone yet
        </h6>
      )}
      
      {isError && (
        <p className="text-red-600 mt-4">Error fetching blocked users</p>
      )}
    </div>
  );
}