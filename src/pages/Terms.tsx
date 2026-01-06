import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-teal-600 mb-4">Terms & Conditions</h1>
      <p className="text-gray-600 mb-8"><strong>Last Updated:</strong> December 28, 2024</p>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Agreement to Terms</h2>
          <p>
            By accessing and using OhmLab, you agree to be bound by these Terms and Conditions.
            If you do not agree to these terms, please do not use this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Permitted Use</h2>
          <p>OhmLab is provided for educational purposes. You may use the calculators and resources to:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>Learn about electrical resistance and circuit concepts</li>
            <li>Verify homework and practice problems</li>
            <li>Understand electronics principles</li>
            <li>Support educational projects and studies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Acceptable Use Policy</h2>
          <p>When using OhmLab, you agree NOT to:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>Use the website for any illegal purposes</li>
            <li>Attempt to hack, disrupt, or damage the website</li>
            <li>Submit malicious code, viruses, or harmful software</li>
            <li>Scrape or systematically extract data from the website</li>
            <li>Use automated systems to access the site excessively</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Intellectual Property</h2>
          <p>
            All content on OhmLab, including text, graphics, logos, design, and code, is the property
            of Ajmal Ali A and is protected by copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">User Responsibilities</h2>
          <p>You are responsible for:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>Verifying all calculation results</li>
            <li>Following proper safety procedures when working with electricity</li>
            <li>Understanding that OhmLab is not liable for any injuries or damages</li>
            <li>Seeking professional guidance for safety-critical applications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Disclaimer of Warranties</h2>
          <p>
            OhmLab is provided "as is" and "as available" without any warranties of any kind, including
            warranties of merchantability, fitness for a particular purpose, or accuracy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Privacy</h2>
          <p>
            Your use of OhmLab is also governed by our <Link to="/privacy-policy" className="text-teal-600 hover:text-teal-700 font-semibold">Privacy Policy</Link>.
            Please review it to understand how we collect and use information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India.
            Any disputes shall be subject to the exclusive jurisdiction of the courts in Kerala, India.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Contact Information</h2>
          <p>If you have questions about these Terms and Conditions, please contact us:</p>
          <div className="bg-gray-50 rounded-lg p-4 mt-3">
            <p><strong>Email:</strong> ajmalsworkshop@gmail.com</p>
            <p><strong>Phone:</strong> +91 9495050785</p>
            <p><strong>Location:</strong> Kerala, India</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Acknowledgment</h2>
          <p>
            By using OhmLab, you acknowledge that you have read, understood, and agree to be bound
            by these Terms and Conditions.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Terms;
