import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

function SeriesResistance() {
  const [resistors, setResistors] = useState<string[]>(['', '']);
  const [result, setResult] = useState<{ total: string; formula: string } | null>(null);

  const addResistor = () => {
    if (resistors.length >= 10) {
      alert('Maximum 10 resistors allowed');
      return;
    }
    setResistors([...resistors, '']);
  };

  const removeResistor = (index: number) => {
    if (resistors.length <= 2) {
      alert('Minimum 2 resistors required');
      return;
    }
    setResistors(resistors.filter((_, i) => i !== index));
  };

  const updateResistor = (index: number, value: string) => {
    const newResistors = [...resistors];
    newResistors[index] = value;
    setResistors(newResistors);
  };

  const formatResistance = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)} MΩ`;
    if (value >= 1000) return `${(value / 1000).toFixed(2)} kΩ`;
    return `${value.toFixed(2)} Ω`;
  };

  const calculate = () => {
    const values = resistors.map(r => parseFloat(r));

    if (values.some(v => !v || v <= 0)) {
      alert('Please enter valid positive resistance values for all resistors');
      return;
    }

    const total = values.reduce((sum, v) => sum + v, 0);
    const formula = values.map((v, i) => `R${i + 1}`).join(' + ') + ' = ' +
                   values.map(v => formatResistance(v)).join(' + ');

    setResult({ total: formatResistance(total), formula });
  };

  const reset = () => {
    setResistors(['', '']);
    setResult(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">Series Resistance Calculator</h1>
        <p className="text-gray-600 mb-8">Calculate total resistance when resistors are connected in series</p>

        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          {resistors.map((resistor, index) => (
            <div key={index} className="flex gap-4 items-center">
              <input
                type="number"
                value={resistor}
                onChange={(e) => updateResistor(index, e.target.value)}
                placeholder="Enter resistance (Ω)"
                min="0"
                step="any"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
              />
              {resistors.length > 2 && (
                <button
                  onClick={() => removeResistor(index)}
                  className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addResistor}
            className="w-full bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
          >
            + Add Resistor
          </button>

          <div className="flex gap-4 pt-4">
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
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Series Resistance</h3>
              <div className="text-4xl font-bold text-teal-600 mb-2">{result.total}</div>
              <p className="text-gray-700 font-medium">Formula: {result.formula}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-teal-600 mb-6">Understanding Series Resistance</h2>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-2">What is Series Connection?</h3>
            <p>
              When resistors are connected in series, they are connected end-to-end in a single path.
              The same current flows through all resistors, but the voltage drops across each resistor.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-2">Formula</h3>
            <p className="text-center text-xl font-semibold my-4">
              R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub> + ... + R<sub>n</sub>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-2">Example Calculation</h3>
            <p>
              If you have three resistors: 100Ω, 220Ω, and 330Ω connected in series:<br />
              R<sub>total</sub> = 100 + 220 + 330 = <strong>650Ω</strong>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-2">Key Points</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Total resistance always increases in series</li>
              <li>Current is the same through all resistors</li>
              <li>Voltage divides across each resistor</li>
              <li>If one component fails, the entire circuit breaks</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/parallel-resistance"
          className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
        >
          Calculate Parallel Resistance
        </Link>
        <Link
          to="/voltage-divider"
          className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
        >
          Try Voltage Divider Calculator
        </Link>
      </div>
    </div>
  );
}

export default SeriesResistance;
