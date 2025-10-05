import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../assets/images/story/01.jpg';
import img2 from '../../assets/images/story/02.jpg';
import img3 from '../../assets/images/story/03.jpg';

const stories = [
  {
    id: 1,
    title: "Ankit & Priya - From Chats to Forever ❤️",
    description: "We started chatting casually on SHY-EYES and instantly clicked. Within weeks, we were inseparable. Now, we're planning our engagement!",
    image: img1
  },
  {
    id: 2,
    title: "Rohit & Neha - A Match Made on SHY-EYES ✨",
    description: "Thanks to SHY-EYES, I met the love of my life. We bonded over common interests and now we can't imagine life without each other.",
    image: img2
  },
  {
    id: 3,
    title: "Aarav & Simran - From First Chat to First Date 🌟",
    description: "Never thought a simple message could lead to such a beautiful connection. Our first date was magical, all thanks to SHY-EYES.",
    image: img3
  }
];

const StorySection = () => {
  return (
    <section 
      className="py-5 lg:py-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fff3f3 0%, #ffe6f0 50%, #fff3f3 100%)'
      }}
    >
      {/* Background Decorative Elements */}
      <div 
        className="absolute top-[10%] right-[5%] w-20 h-20 lg:w-25 lg:h-25 opacity-10 animate-spin hidden md:block"
        style={{
          background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23df314d"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>') no-repeat center`,
          backgroundSize: 'contain',
          animationDuration: '20s'
        }}
      ></div>
      
      <div 
        className="absolute bottom-[10%] left-[5%] w-16 h-16 lg:w-20 lg:h-20 opacity-5 animate-bounce hidden md:block"
        style={{
          background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23210053"><path d="M12 2C13.1 2 14 2.9 14 4S13.1 6 12 6 10 5.1 10 4 10.9 2 12 2m0 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0-12c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"/></svg>') no-repeat center`,
          backgroundSize: 'contain'
        }}
      ></div>

      <div className="container mx-auto max-w-6xl px-4 relative ">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-10 relative">
          <h4 className="text-red-500 text-base sm:text-lg lg:text-xl font-semibold mb-4 uppercase tracking-wide font-['Jost']" 
              style={{ fontFamily: 'Jost, sans-serif' }}>
            SHY-EYES Love Stories
          </h4>
          <h4 className="text-pink-600 text-2xl sm:text-3xl lg:text-1xl xl:text-xl font-bold leading-tight m-0 font-['Jost'] relative" 
              style={{ fontFamily: 'Jost, sans-serif' }}>
            Beautiful Journeys That Started With A Swipe
            <span className="inline-block ml-2 animate-bounce" style={{ 
              animation: 'float 3s ease-in-out infinite'
            }}>💕</span>
          </h4>
        </div>

        {/* Stories Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {stories.map((story, index) => (
              <div 
                className="mb-6 group"
                key={story.id}
                style={{
                  animation: `fadeInUp 0.6s ease ${0.1 + (index * 0.2)}s both`
                }}
              >
                <div className="h-full transition-all duration-500 hover:-translate-y-3" 
                     style={{ 
                       height: '90%',
                       transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                     }}>
                  <div className="relative">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-500 h-full flex flex-col border-2 border-transparent group-hover:border-red-500 group-hover:shadow-2xl">
                      
                      {/* Image */}
                      <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
                        <img 
                          src={story.image} 
                          alt="story"
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                          style={{ 
                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-8 flex-1 flex flex-col bg-white">
                        <h4 className="mb-4">
                          <Link 
                            to="/blog-single"
                            className="text-purple-900 text-lg sm:text-xl lg:text-2xl font-bold leading-tight no-underline transition-all duration-300 hover:text-red-500 hover:no-underline block font-['Jost']"
                            style={{ fontFamily: 'Jost, sans-serif' }}
                          >
                            {story.title}
                          </Link>
                        </h4>
                        
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 flex-1 font-['Roboto']" 
                           style={{ fontFamily: 'Roboto, sans-serif' }}>
                          {story.description}
                        </p>
                        
                        {/* Blob Button */}
                        <Link to="/blog-single" className="w-full sm:w-auto">
                          <button className="blob-btn relative inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3 text-xs sm:text-sm font-semibold uppercase text-red-500 bg-white border-0 rounded-full cursor-pointer transition-all duration-300 overflow-hidden z-10 no-underline tracking-wider w-full sm:w-auto justify-center group">
                            {/* Border */}
                            <div className="absolute inset-0 border-2 border-red-500 rounded-full z-20"></div>
                            
                            {/* Inner Container */}
                            <div className="blob-btn__inner absolute inset-0 -z-10 overflow-hidden rounded-full bg-white">
                              <div className="blob-btn__blobs relative block h-full" style={{ filter: 'url(#goo)' }}>
                                <span className="blob-btn__blob absolute top-0.5 w-1/4 h-full bg-red-500 rounded-full transition-transform duration-500" 
                                      style={{ 
                                        left: '0%',
                                        transform: 'translate3d(0, 150%, 0) scale(1.7)',
                                        transitionDelay: '0s'
                                      }}></span>
                                <span className="blob-btn__blob absolute top-0.5 w-1/4 h-full bg-red-500 rounded-full transition-transform duration-500" 
                                      style={{ 
                                        left: '30%',
                                        transform: 'translate3d(0, 150%, 0) scale(1.7)',
                                        transitionDelay: '0.1s'
                                      }}></span>
                                <span className="blob-btn__blob absolute top-0.5 w-1/4 h-full bg-red-500 rounded-full transition-transform duration-500" 
                                      style={{ 
                                        left: '60%',
                                        transform: 'translate3d(0, 150%, 0) scale(1.7)',
                                        transitionDelay: '0.2s'
                                      }}></span>
                                <span className="blob-btn__blob absolute top-0.5 w-1/4 h-full bg-red-500 rounded-full transition-transform duration-500" 
                                      style={{ 
                                        left: '90%',
                                        transform: 'translate3d(0, 150%, 0) scale(1.7)',
                                        transitionDelay: '0.3s'
                                      }}></span>
                              </div>
                            </div>
                            
                            {/* Icon */}
                            <i className="text-base transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">→</i>
                            <span className="relative z-30">Read More</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Filter for Blob Effect */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute opacity-0 pointer-events-none">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 21 -7" result="goo"></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>

      {/* Custom Styles for Complex Animations */}
      <style jsx>{`
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
            transform: translateY(-5px);
          }
        }

        /* Blob Button Hover Effects */
        .blob-btn:hover {
          color: white;
          background-color: #df314d;
        }

        .blob-btn:hover .blob-btn__blob {
          transform: translateZ(0) scale(1.4) !important;
        }

        /* Responsive adjustments */
        @media (max-width: 767px) {
          .blob-btn {
            width: 100%;
            justify-content: center;
            padding: 10px 25px;
            font-size: 13px;
          }
        }

        @media (max-width: 575px) {
          .blob-btn {
            padding: 8px 20px;
            font-size: 12px;
          }
        }

        @media (max-width: 320px) {
          .container {
            padding: 0 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default StorySection;