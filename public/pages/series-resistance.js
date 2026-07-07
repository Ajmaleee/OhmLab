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
          When resistors are connected in series, they are connected end-to-end in a single path.
          The same current flows through all resistors, but the voltage drops across each resistor.
        </p>
      </div>
      <div>
        <h3>Formula</h3>
        <p class="formula-display">
          R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub> + ... + R<sub>n</sub>
        </p>
      </div>
      <div>
        <h3>Example Calculation</h3>
        <p>
          If you have three resistors: 100Ω, 220Ω, and 330Ω connected in series:<br />
          R<sub>total</sub> = 100 + 220 + 330 = <strong>650Ω</strong>
        </p>
      </div>
      <div>
        <h3>Key Points</h3>
        <ul>
          <li>Total resistance always increases in series</li>
          <li>Current is the same through all resistors</li>
          <li>Voltage divides across each resistor</li>
          <li>If one component fails, the entire circuit breaks</li>
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
