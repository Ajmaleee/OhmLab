let vin = '';
let r1 = '';
let r2 = '';
let result = null;

function formatResistance(value) {
  if (value >= 1000000) return (value / 1000000).toFixed(2) + 'MΩ';
  if (value >= 1000) return (value / 1000).toFixed(2) + 'kΩ';
  return value.toFixed(2) + 'Ω';
}

function formatCurrent(value) {
  if (value >= 1) return value.toFixed(3) + 'A';
  if (value >= 0.001) return (value * 1000).toFixed(3) + 'mA';
  return (value * 1000000).toFixed(3) + 'µA';
}

function calculate() {
  const vinVal = parseFloat(vin);
  const r1Val = parseFloat(r1);
  const r2Val = parseFloat(r2);

  if (!vinVal || !r1Val || !r2Val) {
    alert('Please enter all values');
    return;
  }

  if (vinVal <= 0 || r1Val <= 0 || r2Val <= 0) {
    alert('All values must be positive');
    return;
  }

  const vout = vinVal * (r2Val / (r1Val + r2Val));
  const totalResistance = r1Val + r2Val;
  const current = vinVal / totalResistance;

  result = {
    vout: vout.toFixed(3) + ' V',
    formula: `Vout = ${vinVal}V × (${formatResistance(r2Val)} / (${formatResistance(r1Val)} + ${formatResistance(r2Val)}))`,
    current: formatCurrent(current),
    totalR: formatResistance(totalResistance),
  };
  renderResult();
}

function reset() {
  vin = '';
  r1 = '';
  r2 = '';
  result = null;
  document.getElementById('inputVoltage').value = '';
  document.getElementById('r1').value = '';
  document.getElementById('r2').value = '';
  renderResult();
}

function renderResult() {
  const container = document.getElementById('result');
  if (result) {
    container.style.display = 'block';
    container.innerHTML = `
      <div class="result-box">
        <h3>Output Voltage (V<sub>out</sub>)</h3>
        <div class="result-value">${result.vout}</div>
        <p class="result-formula">${result.formula}</p>
        <div class="result-meta">
          <div>
            <p>Total Resistance:</p>
            <p class="meta-value">${result.totalR}</p>
          </div>
          <div>
            <p>Current:</p>
            <p class="meta-value">${result.current}</p>
          </div>
        </div>
      </div>
    `;
  } else {
    container.style.display = 'none';
    container.innerHTML = '';
  }
}

function renderVoltageDivider() {
  const main = document.getElementById('main');
  if (!main) return;

  main.innerHTML = `
    <div class="calc-page">
      <h1>Voltage Divider Calculator</h1>
      <p>Calculate output voltage in voltage divider circuits</p>
      <div class="calc-section">
        <div class="form-group">
          <label>Input Voltage (V<sub>in</sub>):</label>
          <input type="number" id="inputVoltage" value="${vin}" onchange="vin=this.value" placeholder="Enter input voltage in volts" min="0" step="any" />
        </div>
        <div class="form-group">
          <label>Resistor 1 (R<sub>1</sub>) - Top Resistor:</label>
          <input type="number" id="r1" value="${r1}" onchange="r1=this.value" placeholder="Enter resistance in ohms" min="0" step="any" />
        </div>
        <div class="form-group">
          <label>Resistor 2 (R<sub>2</sub>) - Bottom Resistor:</label>
          <input type="number" id="r2" value="${r2}" onchange="r2=this.value" placeholder="Enter resistance in ohms" min="0" step="any" />
        </div>
        <div class="calc-buttons">
          <button class="btn-primary" onclick="calculate()">Calculate</button>
          <button class="btn-outline" onclick="reset()">Reset</button>
        </div>
        <div id="result" style="display: none;"></div>
      </div>
    </div>

    <div class="explanation-section">
      <h2>Understanding Voltage Dividers</h2>
      <div>
        <h3>What is a Voltage Divider?</h3>
        <p>
          A voltage divider is a simple circuit that produces an output voltage that is a fraction
          of its input voltage. It consists of two resistors connected in series, with the output
          taken from the connection point between them.
        </p>
      </div>
      <div>
        <h3>Formula</h3>
        <p class="formula-display">
          V<sub>out</sub> = V<sub>in</sub> × (R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>))
        </p>
      </div>
      <div>
        <h3>Example Calculation</h3>
        <p>
          Given: V<sub>in</sub> = 12V, R<sub>1</sub> = 10kΩ, R<sub>2</sub> = 10kΩ<br />
          V<sub>out</sub> = 12 × (10k / (10k + 10k)) = 12 × 0.5 = <strong>6V</strong><br />
          With equal resistors, the output is exactly half the input!
        </p>
      </div>
      <div>
        <h3>Common Applications</h3>
        <ul>
          <li>Sensor interfacing and signal conditioning</li>
          <li>Creating reference voltages</li>
          <li>Battery voltage monitoring</li>
          <li>Logic level conversion</li>
        </ul>
      </div>
    </div>

    <div class="nav-buttons">
      <a href="/series-resistance" class="btn-cyan">Calculate Series Resistance</a>
      <a href="/parallel-resistance" class="btn-cyan">Calculate Parallel Resistance</a>
    </div>
  `;

  document.title = 'Voltage Divider Calculator - OhmLab';
  setMeta('description', 'Calculate output voltage in voltage divider circuits. Essential tool for circuit design and analysis.');

  renderResult();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderVoltageDivider);
} else {
  renderVoltageDivider();
}
