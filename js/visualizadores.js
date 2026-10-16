/**
 * Visualizadores Gráficos y Simulador de Colas en Canvas HTML5 + Chart.js
 * Cátedra: Modelos y Simulación - UCSE 2026
 * Trabajo Práctico N° 6: Teoría de Colas
 */

const Visualizadores = (function() {
    let animId = null;
    let pnChartInstance = null;

    // Estado interno del simulador animado
    let simState = {
        lambda: 30,
        mu: 40,
        c: 1,
        queue: [],
        servers: [],
        completed: 0,
        totalWaitTime: 0,
        lastTime: 0,
        nextArrival: 0,
        running: true
    };

    /**
     * Calcula métricas analíticas exactas (teóricas)
     */
    function calculateKPIs(lam, mu, c) {
        const r = lam / mu;
        const rho = r / c;
        if (rho >= 1) {
            return { unstable: true, r, rho };
        }

        let p0 = 0;
        let pWait = 0;
        let Lq = 0;

        if (c === 1) {
            p0 = 1 - rho;
            pWait = rho;
            Lq = (rho * rho) / (1 - rho);
        } else {
            let sumTerms = 0;
            let fact = 1;
            for (let n = 0; n < c; n++) {
                if (n > 0) fact *= n;
                sumTerms += Math.pow(r, n) / fact;
            }
            fact *= c;
            const lastTerm = Math.pow(r, c) / (fact * (1 - rho));
            p0 = 1.0 / (sumTerms + lastTerm);
            pWait = lastTerm * p0;
            Lq = (p0 * Math.pow(r, c) * rho) / (fact * Math.pow(1 - rho, 2));
        }

        const Wq = Lq / lam;
        const W = Wq + 1.0 / mu;
        const L = Lq + r;

        return {
            unstable: false,
            r,
            rho,
            p0,
            pWait,
            Lq,
            L,
            Wq_min: Wq * 60,
            W_min: W * 60
        };
    }

    /**
     * Calcula distribución Pn (n=0..maxN)
     */
    function calculatePnDistribution(lam, mu, c, maxN = 14) {
        const kpis = calculateKPIs(lam, mu, c);
        if (kpis.unstable) return [];

        const r = kpis.r;
        const p0 = kpis.p0;
        const pnList = [];

        let fact = 1;
        for (let n = 0; n <= maxN; n++) {
            if (n === 0) {
                pnList.push(p0);
            } else if (n <= c) {
                fact *= n;
                const pn = (Math.pow(r, n) / fact) * p0;
                pnList.push(pn);
            } else {
                const pn = (Math.pow(r, n) / (fact * Math.pow(c, n - c))) * p0;
                pnList.push(pn);
            }
        }
        return pnList;
    }

    /**
     * Renderiza o actualiza el gráfico Chart.js de probabilidades Pn
     */
    function renderPnChart(canvasId, lam, mu, c) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const maxN = 12;
        const pnValues = calculatePnDistribution(lam, mu, c, maxN);
        const labels = Array.from({ length: maxN + 1 }, (_, i) => `n = ${i}`);

        // Colores según si están en servicio o en cola
        const bgColors = labels.map((_, i) => {
            if (i === 0) return 'rgba(16, 185, 129, 0.7)'; // P0 verde
            if (i <= c) return 'rgba(6, 182, 212, 0.7)';  // Servidores ocupados (cian)
            return 'rgba(139, 92, 246, 0.7)';            // Clientes en cola (púrpura)
        });

        if (pnChartInstance) {
            pnChartInstance.data.labels = labels;
            pnChartInstance.data.datasets[0].data = pnValues.map(v => (v * 100).toFixed(2));
            pnChartInstance.data.datasets[0].backgroundColor = bgColors;
            pnChartInstance.update();
            return;
        }

        const ctx = canvas.getContext('2d');
        pnChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Probabilidad Pn (%)',
                    data: pnValues.map(v => (v * 100).toFixed(2)),
                    backgroundColor: bgColors,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` Pn: ${context.raw}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#9ca3af', font: { family: 'JetBrains Mono', size: 10 } }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: {
                            color: '#9ca3af',
                            font: { family: 'JetBrains Mono', size: 10 },
                            callback: function(val) { return val + '%'; }
                        }
                    }
                }
            }
        });
    }

    /**
     * Inicializa y ejecuta la simulación animada en Canvas
     */
    function initQueueAnimation(canvasId, lam, mu, c) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Reiniciar estado
        simState.lambda = lam;
        simState.mu = mu;
        simState.c = c;
        simState.queue = [];
        simState.servers = Array.from({ length: c }, (_, i) => ({
            id: i + 1,
            busy: false,
            entity: null,
            progress: 0,
            duration: 0
        }));
        simState.completed = 0;
        simState.lastTime = performance.now();
        simState.nextArrival = Math.random() * (3600 / lam) * 0.1;

        if (animId) cancelAnimationFrame(animId);

        function simLoop(timestamp) {
            const dt = (timestamp - simState.lastTime) / 1000; // seg
            simState.lastTime = timestamp;

            // Escala temporal acelerada para simulación fluida
            const simSpeed = 15; // 1 segundo real = 15 segundos simulados
            const dtSim = dt * simSpeed;

            // 1. Llegada de clientes (Poisson)
            simState.nextArrival -= dtSim;
            if (simState.nextArrival <= 0) {
                // Nuevo arribo exponencial
                simState.queue.push({
                    id: Math.floor(Math.random() * 10000),
                    entryTime: timestamp,
                    color: `hsl(${Math.random() * 60 + 240}, 85%, 65%)`
                });
                // Próxima llegada: -ln(U) / lambda (en seg)
                const interArrival = -Math.log(Math.max(1e-5, Math.random())) * (3600 / simState.lambda);
                simState.nextArrival = interArrival;
            }

            // 2. Asignar entidades en cola a servidores libres
            for (let s of simState.servers) {
                if (!s.busy && simState.queue.length > 0) {
                    const nextEnt = simState.queue.shift();
                    s.busy = true;
                    s.entity = nextEnt;
                    s.progress = 0;
                    // Duración de servicio exponencial: -ln(U) / mu (en seg)
                    s.duration = -Math.log(Math.max(1e-5, Math.random())) * (3600 / simState.mu);
                }
            }

            // 3. Avanzar atención en servidores
            for (let s of simState.servers) {
                if (s.busy) {
                    s.progress += dtSim;
                    if (s.progress >= s.duration) {
                        s.busy = false;
                        s.entity = null;
                        s.progress = 0;
                        simState.completed++;
                    }
                }
            }

            // 4. Dibujar en Canvas
            drawSimulation(canvas, ctx);

            animId = requestAnimationFrame(simLoop);
        }

        animId = requestAnimationFrame(simLoop);
    }

    function drawSimulation(canvas, ctx) {
        const w = canvas.width = canvas.offsetWidth;
        const h = canvas.height = canvas.offsetHeight || 220;

        ctx.clearRect(0, 0, w, h);

        // Fondo oscuro
        ctx.fillStyle = '#0a0e17';
        ctx.fillRect(0, 0, w, h);

        // --- SECTOR 1: SOURCE (Entrada) ---
        ctx.fillStyle = 'rgba(139, 92, 246, 0.15)';
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(15, 20, 60, h - 40, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#c4b5fd';
        ctx.font = '10px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText('SOURCE', 45, 40);
        ctx.font = '9px Inter';
        ctx.fillText(`λ=${simState.lambda}/h`, 45, 55);

        // --- SECTOR 2: QUEUE (Línea de espera) ---
        const queueX = 90;
        const queueW = Math.max(120, w - 240);
        const queueY = h / 2 - 25;
        const queueH = 50;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.roundRect(queueX, queueY, queueW, queueH, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#9ca3af';
        ctx.font = '10px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(`COLA FIFO (${simState.queue.length} en espera)`, queueX + 10, queueY - 8);

        // Dibujar clientes en cola (de derecha a izquierda)
        const maxVisual = Math.floor(queueW / 22);
        const showCount = Math.min(simState.queue.length, maxVisual);
        for (let i = 0; i < showCount; i++) {
            const ent = simState.queue[i];
            const entX = queueX + queueW - 20 - (i * 20);
            const entY = queueY + queueH / 2;

            ctx.beginPath();
            ctx.arc(entX, entY, 7, 0, Math.PI * 2);
            ctx.fillStyle = ent.color;
            ctx.shadowColor = ent.color;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        if (simState.queue.length > maxVisual) {
            ctx.fillStyle = '#f59e0b';
            ctx.font = '9px JetBrains Mono';
            ctx.fillText(`+${simState.queue.length - maxVisual}`, queueX + 10, queueY + queueH / 2 + 3);
        }

        // --- SECTOR 3: PROCESSORS (Servidores) ---
        const sX = queueX + queueW + 20;
        const sW = 65;
        const totalServers = simState.servers.length;
        const sSpacing = (h - 40) / totalServers;

        simState.servers.forEach((s, idx) => {
            const sY = 20 + idx * sSpacing + (sSpacing - 45) / 2;

            ctx.fillStyle = s.busy ? 'rgba(6, 182, 212, 0.15)' : 'rgba(16, 185, 129, 0.12)';
            ctx.strokeStyle = s.busy ? '#06b6d4' : '#10b981';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(sX, sY, sW, 45, 6);
            ctx.fill();
            ctx.stroke();

            // Texto servidor
            ctx.fillStyle = s.busy ? '#67e8f9' : '#34d399';
            ctx.font = '10px JetBrains Mono';
            ctx.textAlign = 'center';
            ctx.fillText(`S${s.id}: ${s.busy ? 'OCUPADO' : 'LIBRE'}`, sX + sW / 2, sY + 18);

            // Barra de progreso si está atendiendo
            if (s.busy) {
                const pct = Math.min(1, s.progress / s.duration);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.fillRect(sX + 8, sY + 26, sW - 16, 6);
                ctx.fillStyle = '#06b6d4';
                ctx.fillRect(sX + 8, sY + 26, (sW - 16) * pct, 6);
            } else {
                ctx.fillStyle = '#6b7280';
                ctx.font = '9px Inter';
                ctx.fillText('En espera', sX + sW / 2, sY + 32);
            }
        });

        // --- SECTOR 4: SINK (Salida) ---
        const sinkX = Math.min(w - 45, sX + sW + 25);
        ctx.fillStyle = '#10b981';
        ctx.font = '10px JetBrains Mono';
        ctx.textAlign = 'left';
        ctx.fillText('SINK', sinkX, h / 2 - 8);
        ctx.font = '9px Inter';
        ctx.fillStyle = '#9ca3af';
        ctx.fillText(`✓ ${simState.completed}`, sinkX, h / 2 + 8);
    }

    /**
     * Actualiza parámetros del simulador animado
     */
    function updateSimParams(lam, mu, c) {
        simState.lambda = lam;
        simState.mu = mu;
        simState.c = c;
        // Ajustar servidores
        if (simState.servers.length !== c) {
            simState.servers = Array.from({ length: c }, (_, i) => ({
                id: i + 1,
                busy: false,
                entity: null,
                progress: 0,
                duration: 0
            }));
        }
    }

    return {
        calculateKPIs,
        calculatePnDistribution,
        renderPnChart,
        initQueueAnimation,
        updateSimParams
    };
})();
