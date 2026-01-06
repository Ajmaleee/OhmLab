function About() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-teal-600 mb-6">About OhmLab</h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Our Mission</h2>
          <p>
            OhmLab was created with a simple mission: to help physics and electronics students understand
            resistance concepts clearly and accurately. We believe that learning should be accessible,
            straightforward, and supported by reliable tools.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">What We Offer</h2>
          <p>We provide a suite of free calculators designed specifically for students learning about electrical circuits and resistance. Our tools include:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li><strong>Resistor Color Code Calculator</strong> - Decode 4-band and 5-band resistor values</li>
            <li><strong>Series Resistance Calculator</strong> - Calculate total resistance in series circuits</li>
            <li><strong>Parallel Resistance Calculator</strong> - Find equivalent resistance in parallel circuits</li>
            <li><strong>Voltage Divider Calculator</strong> - Determine output voltages in divider circuits</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Our Approach</h2>
          <p>We focus on three key principles:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li><strong>Accuracy:</strong> Every calculator uses correct formulas and provides reliable results</li>
            <li><strong>Simplicity:</strong> Clean, easy-to-use interfaces that don't overwhelm</li>
            <li><strong>Education:</strong> Clear explanations that help you understand the concepts, not just get answers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Who We Serve</h2>
          <p>OhmLab is designed for:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>High school physics students learning about electricity</li>
            <li>College students studying electrical engineering</li>
            <li>Electronics hobbyists and makers</li>
            <li>Teachers looking for reliable tools for demonstrations</li>
            <li>Anyone curious about how electronic components work</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">About the Creator</h2>
          <p>
            OhmLab is created and maintained by <strong>Ajmal Ali A</strong>, based in Kerala, India.
            As an individual passionate about education and technology, the goal is to provide
            quality learning resources that make physics and electronics more accessible to students everywhere.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600 mb-3">Free and Accessible</h2>
          <p>
            All calculators on OhmLab are completely free to use. There are no accounts required,
            no paywalls, and no hidden fees. Our commitment is to keep these tools accessible to
            all students, regardless of their location or resources.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
