import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, User } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          We'd love to hear from you! Whether you have questions, suggestions, found a bug,
          or just want to share feedback, feel free to reach out.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-cyan-600 mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="text-teal-600" size={20} />
              <span><strong>Email:</strong> ajmalsworkshop@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="text-teal-600" size={20} />
              <span><strong>Phone:</strong> +91 9495050785</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="text-teal-600" size={20} />
              <span><strong>Location:</strong> Kerala, India</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <User className="text-teal-600" size={20} />
              <span><strong>Creator:</strong> Ajmal Ali A</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-cyan-600 mb-4">Send Us a Message</h2>
        <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Your Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Your Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Subject:</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="What is this about?"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message:</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md"
            >
              Send Message
            </button>
          </form>
        ) : (
          <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center">
            <p className="text-green-700 font-semibold text-lg">
              Thank you for your message! We'll get back to you soon.
            </p>
          </div>
        )}

        <div className="mt-8 space-y-4 text-gray-600">
          <h2 className="text-2xl font-bold text-cyan-600 mb-4">What You Can Contact Us About</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Bug Reports:</strong> Found an error in a calculation or the website? Let us know!</li>
            <li><strong>Feature Requests:</strong> Have an idea for a new calculator or feature?</li>
            <li><strong>Educational Use:</strong> Teachers interested in using OhmLab in their classes</li>
            <li><strong>General Questions:</strong> Questions about how to use the calculators</li>
            <li><strong>Feedback:</strong> Suggestions for improvements or general feedback</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
