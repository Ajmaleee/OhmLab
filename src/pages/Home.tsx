import { Link } from 'react-router-dom';
import { Palette, Plus, Shuffle, Zap } from 'lucide-react';

function Home() {
  const calculators = [
    {
      icon: Palette,
      title: 'Resistor Color Code',
      description: 'Decode 4-band and 5-band resistor color codes instantly. Learn the color values and tolerance ratings.',
      link: '/resistor-color-code',
    },
    {
      icon: Plus,
      title: 'Series Resistance',
      description: 'Calculate total resistance when resistors are connected in series. Add multiple resistors easily.',
      link: '/series-resistance',
    },
    {
      icon: Shuffle,
      title: 'Parallel Resistance',
      description: 'Find equivalent resistance for parallel circuits. Supports unlimited resistor inputs.',
      link: '/parallel-resistance',
    },
    {
      icon: Zap,
      title: 'Voltage Divider',
      description: 'Calculate output voltage in voltage divider circuits. Essential for circuit design.',
      link: '/voltage-divider',
    },
  ];

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white rounded-2xl shadow-xl p-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to OhmLab</h1>
        <p className="text-xl mb-4 opacity-95">
          Fast resistor & electronics calculators for students
        </p>
        <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
          Master resistance calculations with our easy-to-use tools. Perfect for physics students,
          electronics learners, and anyone studying electrical circuits. Get instant, accurate results
          with clear explanations.
        </p>
      </section>

      <div className="bg-white rounded-xl shadow-md p-8 border-2 border-dashed border-gray-300">
        <p className="text-center text-gray-500 text-lg">Advertisement Space</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <div
              key={calc.title}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <Icon size={64} className="text-teal-600 mb-4" />
                <h2 className="text-2xl font-bold text-teal-600 mb-3">{calc.title}</h2>
                <p className="text-gray-600 mb-6 flex-grow">{calc.description}</p>
                <Link
                  to={calc.link}
                  className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Open Calculator
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
          Who Is OhmLab For?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-3">Physics Students</h3>
            <p className="text-gray-600">
              Perfect for high school and college students learning electrical circuits and resistance concepts.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-3">Electronics Learners</h3>
            <p className="text-gray-600">
              Great for hobbyists and beginners exploring electronics projects and circuit design.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-3">Quick Reference</h3>
            <p className="text-gray-600">
              Fast, accurate calculations when you need to verify homework or lab work.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-teal-600 mb-4 text-center">
          Educational Purpose
        </h2>
        <p className="text-gray-600 leading-relaxed text-center max-w-4xl mx-auto">
          OhmLab is designed as a learning tool for students and educators. All calculators are provided
          for educational purposes to help understand resistance concepts. While we strive for accuracy,
          please verify critical calculations and always follow proper safety procedures when working with
          electrical circuits.
        </p>
      </section>

      <div className="bg-white rounded-xl shadow-md p-8 border-2 border-dashed border-gray-300">
        <p className="text-center text-gray-500 text-lg">Advertisement Space</p>
      </div>
    </div>
  );
}

export default Home;
