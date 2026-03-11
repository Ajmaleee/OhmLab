import { Link } from 'react-router-dom';
import { Palette, Plus, Shuffle, Zap } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

function Home() {
  useSEO(
    'OhmLab - Free Resistor & Electronics Calculator Tools',
    'Free online resistor calculators. Calculate color codes, series resistance, parallel resistance, voltage dividers. Perfect for students and electronics learners.',
    'https://ohmlab.vercel.app'
  );
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

      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-teal-600 mb-6">Understanding Electrical Resistance</h2>
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            Electrical resistance is one of the most fundamental concepts in electronics and electrical engineering. It measures how much an electrical component opposes the flow of current through it. Every material has some level of resistance, which determines how easily electricity can flow through it. Understanding resistance is crucial for anyone studying physics, engineering, or electronics.
          </p>
          <p>
            The relationship between voltage, current, and resistance is described by Ohm's Law, one of the most important principles in electrical science. This law helps engineers and technicians design circuits that operate safely and efficiently. Resistors are passive components that are intentionally designed to provide a specific amount of resistance, making them indispensable in virtually every electronic device we use daily.
          </p>
          <p>
            From simple light bulbs to complex computer circuits, resistors play a vital role in controlling voltage and current levels. They protect sensitive components from excessive current, limit power consumption, and help create the precise electrical conditions needed for circuits to function correctly. Our OhmLab calculators help you quickly and accurately work with these essential components.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-teal-600 mb-6">Common Resistance Topics Explained</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-teal-600 pl-4">
            <h3 className="text-lg font-bold text-teal-700 mb-2">Resistor Color Codes</h3>
            <p className="text-gray-600 text-sm">
              Resistors use colored bands to indicate their resistance value and tolerance. Learning to read these color codes is essential for anyone working with electronics. Our color code calculator instantly decodes 4-band and 5-band resistors so you can identify components quickly.
            </p>
          </div>
          <div className="border-l-4 border-cyan-600 pl-4">
            <h3 className="text-lg font-bold text-cyan-700 mb-2">Series vs Parallel Circuits</h3>
            <p className="text-gray-600 text-sm">
              Understanding how resistors combine in series and parallel circuits is fundamental to circuit design. Series connections add resistances together, while parallel connections create equivalent resistances less than the smallest individual resistor.
            </p>
          </div>
          <div className="border-l-4 border-teal-600 pl-4">
            <h3 className="text-lg font-bold text-teal-700 mb-2">Voltage Division</h3>
            <p className="text-gray-600 text-sm">
              Voltage dividers are simple but powerful circuits that create specific voltages from a larger supply. They're used in sensor interfacing, analog-to-digital conversion, and countless other applications. Mastering voltage divider calculations is essential for circuit design.
            </p>
          </div>
          <div className="border-l-4 border-cyan-600 pl-4">
            <h3 className="text-lg font-bold text-cyan-700 mb-2">Ohm's Law Applications</h3>
            <p className="text-gray-600 text-sm">
              Ohm's Law (V = I × R) is the foundation of electrical calculations. It describes how voltage, current, and resistance relate to each other. Understanding this law allows you to predict circuit behavior and design circuits correctly.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-teal-600 mb-6">Why Learn About Resistors?</h2>
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <div>
            <h3 className="text-lg font-bold text-teal-700 mb-2">Foundation of Electronics</h3>
            <p>
              Resistors are the most basic and widely used components in electronic circuits. Every student and hobbyist working with electronics must understand how resistors work, how to read color codes, and how to calculate equivalent resistance in different configurations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-teal-700 mb-2">Practical Applications</h3>
            <p>
              From LED circuits to sensor interfaces, resistor calculations appear in countless real-world applications. Understanding these calculations helps you troubleshoot circuits, design new ones, and optimize existing designs for better performance and efficiency.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-teal-700 mb-2">Academic Success</h3>
            <p>
              Whether you're in high school physics, college engineering, or pursuing technical certifications, mastering resistance calculations is crucial for success. Our tools help you verify your work, understand concepts deeply, and build confidence in your problem-solving abilities.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-teal-700 mb-2">Career Preparation</h3>
            <p>
              Electronics technicians, electrical engineers, and many other technical professionals use these calculations daily. Building strong fundamentals now prepares you for advanced coursework and professional careers in technology and engineering fields.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8 border-2 border-teal-200">
        <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">Get Started Today</h2>
        <p className="text-gray-700 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
          Choose any of our calculators above to start learning. Whether you need to decode resistor color codes, calculate equivalent resistance in complex circuits, or design voltage dividers, OhmLab provides fast, accurate results with educational explanations to help you understand the concepts behind the calculations.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/resistor-color-code"
            className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md"
          >
            Decode Color Codes
          </Link>
          <Link
            to="/series-resistance"
            className="bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors shadow-md"
          >
            Calculate Series
          </Link>
          <Link
            to="/parallel-resistance"
            className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md"
          >
            Calculate Parallel
          </Link>
          <Link
            to="/voltage-divider"
            className="bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors shadow-md"
          >
            Voltage Divider
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
