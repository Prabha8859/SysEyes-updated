import React, { useState } from 'react';
import { useFetchPlansQuery } from "../../service/usersApi";

const MembershipPlans = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  // API Integration
  const { data, error, isLoading } = useFetchPlansQuery();
  console.log("API Response:", data);

  const openPaymentModal = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedPlan('');
  };

  const handlePaymentSubmit = (e) => {
    if (e) e.preventDefault();
    alert(`Payment submitted for ${selectedPlan} plan!`);
    closePaymentModal();
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading plans...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 p-8 rounded-2xl">
          <p className="text-xl font-semibold text-red-600">Error loading plans</p>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

// Get plans from API
const apiPlans = data?.plans || [];

// ✅ Sort plans by price (lowest to highest)
const sortedPlans = [...apiPlans].sort((a, b) => a.price - b.price);

// Map API plans to UI format
const plans = sortedPlans.map((plan, index) => {
  const planIcons = ['💝', '🥈', '👑', '💫'];
  const planColors = [
    'from-pink-500 via-rose-600 to-red-400',
    'from-pink-500 via-rose-600 to-red-400',
    'from-pink-500 via-rose-600 to-red-400',
    'from-pink-500 via-rose-600 to-red-400'
  ];

    // Create features array from API data
    const features = [
    { text: `Messages: ${plan.limits.messagesPerDay === -1 ? 'Unlimited' : plan.limits.messagesPerDay}/day`, included: true },
    { text: `Video: ${plan.limits.videoTimeSeconds === -1 ? 'Unlimited' : `${plan.limits.videoTimeSeconds / 60}min`}`, included: true },
    { text: `Audio: ${plan.limits.audioTimeSeconds === -1 ? 'Unlimited' : `${plan.limits.audioTimeSeconds / 60}min`}`, included: true },
    { text: `Matches: ${plan.limits.matchesAllowed === null ? 'Unlimited' : plan.limits.matchesAllowed}`, included: true },
    { text: `${plan.durationDays} days validity`, included: true },
    { text: plan.planType === 'premium' ? 'Premium features' : 'Standard features', included: plan.planType === 'premium' }
  ];

     return {
    name: plan.planType.charAt(0).toUpperCase() + plan.planType.slice(1),
    price: `₹${plan.price}`,
    description: `${plan.durationDays} days`,
    features,
    buttonText: `Select ${plan.planType.charAt(0).toUpperCase() + plan.planType.slice(1)}`,
    planId: plan._id,
    popular: plan.planType === 'premium',
    isFree: plan.planType === 'free',
    icon: planIcons[index] || '💫',
    bgColor: planColors[index] || 'from-pink-400 via-rose-400 to-red-400'
  };
});

  const ArrowSVG = () => (
    <svg width="40px" height="25px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path className="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
        <path className="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
        <path className="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
      </g>
    </svg>
  );

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes modalZoom {
          from {
            transform: scale(0.7);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes color_anim {
          0% { fill: white; }
          50% { fill: #FBC638; }
          100% { fill: white; }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .hero-bg {
          background: linear-gradient(rgba(255, 192, 203, 0.8), rgba(233, 30, 99, 0.1)),
                      url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .floating-hearts::before,
        .floating-hearts::after {
          content: '💕';
          position: absolute;
          font-size: 2rem;
          color: rgba(255,255,255,0.3);
          animation: float 8s linear infinite;
        }

        .floating-hearts::before {
          left: 10%;
          animation-delay: 0s;
        }

        .floating-hearts::after {
          left: 80%;
          animation-delay: 4s;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        .animate-fadeInUp-delay {
          animation: fadeInUp 1s ease-out 0.3s both;
        }

        .modal-zoom {
          animation: modalZoom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .purchase-btn svg {
          width: 40px;
          height: 25px;
        }

        .purchase-btn path.one {
          transition: 0.4s;
          transform: translateX(-60%);
        }

        .purchase-btn path.two {
          transition: 0.5s;
          transform: translateX(-30%);
        }

        .purchase-btn:hover path.three {
          animation: color_anim 1s infinite 0.2s;
        }

        .purchase-btn:hover path.one {
          transform: translateX(0%);
          animation: color_anim 1s infinite 0.6s;
        }

        .purchase-btn:hover path.two {
          transform: translateX(0%);
          animation: color_anim 1s infinite 0.4s;
        }

        .price-top {
          position: relative;
          overflow: hidden;
        }

        .price-top::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><pattern id="hearts" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><text x="15" y="20" text-anchor="middle" font-size="16" opacity="0.08" fill="white">💕</text></pattern></defs><rect width="400" height="300" fill="url(%23hearts)"/><path d="M0,250 Q100,200 200,220 T400,200 L400,300 L0,300 Z" fill="rgba(255,255,255,0.1)"/></svg>');
          opacity: 0.8;
          z-index: 1;
        }

        .price-top::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
          transform: rotate(45deg);
          animation: shimmer 3s infinite;
          z-index: 2;
        }

        .wave-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100"><path d="M0,60 Q100,20 200,40 T400,30 L400,100 L0,100 Z" fill="white"/></svg>');
          background-size: cover;
          background-repeat: no-repeat;
          z-index: 4;
        }

        .price-content {
          position: relative;
          z-index: 3;
        }

        .feature-item {
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .hero-bg {
            background-attachment: scroll;
          }
          
          .price-top {
            padding-top: 2.5rem !important;
            padding-bottom: 3.5rem !important;
          }

          .wave-bottom {
            height: 30px;
          }
        }

        @media (max-width: 480px) {
          .price-top h2 {
            font-size: 2rem !important;
          }
          
          .price-top h6 {
            font-size: 1rem !important;
          }

          .price-top {
            padding-top: 2rem !important;
            padding-bottom: 3rem !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          .wave-bottom {
            height: 25px;
          }
        }
      `}</style>

      {/* Page Header Section */}
      <section className="relative py-20 overflow-hidden hero-bg">
        <div className="absolute inset-0 w-full h-full overflow-hidden z-[1] floating-hearts"></div>
        <div className="absolute inset-0 hero-overlay"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-[3]">
          <div className="text-center text-white mt-[5%]">
            <div className="page-title">
              <h2 className="text-white mb-5 text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-wide uppercase animate-fadeInUp">
                Membership Level
              </h2>
            </div>
            <ol className="list-none p-0 m-0 flex justify-center items-center gap-2.5 animate-fadeInUp-delay flex-wrap">
              <li className="text-lg md:text-xl font-semibold">
                <a 
                  href="#" 
                  onClick={(e) => e.preventDefault()}
                  className="text-white/90 no-underline transition-all duration-300 py-2 px-4 rounded-3xl bg-white/10 backdrop-blur-sm hover:text-white hover:bg-white/20 hover:-translate-y-0.5"
                >
                  Home
                </a>
              </li>
              <li className="text-white/70 text-xl md:text-2xl ml-2 md:ml-4">→</li>
              <li className="active text-yellow-400 font-bold drop-shadow-md ml-2 md:ml-4">Membership-level</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Pricing Plan Section */}
      <section className="py-10 md:py-5 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="text-center mb-2">
            <h4 className="text-pink-600 text-lg md:text-xl font-semibold mb-2 uppercase tracking-wider">SHY-EYES Membership Plans</h4>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">Choose Your Perfect Dating Plan</h2>
          </div>
          
          <div className="mt-5">
            {/* Single Row Grid - 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 px-1 lg:gap-3">
              {plans.map((plan, index) => (
                <div key={index} className="w-full">
                  <div className="relative group bg-white rounded-2xl overflow-hidden transition-all duration-300 ease-in-out h-full shadow-lg hover:shadow-xl hover:-translate-y-1">
                    
                    {/* Popular Badge */}
                    {plan.popular && (
                      <div className="absolute top-0.5 left-0 transform -translate-x-32 opacity-0 bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-800 py-2  rounded-2xl font-bold text-xs z-10 tracking-wider transition-all duration-[4000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-x-0 group-hover:opacity-100">
                       ⭐ MOST POPULAR ⭐
                      </div>
                    )}
                       {plan.isFree && (
                      <div className="absolute top-0.2 right-0 transform translate-x-32 opacity-0 bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-800 py-2 px-1 rounded-2xl font-bold text-xs z-10 tracking-wider transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-x-0 group-hover:opacity-100">
                        🎁 100% FREE
                      </div>
                    )}
                    <div className="flex flex-col h-full">
                      {/* Enhanced Price Top Section with Wave Design */}
                      <div className={`price-top text-center pt-1 pb-10 px-4 bg-gradient-to-br ${plan.bgColor} relative`}>
                        
                        {/* Wave Bottom */}
                        <div className="wave-bottom"></div>
                        
                        {/* Plan Icon */}
                        <div className="price-content relative z-10">
                          <div className="w-12 h-12 mx-auto mb-1 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl border-2 border-white/30">
                            {plan.icon}
                          </div>
                          
                          <h6 className="text-white text-lg md:text-xl font-bold  drop-shadow-lg">{plan.name}</h6>
                          <h2 className="text-white text-3xl md:text-5xl font-extrabold  leading-none drop-shadow-lg">{plan.price}</h2>
                          <p className="inline-block bg-white/20 backdrop-blur-md text-white text-xs md:text-sm font-bold py-1 px-3 rounded-full mt-1 border border-white/30 shadow-md ">⏰ {plan.description}</p>
                        </div>
                      </div>

                      {/* Price Bottom Section */}
                      <div className="py-2 px-4 flex-grow flex flex-col bg-white cursor-pointer">
                        <ul className="list-none p-0 pb-4 flex-grow space-y-2.5">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="feature-item flex items-center transition-all duration-300 hover:bg-slate-300 hover:px-3 hover:-mx-3 hover:rounded-lg py-1">
                              <div className={`mr-3 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                                feature.included 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-red-500 text-white'
                              }`}>
                                {feature.included ? '✓' : '✗'}
                              </div>
                              <span className="text-gray-700 text-xs md:text-sm">{feature.text}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* Enhanced Animated Button */}
                        <button 
                          className="purchase-btn flex items-center justify-center py-3 px-3 no-underline text-xs md:text-sm font-semibold text-white bg-pink-600 border-none cursor-pointer transition-[0.5s] shadow-[4px_4px_0_black] transform -skew-x-[15deg] rounded-md relative overflow-hidden w-full mt-auto hover:shadow-[8px_8px_0_#FBC638] hover:bg-pink-700 hover:duration-300"
                          onClick={() => openPaymentModal(plan.planId)}
                        >
                          <span className="transform skew-x-[15deg] flex items-center justify-center gap-2 w-full">
                            <span className="whitespace-nowrap">{plan.buttonText}</span>
                            <span className="transition-[0.5s] hover:ml-2 hover:duration-300 flex-shrink-0">
                              <ArrowSVG />
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed z-[9999] left-0 top-0 w-full h-full bg-black/70 overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 md:p-8 text-center relative modal-zoom">
            <span 
              className="absolute right-4 top-2 cursor-pointer text-3xl font-semibold text-gray-600 hover:text-pink-600 transition-colors duration-300"
              onClick={closePaymentModal}
            >
              ×
            </span>
            <h3 className="text-gray-800 mb-6 text-xl md:text-2xl">Complete Payment for Plan</h3>
            <img 
              src="https://via.placeholder.com/200x200?text=Payment+QR" 
              alt="Payment QR Code" 
              className="w-40 h-40 md:w-50 md:h-50 my-4 mx-auto rounded-2xl"
            />
            <div onSubmit={handlePaymentSubmit}>
              <input 
                type="text" 
                className="w-full py-3 md:py-4 my-4 border-2 border-gray-300 rounded-xl text-sm md:text-base transition-all duration-300 focus:outline-none focus:border-pink-600"
                placeholder="Enter UTR Number" 
                required 
              />
              <button 
                onClick={handlePaymentSubmit}
                className="py-3 md:py-4 px-6 md:px-8 bg-pink-600 text-white border-none rounded-[30px] font-semibold text-sm md:text-lg cursor-pointer transition-all duration-300 w-full hover:bg-pink-700 hover:-translate-y-0.5"
              >
                Submit Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MembershipPlans;