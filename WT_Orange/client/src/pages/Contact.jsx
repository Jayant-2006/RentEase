import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to a backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">Send us a Message</h2>

            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input"
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-primary text-2xl mr-4">📧</div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-gray-600">support@rentease.com</p>
                    <p className="text-gray-600">info@rentease.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-primary text-2xl mr-4">📱</div>
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <p className="text-gray-600">+91 6364467346</p>
                    <p className="text-gray-600">Mon-Fri, 9am-6pm IST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-primary text-2xl mr-4">📍</div>
                  <div>
                    <h3 className="font-bold mb-1">Address</h3>
                    <p className="text-gray-600">PES University</p>
                    <p className="text-gray-600">7.43 km 100 Feet, Ring Rd</p>
                    <p className="text-gray-600">Banashankari 3rd Stage</p>
                    <p className="text-gray-600">Banashankari, Bengaluru</p>
                    <p className="text-gray-600">Karnataka 560085, India</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-primary text-2xl mr-4">⏰</div>
                  <div>
                    <h3 className="font-bold mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                    <p className="text-gray-600">Saturday: 10am - 4pm</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">Quick Help</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-1">How does the matching work?</h3>
                  <p className="text-sm text-gray-600">
                    Our algorithm analyzes lifestyle preferences to calculate compatibility scores.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Is RentEase free to use?</h3>
                  <p className="text-sm text-gray-600">
                    Yes! Creating an account and browsing listings is completely free.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">How do I post a listing?</h3>
                  <p className="text-sm text-gray-600">
                    After signing up, click "Post Listing" in the navigation bar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;