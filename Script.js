function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function closeSidebarOnContentClick() {
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('active');
    }
}

function showSection(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(id).classList.add('active');
    event.currentTarget.classList.add('active');
    
    if(id === 'lab') loadLabs();
    if(id === 'cardiac') calculateCardiac();
}

// 1. Cardiac Cycle
function calculateCardiac() {
    const hr = document.getElementById('bpmInput').value;
    const res = document.getElementById('cardiac-result');
    if(hr <= 0) return;
    const total = 60/hr;
    const scale = total/0.8;
    const stages = ["Isovolumetric contraction", "Rapid ejection", "Slow ejection", "Isovolumetric relaxation", "Rapid filling", "Slow filling", "Atrial contraction"];
    const times = [0.03, 0.08, 0.16, 0.05, 0.16, 0.18, 0.14];
    
    let h = `<table><tr><th>Stage</th><th>Time(s)</th></tr>`;
    stages.forEach((s, i) => { h += `<tr><td>${s}</td><td>${(times[i]*scale).toFixed(3)}</td></tr>`; });
    h += `<tr style="font-weight:bold"><td>Total Cycle</td><td>${total.toFixed(3)}s</td></tr></table>`;
    res.innerHTML = h;
}

// 2. BMI
function runBMI() {
    const w = document.getElementById('bmiW').value;
    const h = document.getElementById('bmiH').value;
    if(w <=0 || h <=0) return;
    const bmi = w / ((h/100)**2);
    let cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
    document.getElementById('bmi-res').innerHTML = `BMI: <strong>${bmi.toFixed(2)}</strong> (${cat})`;
}

// 3. Dose
function runDose() {
    const w = document.getElementById('doseW').value;
    if(w <=0) return;
    document.getElementById('dose-res').innerHTML = `
        <div class="res-box">Paracetamol: ${w*10}-${w*15}mg</div>
        <div class="res-box">Ibuprofen: ${w*5}-${w*10}mg</div>`;
}

// 4. Converter
function runConv() {
    const t = document.getElementById('convType').value;
    const v = document.getElementById('convVal').value;
    if(!v) return;
    let r = "";
    if(t==='mg-g') r = `${v}mg = ${v/1000}g | ${v}g = ${v*1000}mg`;
    else if(t==='ml-l') r = `${v}mL = ${v/1000}L | ${v}L = ${v*1000}mL`;
    else r = `${v}mmol/L = ${v*18}mg/dL | ${v}mg/dL = ${(v/18).toFixed(2)}mmol/L`;
    document.getElementById('conv-res').innerText = r;
}

// 5. BP
function runBP() {
    const s = document.getElementById('bpS').value;
    const d = document.getElementById('bpD').value;
    let c = "";
    if(s<120 && d<80) c="Normal";
    else if(s<130 && d<80) c="Elevated";
    else if(s<140 || d<90) c="Hypertension Stage 1";
    else c="Hypertension Stage 2";
    document.getElementById('bp-res').innerHTML = `Status: <strong>${c}</strong>`;
}

// 6. Labs
function loadLabs() {
    const labs = [["Hb(M)", "13-17g/dL"], ["Hb(F)", "12-15g/dL"], ["WBC", "4k-11k/µL"], ["Platelets", "150k-450k/µL"]];
    let h = `<table><tr><th>Test</th><th>Range</th></tr>`;
    labs.forEach(l => h += `<tr><td>${l[0]}</td><td>${l[1]}</td></tr>`);
    document.getElementById('lab-table').innerHTML = h + "</table>";
}
