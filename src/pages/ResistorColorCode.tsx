import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const colorValues: Record<string, number> = {
  black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
  green: 5, blue: 6, violet: 7, gray: 8, white: 9,
};

const multipliers: Record<string, number> = {
  black: 1, brown: 10, red: 100, orange: 1000, yellow: 10000,
  green: 100000, blue: 1000000, violet: 10000000, gray: 100000000,
  white: 1000000000, gold: 0.1, silver: 0.01,
};

const tolerances: Record<string, string> = {
  brown: '±1%', red: '±2%', green: '±0.5%', blue: '±0.25%',
  violet: '±0.1%', gray: '±0.05%', gold: '±5%', silver: '±10%', none: '±20%',
};

const colorHex: Record<string, string> = {
  black: '#000000', brown: '#8B4513', red: '#FF0000', orange: '#FF8C00',
  yellow: '#FFFF00', green: '#00FF00', blue: '#0000FF', violet: '#8B00FF',
  gray: '#808080', white: '#FFFFFF', gold: '#FFD700', silver: '#C0C0C0', none: '#D2B48C',
};

function ResistorColorCode() {
  const [bandCount, setBandCount] = useState<4 | 5>(4);
  const [bands, setBands] = useState<string[]>(['', '', '', '']);
  const [result, setResult] = useState<{ resistance: string; tolerance: string } | null>(null);

  useEffect(() => {
    if (bandCount === 4) {
      setBands(['', '', '', '']);
    } else {
      setBands(['', '', '', '', '']);
    }
    setResult(null);
  }, [bandCount]);

  const formatResistance = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)} MΩ`;
    if (value >= 1000) return `${(value / 1000).toFixed(2)} kΩ`;
    return `${value.toFixed(2)} Ω`;
  };

  const calculate = () => {
    if (bands.some(b => !b)) {
      alert('Please select all color bands');
      return;
    }

    if (bandCount === 4) {
      const digit1 = colorValues[bands[0]];
      const digit2 = colorValues[bands[1]];
      const multiplier = multipliers[bands[2]];
      const tolerance = tolerances[bands[3]];
      const resistance = (digit1 * 10 + digit2) * multiplier;
      setResult({ resistance: formatResistance(resistance), tolerance });
    } else {
      const digit1 = colorValues[bands[0]];
      const digit2 = colorValues[bands[1]];
      const digit3 = colorValues[bands[2]];
      const multiplier = multipliers[bands[3]];
      const tolerance = tolerances[bands[4]];
      const resistance = (digit1 * 100 + digit2 * 10 + digit3) * multiplier;
      setResult({ resistance: formatResistance(resistance), tolerance });
    }
  };

  const reset = () => {
    setBands(bandCount === 4 ? ['', '', '', ''] : ['', '', '', '', '']);
    setResult(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">Resistor Color Code Calculator</h1>
        <p className="text-gray-600 mb-8">Decode resistor color bands to find resistance value and tolerance</p>

        <div className="bg-gray-50 rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Number of Bands:</label>
            <select
              value={bandCount}
              onChange={(e) => setBandCount(Number(e.target.value) as 4 | 5)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
            >
              <option value={4}>4 Bands</option>
              <option value={5}>5 Bands</option>
            </select>
          </div>

          {bands.map((band, index) => (
            <div key={index}>
              <label className="block text-gray-700 font-semibold mb-2">
                Band {index + 1} {index < bands.length - 1 && index < (bandCount === 4 ? 2 : 3) && '(Digit)'}
                {index === (bandCount === 4 ? 2 : 3) && '(Multiplier)'}
                {index === bands.length - 1 && '(Tolerance)'}:
              </label>
              <select
                value={band}
                onChange={(e) => {
                  const newBands = [...bands];
                  newBands[index] = e.target.value;
                  setBands(newBands);
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-600"
              >
                <option value="">Select Color</option>
                {index < bands.length - 1 && index < (bandCount === 4 ? 2 : 3) &&
                  Object.keys(colorValues).map(color => (
                    <option key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))
                }
                {index === (bandCount === 4 ? 2 : 3) &&
                  Object.keys(multipliers).map(color => (
                    <option key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))
                }
                {index === bands.length - 1 &&
                  Object.keys(tolerances).map(color => (
                    <option key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))
                }
              </select>
            </div>
          ))}

          <div className="flex items-center justify-center gap-3 py-6">
            <div className="bg-tan-300 rounded-full px-4 py-2 flex items-center gap-2">
              {bands.map((band, index) => (
                <div
                  key={index}
                  className="w-10 h-24 rounded"
                  style={{
                    backgroundColor: band ? colorHex[band] : '#D2B48C',
                    border: `2px solid ${band === 'white' || band === 'yellow' ? '#333' : '#555'}`,
                  }}
                />
              ))}
            </div>
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
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Resistance Value</h3>
              <div className="text-4xl font-bold text-teal-600 mb-2">{result.resistance}</div>
              <p className="text-gray-700 font-medium">{result.tolerance}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-teal-600 mb-6">How Resistor Color Codes Work</h2>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-2">Understanding Color Bands</h3>
            <p>
              Resistors use colored bands to indicate their resistance value and tolerance. Each color represents
              a specific number or multiplier. Reading from left to right, the bands tell you the resistance in ohms.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-2">4-Band Resistors</h3>
            <p>
              <strong>Band 1 & 2:</strong> First and second significant digits<br />
              <strong>Band 3:</strong> Multiplier (number of zeros)<br />
              <strong>Band 4:</strong> Tolerance (accuracy)
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-2">5-Band Resistors</h3>
            <p>
              <strong>Band 1, 2 & 3:</strong> First, second, and third significant digits<br />
              <strong>Band 4:</strong> Multiplier (number of zeros)<br />
              <strong>Band 5:</strong> Tolerance (accuracy)
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-600 mb-2">Example Calculation</h3>
            <p>
              A resistor with bands: <strong>Brown, Black, Red, Gold</strong><br />
              Brown = 1, Black = 0, Red = ×100, Gold = ±5%<br />
              Resistance = 10 × 100 = <strong>1,000Ω or 1kΩ ±5%</strong>
            </p>
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
          Try Parallel Resistance Calculator
        </Link>
      </div>
    </div>
  );
}

export default ResistorColorCode;
