/* 
  Each function receives:
  - canvas: HTMLCanvasElement
  - ctx: CanvasRenderingContext2D
  - params: { width, height, value (slider ref), isHovered }
  
  Returns: A cleanup function (optional)
*/

export const animations = {
    breathe: (ctx, { width, height, valueRef }) => {
        let time = 0;
        const cycleTime = valueRef?.current || 4000;

        // Clear
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);

        time = Date.now();
        const phase = (time % cycleTime) / cycleTime * Math.PI * 2;
        const sinVal = (Math.sin(phase - Math.PI / 2) + 1) / 2;

        const maxSize = Math.min(width, height) * 0.4;
        const minSize = Math.min(width, height) * 0.15;
        const size = minSize + (sinVal * (maxSize - minSize));

        const opacity = 0.3 + (sinVal * 0.4);
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`;

        const x = (width - size) / 2;
        const y = (height - size) / 2;

        ctx.beginPath();
        // roundRect is not supported in all envs yet, fallback to rect if needed
        if (ctx.roundRect) ctx.roundRect(x, y, size, size, 15);
        else ctx.rect(x, y, size, size);
        ctx.fill();

        ctx.fillStyle = "#475569";
        ctx.font = "24px Quicksand";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const isBreathingIn = Math.cos(phase - Math.PI / 2) > 0;
        ctx.fillText(isBreathingIn ? "Inhale" : "Exhale", width / 2, height / 2);
    },

    focus: (ctx, { width, height, valueRef, dataRef }) => {
        // Initialize state if needed
        if (!dataRef.current.t) dataRef.current.t = 0;

        const speed = valueRef?.current || 3;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, 0, width, height);

        dataRef.current.t += 0.016 * speed;
        const t = dataRef.current.t;

        const cx = width / 2, cy = height / 2;
        const sx = width * 0.35, sy = height * 0.15;
        const x = cx + Math.cos(t) * sx;
        const y = cy + Math.sin(2 * t) / 2 * sy;

        ctx.beginPath();
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
        for (let i = 0; i < Math.PI * 2; i += 0.1) ctx.lineTo(cx + Math.cos(i) * sx, cy + Math.sin(2 * i) / 2 * sy);
        ctx.stroke();

        ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981'; ctx.shadowBlur = 10; ctx.shadowColor = '#10b981';
        ctx.fill(); ctx.shadowBlur = 0;
    },

    water: (ctx, { width, height, interactionRef, dataRef }) => {
        if (!dataRef.current.ripples) dataRef.current.ripples = [];

        // Check for click
        if (interactionRef.current.clicked) {
            dataRef.current.ripples.push({
                x: interactionRef.current.x,
                y: interactionRef.current.y,
                r: 0, alpha: 1, speed: 2
            });
            interactionRef.current.clicked = false;
        }

        ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, width, height);

        const ripples = dataRef.current.ripples;
        for (let i = ripples.length - 1; i >= 0; i--) {
            let r = ripples[i]; r.r += r.speed; r.alpha -= 0.01;
            if (r.alpha <= 0) { ripples.splice(i, 1); continue; }
            ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(56, 189, 248, ${r.alpha})`; ctx.lineWidth = 3; ctx.stroke();
        }
    },

    bubbles: (ctx, { width, height, interactionRef, dataRef }) => {
        if (!dataRef.current.bubbles) {
            dataRef.current.bubbles = [];
            dataRef.current.timer = 0;
        }

        const bubbles = dataRef.current.bubbles;
        const g = ctx.createLinearGradient(0, 0, 0, height);
        g.addColorStop(0, '#fdf4ff'); g.addColorStop(1, '#fae8ff');
        ctx.fillStyle = g; ctx.fillRect(0, 0, width, height);

        dataRef.current.timer += 16;
        if (dataRef.current.timer > 800) {
            bubbles.push({ x: Math.random() * width, y: height + 20, r: Math.random() * 15 + 10, s: Math.random() + 0.5, c: `hsla(${Math.random() * 60 + 240}, 70%, 70%, 0.6)` });
            dataRef.current.timer = 0;
        }

        // Check pop
        if (interactionRef.current.clicked) {
            const mx = interactionRef.current.x;
            const my = interactionRef.current.y;
            for (let i = bubbles.length - 1; i >= 0; i--) {
                if (Math.hypot(bubbles[i].x - mx, bubbles[i].y - my) < bubbles[i].r + 10) {
                    bubbles.splice(i, 1);
                }
            }
            interactionRef.current.clicked = false;
        }

        for (let i = bubbles.length - 1; i >= 0; i--) {
            let b = bubbles[i]; b.y -= b.s; b.x += Math.sin(b.y * 0.05) * 0.5;
            if (b.y < -50) { bubbles.splice(i, 1); continue; }
            ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fillStyle = b.c; ctx.fill();
            ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.stroke();
        }
    },

    zen: (ctx, { width, height, interactionRef }) => {
        // Fade effect
        ctx.fillStyle = 'rgba(240, 230, 210, 0.04)'; ctx.fillRect(0, 0, width, height);

        if (interactionRef.current.isDown) {
            const { x, y } = interactionRef.current;
            ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(40, 40, 40, 0.8)'; ctx.fill();
        }

        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#f0e6d2'; ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
    },

    firefly: (ctx, { width, height, interactionRef, dataRef }) => {
        if (!dataRef.current.bugs) {
            dataRef.current.bugs = Array(30).fill(0).map(() => ({ x: Math.random() * 300, y: Math.random() * 300, vx: 0, vy: 0, r: Math.random() * 2 + 1, p: Math.random() * 6 }));
        }

        const g = ctx.createLinearGradient(0, 0, 0, height); g.addColorStop(0, '#022c22'); g.addColorStop(1, '#14532d');
        ctx.fillStyle = g; ctx.fillRect(0, 0, width, height);

        const mx = interactionRef.current.x;
        const my = interactionRef.current.y;
        const hasMouse = mx !== 0 && my !== 0;

        dataRef.current.bugs.forEach(b => {
            b.vx += (Math.random() - 0.5) * 0.1; b.vy += (Math.random() - 0.5) * 0.1;
            if (hasMouse) {
                const dx = mx - b.x, dy = my - b.y, dist = Math.hypot(dx, dy);
                if (dist > 10 && dist < 200) { b.vx += (dx / dist) * 0.05; b.vy += (dy / dist) * 0.05; }
            }
            b.vx *= 0.95; b.vy *= 0.95; b.x += b.vx; b.y += b.vy;
            if (b.x < 0) b.x = width; if (b.x > width) b.x = 0; if (b.y < 0) b.y = height; if (b.y > height) b.y = 0;
            b.p += 0.05; const glow = (Math.sin(b.p) + 1) / 2 * 0.5 + 0.3;
            ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(234, 179, 8, ${glow})`; ctx.shadowBlur = 10; ctx.shadowColor = '#fbbf24';
            ctx.fill(); ctx.shadowBlur = 0;
        });
    },

    cosmic: (ctx, { width, height, dataRef }) => {
        if (!dataRef.current.stars) dataRef.current.stars = Array(100).fill(0).map(() => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() }));

        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, width, height);
        const cx = width / 2, cy = height / 2;

        dataRef.current.stars.forEach(s => {
            s.z -= 0.005;
            if (s.z <= 0) { s.z = 1; s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; }
            const px = cx + (s.x / s.z) * width * 0.5;
            const py = cy + (s.y / s.z) * height * 0.5;
            const size = (1 - s.z) * 3;

            if (px > 0 && px < width && py > 0 && py < height) {
                ctx.fillStyle = '#fff';
                ctx.beginPath(); ctx.arc(px, py, size, 0, Math.PI * 2); ctx.fill();
            }
        });
    },

    matrix: (ctx, { width, height, dataRef }) => {
        const fontSize = 14;
        if (!dataRef.current.columns || dataRef.current.columns.length !== Math.floor(width / fontSize)) {
            const cols = Math.floor(width / fontSize);
            dataRef.current.columns = Array(cols).fill(0).map(() => Math.random() * -100);
        }

        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#4ade80';
        ctx.font = fontSize + 'px monospace';

        dataRef.current.columns.forEach((y, i) => {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);
            const x = i * fontSize;
            ctx.fillText(text, x, y);
            if (y > height + Math.random() * 10000) dataRef.current.columns[i] = 0;
            else dataRef.current.columns[i] = y + fontSize;
        });
    },

    snow: (ctx, { width, height, dataRef }) => {
        if (!dataRef.current.flakes) dataRef.current.flakes = Array(50).fill(0).map(() => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2 + 1, s: Math.random() * 1 + 0.5 }));

        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#fff';

        dataRef.current.flakes.forEach(f => {
            f.y += f.s * 0.05;
            f.x += Math.sin(f.y * 0.05) * 0.005;
            if (f.y * height > height) f.y = -0.1;
            if (f.x > 1) f.x = 0; if (f.x < 0) f.x = 1;
            ctx.beginPath(); ctx.arc(f.x * width, f.y * height, f.r, 0, Math.PI * 2); ctx.fill();
        });
    },

    aurora: (ctx, { width, height, dataRef }) => {
        if (!dataRef.current.t) dataRef.current.t = 0;
        dataRef.current.t += 0.016;
        const t = dataRef.current.t;

        ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'screen';

        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            const offset = i * 2;
            ctx.moveTo(0, height / 2);
            for (let x = 0; x < width; x += 10) {
                ctx.lineTo(x, height / 2 + Math.sin(x * 0.01 + t + offset) * 50 + Math.sin(x * 0.02 + t * 2) * 30);
            }
            ctx.lineTo(width, height); ctx.lineTo(0, height); ctx.closePath();
            ctx.fillStyle = i === 0 ? 'rgba(34, 211, 238, 0.3)' : i === 1 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(74, 222, 128, 0.3)';
            ctx.fill();
        }
        ctx.globalCompositeOperation = 'source-over';
    },

    mandala: (ctx, { width, height, interactionRef, dataRef }) => {
        // Fade
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)'; ctx.fillRect(0, 0, width, height);

        if (!dataRef.current.hue) dataRef.current.hue = 0;

        if (interactionRef.current.isDown) {
            dataRef.current.hue = (dataRef.current.hue + 1) % 360;
            ctx.strokeStyle = `hsl(${dataRef.current.hue}, 70%, 50%)`;
            ctx.lineWidth = 2;
            const cx = width / 2, cy = height / 2;
            const dx = interactionRef.current.x - cx;
            const dy = interactionRef.current.y - cy;
            const sectors = 6;

            ctx.save();
            ctx.translate(cx, cy);
            for (let i = 0; i < sectors; i++) {
                ctx.rotate((Math.PI * 2) / sectors);
                ctx.beginPath();
                ctx.moveTo(dx, dy);
                ctx.lineTo(dx + 1, dy + 1);
                ctx.stroke();
                ctx.save();
                ctx.scale(1, -1);
                ctx.beginPath(); ctx.moveTo(dx, dy); ctx.lineTo(dx + 1, dy + 1); ctx.stroke();
                ctx.restore();
            }
            ctx.restore();
        }
    },

    strings: (ctx, { width, height, interactionRef, dataRef }) => {
        if (!dataRef.current.strings) {
            dataRef.current.strings = Array(6).fill(0).map((_, i) => ({
                x: 0, baseX: 0, amp: 0, vel: 0,
                color: `hsl(${i * 60}, 60%, 60%)`
            }));
        }

        // Interaction check
        const mx = interactionRef.current.x;
        dataRef.current.strings.forEach(s => {
            if (Math.abs(mx - s.x) < 20 && Math.abs(s.vel) < 5 && mx !== 0) {
                s.vel = (mx - s.x) * 0.5;
                s.amp = (mx - s.x);
            }
        });

        ctx.clearRect(0, 0, width, height);
        const spacing = width / 7;

        dataRef.current.strings.forEach((s, i) => {
            s.baseX = spacing * (i + 1);
            if (s.x === 0) s.x = s.baseX;

            const force = -0.1 * s.amp;
            s.vel += force;
            s.vel *= 0.95;
            s.amp += s.vel;
            s.x = s.baseX + s.amp;

            ctx.beginPath();
            ctx.moveTo(s.baseX, 0);
            ctx.quadraticCurveTo(s.x, height / 2, s.baseX, height);
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 3;
            ctx.stroke();
        });
    },

    spiral: (ctx, { width, height, dataRef }) => {
        if (!dataRef.current.angle) dataRef.current.angle = 0;
        dataRef.current.angle += 0.002 * 16;

        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, width, height);
        const cx = width / 2, cy = height / 2;
        const maxR = Math.hypot(width, height) / 2;

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let r = 0; r < maxR; r += 1) {
            const a = dataRef.current.angle + r * 0.1;
            ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        }
        ctx.stroke();
    },

    confetti: (ctx, { width, height, interactionRef, dataRef }) => {
        if (!dataRef.current.particles) dataRef.current.particles = [];

        if (interactionRef.current.clicked) {
            const mx = interactionRef.current.x;
            const my = interactionRef.current.y;
            for (let i = 0; i < 30; i++) {
                dataRef.current.particles.push({
                    x: mx, y: my,
                    vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 1) * 10,
                    c: `hsl(${Math.random() * 360}, 80%, 60%)`,
                    r: Math.random() * 5 + 2
                });
            }
            interactionRef.current.clicked = false;
        }

        ctx.clearRect(0, 0, width, height);
        const particles = dataRef.current.particles;

        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.vy += 0.2;
            p.x += p.vx; p.y += p.vy;
            if (p.y > height) particles.splice(i, 1);
            else {
                ctx.fillStyle = p.c;
                ctx.fillRect(p.x, p.y, p.r, p.r);
            }
        }
        if (particles.length === 0) {
            ctx.fillStyle = '#94a3b8'; ctx.textAlign = "center";
            ctx.fillText("Click me!", width / 2, height / 2);
        }
    },

    lanterns: (ctx, { width, height, dataRef }) => {
        if (!dataRef.current.lanterns) { dataRef.current.lanterns = []; dataRef.current.timer = 0; }

        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(0, 0, width, height);

        dataRef.current.timer += 16;
        if (dataRef.current.timer > 1000) {
            dataRef.current.lanterns.push({ x: Math.random() * width, y: height + 20, s: Math.random() * 0.5 + 0.2 });
            dataRef.current.timer = 0;
        }

        dataRef.current.lanterns.forEach((l, i) => {
            l.y -= l.s;
            l.x += Math.sin(l.y * 0.02) * 0.2;
            if (l.y < -30) dataRef.current.lanterns.splice(i, 1);

            ctx.fillStyle = '#fbbf24';
            ctx.shadowBlur = 15; ctx.shadowColor = '#fbbf24';
            ctx.fillRect(l.x, l.y, 15, 20);
            ctx.shadowBlur = 0;
        });
    },

    lava: (ctx, { width, height, dataRef }) => {
        if (!dataRef.current.blobs) {
            dataRef.current.blobs = Array(5).fill(0).map(() => ({
                x: Math.random(), y: Math.random(),
                vx: (Math.random() - 0.5) * 0.002, vy: (Math.random() - 0.5) * 0.002,
                r: 0.1 + Math.random() * 0.1
            }));
        }

        ctx.fillStyle = '#4c0519';
        ctx.fillRect(0, 0, width, height);

        dataRef.current.blobs.forEach(b => {
            b.x += b.vx; b.y += b.vy;
            if (b.x < 0 || b.x > 1) b.vx *= -1;
            if (b.y < 0 || b.y > 1) b.vy *= -1;

            const g = ctx.createRadialGradient(b.x * width, b.y * height, 0, b.x * width, b.y * height, b.r * width);
            g.addColorStop(0, 'rgba(244, 63, 94, 0.8)');
            g.addColorStop(1, 'rgba(244, 63, 94, 0)');
            ctx.fillStyle = g;
            ctx.globalCompositeOperation = 'screen';
            ctx.beginPath(); ctx.arc(b.x * width, b.y * height, b.r * width, 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalCompositeOperation = 'source-over';
    },

    solar: (ctx, { width, height, dataRef }) => {
        if (!dataRef.current.t) dataRef.current.t = 0;
        dataRef.current.t += 0.016;
        const t = dataRef.current.t;

        ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, width, height);
        const cx = width / 2, cy = height / 2;

        // Sun
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.fill();

        // Planets
        [50, 80, 120].forEach((r, i) => {
            const speed = 1 / (i + 1);
            const px = cx + Math.cos(t * speed) * r;
            const py = cy + Math.sin(t * speed) * r;

            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

            ctx.fillStyle = ['#94a3b8', '#38bdf8', '#f87171'][i];
            ctx.beginPath(); ctx.arc(px, py, 6 + i, 0, Math.PI * 2); ctx.fill();
        });
    },

    newton: (ctx, { width, height, dataRef }) => {
        if (!dataRef.current.t) dataRef.current.t = 0;
        dataRef.current.t += 0.005 * 16;
        const t = dataRef.current.t;

        ctx.clearRect(0, 0, width, height);
        const cx = width / 2;
        const yTop = 50;
        const len = 150;

        for (let i = -2; i <= 2; i++) {
            let angle = 0;
            let swing = 0;
            if (i === -2) swing = (Math.sin(t) > 0) ? 0 : Math.sin(t);
            else if (i === 2) swing = (Math.sin(t) < 0) ? 0 : Math.sin(t);

            const bx = cx + i * 30;
            const px = bx + Math.sin(swing) * len;
            const py = yTop + Math.cos(swing) * len;

            ctx.beginPath(); ctx.moveTo(bx, yTop); ctx.lineTo(px, py); ctx.strokeStyle = '#94a3b8'; ctx.stroke();
            ctx.beginPath(); ctx.arc(px, py, 15, 0, Math.PI * 2); ctx.fillStyle = '#475569'; ctx.fill();
        }
    },

    bloom: (ctx, { width, height, dataRef }) => {
        if (!dataRef.current.circles) { dataRef.current.circles = []; dataRef.current.timer = 0; }

        ctx.fillStyle = '#fdf2f8';
        ctx.fillRect(0, 0, width, height);
        dataRef.current.timer += 16;

        if (dataRef.current.timer > 500) {
            dataRef.current.circles.push({ r: 0, max: Math.random() * 50 + 50, x: Math.random() * width, y: Math.random() * height, c: `hsla(${Math.random() * 60 + 300}, 70%, 70%, 0.5)` });
            dataRef.current.timer = 0;
        }

        dataRef.current.circles.forEach((c, i) => {
            c.r += 0.5;
            ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            ctx.strokeStyle = c.c; ctx.lineWidth = 2; ctx.stroke();
            if (c.r > c.max + 20) dataRef.current.circles.splice(i, 1);
        });
    },

    yinyang: (ctx, { width, height, dataRef }) => {
        if (!dataRef.current.ang) dataRef.current.ang = 0;
        dataRef.current.ang += 0.001 * 16;

        ctx.clearRect(0, 0, width, height);
        const cx = width / 2, cy = height / 2, r = Math.min(width, height) * 0.3;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(dataRef.current.ang);

        ctx.beginPath(); ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2); ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(0, 0, r, Math.PI / 2, -Math.PI / 2); ctx.fillStyle = '#000'; ctx.fill();

        ctx.beginPath(); ctx.arc(0, -r / 2, r / 2, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(0, r / 2, r / 2, 0, Math.PI * 2); ctx.fillStyle = '#000'; ctx.fill();

        ctx.beginPath(); ctx.arc(0, -r / 2, r / 5, 0, Math.PI * 2); ctx.fillStyle = '#000'; ctx.fill();
        ctx.beginPath(); ctx.arc(0, r / 2, r / 5, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();

        ctx.restore();
    }
};