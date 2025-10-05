import React, { useEffect, useRef, useState } from "react";

// Import your actual images here
import img1 from "../../assets/images/about/01.png";
import img2 from "../../assets/images/about/02.png";
import img3 from "../../assets/images/about/03.png";
import img4 from "../../assets/images/about/04.png";

const stats = [
  { id: 1, value: 50452, label: "Verified Profiles", icon: img1 },
  { id: 2, value: 12784, label: "Active Members Today", icon: img2 },
  { id: 3, value: 6789, label: "Men Currently Online", icon: img3 },
  { id: 4, value: 5995, label: "Women Currently Online", icon: img4 },
];

// Format number with commas
const formatNumber = (num) => num.toLocaleString();

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasCounted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCounted.current) {
            hasCounted.current = true;

            let start = 0;
            const duration = 2000; // 2s me complete
            const increment = Math.ceil(target / (duration / 20)); // step size

            const timer = setInterval(() => {
              start += increment;
              if (start >= target) {
                clearInterval(timer);
                setCount(target); // final value fix
              } else {
                setCount(start);
              }
            }, 20);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [target]);

  return (
    <h2 
      className="text-4xl lg:text-5xl xl:text-6xl font-bold text-red-500 mb-2 font-['Jost'] transition-all duration-300 group-hover:scale-110 animate-pulse" 
      ref={ref}
      style={{
        fontFamily: 'Jost, sans-serif',
        animation: 'countUp 0.5s ease-out'
      }}
    >
      {formatNumber(count)}
    </h2>
  );
};

const AboutSection = () => {
  return (
    <section className="py-4 lg:py-4 bg-red-50 relative">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-8 relative z-10 max-w-4xl mx-auto">
          <h4 className="text-red-500 text-lg sm:text-xl font-semibold mb-3 uppercase tracking-wider font-['Jost']" style={{ fontFamily: 'Jost, sans-serif' }}>
            About SHY-EYES
          </h4>
          <h2 className="text-pink-500 text-2xl sm:text-3xl lg:text-xl xl:text-xl font-bold leading-tight -mt-1 font-['Jost']" style={{ fontFamily: 'Jost, sans-serif' }}>
            Find Real Connections, One Date at a Time ❤️
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            {stats.map((stat) => (
              <div className="mb-8 sm:mb-0" key={stat.id}>
                <div className="h-full group">
                  <div className="bg-white p-8 lg:p-12 xl:p-14 rounded-xl relative shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 h-full cursor-default overflow-hidden">
                    
                    {/* Corner Triangle */}
                    <div 
                      className="absolute top-0 left-0 w-0 h-0" 
                      style={{
                        borderStyle: 'solid',
                        borderWidth: '50px 50px 0 0',
                        borderColor: '#df314e transparent transparent transparent'
                      }}
                    ></div>

                    {/* Shine Effect */}
                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent transition-all duration-700 group-hover:left-full"></div>

                    {/* Icon */}
                    <div className="mb-10 text-center">
                      <img 
                        src={stat.icon} 
                        alt="icon" 
                        className="w-20 h-20 object-contain mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                      />
                    </div>

                    {/* Content */}
                    <div className="text-center pt-6 relative">
                      {/* Red Line */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-500 rounded-full"></div>
                      
                      {/* Counter */}
                      <Counter target={stat.value} />
                      
                      {/* Label */}
                      <p className="text-gray-600 text-sm lg:text-base font-medium font-['Roboto'] m-0" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;