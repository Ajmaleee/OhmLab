import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-teal-600 mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-8"><strong>Last Updated:</strong> December 28, 2024</p>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Introduction</h2>
          <p>
            OhmLab ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, and safeguard information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Calculator Data</h2>
          <p>
            All calculator inputs and results are processed locally in your browser. We do not collect,
            store, or transmit any calculation data you enter. Your calculations are completely private
            and remain on your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Contact Form Information</h2>
          <p>When you use our contact form, we collect:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>Your name</li>
            <li>Email address</li>
            <li>Message content</li>
          </ul>
          <p className="mt-3">
            This information is used solely to respond to your inquiries and is not shared with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information.
            However, no internet transmission is completely secure. While we strive to protect your data,
            we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>Access information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us:</p>
          <div className="bg-gray-50 rounded-lg p-4 mt-3">
            <p><strong>Email:</strong> ajmalsworkshop@gmail.com</p>
            <p><strong>Phone:</strong> +91 9495050785</p>
            <p><strong>Location:</strong> Kerala, India</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Consent</h2>
          <p>
            By using OhmLab, you consent to this Privacy Policy and agree to its terms.
          </p>
        </section>

        <div className="pt-6">
          <Link to="/contact" className="text-teal-600 hover:text-teal-700 font-semibold">
            Have questions? Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
