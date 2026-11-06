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

    <div class="ad-slot" id="ad-slot-parallel"></div>

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
      <div>
        <h3>Why the Reciprocal Formula Works</h3>
        <p>
          The parallel resistance formula looks intimidating at first, but it follows directly from
          Ohm's Law once you notice that every resistor in a parallel group shares the exact same
          voltage across it — they're all connected between the same two nodes. Since each resistor's
          current is I = V / R, the total current drawn from the source is simply the sum of each
          branch's individual current: I<sub>total</sub> = V/R₁ + V/R₂ + V/R₃ + ... Factoring out the
          shared voltage V gives I<sub>total</sub> = V × (1/R₁ + 1/R₂ + 1/R₃ + ...). Comparing this to
          Ohm's Law for a single equivalent resistor, I<sub>total</sub> = V / R<sub>total</sub>, shows
          that 1/R<sub>total</sub> must equal 1/R₁ + 1/R₂ + 1/R₃ + ... — which is exactly the reciprocal
          formula every parallel resistance calculator uses. In short: resistors in parallel add up as
          conductances (the reciprocal of resistance), not as resistances directly, because it's the
          current paths that are being combined, not the resistive elements themselves.
        </p>
      </div>
      <div>
        <h3>Worked Example: Combining Three Unequal Resistors</h3>
        <p>
          Suppose you have three resistors in parallel: R₁ = 100Ω, R₂ = 200Ω, and R₃ = 300Ω.
          1/R<sub>total</sub> = 1/100 + 1/200 + 1/300 = 0.01 + 0.005 + 0.00333 = 0.01833.
          R<sub>total</sub> = 1 / 0.01833 ≈ <strong>54.5Ω</strong>. Notice that the result, 54.5Ω, is
          smaller than even the smallest individual resistor (100Ω) — this is a defining, sometimes
          counterintuitive property of parallel circuits: adding more resistive paths, no matter how
          large each new resistor is, can only ever lower or maintain the total resistance, never raise
          it.
        </p>
      </div>
      <div>
        <h3>Current Divider Rule</h3>
        <p>
          Just as a series circuit has a voltage divider rule, a parallel circuit has a current divider
          rule: the current through any one branch is inversely proportional to its resistance relative
          to the others. For two resistors in parallel, the current through R₁ can be found directly
          with I₁ = I<sub>total</sub> × R₂ / (R₁ + R₂) — notice that it's the *other* resistor's value
          that appears in the numerator, the mirror image of the voltage divider formula. This means the
          branch with the lowest resistance always carries the most current, since it offers the "path
          of least resistance" for charge to flow through, while high-resistance branches carry
          proportionally less.
        </p>
      </div>
      <div>
        <h3>Power Distribution Across Parallel Branches</h3>
        <p>
          Because every resistor in a parallel group shares the same voltage, the power each one
          dissipates is most easily calculated with P = V² / R. This means, somewhat counterintuitively,
          that the *smallest* resistance value in a parallel group dissipates the *most* power, since a
          smaller R in the denominator produces a larger result for a fixed voltage. This is an important
          safety consideration in circuits like parallel LED strings or parallel battery packs, where
          the lowest-resistance path can end up carrying a disproportionate — sometimes dangerous —
          share of the total current and power if the branches aren't well matched.
        </p>
      </div>
      <div>
        <h3>Household Wiring: A Real-World Parallel Circuit</h3>
        <p>
          The electrical wiring in most homes is a practical, everyday example of a parallel circuit.
          Every outlet, light fixture, and appliance is connected in parallel across the same supply
          voltage (120V or 230V depending on region), which is precisely why turning off one lamp
          doesn't turn off every other device in the house, and why plugging in an additional appliance
          doesn't change the voltage available to everything else already running. This parallel wiring
          also explains why circuit breakers monitor total current rather than voltage — as more devices
          are switched on, more parallel paths are added, the combined resistance of the household
          circuit drops, and the total current drawn increases, which is exactly the condition a breaker
          is designed to detect and interrupt if it becomes excessive.
        </p>
      </div>
      <div>
        <h3>Frequently Asked Questions</h3>
        <h4 style="color: var(--gray-700); font-weight: 600; margin-top: 0.75rem;">Why is parallel resistance always smaller than every individual resistor?</h4>
        <p>
          Adding a resistor in parallel always creates an additional path for current to flow, and more
          available paths can only make it easier — never harder — for current to get through overall,
          which is the same as saying the total resistance can only go down or stay the same.
        </p>
        <h4 style="color: var(--gray-700); font-weight: 600; margin-top: 0.75rem;">What happens if I put a 0Ω (short circuit) in parallel with another resistor?</h4>
        <p>
          The total resistance becomes 0Ω, since a short circuit provides an essentially unrestricted
          path for current, bypassing the other resistor(s) entirely. This is also why an accidental
          short in one parallel branch can cause dangerously high current draw across the whole circuit.
        </p>
        <h4 style="color: var(--gray-700); font-weight: 600; margin-top: 0.75rem;">Is there a shortcut for two equal resistors in parallel?</h4>
        <p>
          Yes — two identical resistors in parallel always combine to exactly half the value of one of
          them. More generally, N identical resistors in parallel combine to 1/N of a single resistor's
          value.
        </p>
      </div>
      <div>
        <h3>Glossary of Terms</h3>
        <ul>
          <li><strong>Parallel circuit:</strong> a circuit where components share the same two connection nodes, giving current multiple paths</li>
          <li><strong>Conductance:</strong> the reciprocal of resistance (measured in siemens), which adds directly for parallel resistors</li>
          <li><strong>Current divider:</strong> the rule describing how total current splits among parallel branches</li>
          <li><strong>Branch:</strong> one individual resistive path within a parallel network</li>
          <li><strong>Short circuit:</strong> a near-zero resistance path that can dominate a parallel network's behavior</li>
        </ul>
      </div>
    </div>

    <div class="ad-slot" id="ad-slot-parallel-bottom"></div>

    <div class="nav-buttons">
      <a href="/series-resistance" class="btn-cyan">Calculate Series Resistance</a>
      <a href="/resistor-color-code" class="btn-cyan">Decode Resistor Color Codes</a>
      <a href="/resistor-guide" class="btn-cyan">Read the Full Resistor Guide</a>
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
