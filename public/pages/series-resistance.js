let resistors = ['', ''];
let result = null;

function formatResistance(value) {
  if (value >= 1000000) return (value / 1000000).toFixed(2) + ' MΩ';
  if (value >= 1000) return (value / 1000).toFixed(2) + ' kΩ';
  return value.toFixed(2) + ' Ω';
}

function addResistor() {
  if (resistors.length >= 10) {
    alert('Maximum 10 resistors allowed');
    return;
  }
  resistors.push('');
  renderInputs();
}

function removeResistor(index) {
  if (resistors.length <= 2) {
    alert('Minimum 2 resistors required');
    return;
  }
  resistors.splice(index, 1);
  renderInputs();
}

function updateResistor(index, value) {
  resistors[index] = value;
}

function calculate() {
  const values = resistors.map(r => parseFloat(r));

  if (values.some(v => !v || v <= 0)) {
    alert('Please enter valid positive resistance values for all resistors');
    return;
  }

  const total = values.reduce((sum, v) => sum + v, 0);
  const formula = values.map((v, i) => `R${i + 1}`).join(' + ') + ' = ' +
                 values.map(v => formatResistance(v)).join(' + ');

  result = { total: formatResistance(total), formula };
  renderResult();
}

function reset() {
  resistors = ['', ''];
  result = null;
  renderInputs();
  renderResult();
}

