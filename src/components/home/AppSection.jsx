
import React from 'react';
import img1 from '../../assets/images/appSection/apple.png';
import img2 from '../../assets/images/appSection/mobile-view.png';
import img3 from '../../assets/images/appSection/playstore.png';
import img4 from '../../assets/images/appSection/shape.png';

const AppSection = () => {
  return (
    <section className="relative bg-[#fff3f3] py-20 lg:py-5">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col text-left">
          {/* Background Shape Image for Larger Screens */}
          <div
            className="hidden xl:block absolute right-[29%] bottom-[13%] w-[280px] h-[365px] bg-no-repeat bg-center animate-up-down "
            style={{ backgroundImage: `url(${img4})` }}
          ></div>

          {/* App Content */}
          <div className="w-full  ">
            <h4 className="text-[#df314d] text-xl font-semibold uppercase tracking-wider mb-2.5">
              Download the Shy-Eyes App
            </h4>
            <h2 className="text-[#210053] text-3xl md:text-4xl font-bold mb-5 leading-tight">
              Connect With Genuine People Instantly
            </h2>
            <p className="text-[#666] text-lg md:text-xl leading-relaxed mb-12 max-w-[540px] mx-auto lg:mx-0">
              Join India's most trusted private dating and networking platform.
              Over 5,00,000+ users have already started their journey towards
              meaningful connections. With Shy-Eyes, safety, privacy, and real
              conversations come first.
            </p>
            <ul className="flex flex-wrap gap-5 list-none p-0 m-0">
              <li className="transition-transform duration-300">
                <a
                  href="#"
                  className="flex items-center  p-2 lg:p-4 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.01)] border-2 border-transparent hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:border-[#df314d] no-underline"
                >
                  <div className="mr-2.5 lg:mr-5 flex-shrink-0">
                    <img
                      src={img1}
                      alt="apple"
                      className="w-[30px] h-auto transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-[#555555] text-sm mb-1">Download on the</p>
                    <h4 className="text-[#df314d] text-lg font-semibold mb-0">
                      App Store
                    </h4>
                  </div>
                </a>
              </li>
              <li className="transition-transform duration-300">
                <a
                  href="#"
                  className=" bg-none flex items-center  p-2 lg:p-4 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.02)] border-2 border-transparent hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:border-[#df314d] no-underline"
                >
                  <div className="mr-2.5 lg:mr-5 flex-shrink-0">
                    <img
                      src={img3}
                      alt="Download App"
                      className="w-[30px] h-auto transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-[#555555] text-sm mb-1">Get it on APK File</p>
                    <h4 className="text-[#df314d] text-lg font-semibold mb-0">
                      Download App
                    </h4>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile App Image */}
          <div className="hidden md:block absolute right-0 bottom-0  w-[25%] lg:w-auto">
            <img
              src={img2}
              alt="Shy-Eyes Mobile Preview"
              className="max-w-full h-auto animate-float"
            />
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes up-down {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-up-down {
          animation: up-down 8s infinite cubic-bezier(0.46, 0.03, 0.52, 0.96);
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Ensure hover effect for img works with group class */
        li:hover img {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default AppSection;