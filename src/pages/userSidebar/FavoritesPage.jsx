import React, { useState } from 'react';
import { Heart, MapPin, Trash2, Star } from 'lucide-react';

const Favorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([
    {
      id: 1,
      name: "John Doe",
      location: "New York, USA",
      profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
      favoriteCount: 245
    },
    {
      id: 2,
      name: "Jane Smith",
      location: "London, UK",
      profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.9,
      favoriteCount: 312
    },
    {
      id: 3,
      name: "Ali Khan",
      location: "Karachi, Pakistan",
      profilePic: "https://randomuser.me/api/portraits/men/65.jpg",
      rating: 4.7,
      favoriteCount: 189
    },
  ]);

  const [removingId, setRemovingId] = useState(null);

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      setFavoriteItems(favoriteItems.filter(item => item.id !== id));
      setRemovingId(null);
    }, 400);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .favorites-bg {
          background: linear-gradient(
              135deg,
              rgba(186, 137, 151, 0.55),
              rgba(208, 168, 179, 0.514)
            ),
            url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1470&q=80");
          background-size: cover;
          background-position: center;
          backdrop-filter: blur(3px);
        }

        .gradient-border-card {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(16px) saturate(180%);
          transition: all 0.3s ease;
        }

        .gradient-border-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 25px;
          padding: 2px;
          background: linear-gradient(135deg, #ffcfe2, #fdd1dc, #ffe6f0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          z-index: -1;
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }

        .gradient-border-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(178, 58, 101, 0.25);
        }

        .gradient-border-card.removing {
          animation: slideOut 0.4s ease forwards;
          pointer-events: none;
        }

        @keyframes slideOut {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(100%) scale(0.8);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
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

        .fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }

        .title-text {
          background: linear-gradient(135deg, #ff69a5, #ff1493, #ff69a5);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease infinite;
        }

        .stat-badge {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .stat-badge:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: scale(1.05);
        }
      `}</style>

      <div className="favorites-bg min-h-screen px-5 py-[60px] flex flex-col items-center font-['Poppins',sans-serif]">
        {/* Page Title */}
        <div className="text-center mb-[60px] fade-in-up">
          <div className="flex justify-center items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
            <h1 className="title-text text-[2.6rem] font-bold">
              My Favorites
            </h1>
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
          </div>
        </div>

        {/* Container */}
        <div className="w-full max-w-[700px] flex flex-col gap-[30px]">
          {favoriteItems.map((item, index) => (
            <div
              key={item.id}
              className={`gradient-border-card flex justify-between items-center rounded-[25px] px-[30px] py-[25px] shadow-[0_8px_25px_rgba(178,58,101,0.15)] border-2 border-transparent sm:flex-col sm:items-start sm:gap-5 ${removingId === item.id ? 'removing' : 'fade-in-up'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Profile Info */}
              <div className="flex items-center gap-5">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-[3px] border-[rgba(255,200,215,0.7)] shadow-[0_4px_20px_rgba(178,58,101,0.15)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_25px_rgba(178,58,101,0.25)]">
                  <img
                    src={item.profilePic}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full p-1.5 shadow-lg">
                    <Heart className="w-3 h-3 text-white fill-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-[1.4rem] font-semibold text-[#6b2e4e]">
                    {item.name}
                  </h2>
                  <div className="flex items-center gap-1.5 text-[#7a5c68] mt-1 mb-2">
                    <MapPin className="w-4 h-4 text-pink-500" />
                    <p className="text-[0.95rem]">{item.location}</p>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex gap-2 flex-wrap">
                    <div className="stat-badge flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-pink-200">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-[0.8rem] font-semibold text-[#6b2e4e]">{item.rating}</span>
                    </div>
                    <div className="stat-badge flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-pink-200">
                      <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                      <span className="text-[0.8rem] font-semibold text-[#6b2e4e]">{item.favoriteCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <div className="sm:self-end">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#ffcfe2] via-[#fdd1dc] to-[#ffe6f0] text-[#6b2e4e] font-semibold border-none rounded-[20px] cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(178,58,101,0.15)] hover:scale-105 hover:shadow-[0_6px_25px_rgba(178,58,101,0.25)]"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {favoriteItems.length === 0 && (
          <div className="text-center py-12 fade-in-up">
            <Heart className="w-20 h-20 text-pink-300 mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-bold text-[#6b2e4e] mb-2">No Favorites Yet</h3>
            <p className="text-[#7a5c68]">Start adding people to your favorites!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;