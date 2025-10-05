import React from 'react';
import img1 from '../../assets/images/work/01.png';
import img2 from '../../assets/images/work/02.png';
import img3 from '../../assets/images/work/03.png';
import bgImage from '../../assets/images/work/bg-img-2.jpg'; // Import the background image

const steps = [
  {
    id: 1,
    title: "Create Your Profile",
    description:
      "Sign up and tell us about yourself. Upload your best photos and share your interests to attract like-minded singles.",
    icon: img1,
  },
  {
    id: 2,
    title: "Discover Your Matches",
    description:
      "Browse through verified profiles, use filters to find your perfect match, and start meaningful conversations instantly.",
    icon: img2,
  },
  {
    id: 3,
    title: "Start Dating & Enjoy!",
    description:
      "Connect, chat, and plan your first date. With SHY-EYES, you're just a few clicks away from exciting real-life connections.",
    icon: img3,
  },
];

const WorkSection = () => {
  return (
    <section
      className="relative py-8 lg:py-8 bg-cover bg-center bg-fixed bg-no-repeat "
      style={{
        backgroundImage: `url(${bgImage})`, // Use imported image
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/40 -z-10"></div>

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-10 z-10">
          <h4
            className="text-red-500 text-lg sm:text-xl font-semibold mb-2 uppercase tracking-wider font-['Jost']"
            style={{ fontFamily: 'Jost, sans-serif' }}
          >
            How SHY-EYES Works?
          </h4>
          <h2
            className="text-pink-600 text-xl sm:text-2xl lg:text-xl font-extrabold mb-1 leading-tight font-['Jost']"
            style={{ fontFamily: 'Jost, sans-serif' }}
          >
            You're Just 3 Simple Steps Away From Finding Love ❤️
          </h2>
          <p
            className="text-gray-600 text-sm lg:text-base mx-auto max-w-2xl font-['Roboto']"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Start your journey with us – it's quick, easy, and secure!
          </p>
        </div>

        {/* Steps Section */}
        <div className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center px-4">
            {steps.map((step, index) => (
              <div className="mb-8 sm:mb-0 relative group" key={step.id}>
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-10 transform -translate-y-1/2 text-red-500 text-3xl font-bold opacity-70 z-20">
                    →
                  </div>
                )}

                <div className="h-full">
                  <div className="bg-white/15 rounded-xl p-6 lg:p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:bg-white/90 hover:shadow-xl  h-full relative overflow-hidden group">
                    {/* Hover Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

                    <div className="flex flex-col items-center text-center h-full relative z-10">
                      {/* Image with Step Badge */}
                      <div className="mb-6 relative">
                        <div className="relative inline-block mb-2">
                          <img
                            src={step.icon}
                            alt={`Step ${step.id}`}
                            className="w-20 h-auto sm:w-24 lg:w-28 transition-all duration-300 group-hover:scale-110"
                          />

                          {/* Step Badge with Pulse Animation */}
                          <div
                            className="absolute -bottom-2 -right-3 sm:-bottom-2 sm:-right-4 bg-red-500 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center font-bold text-xs border-3 border-white shadow-lg transition-all duration-300 group-hover:bg-pink-600 group-hover:scale-110"
                            style={{
                              animation: 'pulse 2s infinite',
                              boxShadow: '0px 4px 10px rgba(223, 49, 77, 0.3)',
                            }}
                          >
                            <span className="text-[9px] sm:text-[10px] font-medium leading-none">
                              Step
                            </span>
                            <p
                              className="text-xs sm:text-sm font-['Jost'] leading-none mt-0 mb-0"
                              style={{ fontFamily: 'Jost, sans-serif' }}
                            >
                              {step.id}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-center">
                        <h4
                          className="text-pink-500 text-lg sm:text-xl lg:text-2xl font-semibold mb-2 transition-colors duration-300 group-hover:text-red-500 font-['Jost'] hover:text-black"
                          style={{ fontFamily: 'Jost, sans-serif' }}
                        >
                          {step.title}
                        </h4>
                        <p
                          className="text-white text-sm lg:text-base leading-relaxed mb-0 font-['Roboto'] hover:text-pink-400"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(223, 49, 77, 0.7);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(223, 49, 77, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(223, 49, 77, 0);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 575px) {
          .group .absolute.-bottom-2 {
            bottom: -6px;
            right: -10px;
            width: 45px;
            height: 45px;
          }
        }
      `}</style>
    </section>
  );
};

export default WorkSection;