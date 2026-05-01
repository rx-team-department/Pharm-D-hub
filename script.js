// Toggle Sidebar for Mobile
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Show Specific Section
function showSection(id) {
    // UI Cleanup
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));

    // Sidebar closing on mobile
    if(window.innerWidth <= 992) {
        document.getElementById('sidebar').classList.remove('active');
    }

    if(id === 'home') {
        document.getElementById('home').classList.add('active');
        return;
    }

    // Load Tool View
    const toolView = document.getElementById('tool-view');
    toolView.classList.add('active');
    loadToolUI(id);
    window.scrollTo(0, 0);
}

// Function to load the "Workable" part of the site
function loadToolUI(type) {
    const container = document.getElementById('tool-view');
    let content = '';

    if(type === 'cardiac') {
        content = `
            <div style="padding: 60px;">
                <div style="background:white; padding:40px; border-radius:20px; border-top: 6px solid #b91c1c;">
                    <h2>Cardiac Cycle Calculator</h2>
                    <p style="margin-bottom:20px; color:#64748b;">Enter Heart Rate to see phase durations.</p>
                    <input type="number" id="bpm" value="75" oninput="runCardiac()" style="padding:15px; width:100%; border:2px solid #eee; border-radius:10px; font-size:1.5rem;">
                    <div id="cardiac-table" style="margin-top:30px;"></div>
                </div>
            </div>`;
    }
    // Add logic for BMI, Dosage etc here...
    
    container.innerHTML = content;
    if(type === 'cardiac') runCardiac();
}

function runCardiac() {
    const hr = document.getElementById('bpm').value;
    const res = document.getElementById('cardiac-table');
    if(!hr || hr <= 0) return;
    
    const t = 60/hr;
    const s = t/0.8;
    const stages = ["Isovolumetric contraction", "Rapid ejection", "Slow ejection", "Isovolumetric relaxation", "Rapid filling", "Slow filling", "Atrial contraction"];
    const times = [0.03, 0.08, 0.16, 0.05, 0.16, 0.18, 0.14];
    
    let html = `<table style="width:100%; border-collapse:collapse;">
        <tr style="background:#f8fafc; text-align:left;">
            <th style="padding:15px;">Phase</th>
            <th style="padding:15px;">Duration (s)</th>
        </tr>`;
    stages.forEach((st, i) => {
        html += `<tr>
            <td style="padding:15px; border-bottom:1px solid #eee;">${st}</td>
            <td style="padding:15px; border-bottom:1px solid #eee; font-weight:bold; color:#b91c1c;">${(times[i]*s).toFixed(3)}</td>
        </tr>`;
    });
    html += `<tr style="background:#fef2f2; font-weight:bold;">
        <td style="padding:15px;">TOTAL CARDIAC CYCLE</td>
        <td style="padding:15px; color:#000;">${t.toFixed(3)}s</td>
    </tr></table>`;
    res.innerHTML = html;
}
