import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserCard from "./UserCard";
import { ChevronLeft, ChevronRight, User, Filter } from "lucide-react";
import defImg from "../../assets/images/profile/Women-Avtar.jpg";
import {
  useActiveUsersQuery,
  useSendFriendRequestMutation,
  useSearchUsersQuery,
} from "../../service/usersApi";

const Profile = () => {
  const navigate = useNavigate();
 const token = localStorage.getItem("token");

  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);
  const [filters, setFilters] = useState({
    online: "all",
    ageRange: "all",
    location: "all",
  });
  

  // Debounce search term
  useEffect(() => {
    const t = setTimeout(() => setDebouncedTerm(term.trim()), 300);
    return () => clearTimeout(t);
  }, [term]);

  // ✅ RTK Query API calls
  const { data: activeUsersData, isLoading: activeLoading } = useActiveUsersQuery();
  const { data: searchData, isLoading: searchLoading } = useSearchUsersQuery(debouncedTerm, {
    skip: !debouncedTerm,
  });
  const [sendRequest] = useSendFriendRequestMutation();

  // Normalize API data
  const rawUsers = useMemo(() => {
    if (debouncedTerm) {
      if (!searchData) return [];
      return (
        searchData?.data?.users ?? searchData?.users ?? (Array.isArray(searchData) ? searchData : [])
      );
    }
    if (!activeUsersData) return [];
    return (
      activeUsersData?.data?.users ?? activeUsersData?.users ?? (Array.isArray(activeUsersData) ? activeUsersData : [])
    );
  }, [activeUsersData, searchData, debouncedTerm]);

  // Track requested users
  const [usersState, setUsersState] = useState([]);
  useEffect(() => {
    const requested = JSON.parse(localStorage.getItem("requestedUsers") || "[]");

    const mappedUsers = (rawUsers || []).map((u) => {
      let locationStr = "Unknown";
      if (u.location) {
        if (typeof u.location === "string") locationStr = u.location;
        else if (typeof u.location === "object") {
          const city = u.location.city;
          const country = u.location.country;
          locationStr = [city, country].filter(Boolean).join(", ") || "Unknown";
        }
      }

      return {
        id: u._id ?? u.id ?? Math.random().toString(36).slice(2),
        name: u?.Name?.firstName ? `${u.Name.firstName} ${u.Name.lastName ?? ""}`.trim() : u.name ?? "No Name",
        age: typeof u.age === "number" ? `${u.age} Years Old` : u.age ?? "N/A",
        ageNum: typeof u.age === "number" ? u.age : null,
        location: locationStr,
        online: !!u.isOnline,
        image: u.profilePic
          ? u.profilePic.startsWith("http")
            ? u.profilePic
            : `https://shyeyes-b.onrender.com/uploads/${u.profilePic}`
          : defImg,
        requested: requested.includes(u._id),
        raw: u,
      };
    });

    setUsersState(mappedUsers);
  }, [rawUsers]);

  // --- Filters ---
  const filteredUsers = useMemo(() => {
    return usersState.filter((u) => {
      if (filters.online === "online" && !u.online) return false;
      if (filters.online === "offline" && u.online) return false;

      if (filters.ageRange === "18-24" && (u.ageNum == null || u.ageNum < 18 || u.ageNum > 24))
        return false;
      if (filters.ageRange === "25-30" && (u.ageNum == null || u.ageNum < 25 || u.ageNum > 30))
        return false;

      if (filters.location !== "all" && u.location !== filters.location) return false;

      if (debouncedTerm && !u.name.toLowerCase().includes(debouncedTerm.toLowerCase()))
        return false;

      return true;
    });
  }, [usersState, filters, debouncedTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / cardsPerPage));
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const uniqueLocations = useMemo(() => [...new Set(usersState.map((u) => u.location))].sort(), [usersState]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ online: "all", ageRange: "all", location: "all" });
    setCurrentPage(1);
  };

  const handleChatClick = useCallback(() => navigate("/chat"), [navigate]);

  const showSubscriptionAlert = useCallback(
    (feature) => {
      Swal.fire({
        title: "Subscription Required",
        text: `${feature} feature is available only for subscribed users.`,
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#df314d",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Subscribe Now",
        cancelButtonText: "Maybe Later",
      }).then((result) => {
        if (result.isConfirmed) navigate("/pricing-plan");
      });
    },
    [navigate]
  );

  const handleRequest = async (receiverId) => {
    try {
      Swal.fire({ title: "Sending Request...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      let response = await sendRequest(receiverId).unwrap();
      Swal.close();
      if (response.sent === true) Swal.fire("Success", "Request sent successfully", "success");
      else Swal.fire("Error", `${response.message}`, "error");
    } catch (error) {
      Swal.close();
      console.log("Error while sending request:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  const handleCancelRequest = async (receiverId) => {
    try {
      Swal.fire({ title: "Canceling Request...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      let response = await sendRequest(receiverId).unwrap();
      Swal.close();
      if (response.sent === false) Swal.fire("Success", "Request canceled successfully", "success");
      else Swal.fire("Error", `${response.message}`, "error");
    } catch (error) {
      Swal.close();
      console.log("Error while Canceling request:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };


  const isAnyLoading = activeLoading || searchLoading;

  const goToPage = (page) => setCurrentPage(page);


  // const uniqueLocations = [...new Set(users.map(user => user.location))].sort();

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-24 px-5 text-center">
      <div className="w-15 h-15 border-4 border-gray-200 border-t-[#df314d] rounded-full animate-spin mb-5"></div>
      <p className="text-gray-600 text-xl font-medium">Finding perfect matches for you...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s ease;
        }
        
        .animate-slideInUp-delay-200 {
          animation: slideInUp 0.8s ease 0.2s both;
        }
        
        .animate-slideInUp-delay-400 {
          animation: slideInUp 0.8s ease 0.4s both;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-3s {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-0 { animation-delay: 0s; }
        .animation-delay-2s { animation-delay: 2s; }
        .animation-delay-4s { animation-delay: 4s; }
        
        .hero-bg {
          background-image: url("https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80");
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
        
        .filter-dropdown {
          display: none;
        }
        
        .filter-toggle-wrapper:hover .filter-dropdown {
          display: block;
        }
        
        .card-wrapper {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s ease forwards;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-[60vh] pt-[8%] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 hero-bg"></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#12070761]"></div>
        
        {/* Container */}
        <div className="max-w-6xl mx-auto px-5 relative z-[2]">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4 drop-shadow-lg animate-slideInUp text-white">
              Perfect Matches For You
            </h1>
            <p className="text-xl mb-8 opacity-95 animate-slideInUp-delay-200">
              Discover amazing people waiting to connect with you
            </p>
            <div className="flex justify-center items-center gap-2.5 animate-slideInUp-delay-400">
              <Link 
                to="/" 
                className="text-white/90 no-underline py-2 px-4 rounded-3xl transition-all duration-300 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-0.5"
              >
                Home
              </Link>
              <span className="text-white/70 text-xl">›</span>
              <span className="text-white/80">Profiles</span>
            </div>
          </div>
        </div>

        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-full">
            <div className="absolute top-[20%] right-[10%] text-3xl text-white/30 animate-float animation-delay-0">💖</div>
            <div className="absolute top-[60%] left-[8%] text-3xl text-white/30 animate-float animation-delay-2s">💝</div>
            <div className="absolute top-[30%] left-[20%] text-3xl text-white/30 animate-float animation-delay-4s">💕</div>
          </div>
        </div>
      </section>

      {/* Profiles Section */}
      <section className="py-2.5 min-h-[80vh] bg-white relative rounded-t-[30px] shadow-[0_-5px_20px_rgba(223,49,77,0.1)] animate-slideInUp">
        <div className="max-w-6xl mx-auto px-5">
          {isAnyLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* Search Bar */}
              <div className="flex justify-end items-center mb-5 bg-white py-2 px-4 rounded-2xl shadow-[0_10px_30px_rgba(223,49,77,0.1)] border border-[rgba(223,49,77,0.08)] relative">
                <span className="text-xl font-semibold text-gray-800 mr-auto pl-3">Filter Profiles</span>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={term}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="py-2 px-2 border border-[rgba(223,49,77,0.2)] rounded-2xl text-sm text-[#df314d] bg-gray-50 transition-all duration-300 max-w-[300px] cursor-pointer placeholder-[#df314d] placeholder-opacity-70 focus:outline-none focus:border-[#df314d] focus:shadow-[0_0_8px_rgba(223,49,77,0.3)]"
                  />
                  <div className="relative filter-toggle-wrapper">
                    <button
                      className="bg-none border-none cursor-pointer text-[#df314d] transition-all duration-300 flex items-center justify-center hover:text-[#c62d47] hover:scale-110"
                      aria-label="Toggle filters"
                    >
                      <Filter size={20} />
                    </button>
                    <div className="filter-dropdown absolute top-full right-0 bg-white p-3 rounded-xl shadow-[0_10px_30px_rgba(223,49,77,0.1)] border border-[rgba(223,49,77,0.08)] z-10 min-w-[600px]">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1.5 flex-1">
                          <label className="font-semibold text-gray-800 text-xs">Status</label>
                          <select
                            value={filters.online}
                            onChange={(e) => handleFilterChange('online', e.target.value)}
                            className="py-1.5 px-1.5 border border-[rgba(223,49,77,0.2)] rounded-lg text-xs text-gray-800 bg-gray-50 transition-all duration-300 focus:outline-none focus:border-[#df314d] focus:shadow-[0_0_8px_rgba(223,49,77,0.3)]"
                          >
                            <option value="all">All Users</option>
                            <option value="online">Online Only</option>
                            <option value="offline">Offline Only</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                          <label className="font-semibold text-gray-800 text-xs">Age Range</label>
                          <select
                            value={filters.ageRange}
                            onChange={(e) => handleFilterChange('ageRange', e.target.value)}
                            className="py-1.5 px-1.5 border border-[rgba(223,49,77,0.2)] rounded-lg text-xs text-gray-800 bg-gray-50 transition-all duration-300 focus:outline-none focus:border-[#df314d] focus:shadow-[0_0_8px_rgba(223,49,77,0.3)]"
                          >
                            <option value="all">All Ages</option>
                            <option value="18-24">18-24 Years</option>
                            <option value="25-30">25-30 Years</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                          <label className="font-semibold text-gray-800 text-xs">Location</label>
                          <select
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                            className="py-1.5 px-1.5 border border-[rgba(223,49,77,0.2)] rounded-lg text-xs text-gray-800 bg-gray-50 transition-all duration-300 focus:outline-none focus:border-[#df314d] focus:shadow-[0_0_8px_rgba(223,49,77,0.3)]"
                          >
                            <option value="all">All Locations</option>
                            {uniqueLocations.map(location => (
                              <option key={location} value={location}>{location}</option>
                            ))}
                          </select>
                        </div>
                        <button 
                          className="bg-none border border-[#df314d] text-[#df314d] font-semibold cursor-pointer transition-all duration-300 py-1.5 px-3 rounded-lg text-xs self-end hover:bg-[#df314d] hover:text-white"
                          onClick={clearFilters}
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {filteredUsers.length === 0 ? (
                <div className="text-center py-24 px-5">
                  <User size={64} className="text-[#df314d] mb-5 mx-auto" />
                  <h3 className="text-gray-800 mb-2.5 text-3xl">No profiles match your filters</h3>
                  <p className="text-gray-600 mb-7 text-lg">Try adjusting your filter criteria to see more matches!</p>
                  <button 
                    className="py-4 px-7 border-none rounded-[30px] font-semibold cursor-pointer transition-all duration-300 inline-flex items-center gap-2 no-underline bg-gradient-to-br from-[#df314d] to-[#c62d47] text-white shadow-[0_6px_20px_rgba(223,49,77,0.3)] hover:bg-gradient-to-br hover:from-[#c62d47] hover:to-[#b02a42] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(223,49,77,0.4)]"
                    onClick={clearFilters}
                  >
                    <Filter size={16} />
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Cards Grid */}
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-7 mb-10 justify-items-center">
                    {currentUsers.map((user, index) => (
                      <div
                        key={user.id}
                        className="card-wrapper w-full max-w-80"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <UserCard
                          user={user}
                          onChatClick={handleChatClick}
                          onCancelRequest={handleCancelRequest}
                          onRequest={handleRequest}
                          onShowAlert={showSubscriptionAlert}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col items-center gap-5">
                      <div className="flex items-center gap-4 bg-white py-4 px-6 rounded-[50px] shadow-[0_10px_30px_rgba(223,49,77,0.15)] border border-[rgba(223,49,77,0.1)]">
                        <button
                          className={`flex items-center gap-2 py-2.5 px-5 border-none rounded-3xl font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(223,49,77,0.3)] ${
                            currentPage === 1 
                              ? 'bg-gray-300 text-gray-600 cursor-not-allowed shadow-none' 
                              : 'bg-gradient-to-br from-[#df314d] to-[#c62d47] text-white hover:bg-gradient-to-br hover:from-[#c62d47] hover:to-[#b02a42] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(223,49,77,0.4)]'
                          }`}
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft size={18} />
                          <span>Previous</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            const isActive = pageNumber === currentPage;

                            if (
                              pageNumber === 1 ||
                              pageNumber === totalPages ||
                              Math.abs(pageNumber - currentPage) <= 1
                            ) {
                              return (
                                <button
                                  key={pageNumber}
                                  className={`w-10 h-10 flex items-center justify-center border-2 border-transparent rounded-full font-semibold cursor-pointer transition-all duration-300 ${
                                    isActive 
                                      ? 'bg-[#df314d] text-white border-[#df314d] shadow-[0_4px_15px_rgba(223,49,77,0.3)]'
                                      : 'bg-transparent text-gray-600 hover:bg-[rgba(223,49,77,0.1)] hover:text-[#df314d] hover:border-[#df314d]'
                                  }`}
                                  onClick={() => goToPage(pageNumber)}
                                >
                                  {pageNumber}
                                </button>
                              );
                            } else if (
                              pageNumber === currentPage - 2 ||
                              pageNumber === currentPage + 2
                            ) {
                              return <span key={pageNumber} className="text-gray-600 px-1">...</span>;
                            }
                            return null;
                          })}
                        </div>

                        <button
                          className={`flex items-center gap-2 py-2.5 px-5 border-none rounded-3xl font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(223,49,77,0.3)] ${
                            currentPage === totalPages 
                              ? 'bg-gray-300 text-gray-600 cursor-not-allowed shadow-none' 
                              : 'bg-gradient-to-br from-[#df314d] to-[#c62d47] text-white hover:bg-gradient-to-br hover:from-[#c62d47] hover:to-[#b02a42] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(223,49,77,0.4)]'
                          }`}
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <span>Next</span>
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      <div className="text-gray-600 text-sm text-center">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} profiles
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* Floating Animation */}
      <div className="fixed bottom-7 right-7 z-[1000] pointer-events-none">
        <div className="text-5xl text-[#df314d] opacity-60 animate-float-3s">💖</div>
      </div>
    </div>
  );
};

export default Profile;