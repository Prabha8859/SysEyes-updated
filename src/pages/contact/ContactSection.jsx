import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import img1 from '../../assets/images/contact/01.png';
import img2 from '../../assets/images/contact/02.png';
import img3 from '../../assets/images/contact/03.png';
import img4 from '../../assets/images/contact/04.png';
import background from '../../assets/images/contact/blog2.avif';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    number: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      disable: 'prefers-reduced-motion'
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    setSubmitStatus('success');
    setTimeout(() => {
      setSubmitStatus('');
    }, 3000);
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      number: '',
      message: ''
    });
  };

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative max-h-[400px] bg-center bg-cover bg-no-repeat flex items-center overflow-hidden mt-0 pt-0"
        style={{ backgroundImage: `url(${background})` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,243,243,0.2)] via-[rgba(255,238,245,0.2)] to-[rgba(223,49,77,0.1)] z-[1]"></div>
        <div className="relative z-[2] w-full">
          <div className="container mx-auto px-4 md:px-5">
            <div className="flex items-center min-h-[40vh] my-[8%]">
              <div className="w-full text-center">
                <div className="py-6">
                  <h1 
                    className="text-[clamp(2rem,5vw,3rem)] font-bold text-shy-dark mb-4 text-shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
                    data-aos="fade-up"
                  >
                    Connect With Us
                  </h1>
                  <p 
                    className="text-base text-white max-w-[600px] mx-auto mb-8 leading-relaxed"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    We're here to help you find your perfect match. 
                    Get in touch and let's make magic happen!
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center bg-white from-shy-pink-accent to-shy-pink text-pint-500 px-6 py-3 rounded-full font-semibold no-underline shadow-[0_4px_15px_rgba(223,49,77,0.3)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgba(223,49,77,0.4)] hover:scale-105"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <i className="fas fa-home mr-2"></i>Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-pink-50 overflow-hidden py-4 px-10 max-md:py-4 max-sm:py-4">
        <div className="container mx-auto px-10 md:px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Side - Enhanced Form */}
            <div className="lg:col-span-7">
              <div 
                className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-pink-100 transition-all duration-500 "
                data-aos="fade-up"
              >
                {/* Form Header - Redesigned */}
                <div className="py-2 max-md:p-4 max-sm:p-5 border-b border-pink-50">
                  <div className="text-center">
                    <h2 
                      className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent mb-3 max-md:text-2xl max-sm:text-xl"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      Send Us a Message
                    </h2>
                    <p 
                      className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto max-md:text-base max-sm:text-sm"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      We'd love to hear from you. Share your thoughts and we'll get back to you soon.
                    </p>
                  </div>
                  
                  {/* Social Links - Redesigned */}
                  {/* <div 
                    className="mt-6 text-center"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <span className="block text-sm text-gray-500 font-medium mb-4">Follow us on social media:</span>
                    <div className="flex justify-center gap-3 max-sm:gap-2">
                      <a
                        href="#"
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:rotate-6 max-sm:w-10 max-sm:h-10"
                        aria-label="Facebook"
                        data-aos="zoom-in"
                        data-aos-delay="400"
                      >
                        <i className="fab fa-facebook-f text-lg max-sm:text-base"></i>
                      </a>
                      <a
                        href="#"
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-sky-500 to-sky-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:rotate-6 max-sm:w-10 max-sm:h-10"
                        aria-label="Twitter"
                        data-aos="zoom-in"
                        data-aos-delay="450"
                      >
                        <i className="fab fa-twitter text-lg max-sm:text-base"></i>
                      </a>
                      <a
                        href="#"
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:rotate-6 max-sm:w-10 max-sm:h-10"
                        aria-label="Instagram"
                        data-aos="zoom-in"
                        data-aos-delay="500"
                      >
                        <i className="fab fa-instagram text-lg max-sm:text-base"></i>
                      </a>
                      <a
                        href="#"
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-blue-700 to-blue-800 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-xl hover:rotate-6 max-sm:w-10 max-sm:h-10"
                        aria-label="LinkedIn"
                        data-aos="zoom-in"
                        data-aos-delay="550"
                      >
                        <i className="fab fa-linkedin-in text-lg max-sm:text-base"></i>
                      </a>
                    </div>
                  </div> */}
                </div>
                
                {/* Contact Form */}
                <form 
                  onSubmit={handleSubmit} 
                  className="p-2 max-md:p-4 max-sm:p-5" 
                  noValidate
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label 
                        className="flex items-center font-semibold text-gray-700 mb-1 text-sm uppercase tracking-wide transition-colors duration-300 group-focus-within:text-pink-600"
                        data-aos="fade-up"
                        data-aos-delay="650"
                      >
                        <i className="fas fa-user mr-2 text-pink-500"></i>Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full p-3 border-2 border-gray-200 rounded-xl text-gray-700 bg-gray-50 transition-all duration-300 focus:outline-none focus:border-pink-500 focus:bg-white focus:shadow-[0_0_20px_rgba(236,72,153,0.1)] hover:border-pink-300 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    
                    <div className="relative group">
                      <label 
                        className="flex items-center font-semibold text-gray-700 mb-1 text-sm uppercase tracking-wide transition-colors duration-300 group-focus-within:text-pink-600"
                        data-aos="fade-up"
                        data-aos-delay="700"
                      >
                        <i className="fas fa-envelope mr-2 text-pink-500"></i>Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full p-2 border-2 border-gray-200 rounded-xl text-gray-700 bg-gray-50 transition-all duration-300 focus:outline-none focus:border-pink-500 focus:bg-white focus:shadow-[0_0_20px_rgba(236,72,153,0.1)] hover:border-pink-300 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    
                    <div className="relative group">
                      <label 
                        className="flex items-center font-semibold text-gray-700 mb-1 text-sm uppercase tracking-wide transition-colors duration-300 group-focus-within:text-pink-600"
                        data-aos="fade-up"
                        data-aos-delay="750"
                      >
                        <i className="fas fa-mobile-alt mr-2 text-pink-500"></i>Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full p-3 border-2 border-gray-200 rounded-xl text-gray-700 bg-gray-50 transition-all duration-300 focus:outline-none focus:border-pink-500 focus:bg-white focus:shadow-[0_0_20px_rgba(236,72,153,0.1)] hover:border-pink-300 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    
                    <div className="relative group">
                      <label 
                        className="flex items-center font-semibold text-gray-700 mb-1 text-sm uppercase tracking-wide transition-colors duration-300 group-focus-within:text-pink-600"
                        data-aos="fade-up"
                        data-aos-delay="800"
                      >
                        <i className="fas fa-tag mr-2 text-pink-500"></i>Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        className="w-full p-3 border-2 border-gray-200 rounded-xl text-gray-700 bg-gray-50 transition-all duration-300 focus:outline-none focus:border-pink-500 focus:bg-white focus:shadow-[0_0_20px_rgba(236,72,153,0.1)] hover:border-pink-300 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2 relative group">
                      <label 
                        className="flex items-center font-semibold text-gray-700 mb-1 text-sm uppercase tracking-wide transition-colors duration-300 group-focus-within:text-pink-600"
                        data-aos="fade-up"
                        data-aos-delay="850"
                      >
                        <i className="fas fa-comment-dots mr-2 text-pink-500"></i>Your Message *
                      </label>
                      <textarea
                        name="message"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        className="w-full p-3 border-2 border-gray-200 rounded-xl text-gray-700 bg-gray-50 transition-all duration-300 focus:outline-none focus:border-pink-500 focus:bg-white focus:shadow-[0_0_20px_rgba(236,72,153,0.1)] hover:border-pink-300 placeholder:text-gray-400 resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-center" data-aos="fade-up" data-aos-delay="900">
                    <button 
                      type="submit" 
                      className={`relative bg-gradient-to-r from-pink-500 to-pink-600 text-white border-none px-10 py-4 rounded-xl text-base font-bold uppercase tracking-wide cursor-pointer transition-all duration-500 shadow-[0_10px_30px_rgba(236,72,153,0.3)] min-w-[200px] overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(236,72,153,0.4)] hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none ${submitStatus === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600' : ''}`}
                      disabled={submitStatus === 'success'}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                      <span className="relative z-10 flex items-center justify-center">
                        {submitStatus === 'success' ? (
                          <>
                            <i className="fas fa-check-circle mr-2"></i>
                            Message Sent!
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane mr-2 transition-transform duration-300 group-hover:translate-x-1"></i>
                            Send Message
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                  
                  {submitStatus === 'success' && (
                    <div 
                      className="flex items-center justify-center gap-3 mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl text-green-700 font-semibold shadow-lg"
                      data-aos="fade-up"
                      data-aos-delay="950"
                    >
                      <i className="fas fa-heart text-xl text-green-600 animate-pulse"></i>
                      <span>Thank you! We'll get back to you within 24 hours.</span>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right Side - Enhanced Contact Info */}
            <div className="lg:col-span-5">
              <div 
                className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-pink-100 transition-all "
              
              >
                {/* Contact Info Header */}
                <div className="px-6 py-2  max-md:p-6 max-sm:p-5 border-b border-pink-50">
                  <div className="text-center">
                    <h2 
                      className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent mb-3 max-md:text-2xl max-sm:text-xl"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      Get In Touch
                    </h2>
                    <p 
                      className="text-gray-600 text-md leading-relaxed max-w-md mx-auto max-md:text-base max-sm:text-sm"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      Find all the information you need to reach our amazing team. We're always here to help!
                    </p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="p-4 max-md:p-4 max-sm:p-5">
                  <div 
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border-l-4 border-pink-500 transition-all duration-300 hover:bg-pink-50 hover:shadow-lg hover:-translate-y-1 mb-2"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg transition-all duration-300 hover:scale-110"
                      data-aos="zoom-in"
                      data-aos-delay="350"
                    >
                      <img src={img1} alt="Address" className="w-6 h-6 object-contain filter brightness-0 invert" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-gray-800 mb-1">Our Location</h5>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        1201 Park Street, Fifth Avenue
                        <br />
                        <span className="text-pink-500 font-medium">New York, NY 10001</span>
                      </p>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border-l-4 border-pink-500 transition-all duration-300 hover:bg-pink-50 hover:shadow-lg hover:-translate-y-1 mb-2"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg transition-all duration-300 hover:scale-110"
                      data-aos="zoom-in"
                      data-aos-delay="450"
                    >
                      <img src={img2} alt="Phone" className="w-6 h-6 object-contain filter brightness-0 invert" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-gray-800 mb-1">Phone Numbers</h5>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        <a href="tel:+22698745632" className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-300 block mb-1">+226 98 745 632</a>
                        <a href="tel:+02982745" className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-300 block">02 982 745</a>
                      </p>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border-l-4 border-pink-500 transition-all duration-300 hover:bg-pink-50 hover:shadow-lg hover:-translate-y-1 mb-6"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg transition-all duration-300 hover:scale-110"
                      data-aos="zoom-in"
                      data-aos-delay="550"
                    >
                      <img src={img3} alt="Email" className="w-6 h-6 object-contain filter brightness-0 invert" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-gray-800 mb-2">Email Address</h5>
                      <p className="text-gray-600 text-sm">
                        <a href="mailto:admin@shy-eyes.com" className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-300">
                          admin@shy-eyes.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border-l-4 border-pink-500 transition-all duration-300 hover:bg-pink-50 hover:shadow-lg hover:-translate-y-1 mb-2"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg transition-all duration-300 hover:scale-110"
                      data-aos="zoom-in"
                      data-aos-delay="650"
                    >
                      <img src={img4} alt="Website" className="w-6 h-6 object-contain filter brightness-0 invert" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-gray-800 mb-2">Our Website</h5>
                      <p className="text-gray-600 text-sm">
                        <a
                          href="https://www.shy-eyes-dating.com"
                          className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          www.shy-eyes-dating.com
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div 
                    className="bg-gradient-to-r from-pink-50 to-pink-100 p-2 rounded-xl border border-pink-200"
                  >
                    <h5 className="text-lg font-bold text-gray-800 mb-2 text-center">Quick Actions</h5>
                    <div className="flex gap-4 max-md:flex-col">
                      <a
                        href="tel:+22698745632"
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-green-500 to-green-600 no-underline "
                        data-aos="zoom-in"
                        data-aos-delay="750"
                      >
                        <i className="fas fa-phone text-lg"></i>
                        <span>Call Now</span>
                      </a>
                      <a
                        href="mailto:admin@shy-eyes.com"
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-pink-500 to-pink-600 no-underline transition-all "
                        data-aos="zoom-in"
                        data-aos-delay="800"
                      >
                        <i className="fas fa-envelope text-lg"></i>
                        <span>Email Us</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <div 
              className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
              data-aos="fade-up"
            >
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-pink-50 to-pink-100 border-b border-pink-200">
                <h3 
                  className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent max-md:text-xl"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  Find Us On Map
                </h3>
                <a
                  href="https://www.google.com/maps/place/Bhutani+Alphathum/@28.627147,77.373636,17z/data=!3m1!4b1!4m6!3m5!1s0x390ceff1b91d6d8f:0xafebade4c1b14f03!8m2!3d28.627147!4d77.373636!16s%2Fg%2F11g0wgvj3?entry=ttu&g_ep=EgoyMDI0MDkyNS4xIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-pink-500 to-pink-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm no-underline shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:scale-105"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <i className="fas fa-map-marker-alt mr-2"></i>View Location
                </a>
              </div>
              <div 
                className="relative h-96 overflow-hidden max-md:h-80 max-sm:h-64"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.889150324148!2d77.37106111508247!3d28.62714709569565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceff1b91d6d8f%3A0xafebade4c1b14f03!2sBhutani%20Alphathum!5e0!3m2!1sen!2sin!4v1695812345678!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  title="Bhutani Alphathum Location"
                  className="w-full h-full border-none transition-all duration-500 hover:saturate-150"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Custom Styles */}
        <style jsx>{`
          /* Gradient Animation */
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* Pulse Animation for Icons */
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          /* Floating Animation */
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          /* Shimmer Effect */
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          /* Custom Hover Effects */
          .form-control:focus {
            animation: pulse 2s infinite;
          }

          .submit-btn:hover {
            background-size: 200% 200%;
            animation: gradientShift 2s ease infinite;
          }

          .social-icon:hover {
            animation: float 1s ease-in-out infinite;
          }

          /* Accessibility Enhancements */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation: none !important;
              transition: none !important;
            }
          }

          @media (prefers-contrast: high) {
            .bg-white {
              border: 2px solid #000;
            }
            input, textarea {
              border: 2px solid #333;
            }
          }

          /* Dark Mode Support */
          @media (prefers-color-scheme: dark) {
            .bg-white {
              background-color: #1a1a1a;
              color: #ffffff;
            }
            .text-gray-600 {
              color: #a0a0a0;
            }
            .bg-gray-50 {
              background-color: #2a2a2a;
            }
          }

          /* Print Styles */
          @media print {
            .hover\\:scale-105,
            .hover\\:shadow-lg,
            .transition-all,
            .shadow-lg {
              transform: none !important;
              box-shadow: none !important;
              transition: none !important;
            }
            .bg-gradient-to-r,
            .bg-gradient-to-br {
              background: #6b7280 !important;
              -webkit-print-color-adjust: exact;
            }
          }

          /* Mobile Optimization */
          @media (max-width: 640px) {
            .container {
              padding-left: 1rem;
              padding-right: 1rem;
            }
            .grid {
              gap: 1rem;
            }
          }

          /* High Resolution Displays */
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .shadow-lg {
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            }
          }

          /* Focus Visible for Better Accessibility */
          .focus\\:outline-none:focus-visible {
            outline: 2px solid #ec4899;
            outline-offset: 2px;
          }

          /* Custom Scrollbar for Textarea */
          textarea::-webkit-scrollbar {
            width: 8px;
          }
          textarea::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }
          textarea::-webkit-scrollbar-thumb {
            background: #ec4899;
            border-radius: 4px;
          }
          textarea::-webkit-scrollbar-thumb:hover {
            background: #db2777;
          }

          /* Enhanced Button Ripple Effect */
          .submit-btn {
            position: relative;
            overflow: hidden;
          }
          .submit-btn::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
          }
          .submit-btn:active::after {
            width: 300px;
            height: 300px;
          }
        `}</style>
      </section>
    </>
  );
};

export default ContactSection;