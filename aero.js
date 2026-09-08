const canvas = document.getElementById('aeroCanvas');
const ctx = canvas.getContext('2d');

let state = { speedKmh: 120, cd: 0.28, areaM2: 2.2 };
let particles = Array.from({ length: 90 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() * 2 + 2)
}));

function updateTelemetry() {
  const v_ms = state.speedKmh / 3.6;
  const rho = 1.225;
  const Fd = 0.5 * rho * (v_ms * v_ms) * state.cd * state.areaM2;
  const P_kw = (Fd * v_ms) / 1000;
  const hp = P_kw * 1.34102;
  const q_pa = 0.5 * rho * (v_ms * v_ms);

  document.getElementById('dragForce').textContent = `${Fd.toFixed(1)} N`;
  document.getElementById('dragPower').textContent = `${P_kw.toFixed(1)} kW (${hp.toFixed(1)} hp)`;
  document.getElementById('dynPressure').textContent = `${q_pa.toFixed(1)} Pa`;
}

function render() {
  ctx.fillStyle = 'rgba(3, 7, 18, 0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Streamlines
  ctx.fillStyle = '#60a5fa';
  particles.forEach(p => {
    p.x += p.vx * (state.speedKmh / 50);

    // Aerodynamic profile deflection (Car contour)
    if (p.x > 250 && p.x < 550 && p.y > 180 && p.y < 360) {
      p.y -= 1.8; // Deflect up over windshield & roof
    }

    if (p.x > canvas.width) {
      p.x = 0;
      p.y = Math.random() * canvas.height;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw Aerodynamic Car Silhouette
  ctx.strokeStyle = '#f59e0b';
  ctx.fillStyle = '#1e293b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(200, 360);
  ctx.lineTo(260, 360);
  ctx.lineTo(320, 270);
  ctx.lineTo(470, 260);
  ctx.lineTo(540, 320);
  ctx.lineTo(600, 360);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Wheels
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 4;
  [270, 520].forEach(wx => {
    ctx.beginPath();
    ctx.arc(wx, 360, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  requestAnimationFrame(render);
}

document.getElementById('speedRange').addEventListener('input', e => { state.speedKmh = +e.target.value; document.getElementById('speedVal').textContent = e.target.value; updateTelemetry(); });
document.getElementById('cdRange').addEventListener('input', e => { state.cd = +e.target.value; document.getElementById('cdVal').textContent = e.target.value; updateTelemetry(); });
document.getElementById('areaRange').addEventListener('input', e => { state.areaM2 = +e.target.value; document.getElementById('areaVal').textContent = e.target.value; updateTelemetry(); });

updateTelemetry();
render();
