import React, { useState, useEffect } from 'react';
import img01 from '../../assets/images/banner/01.png';

const BannerSection = () => {
  // Typewriter effect state
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = [
    "Find Your Perfect Match",
    "Connect with Like-minded People",
    "Start Your Love Story Today",
    "Discover Meaningful Relationships",
    "Meet Your Soulmate Here"
  ];

  // Typewriter effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentFullText = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(currentFullText.substring(0, currentText.length + 1));
        
        if (currentText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);

  const getFeatureIcon = (index) => {
    const iconStyle = {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontWeight: 'bold',
      color: 'white',
      flexShrink: 0
    };

    if (index === 0 || index === 2) { // Heart for 1st and 3rd features
      return <div style={{...iconStyle, background: 'linear-gradient(135deg, #df314d, #ff4d6d)'}}>♥</div>;
    } else { // Chat for 2nd and 4th features
      return <div style={{...iconStyle, background: 'linear-gradient(135deg, #3742fa, #5f27cd)'}}>💬</div>;
    }
  };

  const features = [
    "Verified Dating Profiles",
    "Privacy Protected", 
    "Advanced Compatibility",
    "Real-time Messaging"
  ];

  return (
    <>
      <style jsx>{`
        .typewriter-cursor {
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .hover-animation:hover {
          animation: rotateBorder 2s ease-in-out;
        }

        @keyframes rotateBorder {
          0% {
            border-radius: 0.9375rem;
            transform: translateY(-0.1875rem) rotate(0deg);
          }
          25% {
            border-radius: 1.5625rem 0.9375rem 1.5625rem 0.9375rem;
            transform: translateY(-0.1875rem) rotate(1deg);
          }
          50% {
            border-radius: 0.9375rem 1.5625rem 0.9375rem 1.5625rem;
            transform: translateY(-0.1875rem) rotate(-1deg);
          }
          75% {
            border-radius: 1.5625rem 0.9375rem 1.5625rem 0.9375rem;
            transform: translateY(-0.1875rem) rotate(0.5deg);
          }
          100% {
            border-radius: 0.9375rem;
            transform: translateY(-0.1875rem) rotate(0deg);
          }
        }

        .gradient-top {
          background: linear-gradient(90deg, #df314d, #ff4d6d, #df314d);
          background-size: 200% 100%;
          animation: gradientMove 3s ease-in-out infinite;
        }

        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .btn-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s;
        }

        .btn-shine:hover::before {
          left: 100%;
        }

        .feature-hover:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .btn-icon-hidden {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .primary-cta:hover .btn-icon-hidden {
          opacity: 1;
          transform: translateX(0);
        }

        .primary-cta:hover .btn-text {
          transform: translateX(-5px);
        }

        /* Floating shapes animations */
        .shape-1 { animation: up-down 6s infinite linear; }
        .shape-2 { animation: angle-move 5s infinite cubic-bezier(0.46, 0.03, 0.52, 0.96); }
        .shape-3 { animation: zoom 7s infinite; }
        .shape-4 { animation: up-down 5s infinite ease-in-out; }
        .shape-5 { animation: angle-move 5s infinite ease-in-out; }
        .shape-6 { animation: up-down 5s infinite ease-in-out; }
        .shape-7 { animation: rotate 10s infinite linear; }
        .shape-8 { animation: bounce-1 5s infinite linear; }

        @keyframes up-down {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes angle-move {
          0%, 100% { transform: rotate(0deg) translateX(0px); }
          25% { transform: rotate(90deg) translateX(10px); }
          50% { transform: rotate(180deg) translateX(0px); }
          75% { transform: rotate(270deg) translateX(-10px); }
        }

        @keyframes zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes bounce-1 {
          0%, 100% { transform: translateY(0px); }
          25% { transform: translateY(-15px); }
          50% { transform: translateY(0px); }
          75% { transform: translateY(-8px); }
        }
      `}</style>
      
      <section 
        className="pt-[30%] sm:pt-[10%] min-h-screen relative"
        style={{ background: 'linear-gradient(135deg, #fff3f3 0%, #ffe6f0 50%, #fff3f3 100%)' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-end">
            <div className="w-full lg:w-6/12">
              <div className="banner-content">
                <div className="max-w-[500px] border-[5px] border-[#df314d] p-5 mb-[1%] lg:ml-[10%] rounded-2xl shadow-[0_20px_40px_rgba(223,49,77,0.1)] relative overflow-hidden transition-all duration-400 hover:border-[#ff4d6d] hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(223,49,77,0.2)] hover-animation"
                     style={{ background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)' }}>
                  
                  {/* Top gradient bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 gradient-top"></div>
                  
                  <div className="intro-content-inner">
                    <div className="main-heading">
                      <h1 className="text-4xl lg:text-[2.3rem] text-[#210053] font-bold leading-tight mb-2" style={{ fontFamily: '"Jost", sans-serif' }}>
                        Welcome to{' '}
                        <span 
                          className="bg-gradient-to-r from-[#df314d] to-[#ff4d6d] bg-clip-text text-transparent"
                          style={{ textShadow: '0 2px 4px rgba(223, 49, 77, 0.2)' }}
                        >
                          SHY-EYES
                        </span>
                      </h1>
                      
                      <div className="h-15 mb-3 w-full max-w-full overflow-hidden flex items-center justify-center">
                        <h2 className="text-xl lg:text-[1.6rem] text-[#4a148c] font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full text-center leading-snug" style={{ fontFamily: '"Jost", sans-serif' }}>
                          {currentText}
                          <span className="text-[#df314d] typewriter-cursor ml-1">|</span>
                        </h2>
                      </div>
                    </div>
                    
                    <div className="content-description">
                      <p className="text-lg text-[#555555] leading-relaxed mb-3" style={{ fontFamily: '"Jost", sans-serif' }}>
                        Where real connections begin and lasting relationships flourish. 
                        Join thousands of singles who have found their perfect match through our platform.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 bg-gradient-to-br from-[#f8f2ff] to-[#e8f5ff] p-4 rounded-xl border border-[rgba(223,49,77,0.1)] transition-all duration-300 feature-hover hover:border-[rgba(223,49,77,0.3)] hover:shadow-[0_8px_20px_rgba(223,49,77,0.15)] hover:bg-gradient-to-br hover:from-[#fff0f5] hover:to-[#f0f8ff]" style={{ fontFamily: '"Jost", sans-serif' }}>
                            {getFeatureIcon(index)}
                            <span className="text-[#210053] font-medium text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center mb-8">
                      <button 
                        className="primary-cta btn-shine relative overflow-hidden border-none px-11 py-5 text-lg font-semibold rounded-[50px] cursor-pointer transition-all duration-400 shadow-[0_8px_25px_rgba(223,49,77,0.3)] flex items-center justify-center gap-3 mx-auto min-w-[200px] text-white hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_40px_rgba(223,49,77,0.5)] active:translate-y-0 active:scale-[1.02] active:shadow-[0_8px_20px_rgba(223,49,77,0.6)]"
                        style={{ 
                          fontFamily: '"Jost", sans-serif',
                          background: 'linear-gradient(135deg, #df314d 0%, #c12844 50%, #df314d 100%)'
                        }}
                        // onMouseEnter={(e) => {
                        //   e.target.style.background = 'linear-gradient(135deg, #ff4d6d 0%, #df314d 50%, #c12844 100%)';
                        // }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, #df314d 0%, #c12844 50%, #df314d 100%)';
                        }}
                      >
                        <span className="btn-text transition-transform duration-300">Start Your Journey</span>
                        <span className="btn-icon-hidden text-xl">→</span>
                      </button>
                      
                      <p className="mt-3 text-[#888888] text-sm" style={{ fontFamily: '"Jost", sans-serif' }}>
                        Join over 10,000+ happy couples
                      </p>
                    </div>
                    
                    <div className="text-center pt-1 border-t border-[rgba(223,49,77,0.1)]">
                      <p className="text-[#888888] text-sm italic m-0" style={{ fontFamily: '"Jost", sans-serif' }}>
                        Trusted by thousands • Secure platform • Real connections
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-6/12">
              <div className="banner-thumb relative ">
                <img src={img01} alt="SHY-EYES Banner Image" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Shapes */}
        <div className="all-shapes hidden lg:block">
          <div className="shape-1 absolute w-4 h-4 bg-pink-400 rounded-full top-[38%] right-[5%] xl:top-[20%] xl:right-[5%] 2xl:top-[28%] 2xl:right-[28%]"></div>
          <div className="shape-2 absolute w-6 h-6 bg-purple-400 rounded-full top-[40%] right-[19%] xl:top-[15%] xl:right-[17%] 2xl:top-[30%] 2xl:right-[37%]"></div>
          <div className="shape-3 absolute w-5 h-5 bg-red-400 rounded-full top-[59%] right-[38%] xl:top-[30%] xl:right-[36%] 2xl:top-[52%] 2xl:right-[41%]"></div>
          <div className="shape-4 absolute w-3 h-3 bg-pink-500 rounded-full top-[26%] right-[26%] xl:top-[21%] xl:right-[34%] 2xl:top-[36%] 2xl:right-[42%]"></div>
          <div className="shape-5 absolute w-4 h-4 bg-purple-500 rounded-full top-[50%] right-[45%] xl:top-[46%] xl:right-[46%] 2xl:top-[78%] 2xl:right-[49%]"></div>
          <div className="shape-6 absolute w-6 h-6 bg-red-300 rounded-full top-[32%] right-[30%] xl:top-[26%] xl:right-[37%] 2xl:top-[42%] 2xl:right-[44%]"></div>
          <div className="shape-7 absolute w-5 h-5 bg-pink-300 rounded-full top-[62%] right-[44%] xl:top-[56%] xl:right-[47%] 2xl:top-[62%] 2xl:right-[50%]"></div>
          <div className="shape-8 absolute w-4 h-4 bg-purple-300 rounded-full top-[25%] right-[45%] xl:top-[21%] xl:right-[50%] 2xl:top-[35%] 2xl:right-[52%]"></div>
        </div>
      </section>
    </>
  );
};

export default BannerSection;