function renderInputs() {
  const container = document.getElementById('resistorInputs');
  container.innerHTML = resistors.map((resistor, index) => `
    <div class="resistor-input-row">
      <input type="number" value="${resistor}" onchange="updateResistor(${index}, this.value)" placeholder="Enter resistance (Ω)" min="0" step="any" />
      ${resistors.length > 2 ? `<button class="btn-remove" onclick="removeResistor(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>` : ''}
    </div>
  `).join('');
}

function renderResult() {
  const container = document.getElementById('result');
  if (result) {
    container.style.display = 'block';
    container.innerHTML = `
      <div class="result-box">
        <h3>Total Series Resistance</h3>
        <div class="result-value">${result.total}</div>
        <p class="result-formula">Formula: ${result.formula}</p>
      </div>
    `;
  } else {
    container.style.display = 'none';
    container.innerHTML = '';
  }
}

function renderSeriesResistance() {
  const main = document.getElementById('main');
  if (!main) return;

  main.innerHTML = `
    <div class="calc-page">
      <h1>Series Resistance Calculator</h1>
      <p>Calculate total resistance when resistors are connected in series</p>
      <div class="calc-section">
        <div class="resistor-inputs" id="resistorInputs"></div>
        <button class="btn-add" onclick="addResistor()">+ Add Resistor</button>
        <div class="calc-buttons">
          <button class="btn-primary" onclick="calculate()">Calculate</button>
          <button class="btn-outline" onclick="reset()">Reset</button>
        </div>
        <div id="result" style="display: none;"></div>
      </div>
    </div>

    <div class="explanation-section">
      <h2>Understanding Series Resistance</h2>
      <div>
        <h3>What is Series Connection?</h3>
        <p>
          When resistors are connected in series, they are wired end-to-end in a single continuous path,
          so there is only one route for current to travel through the entire chain. Because there's no
          branching point, the same current flows through every resistor in the chain, but the total
          supply voltage is shared, or "dropped," across each resistor according to its individual value.
        </p>
      </div>
      <div>
        <h3>Formula</h3>
        <p class="formula-display">
          R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub> + ... + R<sub>n</sub>
        </p>
        <p>
          Unlike parallel circuits, the series resistance formula is simple addition — there's no
          reciprocal math involved. This makes series circuits the easiest configuration to calculate
          by hand, which is also why they're usually taught first in physics and electronics courses.
        </p>
      </div>
      <div>
        <h3>Step-by-Step Calculation Guide</h3>
        <p>
          <strong>Step 1:</strong> List the resistance value of every resistor in the chain, in ohms.<br />
          <strong>Step 2:</strong> Add all the values together — there's no need to worry about the order.<br />
          <strong>Step 3:</strong> The sum is your total series resistance. That's the value you'd measure
          with a multimeter across the two far ends of the chain.<br />
          <strong>Step 4:</strong> If you know the supply voltage, use Ohm's Law (I = V / R<sub>total</sub>)
          to find the current flowing through the circuit — remember, it's the same everywhere in a series loop.
        </p>
      </div>
      <div>
        <h3>Example Calculation</h3>
        <p>
          If you have three resistors: 100Ω, 220Ω, and 330Ω connected in series:<br />
          R<sub>total</sub> = 100 + 220 + 330 = <strong>650Ω</strong><br />
          If this chain were connected to a 9V battery, the current through the whole circuit would be
          I = 9V / 650Ω ≈ <strong>13.8 mA</strong>, and that same current flows through all three resistors.
        </p>
      </div>
      <div>
        <h3>How Voltage Divides in a Series Circuit</h3>
        <p>
          Even though current stays constant, voltage does not. Each resistor "uses up" a share of the
          total voltage proportional to its resistance — this is exactly the principle behind a voltage
          divider circuit. A larger resistor in the chain drops more voltage across itself than a smaller
          one, because V = I × R and current is fixed for the whole loop.
        </p>
      </div>
      <div>
        <h3>Real-World Applications</h3>
        <ul>
          <li>Limiting current to an LED by placing a resistor in series with it</li>
          <li>Building simple voltage dividers for sensor circuits</li>
          <li>Creating precise reference resistances by combining standard-value resistors</li>
          <li>String lighting, where older-style bulbs were wired in series</li>
          <li>Current-limiting networks in power supply and battery-charging circuits</li>
        </ul>
      </div>
      <div>
        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li>Forgetting that current — not voltage — is the same at every point in a series circuit</li>
          <li>Mixing up series addition with parallel's reciprocal formula</li>
          <li>Ignoring a resistor's power rating, which can be exceeded even if resistance is correctly calculated</li>
          <li>Assuming a broken resistor only affects part of the circuit — in series, one open component stops all current flow</li>
        </ul>
      </div>
      <div>
        <h3>Series vs Parallel: Quick Comparison</h3>
        <p>
          In series, resistance always increases as you add more resistors, and a single break stops the
          whole circuit. In <a href="/parallel-resistance">parallel circuits</a>, resistance always
          decreases as you add more paths, and current can keep flowing through the remaining branches
          even if one path fails. Most real circuits use a mix of both series and parallel sections.
        </p>
      </div>
      <div>
        <h3>Key Points</h3>
        <ul>
          <li>Total resistance always increases in series</li>
          <li>Current is the same through all resistors</li>
          <li>Voltage divides across each resistor proportional to its value</li>
          <li>If one component fails open, the entire circuit breaks</li>
          <li>Resistors can be added in any order — the total is unaffected by sequence</li>
        </ul>
      </div>
      <div>
        <h3>Why Resistance Simply Adds in Series</h3>
        <p>
          It can feel like a formula to memorize, but the reason total resistance in a series circuit
          is just the sum of the individual resistances follows directly from Ohm's Law. Because the
          same current I flows through every resistor in a series chain — there's no other path for it
          to take — the total voltage dropped across the whole chain is V<sub>total</sub> = I×R₁ + I×R₂
          + I×R₃ + ... By factoring out the common current I, this becomes V<sub>total</sub> = I × (R₁ +
          R₂ + R₃ + ...), which is exactly the same form as Ohm's Law for a single equivalent resistor:
          V<sub>total</sub> = I × R<sub>total</sub>. That's the entire proof — R<sub>total</sub> must
          equal R₁ + R₂ + R₃ + ... because that's the only way the equation stays consistent. Every
          series resistance calculator, including this one, is really just automating this simple
          algebraic step.
        </p>
      </div>
      <div>
        <h3>Worked Example: Designing a Current-Limiting Resistor for an LED</h3>
        <p>
          One of the most common uses of series resistance math is sizing a current-limiting resistor
          for an LED. Suppose you're powering a standard red LED (forward voltage of about 2V, desired
          current of 20mA) from a 9V battery. The resistor needs to drop the remaining voltage:
          9V − 2V = 7V. Using Ohm's Law, R = V / I = 7V / 0.02A = <strong>350Ω</strong>. Since 350Ω
          isn't a standard value, you'd round up to the nearest common resistor, 360Ω or 390Ω, to keep
          the current safely at or slightly below the LED's rated maximum. This is a textbook
          application of series-circuit thinking: the battery, the resistor, and the LED are all part
          of one loop carrying the same current, and the resistor's job is purely to "absorb" the
          leftover voltage the LED doesn't need.
        </p>
      </div>
      <div>
        <h3>Power Dissipation in Series Resistors</h3>
        <p>
          Each resistor in a series chain dissipates its own share of power as heat, calculated with
          P = I² × R, where I is the shared circuit current. Because current is identical through every
          resistor, the resistor with the highest resistance value in the chain will dissipate the most
          power and run the hottest. This matters when selecting a resistor's power rating (commonly
          1/8W, 1/4W, 1/2W, 1W, or higher) — undersizing a resistor's power rating in a series circuit
          can cause it to overheat, drift in value, or fail outright, even though the current itself
          might seem modest.
        </p>
      </div>
      <div>
        <h3>Combining Series Resistance with Other Configurations</h3>
        <p>
          Real circuits rarely use pure series or pure parallel arrangements exclusively — most use a
          combination, often called a series-parallel or "mixed" network. To analyze these, engineers
          typically simplify the circuit step by step: first combine any purely parallel groups into a
          single equivalent resistance using the <a href="/parallel-resistance">parallel resistance
          formula</a>, then add that equivalent resistance in series with any remaining series
          resistors, repeating the process until the entire network collapses into one final value.
          This step-by-step reduction technique is one of the very first skills taught in any circuit
          analysis course, precisely because so many real-world circuits — from simple LED arrays to
          complex sensor networks — boil down to nested series and parallel groups.
        </p>
      </div>
      <div>
        <h3>Tolerance Stacking in Series Circuits</h3>
        <p>
          Every resistor has a manufacturing tolerance — commonly ±5% or ±1% — meaning its actual value
          may differ slightly from its labeled value. When resistors are combined in series, these small
          individual errors partially average out rather than simply adding together at their worst
          case, though for a conservative worst-case design estimate, engineers sometimes do add
          tolerances directly to determine the absolute maximum and minimum possible total resistance.
          For precision applications, using resistors from the same batch, or specifying tighter
          tolerance parts (±1% or better), keeps the combined uncertainty of a series network
          predictable and small.
        </p>
      </div>
      <div>
        <h3>Frequently Asked Questions</h3>
        <h4 style="color: var(--gray-700); font-weight: 600; margin-top: 0.75rem;">Does the order of resistors in a series circuit matter?</h4>
        <p>
          No — the total resistance, current, and power delivered by the source are identical no matter
          what order the resistors are physically placed in. Only the individual voltage drop at each
          specific point in the chain changes depending on position.
        </p>
        <h4 style="color: var(--gray-700); font-weight: 600; margin-top: 0.75rem;">What happens if one resistor in a series chain is much larger than the others?</h4>
        <p>
          It dominates the total resistance and will drop the vast majority of the available voltage,
          while the smaller resistors contribute comparatively little to either the total resistance or
          their own voltage drop.
        </p>
        <h4 style="color: var(--gray-700); font-weight: 600; margin-top: 0.75rem;">Can series resistance ever be lower than the smallest individual resistor?</h4>
        <p>
          No. Because resistances simply add together in series, the total is always greater than or
          equal to the single largest resistor in the chain — this is the opposite of how parallel
          resistance behaves.
        </p>
      </div>
      <div>
        <h3>Glossary of Terms</h3>
        <ul>
          <li><strong>Series circuit:</strong> a circuit where components are connected end-to-end, forming a single path for current</li>
          <li><strong>Equivalent resistance:</strong> a single resistance value that behaves identically to a group of resistors combined</li>
          <li><strong>Voltage drop:</strong> the portion of total voltage consumed by a single component in a circuit</li>
          <li><strong>Power rating:</strong> the maximum power a resistor can safely dissipate as heat</li>
          <li><strong>Tolerance:</strong> the manufacturing accuracy of a resistor's stated value, usually given as a percentage</li>
        </ul>
      </div>
    </div>

    <div class="nav-buttons">
      <a href="/parallel-resistance" class="btn-cyan">Calculate Parallel Resistance</a>
      <a href="/voltage-divider" class="btn-cyan">Try Voltage Divider Calculator</a>
      <a href="/resistor-guide" class="btn-cyan">Read the Full Resistor Guide</a>
    </div>
  `;

  document.title = 'Series Resistance Calculator - OhmLab';
  setMeta('description', 'Calculate total resistance for resistors connected in series. Add unlimited resistors and get instant results.');

  renderInputs();
  renderResult();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderSeriesResistance);
} else {
  renderSeriesResistance();
}
