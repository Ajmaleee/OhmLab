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
    </div>

    <div class="nav-buttons">
      <a href="/parallel-resistance" class="btn-cyan">Calculate Parallel Resistance</a>
      <a href="/voltage-divider" class="btn-cyan">Try Voltage Divider Calculator</a>
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
