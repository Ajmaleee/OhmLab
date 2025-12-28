const colorValues = {
    'black': 0,
    'brown': 1,
    'red': 2,
    'orange': 3,
    'yellow': 4,
    'green': 5,
    'blue': 6,
    'violet': 7,
    'gray': 8,
    'white': 9
};

const multipliers = {
    'black': 1,
    'brown': 10,
    'red': 100,
    'orange': 1000,
    'yellow': 10000,
    'green': 100000,
    'blue': 1000000,
    'violet': 10000000,
    'gray': 100000000,
    'white': 1000000000,
    'gold': 0.1,
    'silver': 0.01
};

const tolerances = {
    'brown': '±1%',
    'red': '±2%',
    'green': '±0.5%',
    'blue': '±0.25%',
    'violet': '±0.1%',
    'gray': '±0.05%',
    'gold': '±5%',
    'silver': '±10%',
    'none': '±20%'
};

const colorHex = {
    'black': '#000000',
    'brown': '#8B4513',
    'red': '#FF0000',
    'orange': '#FF8C00',
    'yellow': '#FFFF00',
    'green': '#00FF00',
    'blue': '#0000FF',
    'violet': '#8B00FF',
    'gray': '#808080',
    'white': '#FFFFFF',
    'gold': '#FFD700',
    'silver': '#C0C0C0',
    'none': '#D2B48C'
};

function updateBandInputs() {
    const bandCount = parseInt(document.getElementById('bandCount').value);
    const bandInputs = document.getElementById('bandInputs');

    bandInputs.innerHTML = '';

    if (bandCount === 4) {
        bandInputs.innerHTML = `
            <div class="form-group">
                <label>Band 1 (First Digit):</label>
                <select id="band1" onchange="updatePreview()">
                    <option value="">Select Color</option>
                    ${getDigitOptions()}
                </select>
            </div>
            <div class="form-group">
                <label>Band 2 (Second Digit):</label>
                <select id="band2" onchange="updatePreview()">
                    <option value="">Select Color</option>
                    ${getDigitOptions()}
                </select>
            </div>
            <div class="form-group">
                <label>Band 3 (Multiplier):</label>
                <select id="band3" onchange="updatePreview()">
                    <option value="">Select Color</option>
                    ${getMultiplierOptions()}
                </select>
            </div>
            <div class="form-group">
                <label>Band 4 (Tolerance):</label>
                <select id="band4" onchange="updatePreview()">
                    <option value="">Select Color</option>
                    ${getToleranceOptions()}
                </select>
            </div>
        `;
    } else {
        bandInputs.innerHTML = `
            <div class="form-group">
                <label>Band 1 (First Digit):</label>
                <select id="band1" onchange="updatePreview()">
                    <option value="">Select Color</option>
                    ${getDigitOptions()}
                </select>
            </div>
            <div class="form-group">
                <label>Band 2 (Second Digit):</label>
                <select id="band2" onchange="updatePreview()">
                    <option value="">Select Color</option>
                    ${getDigitOptions()}
                </select>
            </div>
            <div class="form-group">
                <label>Band 3 (Third Digit):</label>
                <select id="band3" onchange="updatePreview()">
                    <option value="">Select Color</option>
                    ${getDigitOptions()}
                </select>
            </div>
            <div class="form-group">
                <label>Band 4 (Multiplier):</label>
                <select id="band4" onchange="updatePreview()">
                    <option value="">Select Color</option>
                    ${getMultiplierOptions()}
                </select>
            </div>
            <div class="form-group">
                <label>Band 5 (Tolerance):</label>
                <select id="band5" onchange="updatePreview()">
                    <option value="">Select Color</option>
                    ${getToleranceOptions()}
                </select>
            </div>
        `;
    }

    updatePreview();
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

function updatePreview() {
    const bandCount = parseInt(document.getElementById('bandCount').value);
    const preview = document.getElementById('bandPreview');

    let html = '<div class="resistor-body" style="display: flex; align-items: center; justify-content: center; gap: 10px; padding: 0 20px;">';

    for (let i = 1; i <= bandCount; i++) {
        const select = document.getElementById(`band${i}`);
        const color = select ? select.value : 'none';
        const bgColor = colorHex[color] || '#D2B48C';
        const borderColor = color === 'white' || color === 'yellow' ? '#333' : bgColor;
        html += `<div class="band" style="background-color: ${bgColor}; border-color: ${borderColor}; width: 30px; height: 80px;"></div>`;
    }

    html += '</div>';
    preview.innerHTML = html;
}

function calculateResistance() {
    const bandCount = parseInt(document.getElementById('bandCount').value);
    const result = document.getElementById('result');
    const resistanceValue = document.getElementById('resistanceValue');
    const toleranceValue = document.getElementById('toleranceValue');

    if (bandCount === 4) {
        const band1 = document.getElementById('band1').value;
        const band2 = document.getElementById('band2').value;
        const band3 = document.getElementById('band3').value;
        const band4 = document.getElementById('band4').value;

        if (!band1 || !band2 || !band3 || !band4) {
            alert('Please select all color bands');
            return;
        }

        const digit1 = colorValues[band1];
        const digit2 = colorValues[band2];
        const multiplier = multipliers[band3];
        const tolerance = tolerances[band4];

        const resistance = (digit1 * 10 + digit2) * multiplier;

        resistanceValue.textContent = formatResistance(resistance);
        toleranceValue.textContent = `Tolerance: ${tolerance}`;
        result.style.display = 'block';

    } else {
        const band1 = document.getElementById('band1').value;
        const band2 = document.getElementById('band2').value;
        const band3 = document.getElementById('band3').value;
        const band4 = document.getElementById('band4').value;
        const band5 = document.getElementById('band5').value;

        if (!band1 || !band2 || !band3 || !band4 || !band5) {
            alert('Please select all color bands');
            return;
        }

        const digit1 = colorValues[band1];
        const digit2 = colorValues[band2];
        const digit3 = colorValues[band3];
        const multiplier = multipliers[band4];
        const tolerance = tolerances[band5];

        const resistance = (digit1 * 100 + digit2 * 10 + digit3) * multiplier;

        resistanceValue.textContent = formatResistance(resistance);
        toleranceValue.textContent = `Tolerance: ${tolerance}`;
        result.style.display = 'block';
    }
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
    const bandCount = parseInt(document.getElementById('bandCount').value);
    for (let i = 1; i <= bandCount; i++) {
        const select = document.getElementById(`band${i}`);
        if (select) select.value = '';
    }
    document.getElementById('result').style.display = 'none';
    updatePreview();
}

document.addEventListener('DOMContentLoaded', function() {
    updateBandInputs();
});
