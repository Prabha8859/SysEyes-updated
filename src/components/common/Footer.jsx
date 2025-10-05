import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, ArrowRight } from 'lucide-react';
import img1 from '../../assets/images/footer/icons/01.png';
import img2 from '../../assets/images/footer/icons/02.png';
import img4 from '../../assets/images/footer/icons/03.png';
import imgs1 from '../../assets/images/footer/01.jpg';
import imgs2 from '../../assets/images/footer/02.jpg';
import imgs3 from '../../assets/images/footer/03.jpg';
import img3 from '../../assets/images/footer/about.jpg';
import bgImage from '../../assets/images/footer/bg.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter submitted with email:', email);
    // Add your newsletter submission logic here
    setEmail('');
  };

  const navigationLinks = [
    {
      category: 'Main Pages',
      links: [
        { name: 'Home', path: '/home' },
        { name: 'Contact', path: '/contact' },
        { name: 'About Us', path: '/aboutus' }
      ]
    },
    {
      category: 'Features',
      links: [
        { name: 'Profiles', path: '/profiles' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Membership', path: '/membership' }
      ]
    }
  ];

  const recentImages = [
    { img: imgs1, title: 'Dating Events', description: 'Special dating events for members' },
    { img: imgs2, title: 'Success Stories', description: 'Real couples who found love' },
    { img: imgs3, title: 'Premium Features', description: 'Advanced matching algorithms' }
  ];

  return (
    <footer className="relative">
      {/* Footer Top - Contact Info */}
       <div className="bg-[#fff3f3]  lg:border-b lg:border-[#210053]/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-0 justify-center">
            {[
              { img: img1, alt: 'Phone-icon', text: 'Phone Number : +91-9876543210' },
              { img: img2, alt: 'email-icon', text: 'Email : connect@shy-eyes.com' },
              { img: img4, alt: 'location-icon', text: 'Address : Noida, Greater Noida, UP' },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 lg:p-5 lg:border-l lg:border-[#210053]/10 last:border-r last:border-[#210053]/10 md:border md:border-[#210053]/10 mb-4 md:mb-0 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start text-center lg:text-left group transition-transform duration-300 hover:-translate-y-1">
                  <div className="mb-4 lg:mb-0 lg:mr-4">
                    <img
                      src={item.img}
                      alt={item.alt}
                      className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    />
                  </div>
                  <div>
                    <span className="text-[#210053] font-semibold text-sm md:text-base">
                      {item.text}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Middle - Main Content with Background Image */}
      <div className="relative  px-10 bg-gradient-to-br from-pink-50 to-rose-50">
        {/* Background Image with Transparency */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        
        {/* White Transparent Overlay */}
        <div className="absolute inset-0 bg-white/60"></div>
        
        <div className="container mx-auto px-6 relative ">
          {/* Custom Grid: 5-3-4 Distribution */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* About SHY-EYES - 5 columns */}
            <div className="col-span-12 py-5 lg:col-span-5 space-y-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <div className="relative">
                <h4 className="text-pink-500 text-2xl font-bold mb-6 relative">
                  About SHY-EYES
                  <div className="absolute -bottom-3 left-0 w-16 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"></div>
                </h4>
                
                <p className="text-gray-700 leading-relaxed mb-6 text-sm font-medium">
                  India's most trusted dating platform connecting hearts across the nation. 
                  We believe in creating meaningful relationships through advanced matching algorithms 
                  and genuine connections.
                </p>
                
                <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={img3}
                    alt="about-image"
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
                </div>

                {/* Recent Images Row */}
                <div className="grid grid-cols-3 gap-3">
                  {recentImages.map((item, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md"
                      onMouseEnter={() => setHoveredImage(index)}
                      onMouseLeave={() => setHoveredImage(null)}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className={`w-full h-20 object-cover transition-all duration-500 ${
                          hoveredImage === index ? 'blur-sm scale-110' : 'hover:scale-105'
                        }`}
                      />
                      
                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-rose-500/90 to-pink-600/90 flex flex-col items-center justify-center transition-all duration-500 ${
                        hoveredImage === index ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className={`text-white text-center transform transition-all duration-500 ${
                          hoveredImage === index ? 'rotate-0 scale-100' : 'rotate-45 scale-0'
                        }`}>
                          <h6 className="text-xs font-bold mb-1">{item.title}</h6>
                          <p className="text-xs opacity-90">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links - 3 columns */}
          <div className="col-span-12 lg:col-span-3 space-y-6 animate-fadeInUp py-5" style={{ animationDelay: '0.2s' }}>
              <div className="relative text-center">
                <h4 className="text-pink-500 text-2xl font-bold mb-6 relative inline-block">
                  Quick Links
                  {/* underline ko center align kiya */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"></div>
                </h4>

                <div className="space-y-6 text-center">
                  {navigationLinks.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h5 className="text-pink-600 font-semibold mb-2 text-lg">
                        {section.category}
                      </h5>
                      <ul className="space-y-2">
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <Link
                              to={link.path}
                              className="group flex items-center justify-center text-gray-700 hover:text-rose-500 transition-all duration-300 py-1"
                            >
                              <ChevronRight className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1 text-rose-400" />
                              <span className="font-medium">{link.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Newsletter Signup - 4 columns */}
            <div className="col-span-12 lg:col-span-4 space-y-6 animate-fadeInUp py-5" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <h4 className="text-pink-500 text-2xl font-bold mb-6 relative ">
                  Stay Connected
                  <div className="absolute -bottom-3 left-0 w-16 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"></div>
                </h4>
                
                <div className=" p-6  ">
                  <p className="text-gray-700 leading-relaxed mb-6 text-sm font-medium">
                    Subscribe to our newsletter and never miss updates about new features, 
                    success stories, and exclusive dating tips.
                  </p>
                  
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 border-2 border-rose-200 rounded-2xl bg-white/90 backdrop-blur-sm text-sm placeholder-gray-500 focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all duration-300"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="group relative w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/25 hover:-translate-y-1"
                    >
                      {/* Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-700 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                      
                      {/* Button Content */}
                      <div className="relative flex items-center justify-center gap-3">
                        <span className="tracking-wide">Subscribe Now</span>
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:-rotate-45 transition-transform duration-300">
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                      
                      {/* Shimmer Effect */}
                      <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-[left] duration-700 ease-out"></div>
                    </button>
                  </form>

                  {/* Additional Features */}
                  <div className="mt-6 pt-6 border-t border-purple-900/10">
                    <div className="flex flex-wrap gap-2">
                      {['Dating Tips', 'Success Stories', 'New Features'].map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border border-rose-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gradient-to-r from-purple-300 via-purple-600 to-indigo-300 py-2 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative ">
          <div className="text-center ">
            <p className="text-white/90 text-sm md:text-base font-medium ">
              &copy; 2025{' '}
              <Link
                to="/"
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 font-bold no-underline hover:from-pink-300 hover:to-rose-300 transition-all duration-300"
              >
                SHY-EYES
              </Link>{' '}
              — India's Most Trusted Dating Platform.
            </p>
            <p className="text-white/70 text-xs">
              Connecting hearts, Creating memories, Building relationships.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
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

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;