function calculateVoltageDivider() {
    const vin = parseFloat(document.getElementById('inputVoltage').value);
    const r1 = parseFloat(document.getElementById('r1').value);
    const r2 = parseFloat(document.getElementById('r2').value);

    if (!vin || !r1 || !r2) {
        alert('Please enter all values');
        return;
    }

    if (vin <= 0 || r1 <= 0 || r2 <= 0) {
        alert('All values must be positive');
        return;
    }

    const vout = vin * (r2 / (r1 + r2));
    const totalResistance = r1 + r2;
    const current = vin / totalResistance;

    const result = document.getElementById('result');
    const outputVoltage = document.getElementById('outputVoltage');
    const formula = document.getElementById('formula');
    const currentInfo = document.getElementById('currentInfo');

    outputVoltage.textContent = vout.toFixed(3) + ' V';

    formula.innerHTML = `
        Formula: V<sub>out</sub> = V<sub>in</sub> × (R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>))<br>
        = ${vin}V × (${formatResistance(r2)} / (${formatResistance(r1)} + ${formatResistance(r2)}))
    `;

    currentInfo.innerHTML = `
        Total Resistance: ${formatResistance(totalResistance)}<br>
        Current through circuit: ${formatCurrent(current)}
    `;

    result.style.display = 'block';
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function formatResistance(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + 'MΩ';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + 'kΩ';
    } else {
        return value.toFixed(2) + 'Ω';
    }
}

function formatCurrent(value) {
    if (value >= 1) {
        return value.toFixed(3) + 'A';
    } else if (value >= 0.001) {
        return (value * 1000).toFixed(3) + 'mA';
    } else {
        return (value * 1000000).toFixed(3) + 'µA';
    }
}

function resetCalculator() {
    document.getElementById('inputVoltage').value = '';
    document.getElementById('r1').value = '';
    document.getElementById('r2').value = '';
    document.getElementById('result').style.display = 'none';
}
