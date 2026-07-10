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
      <div>
        <h3>The Physics Behind the Split</h3>
        <p>
          To really understand why a voltage divider behaves the way it does, it helps to go back to
          first principles. Ohm's Law tells us that voltage across a resistor equals the current
          flowing through it multiplied by its resistance: V = I × R. In a simple two-resistor divider,
          both resistors are connected end-to-end with nowhere else for current to go, so exactly the
          same current I must flow through R<sub>1</sub> and then through R<sub>2</sub>. That current is
          fixed by the total resistance of the loop: I = V<sub>in</sub> / (R<sub>1</sub> + R<sub>2</sub>).
          Once you know that current, the voltage dropped across R<sub>2</sub> alone is simply
          I × R<sub>2</sub>, which is where the familiar V<sub>out</sub> = V<sub>in</sub> × R<sub>2</sub> /
          (R<sub>1</sub> + R<sub>2</sub>) formula comes from. Every voltage divider calculation, no
          matter how it's presented, ultimately traces back to this single idea: current is shared
          everywhere in a series loop, but voltage is distributed according to resistance.
        </p>
      </div>
      <div>
        <h3>Thevenin Equivalent of a Voltage Divider</h3>
        <p>
          Engineers often need to know how a voltage divider will behave once something is connected
          to its output, and the cleanest way to answer that is with a Thevenin equivalent circuit.
          Viewed from the output node, a voltage divider looks exactly like a single ideal voltage
          source (equal to the unloaded V<sub>out</sub>) in series with a single equivalent resistance,
          known as the Thevenin resistance. For a simple two-resistor divider, that equivalent
          resistance is R<sub>1</sub> and R<sub>2</sub> in parallel: R<sub>th</sub> = (R<sub>1</sub> ×
          R<sub>2</sub>) / (R<sub>1</sub> + R<sub>2</sub>). This single number tells you everything you
          need about how "stiff" the divider is — a low Thevenin resistance means the output voltage
          barely sags when a load is attached, while a high Thevenin resistance means even a modest
          load current will pull the output down noticeably. This is exactly why datasheets for
          reference-voltage circuits often specify an output impedance figure; it's really just the
          divider's Thevenin resistance in disguise.
        </p>
      </div>
      <div>
        <h3>Worked Example: Calculating the Loading Effect</h3>
        <p>
          Suppose you build a divider with V<sub>in</sub> = 5V, R<sub>1</sub> = 10kΩ and R<sub>2</sub> =
          10kΩ. Unloaded, this gives a clean V<sub>out</sub> = 2.5V. Now imagine you connect a load with
          an input resistance of only 10kΩ across the output — the same value as R<sub>2</sub>. That
          load resistance combines with R<sub>2</sub> in parallel to form an effective bottom resistance
          of (10k × 10k) / (10k + 10k) = 5kΩ. Recalculating with this new effective R<sub>2</sub> gives
          V<sub>out</sub> = 5V × (5k / (10k + 5k)) = 5V × 0.333 = <strong>1.67V</strong> — noticeably
          lower than the 2.5V you expected. This example is a good illustration of why it's dangerous
          to assume a divider will behave exactly as calculated once real hardware is attached to its
          output; always compare your resistor values to the load's input impedance before finalizing a
          design.
        </p>
      </div>
      <div>
        <h3>Voltage Dividers with Non-Resistive Elements</h3>
        <p>
          The two-resistor divider is the simplest case, but the same "ratio of impedances" idea
          extends to circuits built from other components too. Replace one or both resistors with a
          capacitor and you get a capacitive voltage divider, commonly used in high-voltage AC
          measurement and in switched-capacitor circuits, where the ratio is based on capacitive
          reactance instead of resistance. Replace a resistor with a photoresistor, thermistor, or
          strain gauge, and you get a sensing voltage divider whose output voltage varies with light,
          temperature, or mechanical strain — this is one of the most common ways to turn a simple
          resistive sensor into a voltage signal a microcontroller's analog input can read directly.
          Potentiometers, meanwhile, are really just a single continuous resistive element with a
          sliding contact, functioning as an adjustable divider where turning the knob changes the
          effective R<sub>1</sub>-to-R<sub>2</sub> ratio without changing the total resistance.
        </p>
      </div>
      <div>
        <h3>Power Dissipation in a Divider</h3>
        <p>
          Every voltage divider constantly burns a small amount of power as heat, even when nothing is
          connected to its output, simply because current is always flowing through R<sub>1</sub> and
          R<sub>2</sub> whenever V<sub>in</sub> is present. The power dissipated by each resistor can be
          found with P = I² × R or equivalently P = V² / R, where V is the voltage dropped across that
          particular resistor. For a 12V supply through two 1kΩ resistors, the current is 6mA, meaning
          each resistor dissipates about 36mW — small, but not zero. In battery-powered designs where
          every microamp matters, this constant "bleed current" is often the dominant reason engineers
          choose much larger resistor values (hundreds of kΩ or more) for dividers that only feed a
          high-impedance ADC input, trading a small loading error for significantly longer battery life.
        </p>
      </div>
      <div>
        <h3>Frequently Asked Questions</h3>
        <h4 style="color: var(--gray-700); font-weight: 600; margin-top: 0.75rem;">Can a voltage divider increase voltage above V<sub>in</sub>?</h4>
        <p>
          No. A simple resistive voltage divider can only ever produce an output between 0V and
          V<sub>in</sub>. Boosting a voltage above the supply requires an active circuit, such as a
          boost converter, rather than passive resistors.
        </p>
        <h4 style="color: var(--gray-700); font-weight: 600; margin-top: 0.75rem;">Why does my measured output voltage not match the calculated value?</h4>
        <p>
          The most common causes are the loading effect from whatever is connected to the output,
          resistor tolerance (a ±5% resistor can be up to 5% away from its labeled value), and
          measurement error from a multimeter that itself draws a small amount of current.
        </p>
        <h4 style="color: var(--gray-700); font-weight: 600; margin-top: 0.75rem;">What's the difference between a voltage divider and a potentiometer?</h4>
        <p>
          They're built on the same principle, but a fixed voltage divider uses two separate resistors
          with a set ratio, while a potentiometer is a single variable resistive element with a movable
          wiper, letting you continuously adjust the divider ratio by turning a knob or sliding a lever.
        </p>
      </div>
      <div>
        <h3>Glossary of Terms</h3>
        <ul>
          <li><strong>V<sub>in</sub>:</strong> the total input or supply voltage applied across the divider</li>
          <li><strong>V<sub>out</sub>:</strong> the voltage measured at the junction between the two resistors</li>
          <li><strong>Loading effect:</strong> the drop in output voltage caused by connecting a real circuit to the divider's output</li>
          <li><strong>Thevenin resistance:</strong> the equivalent single resistance a divider presents to whatever is connected to its output</li>
          <li><strong>Bleed current:</strong> the constant current that flows through a divider even when unloaded</li>
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
