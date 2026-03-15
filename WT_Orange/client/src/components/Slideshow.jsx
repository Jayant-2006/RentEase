import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Slideshow = () => {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of image paths
  const slides = [
    {
      id: 1,
      image: '/flat-students-dormitory-room-preparing-exams_88138-1043.jpg',
      title: 'Find Your Perfect Roommate',
      description: 'Connect with compatible roommates based on lifestyle preferences'
    },
    {
      id: 2,
      image: '/premium_photo-1676823553207-758c7a66e9bb.jpg',
      title: 'Discover Amazing Listings',
      description: 'Browse through handpicked rental properties in your area'
    },
    {
      id: 3,
      image: '/pexels-photo-4778621.jpeg',
      title: 'Smart Matching Algorithm',
      description: 'Our AI-powered system finds the best matches for you'
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Go to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Go to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative h-full">
            {/* Background image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl mb-8">{slide.description}</p>
                
                {/* Buttons */}
                <div className="flex justify-center space-x-4">
                  {user ? (
                    <>
                      <Link to="/listings" className="btn bg-white text-primary hover:bg-gray-100">
                        Browse Listings
                      </Link>
                      <Link to="/match" className="btn bg-white text-primary hover:bg-gray-100">
                        Find Matches
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100">
                        Get Started
                      </Link>
                      <Link to="/listings" className="btn bg-white text-primary hover:bg-gray-100">
                        Browse Listings
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slideshow;