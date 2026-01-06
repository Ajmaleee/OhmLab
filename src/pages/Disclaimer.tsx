import { Link } from 'react-router-dom';

function Disclaimer() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-teal-600 mb-4">Disclaimer</h1>
      <p className="text-gray-600 mb-8"><strong>Last Updated:</strong> December 28, 2024</p>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Educational Purpose Only</h2>
          <p>
            OhmLab is designed and maintained as an educational tool for students learning about
            physics, electronics, and electrical circuits. All calculators, information, and resources
            provided on this website are intended for educational and informational purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Accuracy and Reliability</h2>
          <p>While we make every effort to ensure the accuracy and reliability of our calculators:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>We strive for accuracy but cannot guarantee 100% error-free calculations</li>
            <li>All formulas are based on standard electrical engineering principles</li>
            <li>Results should be verified before use in critical applications</li>
            <li>Calculator results are approximations and may not account for all real-world factors</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">No Professional Advice</h2>
          <p>
            The information and calculators on OhmLab do not constitute professional electrical engineering
            advice. For professional projects, safety-critical applications, or commercial use, consult
            with qualified electrical engineers or professionals.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Safety Considerations</h2>
          <p>When working with electrical circuits and components:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>Always follow proper safety procedures and guidelines</li>
            <li>Use appropriate safety equipment and tools</li>
            <li>Electricity can be dangerous - if you're unsure, seek professional help</li>
            <li>Never work on live circuits without proper training and precautions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, OhmLab and its creator:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>Accept no liability for any direct or indirect damages resulting from use of this website</li>
            <li>Are not responsible for errors, omissions, or inaccuracies in calculations or information</li>
            <li>Make no warranties about the completeness, accuracy, or reliability of content</li>
            <li>Are not liable for any consequences of decisions made based on information from this website</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Verification Recommended</h2>
          <p>For important applications, we strongly recommend:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>Verifying results with multiple sources</li>
            <li>Using professional-grade tools for critical measurements</li>
            <li>Consulting textbooks, reference materials, or professionals</li>
            <li>Understanding the underlying principles, not just using the results</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Your Responsibility</h2>
          <p>By using OhmLab, you acknowledge that:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>You use the website and its calculators at your own risk</li>
            <li>You are responsible for verifying important calculations</li>
            <li>You will follow appropriate safety procedures when working with electricity</li>
            <li>You understand the limitations of these educational tools</li>
          </ul>
        </section>

        <div className="pt-6">
          <Link to="/contact" className="text-teal-600 hover:text-teal-700 font-semibold">
            Found an error? Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Disclaimer;
