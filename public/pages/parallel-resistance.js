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

  const reciprocalSum = values.reduce((sum, v) => sum + 1 / v, 0);
  const total = 1 / reciprocalSum;

  let formula;
  if (values.length === 2) {
    formula = `(R₁ × R₂) / (R₁ + R₂) = (${formatResistance(values[0])} × ${formatResistance(values[1])}) / (${formatResistance(values[0])} + ${formatResistance(values[1])})`;
  } else {
    formula = `1/R_total = ${values.map((_, i) => `1/R${i + 1}`).join(' + ')}`;
  }

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
        <h3>Equivalent Parallel Resistance</h3>
        <div class="result-value">${result.total}</div>
        <p class="result-formula">${result.formula}</p>
      </div>
    `;
  } else {
    container.style.display = 'none';
    container.innerHTML = '';
  }
}

function renderParallelResistance() {
  const main = document.getElementById('main');
  if (!main) return;

  main.innerHTML = `
    <div class="calc-page">
      <h1>Parallel Resistance Calculator</h1>
      <p>Calculate equivalent resistance when resistors are connected in parallel</p>
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
      <h2>Understanding Parallel Resistance</h2>
      <div>
        <h3>What is Parallel Connection?</h3>
        <p>
          When resistors are connected in parallel, both ends of every resistor are tied to the same two
          points in the circuit, creating multiple independent paths for current to flow. Because every
          resistor shares the same two nodes, the voltage across all of them is identical, but the total
          current from the source splits and flows through each branch in inverse proportion to its
          resistance — the lowest-resistance path carries the most current.
        </p>
      </div>
      <div>
        <h3>Formula</h3>
        <p class="formula-display">
          1/R<sub>total</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> + 1/R<sub>3</sub> + ... + 1/R<sub>n</sub>
        </p>
        <p style="text-align: center;">For two resistors:</p>
        <p class="formula-display">
          R<sub>total</sub> = (R<sub>1</sub> × R<sub>2</sub>) / (R<sub>1</sub> + R<sub>2</sub>)
        </p>
        <p>
          The two-resistor shortcut — often called the "product over sum" rule — is faster than the
          reciprocal formula when you're only working with a pair of resistors, but for three or more
          resistors you'll need the full reciprocal sum.
        </p>
      </div>
      <div>
        <h3>Step-by-Step Calculation Guide</h3>
        <p>
          <strong>Step 1:</strong> Take the reciprocal (1 ÷ value) of every resistor in the group.<br />
          <strong>Step 2:</strong> Add all the reciprocals together.<br />
          <strong>Step 3:</strong> Take the reciprocal of that sum to get the total equivalent resistance.<br />
          <strong>Step 4:</strong> Double-check your answer — it should always be smaller than the
          smallest individual resistor in the group.
        </p>
      </div>
      <div>
        <h3>Example Calculation</h3>
        <p>
          Two resistors: 100Ω and 200Ω in parallel:<br />
          R<sub>total</sub> = (100 × 200) / (100 + 200) = 20000 / 300 = <strong>66.67Ω</strong><br />
          Notice the result is less than the smallest resistor! This happens because every additional
          parallel path gives current an easier route, lowering the overall opposition to flow.
        </p>
      </div>
      <div>
        <h3>Special Case: Equal Resistors</h3>
        <p>
          When N identical resistors of value R are connected in parallel, the shortcut formula
          R<sub>total</sub> = R / N applies. For example, four 100Ω resistors in parallel give
          100 / 4 = <strong>25Ω</strong>, without needing the full reciprocal calculation.
        </p>
      </div>
      <div>
        <h3>Real-World Applications</h3>
        <ul>
          <li>Household electrical wiring, where outlets are wired in parallel so each device gets full voltage</li>
          <li>Combining standard resistor values to approximate a non-standard resistance</li>
          <li>Current-sharing networks in power distribution and battery packs</li>
          <li>Building redundancy into circuits so one component failing doesn't stop everything</li>
          <li>Shunt resistors used for current sensing in parallel with a measurement path</li>
        </ul>
      </div>
      <div>
        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li>Forgetting to take the final reciprocal after summing 1/R values</li>
          <li>Assuming parallel resistance is a simple average — it isn't</li>
          <li>Using the "product over sum" shortcut with more than two resistors (it only works for exactly two)</li>
          <li>Overlooking that current, not voltage, is what divides between parallel branches</li>
        </ul>
      </div>
      <div>
        <h3>Series vs Parallel: Quick Comparison</h3>
        <p>
          Parallel resistance always decreases as more resistors are added, the opposite of
          <a href="/series-resistance">series circuits</a>, where resistance always increases. Parallel
          circuits are also more fault-tolerant: if one branch opens, current keeps flowing through the
          remaining paths, whereas a single break in a series circuit stops everything.
        </p>
      </div>
      <div>
        <h3>Key Points</h3>
        <ul>
          <li>Total resistance always decreases in parallel</li>
          <li>Result is always less than the smallest individual resistor</li>
          <li>Voltage is the same across all resistors</li>
          <li>Current divides among the paths in inverse proportion to resistance</li>
          <li>If one branch fails open, the others continue to work</li>
        </ul>
      </div>
    </div>

    <div class="nav-buttons">
      <a href="/series-resistance" class="btn-cyan">Calculate Series Resistance</a>
      <a href="/resistor-color-code" class="btn-cyan">Decode Resistor Color Codes</a>
    </div>
  `;

  document.title = 'Parallel Resistance Calculator - OhmLab';
  setMeta('description', 'Calculate equivalent resistance for resistors connected in parallel. Free calculator with instant results.');

  renderInputs();
  renderResult();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderParallelResistance);
} else {
  renderParallelResistance();
}
