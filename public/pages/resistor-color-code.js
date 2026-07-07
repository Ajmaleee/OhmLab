const colorValues = {
  black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
  green: 5, blue: 6, violet: 7, gray: 8, white: 9,
};

const multipliers = {
  black: 1, brown: 10, red: 100, orange: 1000, yellow: 10000,
  green: 100000, blue: 1000000, violet: 10000000, gray: 100000000,
  white: 1000000000, gold: 0.1, silver: 0.01,
};

const tolerances = {
  brown: '±1%', red: '±2%', green: '±0.5%', blue: '±0.25%',
  violet: '±0.1%', gray: '±0.05%', gold: '±5%', silver: '±10%', none: '±20%',
};

const colorHex = {
  black: '#000000', brown: '#8B4513', red: '#FF0000', orange: '#FF8C00',
  yellow: '#FFFF00', green: '#00FF00', blue: '#0000FF', violet: '#8B00FF',
  gray: '#808080', white: '#FFFFFF', gold: '#FFD700', silver: '#C0C0C0', none: '#D2B48C',
};

let bandCount = 4;
let bands = ['', '', '', ''];

function formatResistance(value) {
  if (value >= 1000000) return (value / 1000000).toFixed(2) + ' MΩ';
  if (value >= 1000) return (value / 1000).toFixed(2) + ' kΩ';
  return value.toFixed(2) + ' Ω';
}

function getDigitOptions() {
  return Object.keys(colorValues).map(color =>
    `<option value="${color}">${color.charAt(0).toUpperCase() + color.slice(1)}</option>`
  ).join('');
}

function getMultiplierOptions() {
  return Object.keys(multipliers).map(color =>
    `<option value="${color}">${color.charAt(0).toUpperCase() + color.slice(1)}</option>`
  ).join('');
}

function getToleranceOptions() {
  return Object.keys(tolerances).map(color =>
    `<option value="${color}">${color.charAt(0).toUpperCase() + color.slice(1)}</option>`
  ).join('');
}

function renderBandInputs() {
  const container = document.getElementById('bandInputs');
  let html = '';

  for (let i = 0; i < bandCount; i++) {
    let label = `Band ${i + 1} `;
    const digitCount = bandCount === 4 ? 2 : 3;
    if (i < digitCount) {
      label += '(Digit)';
    } else if (i === digitCount) {
      label += '(Multiplier)';
    } else {
      label += '(Tolerance)';
    }

    let options;
    if (i < digitCount) {
      options = getDigitOptions();
    } else if (i === digitCount) {
      options = getMultiplierOptions();
    } else {
      options = getToleranceOptions();
    }

    html += `
      <div class="form-group">
        <label>${label}:</label>
        <select id="band${i}" onchange="updateBand(${i}, this.value)">
          <option value="">Select Color</option>
          ${options}
        </select>
      </div>
    `;
  }

  container.innerHTML = html;

  for (let i = 0; i < bandCount; i++) {
    const select = document.getElementById(`band${i}`);
    if (select && bands[i]) select.value = bands[i];
  }
}

function updateBand(index, value) {
  bands[index] = value;
  renderPreview();
}

function renderPreview() {
  const preview = document.getElementById('bandPreview');
  let html = '<div class="band-preview-body">';
  for (let i = 0; i < bandCount; i++) {
    const color = bands[i] || 'none';
    const bgColor = colorHex[color] || '#D2B48C';
    const borderColor = (color === 'white' || color === 'yellow') ? '#333' : '#555';
    html += `<div class="band" style="background-color: ${bgColor}; border: 2px solid ${borderColor};"></div>`;
  }
  html += '</div>';
  preview.innerHTML = html;
}

