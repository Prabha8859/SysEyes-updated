import React from "react";
import { Link } from "react-router-dom";
import { useActiveUsersQuery } from "../../service/usersApi";
import DefaultImg from "../../assets/images/profile/default-img.jpg";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const MemberSection = () => {
  const token = localStorage.getItem("token");
  const isLogin = !!token;

  const { data, isLoading, isError } = useActiveUsersQuery();

  const members =
    data?.data?.users?.map(({ _id, Name, age, profilePic, online }) => ({
      _id,
      Name,
      age,
      profilePic,
      online,
    })) || [];

  // Loading state
  if (isLoading) {
    return (
      <section className="member-section py-16">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-red-500 text-lg sm:text-xl font-semibold mb-3 uppercase">
            Meet Exciting Singles Near You!
          </h4>
          <h2 className="text-pink-500 text-2xl sm:text-3xl lg:text-4xl font-bold">
            New Members in India ❤️
          </h2>
          <div className="flex flex-col items-center gap-5 py-10">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#df314d] rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg font-medium">Loading members...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="member-section py-10 text-center">
        <h4 className="text-red-500 text-lg sm:text-xl font-semibold mb-3 uppercase">
          Meet Exciting Singles Near You!
        </h4>
        <h2 className="text-pink-500 text-2xl sm:text-3xl lg:text-4xl font-bold">
          New Members in India ❤️
        </h2>
        <p className="text-gray-600 mt-5">
          Something went wrong. Please refresh or try again later.
        </p>
      </section>
    );
  }

  return (
    <>
     <style>{`
  @keyframes pulseGlow {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74,222,128,0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(74,222,128,0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74,222,128,0); }
  }
  .online-pulse-dot.online { animation: pulseGlow 1.8s infinite; }

  /* Swiper Navigation Arrows */
  .swiper-button-next,
  .swiper-button-prev {
    color: #ec4899 !important; /* Tailwind pink-500 */
    // background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    width: 40px;
    padding: 5px;
    height: 40px;
    // box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background-color: #ec4899 !important;
    color: white !important;
    transform: scale(1.1);
  }

  /* Optional: move arrows closer or further */
  .swiper-button-next { right: 5px; }
  .swiper-button-prev { left: 5px; }
`}</style>


      <section className="member-section py-10">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h4 className="text-red-500 text-md sm:text-xl font-semibold mb-2 uppercase tracking-wider">
              Meet Exciting Singles Near You!
            </h4>
            <h2 className="text-pink-500 text-xl sm:text-3xl font-bold">
              New Members in India ❤️
            </h2>
          </div>

          {/* Swiper Carousel */}
          {members.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1 },
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
                1200: { slidesPerView: 5 },
              }}
              className="mySwiper"
            >
              {members.map((user) => (
                <SwiperSlide key={user._id}>
                  <div className="member-card bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-pink-100 hover:border-pink-200 relative">
                    {/* Image */}
                    <div className="relative p-2 overflow-hidden group">
                      <Link
                        to={isLogin ? `/profile/${user._id}` : "/login"}
                        className="block"
                      >
                        <img
                          src={
                            user.profilePic
                              ? user.profilePic.startsWith("http")
                                ? user.profilePic
                                : `https://shyeyes-b.onrender.com/uploads/${user.profilePic}`
                              : DefaultImg
                          }
                          alt={user.Name?.firstName || "Guest"}
                          loading="lazy"
                          className="w-full h-[240px] sm:h-[260px] md:h-[220px] object-cover rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = DefaultImg;
                          }}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      </Link>
                    </div>

                    {/* Details */}
                    <div className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Link
                          to={isLogin ? `/profile/${user._id}` : "/login"}
                          className="no-underline"
                        >
                          <h6 className="text-lg font-bold text-gray-800 hover:text-pink-500 transition duration-300 capitalize">
                            {user.Name?.firstName || "Guest"} {user.Name?.lastName || ""}
                          </h6>
                        </Link>
                        <span
                          className={`online-pulse-dot w-3 h-3 rounded-full ${
                            user.online ? "bg-green-400 online" : "bg-gray-400 opacity-60"
                          }`}
                        ></span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">
                        <span className="bg-pink-100 px-4 py-2 rounded-full inline-block">
                          Age: {user.age} Years Old
                        </span>
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-10 text-gray-600 text-lg">
              No members found at the moment. Check back soon!
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MemberSection;
