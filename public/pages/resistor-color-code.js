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
      <div>
        <h3>A Second Example: 5-Band Resistor</h3>
        <p>
          A resistor with bands: <strong>Red, Violet, Black, Brown, Brown</strong><br />
          Red = 2, Violet = 7, Black = 0, Brown = &times;10, Brown = ±1%<br />
          Resistance = 270 &times; 10 = <strong>2,700Ω or 2.7kΩ ±1%</strong><br />
          Five-band resistors add a third digit before the multiplier, giving finer resolution
          than the two-digit precision of a 4-band resistor.
        </p>
      </div>
      <div>
        <h3>How to Find the Right Reading Direction</h3>
        <p>
          One of the trickiest parts of reading color codes is knowing which end to start from.
          The tolerance band (usually gold, silver, brown, or red) is often spaced slightly apart
          from the other bands, so it should be read last, on the right-hand side. If you're
          unsure, try reading the code both ways — one direction should give a "clean," commonly
          manufactured resistance value, while the reverse direction usually produces an unlikely
          or non-standard number.
        </p>
      </div>
      <div>
        <h3>Standard Resistor Value Series (E-Series)</h3>
        <p>
          Resistors aren't manufactured in every possible value — they follow standardized series
          such as E12, E24, E48, E96, and E192, where the number indicates how many value "steps"
          exist per decade (per multiple of 10). The E12 series, common for general-purpose ±10%
          resistors, includes values like 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, and 82 (and
          their multiples, such as 100, 120, 150...). Higher-precision resistors use the denser
          E96 or E192 series to support tighter tolerances like ±1% or ±0.1%.
        </p>
      </div>
      <div>
        <h3>SMD Resistor Codes</h3>
        <p>
          Surface-mount resistors are usually too small for painted color bands, so they use a
          printed numeric code instead. A 3-digit code works like the color bands: the first two
          digits are significant figures and the third is the power-of-ten multiplier (for
          example, "472" means 47 &times; 10² = 4,700Ω, or 4.7kΩ). A 4-digit code is used for
          tighter-tolerance resistors, with three significant digits followed by the multiplier.
          Some ultra-precision or very small chip resistors use an EIA-96 alphanumeric code
          instead, combining a 2-digit lookup number with a letter for the multiplier.
        </p>
      </div>
      <div>
        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li>Reading the bands in the wrong direction, which produces an incorrect resistance value</li>
          <li>Confusing gold and silver as digit colors instead of multiplier/tolerance colors</li>
          <li>Forgetting that a missing tolerance band implies ±20%, not zero tolerance</li>
          <li>Misreading similar-looking colors under poor lighting, such as brown vs red, or blue vs violet</li>
          <li>Assuming all resistors use bands — many modern surface-mount resistors use printed numeric codes instead</li>
        </ul>
      </div>
      <div>
        <h3>Key Points</h3>
        <ul>
          <li>4-band resistors encode 2 significant digits, a multiplier, and a tolerance</li>
          <li>5-band (and 6-band) resistors add a third significant digit for finer precision</li>
          <li>The tolerance band is read last and is usually spaced apart from the rest</li>
          <li>Resistor values follow standardized E-series steps rather than arbitrary numbers</li>
          <li>Surface-mount resistors typically use printed numeric codes instead of color bands</li>
        </ul>
      </div>
      <div>
        <h3>The Full Color Code Reference Table</h3>
        <p>
          Every band color maps to a specific digit, multiplier, or tolerance depending on its
          position. Here is the complete reference used by every calculator, including this one:
        </p>
        <p>
          <strong>Black</strong> = 0, ×1 &nbsp;|&nbsp;
          <strong>Brown</strong> = 1, ×10, ±1% &nbsp;|&nbsp;
          <strong>Red</strong> = 2, ×100, ±2% &nbsp;|&nbsp;
          <strong>Orange</strong> = 3, ×1,000 &nbsp;|&nbsp;
          <strong>Yellow</strong> = 4, ×10,000<br />
          <strong>Green</strong> = 5, ×100,000, ±0.5% &nbsp;|&nbsp;
          <strong>Blue</strong> = 6, ×1,000,000, ±0.25% &nbsp;|&nbsp;
          <strong>Violet</strong> = 7, ×10,000,000, ±0.1% &nbsp;|&nbsp;
          <strong>Gray</strong> = 8, ×100,000,000, ±0.05% &nbsp;|&nbsp;
          <strong>White</strong> = 9, ×1,000,000,000<br />
          <strong>Gold</strong> = ×0.1, ±5% &nbsp;|&nbsp;
          <strong>Silver</strong> = ×0.01, ±10% &nbsp;|&nbsp;
          <strong>No band</strong> = ±20%
        </p>
      </div>
      <div>
        <h3>Why Colors? A Deeper Look at the History</h3>
        <p>
          The resistor color code was formalized by the Radio Manufacturers Association (RMA), a
          predecessor of today's Electronic Industries Alliance (EIA), in the 1920s, and it was later
          adopted internationally through IEC 60062. At the time, printing readable numbers directly
          onto a tiny cylindrical component was expensive, error-prone, and could smudge or fade with
          heat and handling. Painted bands, by contrast, could be applied quickly during manufacturing,
          remained legible under grease, dust, and moderate wear, and could be read from any rotational
          angle around the resistor's body without needing to find a specific printed face. The system
          proved so practical that it survived essentially unchanged for a century, even as the
          resistors themselves shrank dramatically in size, and it remains the standard taught in
          electronics education worldwide.
        </p>
      </div>
      <div>
        <h3>Memory Tricks for Learning the Sequence</h3>
        <p>
          Students have used mnemonic phrases for decades to remember the black-through-white digit
          sequence (0 through 9): a classic example assigns a memorable word starting with each
          color's first letter to build a sentence, such as associating Black with "Bad," Brown with
          "Boys," Red with "Ravish," Orange with "Our," Yellow with "Young," Green with "Girls,"
          Blue with "But," Violet with "Violet," Gray with "Gives," and White with "Wine" — forming a
          nonsense sentence that's easy to memorize even if the words themselves are arbitrary. Many
          students instead simply remember that the sequence follows the visible light spectrum order
          (red, orange, yellow, green, blue, violet) sandwiched between black/brown at the low end and
          gray/white at the high end, which mirrors how a rainbow progresses from long to short
          wavelengths.
        </p>
      </div>
      <div>
        <h3>3-Band, 6-Band, and Temperature Coefficient Bands</h3>
        <p>
          While 4-band and 5-band resistors are by far the most common, a few variations exist. A
          3-band resistor omits the tolerance band entirely, implying the loose ±20% default tolerance
          — these are rarely manufactured today. A 6-band resistor adds one more stripe beyond the
          standard 5-band layout: a temperature coefficient band, specifying how many parts-per-million
          the resistance shifts per degree Celsius of temperature change. This is especially important
          in precision instrumentation, where even a small temperature-driven drift in resistance can
          throw off a sensitive measurement. Common temperature coefficient bands include brown
          (100 ppm/°C), red (50 ppm/°C), orange (15 ppm/°C), and yellow (25 ppm/°C), with lower numbers
          indicating a more temperature-stable resistor.
        </p>
      </div>
      <div>
        <h3>Practice Problems</h3>
        <p>
          Try decoding these on your own before checking the answer, then verify using the calculator
          above:
        </p>
        <p>
          <strong>1)</strong> Yellow, Violet, Orange, Gold → 47 × 1,000 = 47,000Ω (47kΩ) ±5%<br />
          <strong>2)</strong> Green, Blue, Black, Red, Brown → 560 × 100 = 56,000Ω (56kΩ) ±1%<br />
          <strong>3)</strong> Brown, Black, Black, Black → 10 × 1 = 10Ω ±20%<br />
          <strong>4)</strong> Orange, Orange, Red → 33 × 100 = 3,300Ω (3.3kΩ) ±20% (no tolerance band)
        </p>
      </div>
      <div>
        <h3>Military and Aerospace Tolerance Coding</h3>
        <p>
          Beyond the standard consumer color code, some specialized resistors — particularly those
          built to military specifications (MIL-SPEC) — include an additional "reliability" band that
          indicates the failure rate level expected over 1,000 hours of operation. This is less common
          in everyday hobbyist or consumer electronics but appears frequently in aerospace, defense, and
          industrial control equipment where a component's long-term failure probability must be
          documented and traceable.
        </p>
      </div>
      <div>
        <h3>Frequently Asked Questions</h3>
        <h4 style="color: var(--gray-700); font-weight: 600; margin-top: 0.75rem;">What if I can't tell two colors apart, like brown and red?</h4>
        <p>
          Poor lighting is the most common culprit. Try viewing the resistor under bright, neutral
          white light, or use a multimeter to measure the actual resistance and cross-check it against
          the closest standard E-series value.
        </p>
        <h4 style="color: var(--gray-700); font-weight: 600; margin-top: 0.75rem;">Does band width matter?</h4>
        <p>
          Generally no — the tolerance band is sometimes printed wider or spaced further from the
          others purely as a visual cue for reading direction, not because it changes the value.
        </p>
        <h4 style="color: var(--gray-700); font-weight: 600; margin-top: 0.75rem;">Can I trust the color code over a multimeter reading?</h4>
        <p>
          A multimeter measures the resistor's actual present resistance, which can drift slightly with
          age, heat, or damage, while the color code shows the manufactured nominal value and tolerance.
          For critical work, always trust a calibrated multimeter reading over the printed or painted
          code.
        </p>
      </div>
    </div>

    <div class="nav-buttons">
      <a href="/series-resistance" class="btn-cyan">Calculate Series Resistance</a>
      <a href="/parallel-resistance" class="btn-cyan">Try Parallel Resistance Calculator</a>
      <a href="/resistor-guide" class="btn-cyan">Read the Full Resistor Guide</a>
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