function calculate() {
  if (bands.some(b => !b)) {
    alert('Please select all color bands');
    return;
  }

  let resistance, tolerance;
  if (bandCount === 4) {
    const digit1 = colorValues[bands[0]];
    const digit2 = colorValues[bands[1]];
    const multiplier = multipliers[bands[2]];
    tolerance = tolerances[bands[3]];
    resistance = (digit1 * 10 + digit2) * multiplier;
  } else {
    const digit1 = colorValues[bands[0]];
    const digit2 = colorValues[bands[1]];
    const digit3 = colorValues[bands[2]];
    const multiplier = multipliers[bands[3]];
    tolerance = tolerances[bands[4]];
    resistance = (digit1 * 100 + digit2 * 10 + digit3) * multiplier;
  }

  const result = document.getElementById('result');
  document.getElementById('resistanceValue').textContent = formatResistance(resistance);
  document.getElementById('toleranceValue').textContent = 'Tolerance: ' + tolerance;
  result.style.display = 'block';
}

function resetCalc() {
  bands = bandCount === 4 ? ['', '', '', ''] : ['', '', '', '', ''];
  renderBandInputs();
  renderPreview();
  document.getElementById('result').style.display = 'none';
}

function changeBandCount(value) {
  bandCount = parseInt(value);
  bands = bandCount === 4 ? ['', '', '', ''] : ['', '', '', '', ''];
  renderBandInputs();
  renderPreview();
  document.getElementById('result').style.display = 'none';
}

function renderResistorColorCode() {
  const main = document.getElementById('main');
  if (!main) return;

  main.innerHTML = `
    <div class="calc-page">
      <h1>Resistor Color Code Calculator</h1>
      <p>Decode resistor color bands to find resistance value and tolerance</p>
      <div class="calc-section">
        <div class="form-group">
          <label>Number of Bands:</label>
          <select id="bandCount" onchange="changeBandCount(this.value)">
            <option value="4">4 Bands</option>
            <option value="5">5 Bands</option>
          </select>
        </div>
        <div id="bandInputs"></div>
        <div class="band-preview" id="bandPreview"></div>
        <div class="calc-buttons">
          <button class="btn-primary" onclick="calculate()">Calculate</button>
          <button class="btn-outline" onclick="resetCalc()">Reset</button>
        </div>
        <div id="result" style="display: none;">
          <div class="result-box">
            <h3>Resistance Value</h3>
            <div class="result-value" id="resistanceValue"></div>
            <p id="toleranceValue"></p>
          </div>
        </div>
      </div>
    </div>

    <div class="explanation-section">
      <h2>How Resistor Color Codes Work</h2>
      <div>
        <h3>Understanding Color Bands</h3>
        <p>
          Resistors use colored bands to indicate their resistance value and tolerance. Each color represents
          a specific number or multiplier. Reading from left to right, the bands tell you the resistance in ohms.
        </p>
      </div>
      <div>
        <h3>4-Band Resistors</h3>
        <p>
          <strong>Band 1 & 2:</strong> First and second significant digits<br />
          <strong>Band 3:</strong> Multiplier (number of zeros)<br />
          <strong>Band 4:</strong> Tolerance (accuracy)
        </p>
      </div>
      <div>
        <h3>5-Band Resistors</h3>
        <p>
          <strong>Band 1, 2 & 3:</strong> First, second, and third significant digits<br />
          <strong>Band 4:</strong> Multiplier (number of zeros)<br />
          <strong>Band 5:</strong> Tolerance (accuracy)
        </p>
      </div>
      <div>
        <h3>Example Calculation</h3>
        <p>
          A resistor with bands: <strong>Brown, Black, Red, Gold</strong><br />
          Brown = 1, Black = 0, Red = &times;100, Gold = ±5%<br />
          Resistance = 10 &times; 100 = <strong>1,000Ω or 1kΩ ±5%</strong>
        </p>
      </div>
    </div>

    <div class="nav-buttons">
      <a href="/series-resistance" class="btn-cyan">Calculate Series Resistance</a>
      <a href="/parallel-resistance" class="btn-cyan">Try Parallel Resistance Calculator</a>
    </div>
  `;

  document.title = 'Resistor Color Code Calculator - OhmLab';
  setMeta('description', 'Decode 4-band and 5-band resistor color codes instantly. Calculate resistance values and tolerance with our free calculator.');

  renderBandInputs();
  renderPreview();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderResistorColorCode);
} else {
  renderResistorColorCode();
}
