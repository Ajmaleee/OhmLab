import { useState } from 'react';
import { Link } from 'react-router-dom';

function VoltageDivider() {
  const [vin, setVin] = useState('');
  const [r1, setR1] = useState('');
  const [r2, setR2] = useState('');
  const [result, setResult] = useState<{ vout: string; formula: string; current: string; totalR: string } | null>(null);

  const formatResistance = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}MΩ`;
    if (value >= 1000) return `${(value / 1000).toFixed(2)}kΩ`;
    return `${value.toFixed(2)}Ω`;
  };

  const formatCurrent = (value: number): string => {
    if (value >= 1) return `${value.toFixed(3)}A`;
    if (value >= 0.001) return `${(value * 1000).toFixed(3)}mA`;
    return `${(value * 1000000).toFixed(3)}µA`;
  };

  const calculate = () => {
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

    setResult({
      vout: vout.toFixed(3) + ' V',
      formula: `Vout = ${vinVal}V × (${formatResistance(r2Val)} / (${formatResistance(r1Val)} + ${formatResistance(r2Val)}))`,
      current: formatCurrent(current),
      totalR: formatResistance(totalResistance),
    });
  };

  const reset = () => {
    setVin('');
    setR1('');
    setR2('');
    setResult(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">Voltage Divider Calculator</h1>
        <p className="text-gray-600 mb-8">Calculate output voltage in voltage divider circuits</p>

        <div className="bg-gray-50 rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Input Voltage (V<sub>in</sub>):
            </label>
            <input
              type="number"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              placeholder="Enter input voltage in volts"
              min="0"
              step="any"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Resistor 1 (R<sub>1</sub>) - Top Resistor:
            </label>
            <input
              type="number"
              value={r1}
              onChange={(e) => setR1(e.target.value)}
              placeholder="Enter resistance in ohms"
              min="0"
              step="any"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Resistor 2 (R<sub>2</sub>) - Bottom Resistor:
            </label>
            <input
              type="number"
              value={r2}
              onChange={(e) => setR2(e.target.value)}
              placeholder="Enter resistance in ohms"
              min="0"
              step="any"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculate}
              className="flex-1 bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md"
            >
              Calculate
            </button>
            <button
              onClick={reset}
              className="flex-1 bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold border-2 border-teal-600 hover:bg-teal-50 transition-colors"
            >
              Reset
            </button>
          </div>

          {result && (
            <div className="bg-teal-100 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Output Voltage (V<sub>out</sub>)
              </h3>
              <div className="text-4xl font-bold text-teal-600 mb-4">{result.vout}</div>
              <p className="text-gray-700 text-sm mb-2">{result.formula}</p>
              <div className="grid grid-cols-2 gap-4 text-left mt-4">
                <div>
                  <p className="text-gray-600 text-sm">Total Resistance:</p>
                  <p className="font-semibold">{result.totalR}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Current:</p>
                  <p className="font-semibold">{result.current}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-teal-600 mb-6">Understanding Voltage Dividers</h2>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-2">What is a Voltage Divider?</h3>
            <p>
              A voltage divider is a simple circuit that produces an output voltage that is a fraction
              of its input voltage. It consists of two resistors connected in series, with the output
              taken from the connection point between them.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-2">Formula</h3>
            <p className="text-center text-xl font-semibold my-4">
              V<sub>out</sub> = V<sub>in</sub> × (R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>))
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-2">Example Calculation</h3>
            <p>
              Given: V<sub>in</sub> = 12V, R<sub>1</sub> = 10kΩ, R<sub>2</sub> = 10kΩ<br />
              V<sub>out</sub> = 12 × (10k / (10k + 10k)) = 12 × 0.5 = <strong>6V</strong><br />
              With equal resistors, the output is exactly half the input!
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-2">Common Applications</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Sensor interfacing and signal conditioning</li>
              <li>Creating reference voltages</li>
              <li>Battery voltage monitoring</li>
              <li>Logic level conversion</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/series-resistance"
          className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
        >
          Calculate Series Resistance
        </Link>
        <Link
          to="/parallel-resistance"
          className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
        >
          Calculate Parallel Resistance
        </Link>
      </div>
    </div>
  );
}

export default VoltageDivider;
