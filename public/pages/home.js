function renderHome() {
  const main = document.getElementById('main');
  if (!main) return;
  main.className = 'main-content';

  const calculators = [
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
      title: 'Resistor Color Code',
      description: 'Decode 4-band and 5-band resistor color codes instantly. Learn the color values and tolerance ratings.',
      link: '/resistor-color-code',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
      title: 'Series Resistance',
      description: 'Calculate total resistance when resistors are connected in series. Add multiple resistors easily.',
      link: '/series-resistance',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
      title: 'Parallel Resistance',
      description: 'Find equivalent resistance for parallel circuits. Supports unlimited resistor inputs.',
      link: '/parallel-resistance',
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      title: 'Voltage Divider',
      description: 'Calculate output voltage in voltage divider circuits. Essential for circuit design.',
      link: '/voltage-divider',
    },
  ];

  main.innerHTML = `
    <section class="hero">
      <h1>Welcome to OhmLab</h1>
      <p class="tagline">Fast resistor & electronics calculators for students</p>
      <p class="hero-desc">
        Master resistance calculations with our easy-to-use tools. Perfect for physics students,
        electronics learners, and anyone studying electrical circuits. Get instant, accurate results
        with clear explanations.
      </p>
    </section>

    <section class="calc-grid">
      ${calculators.flatMap((calc, i) => {
        const adSlot = i === 0
          ? `<div id="container-599b0f251b4dddca60e7fc09e25a632f" class="ad-between-card"></div>`
          : '<div class="ad-between-card"></div>';
        return [
          `<div class="calc-card">
            <div class="card-icon">${calc.icon}</div>
            <h2>${calc.title}</h2>
            <p>${calc.description}</p>
            <a href="${calc.link}" class="btn-primary">Open Calculator</a>
          </div>`,
          i < calculators.length - 1 ? adSlot : ''
        ];
      }).join('')}
    </section>

    <section class="content-section">
      <h2>Who Is OhmLab For?</h2>
      <div class="feature-grid">
        <div>
          <h3>Physics Students</h3>
          <p>Perfect for high school and college students learning electrical circuits and resistance concepts.</p>
        </div>
        <div>
          <h3>Electronics Learners</h3>
          <p>Great for hobbyists and beginners exploring electronics projects and circuit design.</p>
        </div>
        <div>
          <h3>Quick Reference</h3>
          <p>Fast, accurate calculations when you need to verify homework or lab work.</p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2>Educational Purpose</h2>
      <p class="text-center max-w-4xl">
        OhmLab is designed as a learning tool for students and educators. All calculators are provided
        for educational purposes to help understand resistance concepts. While we strive for accuracy,
        please verify critical calculations and always follow proper safety procedures when working with
        electrical circuits.
      </p>
    </section>

    <section class="content-section">
      <h2 class="left">Understanding Electrical Resistance</h2>
      <div class="space-y-6">
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

    <section class="content-section">
      <h2 class="left">Common Resistance Topics Explained</h2>
      <div class="topic-grid">
        <div class="topic-card">
          <h3>Resistor Color Codes</h3>
          <p>
            Resistors use colored bands to indicate their resistance value and tolerance. Learning to read these color codes is essential for anyone working with electronics. Our color code calculator instantly decodes 4-band and 5-band resistors so you can identify components quickly.
          </p>
        </div>
        <div class="topic-card cyan">
          <h3>Series vs Parallel Circuits</h3>
          <p>
            Understanding how resistors combine in series and parallel circuits is fundamental to circuit design. Series connections add resistances together, while parallel connections create equivalent resistances less than the smallest individual resistor.
          </p>
        </div>
        <div class="topic-card">
          <h3>Voltage Division</h3>
          <p>
            Voltage dividers are simple but powerful circuits that create specific voltages from a larger supply. They're used in sensor interfacing, analog-to-digital conversion, and countless other applications. Mastering voltage divider calculations is essential for circuit design.
          </p>
        </div>
        <div class="topic-card cyan">
          <h3>Ohm's Law Applications</h3>
          <p>
            Ohm's Law (V = I &times; R) is the foundation of electrical calculations. It describes how voltage, current, and resistance relate to each other. Understanding this law allows you to predict circuit behavior and design circuits correctly.
          </p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2 class="left">Why Learn About Resistors?</h2>
      <div class="space-y-6">
        <div>
          <h3>Foundation of Electronics</h3>
          <p>
            Resistors are the most basic and widely used components in electronic circuits. Every student and hobbyist working with electronics must understand how resistors work, how to read color codes, and how to calculate equivalent resistance in different configurations.
          </p>
        </div>
        <div>
          <h3>Practical Applications</h3>
          <p>
            From LED circuits to sensor interfaces, resistor calculations appear in countless real-world applications. Understanding these calculations helps you troubleshoot circuits, design new ones, and optimize existing designs for better performance and efficiency.
          </p>
        </div>
        <div>
          <h3>Academic Success</h3>
          <p>
            Whether you're in high school physics, college engineering, or pursuing technical certifications, mastering resistance calculations is crucial for success. Our tools help you verify your work, understand concepts deeply, and build confidence in your problem-solving abilities.
          </p>
        </div>
        <div>
          <h3>Career Preparation</h3>
          <p>
            Electronics technicians, electrical engineers, and many other technical professionals use these calculations daily. Building strong fundamentals now prepares you for advanced coursework and professional careers in technology and engineering fields.
          </p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2 class="left">Understanding Ohm's Law in Depth</h2>
      <div class="space-y-6">
        <p>
          Ohm's Law, expressed as V = I × R, describes the relationship between voltage (measured in
          volts), current (measured in amperes), and resistance (measured in ohms) in an electrical
          circuit. First published by Georg Simon Ohm in 1827, this simple equation underpins nearly
          every calculation in electronics — from sizing a current-limiting resistor for an LED, to
          designing a voltage divider for a sensor, to determining how much power a component will
          dissipate as heat. The law can be rearranged three ways depending on which quantity you need
          to solve for: V = I × R to find voltage, I = V / R to find current, and R = V / I to find
          resistance. Many students memorize this relationship using a simple triangle diagram, with V
          at the top and I and R at the bottom, covering the unknown quantity to reveal the correct
          formula.
        </p>
        <p>
          Ohm's Law also connects directly to electrical power through the formula P = V × I, which can
          be combined with Ohm's Law itself to produce two more useful variations: P = I² × R and
          P = V² / R. These power formulas are essential whenever you need to know how much heat a
          resistor will generate, and therefore what power rating (in watts) it needs to safely handle
          — a mismatch here is one of the most common causes of resistor failure in amateur circuit
          designs. Together, Ohm's Law and the power law form a compact toolkit of five interrelated
          formulas that can solve almost any basic DC circuit problem involving a single resistive
          element.
        </p>
        <p>
          It's worth noting that Ohm's Law, in its simple V = I × R form, applies directly to what
          engineers call "ohmic" or linear components — resistors being the most common example, where
          resistance stays constant regardless of the voltage or current applied. Many real-world
          components, such as diodes, transistors, and light bulbs with filaments, are "non-ohmic,"
          meaning their effective resistance changes depending on operating conditions. For these
          components, more advanced models are needed, but the resistors covered by every calculator on
          this site follow Ohm's Law faithfully across their entire rated operating range, which is
          exactly what makes them such predictable, reliable building blocks for circuit design.
        </p>
      </div>
    </section>


      <p>
        Choose any of our calculators above to start learning. Whether you need to decode resistor color codes, calculate equivalent resistance in complex circuits, or design voltage dividers, OhmLab provides fast, accurate results with educational explanations to help you understand the concepts behind the calculations.
      </p>
      <div class="cta-buttons">
        <a href="/resistor-color-code" class="btn-primary">Decode Color Codes</a>
        <a href="/series-resistance" class="btn-cyan">Calculate Series</a>
        <a href="/parallel-resistance" class="btn-primary">Calculate Parallel</a>
        <a href="/voltage-divider" class="btn-cyan">Voltage Divider</a>
      </div>
    </section>
  `;

  document.title = 'OhmLab - Free Resistor & Electronics Calculator Tools';
  setMeta('description', 'Free online resistor calculators. Calculate color codes, series resistance, parallel resistance, voltage dividers. Perfect for students and electronics learners.');
}

function setMeta(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderHome);
} else {
  renderHome();
}
