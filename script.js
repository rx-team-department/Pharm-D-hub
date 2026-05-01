function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

function showSection(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    if(id === 'home') {
        document.getElementById('home').classList.add('active');
    } else {
        const tv = document.getElementById('tool-view');
        tv.classList.add('active');
        renderTool(id);
    }
    if(window.innerWidth <= 992) toggleMenu();
    window.scrollTo(0,0);
}

function renderTool(type) {
    const container = document.getElementById('tool-view');
    let html = `<div class="tool-container">`;
    
    if(type === 'cardiac') {
        html += `<h2>Cardiac Cycle Analyzer</h2>
        <input type="number" id="bpm" value="75" oninput="runCardiac()" style="width:100%; padding:15px; margin:20px 0; border:2px solid #ddd; border-radius:8px;">
        <div id="card-res"></div>`;
    } else if(type === 'bmi') {
        html += `<h2>BMI Calculator</h2>
        <input type="number" id="w" placeholder="Weight (kg)" style="width:100%; padding:15px; margin-bottom:10px;">
        <input type="number" id="h" placeholder="Height (cm)" style="width:100%; padding:15px; margin-bottom:10px;">
        <button onclick="calcBMI()" class="btn-explore">Calculate BMI</button>
        <div id="bmi-res" style="margin-top:20px; font-size:1.2rem;"></div>`;
    } else if(type === 'dosage') {
        html += `<h2>Drug Dosage Calculator</h2>
        <input type="number" id="dw" placeholder="Patient Weight (kg)" style="width:100%; padding:15px; margin-bottom:20px;">
        <button onclick="calcDose()" class="btn-explore">Get Dosage</button>
        <div id="dose-res" style="margin-top:20px;"></div>`;
    } else if(type === 'bp') {
        html += `<h2>BP Evaluator</h2>
        <input type="number" id="sys" placeholder="Systolic (Top)" style="width:100%; padding:15px; margin-bottom:10px;">
        <input type="number" id="dia" placeholder="Diastolic (Bottom)" style="width:100%; padding:15px; margin-bottom:10px;">
        <button onclick="calcBP()" class="btn-explore">Evaluate Reading</button>
        <div id="bp-res" style="margin-top:20px;"></div>`;
    } else if(type === 'lab') {
        html += `<h2>Reference Lab Values</h2><div id="lab-list"></div>`;
    }
    
    container.innerHTML = html + `</div>`;
    if(type === 'cardiac') runCardiac();
    if(type === 'lab') loadLabs();
}

// Logical Functions
function runCardiac() {
    const hr = document.getElementById('bpm').value;
    const t = 60/hr; const s = t/0.8;
    const stages = ["Isovolumetric contraction", "Rapid ejection", "Slow ejection", "Isovolumetric relaxation", "Rapid filling", "Slow filling", "Atrial contraction"];
    const times = [0.03, 0.08, 0.16, 0.05, 0.16, 0.18, 0.14];
    let h = `<table class="full-table"><tr><th>Phase</th><th>Duration (s)</th></tr>`;
    stages.forEach((st, i) => h += `<tr><td>${st}</td><td>${(times[i]*s).toFixed(3)}</td></tr>`);
    h += `<tr style="font-weight:bold; background:#fff5f5;"><td>Total Cycle</td><td>${t.toFixed(3)}s</td></tr></table>`;
    document.getElementById('card-res').innerHTML = h;
}

function calcBMI() {
    const w = document.getElementById('w').value;
    const h = document.getElementById('h').value;
    const bmi = (w / ((h/100)**2)).toFixed(2);
    let cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
    document.getElementById('bmi-res').innerHTML = `Result: <strong>${bmi}</strong> - <span style="color:var(--primary)">${cat}</span>`;
}

function calcDose() {
    const w = document.getElementById('dw').value;
    document.getElementById('dose-res').innerHTML = `
    <p>Paracetamol (10-15mg/kg): <strong>${w*10}-${w*15}mg</strong></p>
    <p>Ibuprofen (5-10mg/kg): <strong>${w*5}-${w*10}mg</strong></p>`;
}

function calcBP() {
    const s = document.getElementById('sys').value;
    const d = document.getElementById('dia').value;
    let res = (s<120 && d<80) ? "Normal" : (s<130 && d<80) ? "Elevated" : (s<140 || d<90) ? "Stage 1 Hypertension" : "Stage 2 Hypertension";
    document.getElementById('bp-res').innerHTML = `Classification: <strong>${res}</strong>`;
}

function loadLabs() {
    const labs = [["Hb(M)", "13-17"], ["Hb(F)", "12-15"], ["WBC", "4k-11k"], ["Platelets", "150k-450k"]];
    let h = `<table class="full-table"><tr><th>Test</th><th>Normal Range</th></tr>`;
    labs.forEach(l => h += `<tr><td>${l[0]}</td><td>${l[1]}</td></tr>`);
    document.getElementById('lab-list').innerHTML = h + `</table>`;
}
