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
          taken from the connection point between them. Because the same current flows through
          both resistors, the input voltage splits between them in proportion to their resistance
          values — the larger resistor drops the larger share of the voltage.
        </p>
      </div>
      <div>
        <h3>Formula</h3>
        <p class="formula-display">
          V<sub>out</sub> = V<sub>in</sub> × (R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>))
        </p>
        <p>
          Here R<sub>1</sub> is the "top" resistor, connected between the input voltage and the output
          node, and R<sub>2</sub> is the "bottom" resistor, connected between the output node and
          ground. The output is always somewhere between 0V and V<sub>in</sub>, and increasing
          R<sub>2</sub> relative to R<sub>1</sub> raises the output voltage, while increasing
          R<sub>1</sub> relative to R<sub>2</sub> lowers it.
        </p>
      </div>
      <div>
        <h3>Step-by-Step Calculation Guide</h3>
        <p>
          <strong>Step 1:</strong> Identify your input voltage V<sub>in</sub> and the two resistor
          values, R<sub>1</sub> (top) and R<sub>2</sub> (bottom).<br />
          <strong>Step 2:</strong> Add R<sub>1</sub> and R<sub>2</sub> together to get the total
          series resistance of the divider.<br />
          <strong>Step 3:</strong> Divide R<sub>2</sub> by that total to get the fraction of the
          input voltage that appears at the output.<br />
          <strong>Step 4:</strong> Multiply that fraction by V<sub>in</sub> to get V<sub>out</sub>.<br />
          <strong>Step 5:</strong> If needed, calculate the current through the divider using
          I = V<sub>in</sub> / (R<sub>1</sub> + R<sub>2</sub>) — this is the same current that flows
          through both resistors.
        </p>
      </div>
      <div>
        <h3>Example Calculation</h3>
        <p>
          Given: V<sub>in</sub> = 12V, R<sub>1</sub> = 10kΩ, R<sub>2</sub> = 10kΩ<br />
          V<sub>out</sub> = 12 × (10k / (10k + 10k)) = 12 × 0.5 = <strong>6V</strong><br />
          With equal resistors, the output is exactly half the input! The current through the
          divider would be I = 12V / 20kΩ = <strong>0.6 mA</strong>.
        </p>
      </div>
      <div>
        <h3>A Second Example: Unequal Resistors</h3>
        <p>
          Given: V<sub>in</sub> = 5V, R<sub>1</sub> = 1kΩ, R<sub>2</sub> = 4kΩ<br />
          V<sub>out</sub> = 5 × (4k / (1k + 4k)) = 5 × 0.8 = <strong>4V</strong><br />
          Because the bottom resistor R<sub>2</sub> is four times larger than R<sub>1</sub>, it
          "claims" four-fifths of the input voltage, leaving only one-fifth dropped across R<sub>1</sub>.
        </p>
      </div>
      <div>
        <h3>Loaded vs Unloaded Dividers</h3>
        <p>
          The formula above assumes the output isn't connected to anything else — this is called an
          "unloaded" or "open-circuit" divider. In real circuits, whatever you connect to the output
          (a sensor input, an ADC pin, another circuit) draws some current and effectively acts as
          another resistor in parallel with R<sub>2</sub>. This pulls the actual output voltage lower
          than the calculated value. To minimize this "loading effect," choose R<sub>1</sub> and
          R<sub>2</sub> to be much smaller than the load's input resistance — though smaller resistors
          also draw more constant current and waste more power, so there's always a trade-off between
          accuracy and efficiency.
        </p>
      </div>
      <div>
        <h3>Choosing Resistor Values</h3>
        <p>
          For a given voltage ratio, there are infinite pairs of R<sub>1</sub> and R<sub>2</sub> that
          work — what matters is their ratio, not their absolute size. Larger resistor values draw
          less current and waste less power but are more susceptible to loading effects and noise.
          Smaller resistor values are more resistant to loading and noise but consume more current
          continuously. A common practical range for signal-level dividers is 1kΩ to 100kΩ.
        </p>
      </div>
      <div>
        <h3>Real-World Applications</h3>
        <ul>
          <li>Sensor interfacing and signal conditioning — scaling a sensor's output into a microcontroller's readable range</li>
          <li>Creating reference voltages for comparators and analog circuits</li>
          <li>Battery voltage monitoring, where a divider scales a higher battery voltage down to a safe level for a microcontroller's ADC pin</li>
          <li>Logic level conversion between devices operating at different voltage standards, such as 5V to 3.3V</li>
          <li>Potentiometers, which act as adjustable voltage dividers by varying the ratio between two resistive sections</li>
          <li>Volume and tone controls in audio equipment</li>
        </ul>
      </div>
      <div>
        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li>Mixing up R<sub>1</sub> and R<sub>2</sub> — remember R<sub>2</sub> (the bottom resistor) is the one in the numerator</li>
          <li>Forgetting the loading effect when connecting a real load to the output</li>
          <li>Using resistor values so large that circuit noise or leakage current distorts the output</li>
          <li>Assuming a voltage divider can supply significant current — it can only supply the small current the divider itself carries</li>
          <li>Forgetting that a voltage divider always outputs less than or equal to V<sub>in</sub>, never more</li>
        </ul>
      </div>
      <div>
        <h3>Key Points</h3>
        <ul>
          <li>Output voltage depends only on the ratio of R<sub>1</sub> to R<sub>2</sub>, not their absolute values</li>
          <li>The same current flows through both resistors in an unloaded divider</li>
          <li>Loading the output with another circuit reduces the actual output voltage below the calculated value</li>
          <li>Smaller resistor values are more resistant to loading but draw more constant current</li>
          <li>A voltage divider is essentially a simplified case of two resistors in series, so it shares the same underlying math</li>
        </ul>
      </div>
    </div>

    <div class="nav-buttons">
      <a href="/series-resistance" class="btn-cyan">Calculate Series Resistance</a>
      <a href="/parallel-resistance" class="btn-cyan">Calculate Parallel Resistance</a>
      <a href="/resistor-guide" class="btn-cyan">Read the Full Resistor Guide</a>
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
