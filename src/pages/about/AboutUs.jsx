import React, { useEffect, useState, useRef } from 'react';

// Custom Link component for routing
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

// Import images
import img1 from '../../assets/images/aboutus/01.jpg';
import img2 from '../../assets/images/aboutus/02.jpg';
import img3 from '../../assets/images/aboutus/story9.webp';
import img5 from '../../assets/images/aboutus/story4.webp';
import img6 from '../../assets/images/aboutus/story6.jpg';
import img7 from '../../assets/images/aboutus/story7.webp';
import bgImg from '../../assets/Images/aboutus/about-1 copy.jpg'
import bgImg2 from '../../assets/Images/aboutus/working.jpg'

const AboutUs = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stats, setStats] = useState({
    connections: 0,
    couples: 0,
    years: 0,
    countries: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [statsDone, setStatsDone] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [badgeCounter, setBadgeCounter] = useState(0);
  const [hoveredStatIndex, setHoveredStatIndex] = useState(null);
  const statsRef = useRef(null);

  // Image carousel for expertise section
  const carouselImages = [img3, img5, img6, img7];

  useEffect(() => {
    // Badge animation with counter
    const timer = setTimeout(() => {
      setBadgeVisible(true);
      animateBadgeCounter();
    }, 500);

    // Stats counter animation with Intersection Observer
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateStats();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    // Image carousel auto-rotate
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => {
      clearInterval(imageInterval);
      clearTimeout(timer);
      if (statsRef.current) {
        statsObserver.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated, carouselImages.length]);

  const animateBadgeCounter = () => {
    const target = 15;
    const duration = 2000;
    const steps = 30;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setBadgeCounter(Math.floor(target * progress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setBadgeCounter(target);
      }
    }, stepTime);
  };

  const animateStats = () => {
    const targets = {
      connections: 5000,
      couples: 3200,
      years: 15,
      countries: 50,
    };

    const duration = 2500;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        connections: Math.floor(targets.connections * progress),
        couples: Math.floor(targets.couples * progress),
        years: Math.floor(targets.years * progress),
        countries: Math.floor(targets.countries * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targets);
        setStatsDone(true);
      }
    }, stepTime);
  };

  const handleStatHover = (index) => {
    setHoveredStatIndex(index);
    // Reset and restart animation on hover
    setStats({
      connections: 0,
      couples: 0,
      years: 0,
      countries: 0,
    });
    animateStats();
  };

  const handleStatLeave = () => {
    setHoveredStatIndex(null);
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      {/* Page Header Section */}
      <section 
        className="relative min-h-[400px] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative z-10 px-5">
          <div className="mb-6">
            <h2 className="text-5xl md:text-6xl font-bold drop-shadow-lg animate-fadeIn"
                style={{fontFamily: 'Playfair Display, serif'}}>
              About Us
            </h2>
          </div>
          <ol className="flex justify-center items-center gap-4 text-xl">
            <li className="flex items-center">
              <Link
                to="/"
                className="text-white hover:bg-white/20 px-3 py-1 rounded-full transition-all duration-300 hover:-translate-y-0.5"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-4 opacity-80">→</span>
              <span className="bg-white/15 px-4 py-1 rounded-full font-semibold opacity-90">
                About Us
              </span>
            </li>
          </ol>
        </div>
      </section>

      {/* SECTION 1: ABOUT */}
      <section className="py-4 px-10" style={{background: 'linear-gradient(to bottom, #fff5f7 0%, #ffeef2 100%)'}}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col lg:flex-row items-center gap-2">
            {/* Images Section with Badge */}
            <div className="flex-1 flex justify-center relative max-w-2xl">
              <div className="flex gap-2 items-center justify-center">
                <img
                  src={img1}
                  alt="Dating Couple"
                  className="w-[300px] h-[420px] object-cover border-[5px] border-white shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500"
                  style={{borderRadius: '60px 25px', boxShadow: '0 25px 50px rgba(249, 61, 102, 0.25)'}}
                />
                <img
                  src={img2}
                  alt="Romantic Moment"
                  className="w-[300px] h-[420px] object-cover border-[5px] border-white shadow-2xl mt-12 hover:shadow-3xl hover:-translate-y-4 transition-all duration-500"
                  style={{borderRadius: '25px 60px', boxShadow: '0 25px 50px rgba(249, 61, 102, 0.25)'}}
                />
              </div>
              {/* Enhanced Experience Badge with Counter */}
              <div
                className={`absolute w-[350px] h-[90px] text-white rounded-[20px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-4 text-[17px] font-bold z-30 backdrop-blur-[15px] border-2 border-white/20 transition-all duration-700 overflow-hidden group cursor-pointer ${
                  badgeVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #f93d66, #e91e63)',
                  boxShadow: '0 20px 40px rgba(249, 61, 102, 0.4)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                
                <i className="fa-solid fa-heart text-[22px] animate-pulse relative z-10"></i>
                <span className="relative z-10">
                  {badgeCounter}+ Years of Love Connections
                </span>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 max-w-[520px] lg:pl-8 mt-8">
              <h4 className="text-pink-600 text-[15px]  font-bold uppercase tracking-[2px] flex items-center">
                <i className="fa-solid fa-heart mr-3 animate-pulse"></i> About Shy-Eye
              </h4>
              <h2 className="text-[25px] font-bold text-gray-900 mb-4 leading-tight relative"
                  style={{fontFamily: 'Playfair Display, serif'}}>
                Where Love Finds You
                <span className="absolute bottom-[-10px] left-0 w-20 h-1 rounded"
                      style={{background: 'linear-gradient(90deg, #f93d66, #e91e63)'}}></span>
              </h2>
              <p className="text-gray-600 leading-[1.9] mb-2 text-[16px]">
                At Shy-Eye, we believe love can bloom anywhere — all it takes is the right spark.
                With years of experience helping shy hearts connect, we create opportunities for
                meaningful relationships that last a lifetime.
              </p>

              <ul className="list-none mb-11 space-y-4">
                {[
                  'Personalized Matchmaking',
                  'Safe & Private Connections',
                  'Real People, Real Love',
                  'Global Community',
                ].map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-900 font-semibold text-[17px] flex items-center py-1 hover:text-pink-600 hover:translate-x-2 transition-all duration-400 relative group"
                  >
                    <span className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-[3px] h-0 bg-pink-600 group-hover:h-full transition-all duration-300"></span>
                    <i className="fa-solid fa-heart mr-4 text-pink-600 text-base w-5"></i>
                    {item}
                  </li>
                ))}
              </ul>

              <button className="relative overflow-hidden bg-gradient-to-r from-pink-600 to-rose-600 text-white py-[18px] px-12  rounded-full font-bold text-[17px] uppercase tracking-[1.5px] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-400 flex items-center gap-3 group"
                      style={{boxShadow: '0 10px 30px rgba(249, 61, 102, 0.4)'}}>
                <span className="relative z-10">JOIN NOW</span>
                <i className="fa-solid fa-arrow-right group-hover:rotate-[-45deg] transition-all duration-500 relative z-10 text-lg"></i>
                <span className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ENHANCED HEXAGONAL STATS WITH BACKGROUND */}
      <section 
         ref={statsRef}
         className="py-2 relative flex justify-center gap-6 flex-wrap"
          style={{
            backgroundImage: `url(${bgImg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/90 via-white/80 to-rose-50/90"></div>
        
        {[
          { icon: 'fa-user-plus', value: stats.connections, label: 'Connections Made', suffix: '5,000+' },
          { icon: 'fa-heart', value: stats.couples, label: 'Happy Couples', suffix: '3,200+' },
          { icon: 'fa-calendar-check', value: stats.years, label: 'Years in Love Business', suffix: '15+' },
          { icon: 'fa-globe', value: stats.countries, label: 'Countries Served', suffix: '50+' },
        ].map((stat, index) => (
          <div
            key={index}
            onMouseEnter={() => handleStatHover(index)}
            onMouseLeave={handleStatLeave}
            className="relative z-10 w-[280px] h-[300px] flex flex-col items-center justify-center text-white text-center transition-all duration-500 cursor-pointer hover:scale-110 hover:rotate-6 group"
            style={{
              background: 'linear-gradient(135deg, #f93d66 0%, #e91e63 50%, #ad1457 100%)',
              clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0 50%)',
              boxShadow: '0 25px 50px rgba(249, 61, 102, 0.3)'
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 overflow-hidden"
                 style={{clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0 50%)'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            </div>
            
            <i className={`fa-solid ${stat.icon} text-5xl mb-6 opacity-95 group-hover:scale-125 group-hover:opacity-100 transition-all duration-300 drop-shadow-lg`}></i>
            <h3 className="text-4xl font-bold group-hover:scale-105 transition-all duration-300 mb-2"
                style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
              {statsDone ? stat.suffix : stat.value.toLocaleString()}
            </h3>
            <p className="text-[16px] font-semibold opacity-95 px-4 leading-tight">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* SECTION 3: EXPERTISE WITH REDUCED HEIGHT */}
      <section className="py-4" style={{background: 'linear-gradient(to right, #fff5f7 0%, #ffeef2 100%)'}}>
        <div className="mx-[5%]">
          <div className="flex flex-col lg:flex-row items-stretch rounded-[2px] overflow-hidden shadow-xl">
            {/* Content Side */}
            <div className="flex-1 p-4 flex flex-col justify-center"
                 style={{background: 'linear-gradient(135deg, #f4e7ed 0%, #fceef3 100%)'}}>
              <h4 className="text-[14px] text-pink-600 font-bold uppercase tracking-[2px] mb-2">
                Our Expertise
              </h4>
              <h2 className="text-[22px] font-bold text-gray-900 leading-tight mb-2"
                  style={{fontFamily: 'Playfair Display, serif'}}>
                Building Meaningful Connections with Care & Expertise
              </h2>
              <p className="text-gray-600 leading-[1.8] text-[12px] mb-2">
                At Shy-Eye, we specialize in creating genuine connections that turn into lasting
                relationships. Our platform blends technology with a personal touch to make finding
                your perfect match exciting, safe, and tailored to your preferences.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: 'fa-shield-heart',
                    title: 'Safe & Secure',
                    desc: 'Your privacy and security are our top priority with advanced verification.',
                  },
                  {
                    icon: 'fa-users',
                    title: 'Smart Matching',
                    desc: 'Advanced algorithms that understand your preferences perfectly.',
                  },
                  {
                    icon: 'fa-heart-pulse',
                    title: '24/7 Support',
                    desc: 'Our dedicated team is always here to help you find love.',
                  },
                  {
                    icon: 'fa-star',
                    title: 'Success Stories',
                    desc: 'Thousands of happy couples who found their perfect match.',
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-md rounded-[15px] p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-pink-500 group relative overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-600">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-800 ease-out"></div>
                    </div>
                    
                    <i className={`fa-solid ${feature.icon} text-3xl text-pink-600 mb-4 block group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10`}></i>
                    <h4 className="text-[16px] text-gray-900 mb-2 font-bold group-hover:text-pink-600 transition-colors relative z-10">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 relative z-10">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Carousel Side */}
            <div className="flex-1 h-[480px] relative lg:my-2">
              <div className="relative h-full p-[3%] rounded-[5px] overflow-hidden shadow-xl">
                <img
                  src={carouselImages[currentImageIndex]}
                  alt="Happy Couple"
                  className="w-full h-full object-cover transition-all duration-500 rounded-lg"
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-pink-600 scale-125 shadow-lg' 
                          : 'bg-white/60 hover:bg-pink-400/80 hover:scale-110'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    ></button>
                  ))}
                </div>
                <div className="absolute bottom-2 left-0 right-0 h-[3px] bg-white/30 rounded-full">
                  <div
                    className="h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${((currentImageIndex + 1) / carouselImages.length) * 100}%`,
                      background: 'linear-gradient(90deg, #f93d66, #e91e63)',
                      boxShadow: '0 0 10px rgba(249, 61, 102, 0.5)'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out;
        }
        
        @media (max-width: 1024px) {
          .w-[300px] {
            width: 250px;
          }
          .h-[420px] {
            height: 350px;
          }
          .w-[280px] {
            width: 240px;
          }
          .h-[300px] {
            height: 260px;
          }
        }
        
        @media (max-width: 768px) {
          .w-[350px] {
            width: 280px !important;
          }
          .text-[45px] {
            font-size: 32px !important;
          }
          .text-[32px] {
            font-size: 24px !important;
          }
          .py-20 {
            padding-top: 60px !important;
            padding-bottom: 60px !important;
          }
          .gap-20 {
            gap: 40px !important;
          }
        }
        
        @media (max-width: 640px) {
          .flex-row {
            flex-direction: column !important;
          }
          .w-[280px] {
            width: 200px;
          }
          .h-[260px] {
            height: 220px;
          }
          .gap-6 {
            gap: 16px !important;
          }
          .h-[450px] {
            height: 300px !important;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
        
        @media (prefers-contrast: high) {
          .bg-gradient-to-r,
          .bg-gradient-to-br {
            background: #000 !important;
            color: #fff !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;