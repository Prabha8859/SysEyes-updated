// import React, { useState, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { useActiveUsersQuery } from "../../service/usersApi"; // ✅ API
// import defaultImage from "../../assets/images/member/01.jpg";

// const IMG_URL = "https://shyeyes-b.onrender.com/uploads";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useActiveUsersQuery,
  useGetProfileDetailsQuery,
} from "../../service/usersApi";
import DefaultImg from "../../assets/images/member/01.jpg";

const MemberSection = () => {
  const token = localStorage.getItem("token");
  const isLogin = !!token;

  const { data, isLoading, isError } = useActiveUsersQuery();

  const [members, setMembers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  // Handle responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1200) setCardsPerView(5);
      else if (width >= 992) setCardsPerView(4);
      else if (width >= 768) setCardsPerView(3);
      else if (width >= 576) setCardsPerView(2);
      else setCardsPerView(1);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Populate members when API data changes
  useEffect(() => {
    if (!data) return;

    if (data?.data?.users?.length) {
      const formattedMembers = data.data.users.map((user) => ({
        id: user._id,
        name: user.name,
        age: user.age ? `${user.age} Years Old` : "21 Years Old",
        image: user.profilePic
          ? user.profilePic.startsWith("http")
            ? user.profilePic
            : `https://shyeyes-b.onrender.com/uploads/${user.profilePic}`
          : DefaultImg,
        online:
          user.friendshipStatus === "Friend" || user.friendshipStatus === "New",
        location: user.location?.city
          ? `${user.location.city}, ${user.location.country || ""}`
          : "Location not available",
        bio: user.bio || "",
        hobbies: user.hobbies || [],
        friendshipStatus: user.friendshipStatus,
      }));
      setMembers(formattedMembers);
    } else {
      setMembers([]);
    }
  }, [data]);

  const maxSlides = Math.max(0, members.length - cardsPerView);

  const nextSlide = () => {
    if (currentIndex < maxSlides) setCurrentIndex(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (isLoading) {
    return (
      <section className="member-section padding-tb">
        <div className="container text-center">
          <h4 className="theme-color">Meet Exciting Singles Near You!</h4>
          <h2>New Members in India</h2>
          <div className="flex flex-col items-center gap-5 py-10">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#df314d] rounded-full animate-spin"></div>
            <p>Loading amazing members...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="member-section padding-tb">
        <div className="container text-center">
          <p>Failed to load members. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{`
        @keyframes pulseGlow {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(74, 222, 128, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
          }
        }
        
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .online-pulse-dot.online {
          animation: pulseGlow 1.8s infinite;
        }

        .member-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #df314d, #ff4d6d, #df314d);
          background-size: 200% 100%;
          animation: gradientMove 3s ease-in-out infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .member-card:hover::before {
          opacity: 1;
        }

        .square-nav-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(223, 49, 77, 0.1), transparent);
          transition: left 0.6s;
        }
        
        .square-nav-btn:hover::before {
          left: 100%;
        }
      `}</style>

      <section className="member-section padding-tb">
        <div className="container mt-5">
          <div className="text-center mb-5 lg:mb-8 relative z-10 max-w-4xl mx-auto">
          <h4 className="text-red-500 text-lg sm:text-xl font-semibold mb-3 uppercase tracking-wider font-['Jost']" style={{ fontFamily: 'Jost, sans-serif' }}>
            Meet Exciting Singles Near You!
          </h4>
          <h2 className="text-pink-500 text-2xl sm:text-3xl lg:text-xl xl:text-xl font-bold leading-tight -mt-1 font-['Jost']" style={{ fontFamily: 'Jost, sans-serif' }}>
           New Members in India❤️
          </h2>
        </div>

          <div className="section-wrapper">
            {members.length > 0 ? (
              <>
                {/* Carousel Container */}
                <div className="relative overflow-hidden px-5">
                  <div
                    className="flex"
                    style={{
                      transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                      transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  >
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="px-1"
                        style={{
                          flex: `0 0 ${100 / cardsPerView}%`,
                        }}
                      >
                        {/* Member Card */}
                        <div className="member-card bg-gradient-to-br from-white to-gray-50 rounded-[20px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-500 h-full flex flex-col relative border border-[rgba(223,49,77,0.1)] hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:border-[rgba(223,49,77,0.2)]">
                          
                          {/* Image Container */}
                          <div className="relative p-[5px_5px_0] sm:p-[6px_6px_0] overflow-hidden group">
                            <Link to={isLogin ? `/profile/${member.id}` : "/login"}>
                              <img
                                src={member.image}
                                alt={member.name}
                                loading="lazy"
                                className="w-full h-[220px] sm:h-[240px] md:h-[200px] object-cover rounded-2xl transition-all duration-500 brightness-100 saturate-100 group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = DefaultImg;
                                }}
                              />
                              <div className="absolute top-[18px] left-[18px] right-[18px] bottom-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            </Link>
                          </div>

                          {/* Content */}
                          <div className="p-[8px_0_10px] sm:p-[22px_18px_20px] md:p-[20px_15px_18px] text-center flex-grow flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
                            <div>
                              {/* Name & Online Status */}
                              <div className="flex items-center gap-2 justify-center mb-2">
                                <Link
                                  to={isLogin ? "/profile" : "/login"}
                                  className="no-underline"
                                >
                                  <h6 className="text-[19px] md:text-[17px] font-bold text-[#210053] m-0 leading-tight transition-all duration-300 hover:text-[#df314d] hover:scale-105">
                                    {member.name}
                                  </h6>
                                </Link>
                                <span
                                  className={`online-pulse-dot w-3 h-3 rounded-full inline-block relative ${
                                    member.online
                                      ? "bg-green-400 shadow-[0_0_0_0_rgba(74,222,128,0.7)]"
                                      : "bg-slate-400 opacity-60"
                                  }`}
                                ></span>
                              </div>
                              
                              {/* Age */}
                              <p className="text-[15px] text-gray-600 m-0 mb-2 font-medium">
                                {member.age}
                              </p>
                            </div>

                            {/* Status Badge */}
                            {/* <span className="text-[11px] md:text-[10px] font-bold py-2 px-4 md:py-[7px] md:px-[14px] rounded-[20px] bg-[#ff69b4] text-white inline-block uppercase tracking-wider mt-auto shadow-[0_4px_15px_rgba(255,105,180,0.4)] transition-all duration-300 opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0">
                              {member.online ? "Active Now" : "Offline"}
                            </span> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                {maxSlides > 0 && (
                  <div className="flex justify-center gap-5 md:gap-[15px] my-2 md:my-3">
                    <button
                      className="square-nav-btn w-[45px] h-[45px] md:w-10 md:h-10 border-2 border-[#df314d] bg-gradient-to-br from-transparent to-[rgba(223,49,77,0.05)] text-[#df314d] cursor-pointer transition-all duration-[400ms] flex items-center justify-center text-xl md:text-lg font-bold rounded-xl relative overflow-hidden disabled:border-[#ddd] disabled:text-[#ccc] disabled:cursor-not-allowed disabled:shadow-none disabled:bg-[#f8f8f8] hover:bg-gradient-to-br hover:from-[#df314d] hover:to-[#ff4d6d] hover:text-white hover:-translate-y-[3px] hover:scale-105 hover:shadow-[0_8px_25px_rgba(223,49,77,0.4)] hover:border-[#ff4d6d] disabled:hover:bg-[#f8f8f8] disabled:hover:text-[#ccc] disabled:hover:translate-y-0 disabled:hover:scale-100"
                      onClick={prevSlide}
                      disabled={currentIndex === 0}
                      aria-label="Previous page"
                    >
                      ‹
                    </button>
                    <button
                      className="square-nav-btn w-[45px] h-[45px] md:w-10 md:h-10 border-2 border-[#df314d] bg-gradient-to-br from-transparent to-[rgba(223,49,77,0.05)] text-[#df314d] cursor-pointer transition-all duration-[400ms] flex items-center justify-center text-xl md:text-lg font-bold rounded-xl relative overflow-hidden disabled:border-[#ddd] disabled:text-[#ccc] disabled:cursor-not-allowed disabled:shadow-none disabled:bg-[#f8f8f8] hover:bg-gradient-to-br hover:from-[#df314d] hover:to-[#ff4d6d] hover:text-white hover:-translate-y-[3px] hover:scale-105 hover:shadow-[0_8px_25px_rgba(223,49,77,0.4)] hover:border-[#ff4d6d] disabled:hover:bg-[#f8f8f8] disabled:hover:text-[#ccc] disabled:hover:translate-y-0 disabled:hover:scale-100"
                      onClick={nextSlide}
                      disabled={currentIndex >= maxSlides}
                      aria-label="Next page"
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center">No members found</p>
            )}

            {/* Action Buttons */}
            {/* <div className="flex flex-wrap justify-center mt-4 sm:flex-col sm:items-center sm:gap-[10px]">
              <Link
                to="/register"
                className="border-2 border-[#979695] text-[#979695] bg-[#00000045] py-2 px-[30px] md:py-3 md:px-[25px] sm:py-[10px] sm:px-5 rounded-lg font-semibold no-underline transition-all duration-300 inline-flex items-center gap-2 shadow-[0.3em_0.3em_0_#dd6395] md:shadow-[0.25em_0.25em_0_#dd6395] relative text-base md:text-[15px] sm:text-sm mr-[15px] mb-[15px] md:mr-[10px] md:mb-3 sm:m-0 sm:mb-2 sm:w-full sm:max-w-[280px] sm:justify-center hover:shadow-[-0.3em_-0.3em_0_#979695] md:hover:shadow-[-0.25em_-0.25em_0_#979695] hover:bg-[#dd6395] hover:border-[#dd6395] hover:text-white hover:translate-x-[0.3em] hover:translate-y-[0.3em] md:hover:translate-x-[0.25em] md:hover:translate-y-[0.25em] active:translate-x-[0.15em] active:translate-y-[0.15em] active:shadow-[-0.15em_-0.15em_0_#979695]"
              >
                <i className="icofont-users"></i>
                <span>Join Now & Start Dating</span>
              </Link>
              <Link
                to="/login"
                className="border-2 border-[#979695] text-[#979695] bg-[#00000045] py-2 px-[30px] md:py-3 md:px-[25px] sm:py-[10px] sm:px-5 rounded-lg font-semibold no-underline transition-all duration-300 inline-flex items-center gap-2 shadow-[0.3em_0.3em_0_#dd6395] md:shadow-[0.25em_0.25em_0_#dd6395] relative text-base md:text-[15px] sm:text-sm mb-[15px] md:mb-3 sm:m-0 sm:mb-2 sm:w-full sm:max-w-[280px] sm:justify-center hover:shadow-[-0.3em_-0.3em_0_#979695] md:hover:shadow-[-0.25em_-0.25em_0_#979695] hover:bg-[#dd6395] hover:border-[#dd6395] hover:text-white hover:translate-x-[0.3em] hover:translate-y-[0.3em] md:hover:translate-x-[0.25em] md:hover:translate-y-[0.25em] active:translate-x-[0.15em] active:translate-y-[0.15em] active:shadow-[-0.15em_-0.15em_0_#979695]"
              >
                <i className="icofont-heart"></i>
                <span>See Who's Waiting for You ❤️</span>
              </Link>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default MemberSection;