// --- Navigation Logic ---
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected section
    const activeTab = document.getElementById(sectionId);
    activeTab.classList.add('active');

    // Update Sidebar Active State
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    // Update Header Title
    const titleMap = {
        'home': 'Medical Dashboard',
        'cardiac': 'Cardiac Cycle Analysis',
        'bmi': 'Body Mass Index (BMI) Calculator',
        'dosage': 'Drug Dosage Calculator',
        'converter': 'Medical Unit Converter',
        'bp': 'Blood Pressure Evaluator',
        'lab': 'Normal Lab References'
    };
    document.getElementById('section-title').innerText = titleMap[sectionId];

    // Load Lab Data if Lab section is opened
    if(sectionId === 'lab') loadLabData();
}

// --- 1. Cardiac Cycle Logic (Your Original Logic) ---
function calculateCardiac() {
    const hr = document.getElementById('bpmInput').value;
    const status = document.getElementById('cardiac-status');
    const container = document.getElementById('cardiac-table-container');

    if (hr <= 0 || !hr) return;

    if(hr < 60) { status.innerText = "BRADYCARDIA"; status.style.background = "#3b82f6"; }
    else if(hr > 100) { status.innerText = "TACHYCARDIA"; status.style.background = "#ef4444"; }
    else { status.innerText = "NORMAL SINUS RHYTHM"; status.style.background = "#10b981"; }

    const totalDuration = 60 / hr;
    const scale = totalDuration / 0.8;
    const stages = ["Isovolumetric contraction", "Rapid ejection", "Slow ejection", "Isovolumetric relaxation", "Rapid filling", "Slow filling", "Atrial contraction"];
    const times = [0.03, 0.08, 0.16, 0.05, 0.16, 0.18, 0.14];

    let html = `<table><thead><tr><th>Stage</th><th>Duration (s)</th></tr></thead><tbody>`;
    stages.forEach((name, i) => {
        html += `<tr><td>${name}</td><td><strong>${(times[i] * scale).toFixed(3)}</strong></td></tr>`;
    });
    html += `<tr style="color:var(--primary-red)"><td>TOTAL CYCLE</td><td><strong>${totalDuration.toFixed(3)} s</strong></td></tr></tbody></table>`;
    container.innerHTML = html;
}

// --- 2. BMI Logic ---
function calculateBMI() {
    const weight = parseFloat(document.getElementById('bmiWeight').value);
    const heightCm = parseFloat(document.getElementById('bmiHeight').value);
    const resBox = document.getElementById('bmi-result');

    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
        resBox.innerHTML = "⚠️ Please enter valid positive values.";
        return;
    }

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    let category = "";
    let color = "";

    if (bmi < 18.5) { category = "Underweight"; color = "#3b82f6"; }
    else if (bmi < 25) { category = "Normal Weight"; color = "#10b981"; }
    else if (bmi < 30) { category = "Overweight"; color = "#f59e0b"; }
    else { category = "Obese"; color = "#ef4444"; }

    resBox.style.borderColor = color;
    resBox.innerHTML = `BMI Value: <span style="color:${color}">${bmi.toFixed(2)}</span><br>Category: ${category}`;
}

// --- 3. Drug Dosage Logic ---
function calculateDose() {
    const weight = parseFloat(document.getElementById('doseWeight').value);
    const resBox = document.getElementById('dose-result');

    if (!weight || weight <= 0) {
        resBox.innerHTML = "<p>Please enter a valid weight.</p>";
        return;
    }

    const paraMin = weight * 10; const paraMax = weight * 15;
    const ibuMin = weight * 5; const ibuMax = weight * 10;

    resBox.innerHTML = `
        <div class="res-card"><strong>Paracetamol</strong><br>${paraMin}-${paraMax} mg</div>
        <div class="res-card"><strong>Ibuprofen</strong><br>${ibuMin}-${ibuMax} mg</div>
    `;
}

// --- 4. Unit Converter Logic ---
function convertUnits() {
    const type = document.getElementById('convType').value;
    const val = parseFloat(document.getElementById('convInput').value);
    const resBox = document.getElementById('conv-result');

    if (isNaN(val)) { resBox.innerText = "Enter value..."; return; }

    let result = "";
    switch(type) {
        case 'mg-g': result = `${val} mg = ${(val/1000).toFixed(4)} g | ${val} g = ${val*1000} mg`; break;
        case 'ml-l': result = `${val} mL = ${(val/1000).toFixed(4)} L | ${val} L = ${val*1000} mL`; break;
        case 'glc': result = `${val} mmol/L = ${(val*18).toFixed(2)} mg/dL | ${val} mg/dL = ${(val/18).toFixed(2)} mmol/L`; break;
    }
    resBox.innerText = result;
}

// --- 5. Blood Pressure Logic ---
function evaluateBP() {
    const sys = parseInt(document.getElementById('bpSys').value);
    const dia = parseInt(document.getElementById('bpDia').value);
    const resBox = document.getElementById('bp-result');

    if (!sys || !dia) { resBox.innerText = "Enter both readings."; return; }

    let cat = ""; let color = "";

    if (sys < 120 && dia < 80) { cat = "Normal"; color = "#10b981"; }
    else if (sys >= 120 && sys <= 129 && dia < 80) { cat = "Elevated"; color = "#f59e0b"; }
    else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) { cat = "Hypertension Stage 1"; color = "#f97316"; }
    else if (sys >= 140 || dia >= 90) { cat = "Hypertension Stage 2"; color = "#ef4444"; }

    resBox.style.borderColor = color;
    resBox.innerHTML = `Status: <span style="color:${color}">${cat}</span>`;
}

// --- 6. Lab References ---
function loadLabData() {
    const data = [
        { item: "Hemoglobin (Male)", range: "13.0 – 17.0 g/dL" },
        { item: "Hemoglobin (Female)", range: "12.0 – 15.0 g/dL" },
        { item: "White Blood Cells (WBC)", range: "4,000 – 11,000 /µL" },
        { item: "Platelets", range: "150,000 – 450,000 /µL" },
        { item: "Fasting Blood Glucose", range: "70 – 100 mg/dL" }
    ];

    let html = `<table><thead><tr><th>Test Item</th><th>Normal Range</th></tr></thead><tbody>`;
    data.forEach(row => {
        html += `<tr><td>${row.item}</td><td><strong>${row.range}</strong></td></tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('lab-table').innerHTML = html;
}

// Initial Run
calculateCardiac();
