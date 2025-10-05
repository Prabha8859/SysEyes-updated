import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HangingDownloadButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apkData, setApkData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch APK data from API
  useEffect(() => {
    const fetchAPKData = async () => {
      try {
        const response = await fetch('https://shyeyes-b.onrender.com/api/apk/latest', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setApkData(data);
        } else {
          console.error('Failed to fetch APK data');
        }
      } catch (err) {
        console.error('Error fetching APK data:', err);
        setError(err.message);
      }
    };

    fetchAPKData();
  }, []);

  const handleDownloadAPK = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use API URL if available, fallback to GitHub
      const apkUrl = apkData?.downloadUrl || "https://github.com/anjali817161/Shyeyes-Dating-App/releases/download/v1.0.0/app-release.apk";
      
      // Track download event via API
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await fetch('https://shyeyes-b.onrender.com/api/apk/track-download', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              version: apkData?.version || '1.0.0',
              timestamp: new Date().toISOString(),
            }),
          });
        } catch (trackError) {
          console.error('Error tracking download:', trackError);
        }
      }
      
      // Trigger download
      const link = document.createElement('a');
      link.href = apkUrl;
      link.setAttribute('download', apkData?.fileName || 'app-release.apk');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success state
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      setError('Download failed. Please try again.');
      console.error('Download error:', err);
    }
  };

  const getButtonText = () => {
    if (isLoading) return 'Downloading...';
    if (isSuccess) return 'Downloaded!';
    if (error) return 'Retry Download';
    return apkData?.buttonText || 'Download APK';
  };

  return (
    <>
      <div className="fixed top-[50px] right-[10px] z-[997] animate-wrapperSwing origin-top lg:top-[38px] lg:right-[54px] md:top-[35px] md:right-[30px] sm:top-[50px] sm:right-[12px] xs:top-[48px] xs:right-[10px]">
        {/* Hanging Rope */}
        <div className="w-1 h-[45px] mx-auto mb-0.5 rounded-sm shadow-md relative bg-gradient-to-b from-pink-600/80 to-pink-400/90 lg:h-[50px] md:h-[40px] sm:h-[35px] xs:h-[30px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-600 rounded-full shadow-md"></div>
        </div>

        {/* Download Button with Animated Border */}
        <button 
          className={`animated-download-btn relative px-7 py-3.5 cursor-pointer transition-all duration-200 overflow-hidden lg:px-7 lg:py-3.5 md:px-6 md:py-3 sm:px-5 sm:py-2.5 xs:px-5 xs:py-2.5 ${
            isLoading ? 'pointer-events-none' : ''
          } ${
            isSuccess ? 'success-state' : ''
          } ${
            error ? 'error-state' : ''
          } hover:opacity-80 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed`}
          onClick={handleDownloadAPK}
          disabled={isLoading}
          title={apkData?.version ? `Version: ${apkData.version}` : 'Download APK'}
        >
          {/* Animated Border Spans */}
          <span className="border-span border-top"></span>
          <span className="border-span border-right"></span>
          <span className="border-span border-bottom"></span>
          <span className="border-span border-left"></span>

          {/* Button Content */}
          <div className="flex items-center gap-2.5 relative z-10 lg:gap-2.5 sm:gap-2 xs:gap-1.5">
            <FavoriteIcon 
              className={`text-pink-700 !text-[22px] lg:!text-[22px] md:!text-[20px] sm:!text-[18px] xs:!text-[16px] ${
                isLoading ? 'animate-spin' : 'animate-heartBeat'
              }`}
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
              }}
            />
            <span className="text-pink-700 font-bold text-[15px] whitespace-nowrap lg:text-[15px] md:text-[14px] sm:text-[13px] xs:text-[12px]" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
              {getButtonText()}
            </span>
          </div>
        </button>

        {/* Floating Hearts */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[120px] h-20 pointer-events-none lg:w-[120px] lg:h-20 sm:w-[100px] sm:h-16 xs:w-[90px] xs:h-14">
          {['#ff9ec5', '#ff7bb3', '#ff5ca1'].map((color, i) => (
            <span
              key={i}
              className="absolute text-base opacity-0 animate-floatHeart lg:text-base md:text-base sm:text-sm xs:text-xs"
              style={{
                left: i === 0 ? '10%' : i === 1 ? '45%' : 'auto',
                right: i === 2 ? '10%' : 'auto',
                animationDelay: `${i * 1.7}s`,
                color: color
              }}
            >
              ❤
            </span>
          ))}
        </div>

        {/* Version Badge (if available) */}
        {apkData?.version && !isLoading && !isSuccess && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-pink-600 shadow-md whitespace-nowrap lg:text-xs sm:text-[10px] xs:text-[10px] xs:px-2 xs:py-0.5">
            v{apkData.version}
          </div>
        )}
      </div>

      <style jsx>{`
        /* Animated Download Button Styles */
        .animated-download-btn {
          background: linear-gradient(-30deg, #ffc0e0 50%, #ffe0f0 50%);
          display: inline-block;
          text-align: center;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          border-radius: 8px;
          box-shadow: 0 8px 20px rgba(255, 107, 188, 0.3);
        }

        .animated-download-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #ffb3d9;
          opacity: 0;
          transition: 0.2s opacity ease-in-out;
          border-radius: 8px;
        }

        .animated-download-btn:hover::before {
          opacity: 0.3;
        }

        .animated-download-btn.success-state {
          background: linear-gradient(-30deg, #a8e6cf 50%, #dcedc8 50%);
        }

        .animated-download-btn.error-state {
          background: linear-gradient(-30deg, #ffccbc 50%, #ffe0b2 50%);
        }

        /* Border Animation Spans */
        .border-span {
          position: absolute;
        }

        /* Top Border */
        .border-top {
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(to left, rgba(217, 38, 117, 0), #d92675);
          animation: 2s animateTop linear infinite;
        }

        @keyframes animateTop {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        /* Right Border */
        .border-right {
          top: 0;
          right: 0;
          height: 100%;
          width: 3px;
          background: linear-gradient(to top, rgba(217, 38, 117, 0), #d92675);
          animation: 2s animateRight linear -1s infinite;
        }

        @keyframes animateRight {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        /* Bottom Border */
        .border-bottom {
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(to right, rgba(217, 38, 117, 0), #d92675);
          animation: 2s animateBottom linear infinite;
        }

        @keyframes animateBottom {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        /* Left Border */
        .border-left {
          top: 0;
          left: 0;
          height: 100%;
          width: 3px;
          background: linear-gradient(to bottom, rgba(217, 38, 117, 0), #d92675);
          animation: 2s animateLeft linear -1s infinite;
        }

        @keyframes animateLeft {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        /* Wrapper Swing Animation */
        @keyframes wrapperSwing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
        }

        .animate-wrapperSwing {
          animation: wrapperSwing 4s ease-in-out infinite;
        }

        /* Heart Beat Animation */
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.15); }
          20% { transform: scale(1); }
        }

        .animate-heartBeat {
          animation: heartBeat 2s ease-in-out infinite;
        }

        /* Spin Animation for Loading */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1.2s linear infinite;
        }

        /* Float Heart Animation */
        @keyframes floatHeart {
          0% { transform: translateY(0) rotate(0deg) scale(0.8); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(-60px) rotate(360deg) scale(1.2); opacity: 0; }
        }

        .animate-floatHeart {
          animation: floatHeart 5s ease-in infinite;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .animate-wrapperSwing {
            animation: wrapperSwing 3.5s ease-in-out infinite;
          }
          .border-top, .border-bottom {
            height: 2.5px;
          }
          .border-left, .border-right {
            width: 2.5px;
          }
        }

        @media (max-width: 768px) {
          .animate-wrapperSwing {
            animation: wrapperSwing 3s ease-in-out infinite;
          }
          .border-top, .border-bottom {
            height: 2px;
          }
          .border-left, .border-right {
            width: 2px;
          }
        }

        @media (max-width: 640px) {
          .animate-wrapperSwing {
            animation: wrapperSwing 2.5s ease-in-out infinite;
          }
          .border-top, .border-bottom {
            height: 2px;
          }
          .border-left, .border-right {
            width: 2px;
          }
        }
      `}</style>
    </>
  );
};

export default HangingDownloadButton;