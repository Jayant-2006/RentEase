const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About RentEase</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted platform for finding compatible roommates and the perfect rental home
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At RentEase, we believe that finding the right place to live is about more than
            just the property—it's about finding people you can live with comfortably. Our
            mission is to make the roommate and rental search process easier, smarter, and
            more compatible by using lifestyle-based matching.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We understand that compatibility matters. Whether you're a night owl looking for
            someone who won't mind late-night activities, or a clean freak who needs a
            similarly tidy roommate, RentEase helps you find the perfect match.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3 text-primary">Smart Matching Algorithm</h3>
            <p className="text-gray-700">
              Our proprietary algorithm analyzes lifestyle preferences including smoking
              habits, pet preferences, sleep schedules, and cleanliness levels to provide
              compatibility scores between potential roommates.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3 text-primary">Verified Listings</h3>
            <p className="text-gray-700">
              All our listings are posted by real users. We encourage detailed property
              descriptions and honest lifestyle information to ensure transparency in the
              matching process.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3 text-primary">Secure Communication</h3>
            <p className="text-gray-700">
              Our built-in chat system allows you to communicate with potential roommates
              safely and securely without sharing personal contact information until you're
              ready.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3 text-primary">Easy Booking System</h3>
            <p className="text-gray-700">
              Schedule property visits and manage all your bookings in one convenient
              location. Track booking status and communicate with property owners
              effortlessly.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-primary text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-bold mb-2">Trust</h3>
              <p className="text-gray-600 text-sm">
                Building a community based on honesty and transparency
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold mb-2">Compatibility</h3>
              <p className="text-gray-600 text-sm">
                Ensuring the best matches through detailed preference analysis
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-bold mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Continuously improving our platform to serve you better
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            RentEase was founded by a group of friends who experienced the challenges of
            finding compatible roommates firsthand. After several mismatched living
            situations, we realized there had to be a better way.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We combined our expertise in technology, real estate, and user experience to
            create a platform that goes beyond basic property listings. RentEase focuses on
            the people behind the properties, ensuring that lifestyle compatibility is at the
            forefront of the search process.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, we're proud to help thousands of renters find not just a place to live,
            but a home where they truly belong.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
