import React from 'react';

// Sample images - replace with your actual imports
import img2 from '../../assets/images/storySection/02.png';
import img1 from '../../assets/images/storySection/01.png';
import img3 from '../../assets/images/storySection/03.png';
import img4 from '../../assets/images/storySection/04.png';
import img5 from '../../assets/images/storySection/05.png';
import img6 from '../../assets/images/storySection/06.png';
import mapBg from "../../assets/images/storySection/map.png";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Teacher, Delhi",
    review:
      "Thanks to SHY-EYES, I found my soulmate just 50 km away! Our first date was magical, and now we're planning a future together.",
    image: img1,
    rating: 5,
    position: "top-[95px] left-[5%]",
  },
  {
    id: 2,
    name: "Mark Evans",
    role: "Photographer, UK",
    review:
      "As a traveler in India, I never expected to meet someone so genuine online. SHY-EYES helped bridge that gap beautifully.",
    image: img2,
    rating: 5,
    position: "top-[40px] left-[35%]",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Engineer, Mumbai",
    review:
      "I was skeptical about dating apps, but SHY-EYES changed my mind. I met Rhea through a live chat and we instantly clicked.",
    image: img3,
    rating: 5,
    position: "top-[90px] left-[75%]",
  },
  {
    id: 4,
    name: "Maria Gonzales",
    role: "Writer, Spain",
    review:
      "SHY-EYES is so user-friendly! I met an amazing Indian guy while visiting Goa. We're now in a beautiful long-distance relationship.",
    image: img4,
    rating: 5,
    position: "top-[400px] left-[30%]",
  },
  {
    id: 5,
    name: "Riya & Karan",
    role: "Couple, Bangalore",
    review:
      "We both swiped right on SHY-EYES just for fun. But after a few video calls and chats, we realized it was real love.",
    image: img5,
    rating: 5,
    position: "top-[265px] left-[47%]",
  },
  {
    id: 6,
    name: "Lucia Moretti",
    role: "Software Developer, Italy",
    review:
      "I built connections with people across India. SHY-EYES offers both casual chats and serious matchmaking. Impressive platform!",
    image: img6,
    rating: 5,
    position: "top-[408px] left-[80%]",
  },
];

const ReviewSection = () => {
  return (
    <section className=" relative bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center  relative z-10 border-b border-b-pink-200  mb-4">
          <h4 className="text-[#df314d] text-lg font-semibold uppercase tracking-wide mb-2">
            What Our Members Say
          </h4>
          <h2 className="text-pink-500 text-3xl md:text-1xl mb-2 font-bold">
            Real Love Stories From SHY-EYES Users 💖
          </h2>
        </div>

        {/* Map Background */}
        <div
          className="relative h-[400px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${mapBg})` }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`absolute ${review.position} group cursor-pointer`}
            >
              {/* Review Card */}
              <div className="absolute bottom-[80%] right-1/2 translate-x-1/2 translate-y-1/2 w-[320px] md:w-[400px] bg-white/80 backdrop-blur rounded-lg shadow-md p-4 md:p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 animate-fadeInUp z-20">
                <p className="text-[#210053] text-sm md:text-base italic mb-3">
                  {review.review}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <h6 className="text-[#210053] font-semibold text-sm md:text-base">
                      {review.name}
                    </h6>
                    <span className="text-gray-600 text-xs md:text-sm">
                      {review.role}
                    </span>
                  </div>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <i key={i} className="icofont-star text-sm md:text-base"></i>
                    ))}
                  </div>
                </div>
              </div>

              {/* Avatar with ripple */}
              <div className="relative w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-full h-full object-cover rounded-full relative z-10"
                />
                {/* Ripple */}
                <span className="absolute inset-0 rounded-full bg-[#0ca5f1] opacity-20 scale-100 group-hover:animate-ping"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
