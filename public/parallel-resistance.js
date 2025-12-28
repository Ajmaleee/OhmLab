function addResistor() {
    const container = document.getElementById('resistorInputs');
    const inputCount = container.querySelectorAll('input').length;

    if (inputCount >= 10) {
        alert('Maximum 10 resistors allowed');
        return;
    }

    const row = document.createElement('div');
    row.className = 'resistor-input-row';
    row.innerHTML = `
        <input type="number" placeholder="Enter resistance (Ω)" min="0" step="any">
        <button class="btn-remove" onclick="removeResistor(this)">Remove</button>
    `;

    container.appendChild(row);
}

function removeResistor(button) {
    const container = document.getElementById('resistorInputs');
    const inputCount = container.querySelectorAll('input').length;

    if (inputCount <= 2) {
        alert('Minimum 2 resistors required');
        return;
    }

    button.parentElement.remove();
}

function calculateParallel() {
    const inputs = document.querySelectorAll('#resistorInputs input');
    const resistances = [];

    for (let input of inputs) {
        const value = parseFloat(input.value);
        if (!value || value <= 0) {
            alert('Please enter valid positive resistance values for all resistors');
            return;
        }
        resistances.push(value);
    }

    let reciprocalSum = 0;
    for (let r of resistances) {
        reciprocalSum += 1 / r;
    }

    const total = 1 / reciprocalSum;

    const result = document.getElementById('result');
    const totalResistance = document.getElementById('totalResistance');
    const formula = document.getElementById('formula');

    totalResistance.textContent = formatResistance(total);

    if (resistances.length === 2) {
        formula.innerHTML = `Formula: (R<sub>1</sub> × R<sub>2</sub>) / (R<sub>1</sub> + R<sub>2</sub>)<br>
                            = (${formatResistance(resistances[0])} × ${formatResistance(resistances[1])}) /
                            (${formatResistance(resistances[0])} + ${formatResistance(resistances[1])})`;
    } else {
        formula.innerHTML = `Formula: 1/R<sub>total</sub> = ${resistances.map((r, i) => `1/R<sub>${i + 1}</sub>`).join(' + ')}`;
    }

    result.style.display = 'block';
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function formatResistance(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + ' MΩ';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + ' kΩ';
    } else {
        return value.toFixed(2) + ' Ω';
    }
}

function resetCalculator() {
    const container = document.getElementById('resistorInputs');
    container.innerHTML = `
        <div class="resistor-input-row">
            <input type="number" placeholder="Enter resistance (Ω)" min="0" step="any">
        </div>
        <div class="resistor-input-row">
            <input type="number" placeholder="Enter resistance (Ω)" min="0" step="any">
        </div>
    `;
    document.getElementById('result').style.display = 'none';
}
