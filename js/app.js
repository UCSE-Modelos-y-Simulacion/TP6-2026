/**
 * Orquestador UI y Autoevaluador Criptográfico Zero-Knowledge
 * Cátedra: Modelos y Simulación - UCSE 2026
 * Trabajo Práctico N° 6: Teoría de Colas y Simulación
 */

const SECRET_SALT = "MODELOS_SIMULACION_UCSE_2026_CATEDRA_SECRET_SALT";

let currentAsignacion = "asignacion_1";
let currentDni = "";

// Campos obligatorios para cada ejercicio con indicación explícita de 4 decimales
const KPI_FIELDS = [
    { id: "rho", label: "Factor de Ocupación (ρ)", placeholder: "0.7500", step: "0.0001", hint: "ρ = λ / (c · µ) • Exactamente 4 decimales" },
    { id: "p0", label: "Probabilidad Sistema Vacío (P₀)", placeholder: "0.2500", step: "0.0001", hint: "P₀ = 1 - ρ (M/M/1) o Erlang (M/M/c) • 4 decimales" },
    { id: "p_wait", label: "Probabilidad de Esperar P(n ≥ c)", placeholder: "0.7500", step: "0.0001", hint: "P(esperar) = ρ en M/M/1 o Erlang C • 4 decimales" },
    { id: "Lq", label: "Longitud Media de Cola (L_q)", placeholder: "2.2500", step: "0.0001", hint: "Lq = P(esperar) · ρ / (1 - ρ) • 4 decimales" },
    { id: "L", label: "Cantidad en Sistema (L)", placeholder: "3.0000", step: "0.0001", hint: "L = Lq + λ/µ • 4 decimales" },
    { id: "Wq_min", label: "Tiempo en Cola W_q (minutos)", placeholder: "7.5000", step: "0.0001", hint: "Wq = (Lq / λ) × 60 min • 4 decimales" },
    { id: "W_min", label: "Tiempo en Sistema W (minutos)", placeholder: "10.0000", step: "0.0001", hint: "W = Wq + (1/µ × 60) min • 4 decimales" }
];

document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initSandbox();
    renderAsignacion(currentAsignacion);
});

/**
 * Inicializa pestañas de navegación (Demostración Docente + 8 Alumnos)
 */
function initTabs() {
    const tabsContainer = document.getElementById("exercise-tabs");
    if (!tabsContainer) return;

    tabsContainer.innerHTML = "";

    // Pestaña Docente
    const btnDemo = document.createElement("button");
    btnDemo.className = "tab-btn font-mono";
    btnDemo.textContent = "Clase: Demo Docente";
    btnDemo.dataset.asig = "demo";
    btnDemo.onclick = () => selectTab("demo");
    tabsContainer.appendChild(btnDemo);

    // Pestañas Alumnos 1 a 8
    for (let i = 1; i <= 8; i++) {
        const asigKey = `asignacion_${i}`;
        const btn = document.createElement("button");
        btn.className = `tab-btn font-mono ${i === 1 ? 'active' : ''}`;
        btn.textContent = `Alumno #${i}`;
        btn.dataset.asig = asigKey;
        btn.onclick = () => selectTab(asigKey);
        tabsContainer.appendChild(btn);
    }
}

function selectTab(asigKey) {
    currentAsignacion = asigKey;
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.asig === asigKey);
    });

    if (asigKey === "demo") {
        renderDemoDocente();
    } else {
        renderAsignacion(asigKey);
    }
}

/**
 * Renderiza la asignación del alumno seleccionado
 */
function renderAsignacion(asigKey) {
    const asigData = TP6_RUBRIC[asigKey];
    if (!asigData) return;

    const titleEl = document.getElementById("current-asig-title");
    if (titleEl) {
        titleEl.textContent = `${asigData.titulo} • ${asigData.caso}`;
    }

    const demoSection = document.getElementById("demo-container");
    const alumnoSection = document.getElementById("alumno-container");
    if (demoSection) demoSection.classList.add("hidden");
    if (alumnoSection) alumnoSection.classList.remove("hidden");

    // Renderizar Contexto del Caso
    const contextEl = document.getElementById("caso-context-desc");
    if (contextEl) {
        contextEl.innerHTML = `
            <div class="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-sm text-gray-300">
                <span class="text-indigo-400 font-bold font-[Outfit] text-base block mb-1">🏢 Caso de Estudio: ${asigData.caso}</span>
                <p class="leading-relaxed">${asigData.contexto}</p>
            </div>
        `;
    }

    // Renderizar Ejercicio A (M/M/1)
    renderEjercicioCard("A", asigData.ejA, asigKey);

    // Renderizar Ejercicio B (M/M/c)
    renderEjercicioCard("B", asigData.ejB, asigKey);
}

function renderEjercicioCard(suffix, ejData, asigKey) {
    const sectorEl = document.getElementById(`sector-title-${suffix}`);
    const descEl = document.getElementById(`enunciado-desc-${suffix}`);
    const paramsEl = document.getElementById(`params-badge-${suffix}`);
    const formEl = document.getElementById(`calc-form-${suffix}`);

    if (sectorEl) sectorEl.textContent = ejData.sector;
    if (descEl) descEl.textContent = ejData.desc;
    if (paramsEl) {
        paramsEl.innerHTML = `
            <span class="badge-tipo">Modelo ${ejData.tipo.toUpperCase()}</span>
            <span class="badge-alpha font-mono">λ = ${ejData.lam} /h</span>
            <span class="badge-alpha font-mono">µ = ${ejData.mu} /h</span>
            <span class="badge-tipo font-mono">c = ${ejData.c} servidor(es)</span>
            <button onclick="loadIntoSandbox(${ejData.lam}, ${ejData.mu}, ${ejData.c})" class="text-[11px] bg-primary/20 hover:bg-primary/40 text-purple-300 px-2.5 py-1 rounded-full border border-primary/30 transition-all ml-auto">
                ⚡ Probar en Sandbox
            </button>
        `;
    }

    if (formEl) {
        formEl.innerHTML = `
            <div class="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-700/40 text-[11px] text-indigo-200 mb-3 flex items-start gap-2">
                <span class="text-indigo-400 font-bold text-sm">ℹ️</span>
                <div>
                    <span class="font-bold text-indigo-300">Regla de Precisión (4 decimales):</span>
                    <span class="text-gray-300 block mt-0.5">Ingrese todos los valores calculados con exactamente <strong>4 decimales</strong> usando el <strong>punto (.)</strong> como separador decimal (ej: <code class="text-cyan-300">0.7500</code> o <code class="text-cyan-300">1.9286</code>). Conserve la precisión completa en la memoria de su calculadora hasta el paso final.</span>
                </div>
            </div>
        `;
        KPI_FIELDS.forEach(field => {
            const row = document.createElement("div");
            row.className = "flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-gray-900/40 border border-white/5 hover:border-primary/30 transition-all";

            const label = document.createElement("label");
            label.className = "text-xs font-medium text-gray-300 flex flex-col";
            label.htmlFor = `input-${suffix}-${field.id}`;
            label.innerHTML = `
                <span class="text-gray-200 font-semibold">${field.label}:</span>
                <span class="text-[10px] text-gray-500 font-mono">${field.hint}</span>
            `;

            const input = document.createElement("input");
            input.type = "number";
            input.step = field.step;
            input.placeholder = field.placeholder;
            input.id = `input-${suffix}-${field.id}`;
            input.className = "bg-gray-800 text-white font-mono text-xs rounded px-3 py-1.5 border border-gray-700 focus:ring-1 focus:ring-primary w-full sm:w-40 text-right";

            row.appendChild(label);
            row.appendChild(input);
            formEl.appendChild(row);
        });
    }
}

/**
 * Renderiza vista demostrativa resuelta en clase por el docente
 */
function renderDemoDocente() {
    const titleEl = document.getElementById("current-asig-title");
    if (titleEl) {
        titleEl.textContent = "Demostración Didáctica en Pizarra (Resuelta por el Docente)";
    }

    const demoSection = document.getElementById("demo-container");
    const alumnoSection = document.getElementById("alumno-container");
    if (demoSection) demoSection.classList.remove("hidden");
    if (alumnoSection) alumnoSection.classList.add("hidden");
}

/**
 * Inicializa el Sandbox y los controles de sliders
 */
function initSandbox() {
    const sliderLam = document.getElementById("slider-lambda");
    const sliderMu = document.getElementById("slider-mu");
    const sliderC = document.getElementById("slider-c");

    const valLam = document.getElementById("val-lambda");
    const valMu = document.getElementById("val-mu");
    const valC = document.getElementById("val-c");

    function updateSandbox() {
        const lam = parseFloat(sliderLam.value);
        const mu = parseFloat(sliderMu.value);
        const c = parseInt(sliderC.value);

        valLam.textContent = `${lam}/h`;
        valMu.textContent = `${mu}/h`;
        valC.textContent = c;

        const kpis = Visualizadores.calculateKPIs(lam, mu, c);
        renderSandboxKPIs(kpis);

        Visualizadores.updateSimParams(lam, mu, c);
        Visualizadores.renderPnChart("pnChartCanvas", lam, mu, c);
    }

    if (sliderLam && sliderMu && sliderC) {
        sliderLam.addEventListener("input", updateSandbox);
        sliderMu.addEventListener("input", updateSandbox);
        sliderC.addEventListener("input", updateSandbox);

        // Iniciar con valores por defecto
        updateSandbox();
        Visualizadores.initQueueAnimation("queueCanvas", 30, 40, 1);
    }
}

function loadIntoSandbox(lam, mu, c) {
    const sliderLam = document.getElementById("slider-lambda");
    const sliderMu = document.getElementById("slider-mu");
    const sliderC = document.getElementById("slider-c");

    if (sliderLam && sliderMu && sliderC) {
        sliderLam.value = lam;
        sliderMu.value = mu;
        sliderC.value = c;
        sliderLam.dispatchEvent(new Event("input"));

        // Scroll suave al Sandbox
        document.getElementById("sandbox-section").scrollIntoView({ behavior: "smooth" });
    }
}

function renderSandboxKPIs(kpis) {
    const elRho = document.getElementById("kpi-rho");
    const elP0 = document.getElementById("kpi-p0");
    const elPwait = document.getElementById("kpi-pwait");
    const elLq = document.getElementById("kpi-lq");
    const elWq = document.getElementById("kpi-wq");
    const elW = document.getElementById("kpi-w");
    const alertUnstable = document.getElementById("sandbox-unstable-alert");

    if (kpis.unstable) {
        if (alertUnstable) alertUnstable.classList.remove("hidden");
        if (elRho) elRho.textContent = `${(kpis.rho * 100).toFixed(1)}% (Saturado)`;
        if (elP0) elP0.textContent = "0.00%";
        if (elPwait) elPwait.textContent = "100.00%";
        if (elLq) elLq.textContent = "∞";
        if (elWq) elWq.textContent = "∞ min";
        if (elW) elW.textContent = "∞ min";
        return;
    }

    if (alertUnstable) alertUnstable.classList.add("hidden");
    if (elRho) elRho.textContent = `${(kpis.rho * 100).toFixed(1)}%`;
    if (elP0) elP0.textContent = `${(kpis.p0 * 100).toFixed(2)}%`;
    if (elPwait) elPwait.textContent = `${(kpis.pWait * 100).toFixed(2)}%`;
    if (elLq) elLq.textContent = `${kpis.Lq.toFixed(3)} entidades`;
    if (elWq) elWq.textContent = `${kpis.Wq_min.toFixed(2)} min (${(kpis.Wq_min * 60).toFixed(0)} s)`;
    if (elW) elW.textContent = `${kpis.W_min.toFixed(2)} min`;
}

/**
 * Función SHA-256 mediante Web Crypto API
 */
async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Validador integral de los ejercicios A y B
 */
async function validateAll() {
    if (currentAsignacion === "demo") {
        Swal.fire({
            icon: 'info',
            title: 'Modo Demostración Docente',
            text: 'Esta sección corresponde al ejercicio resuelto en clase por la cátedra. Selecciona tu pestaña de alumno asignada.',
            background: '#111827',
            color: '#f3f4f6',
            confirmButtonColor: '#8b5cf6'
        });
        return;
    }

    // Solicitar DNI del alumno si aún no se ingresó
    if (!currentDni) {
        const { value: dniInput } = await Swal.fire({
            title: 'Identificación de Alumno',
            input: 'text',
            inputLabel: 'Introduce tu número de DNI (sin puntos ni espacios):',
            inputPlaceholder: 'Ej: 42158963',
            background: '#111827',
            color: '#f3f4f6',
            confirmButtonColor: '#8b5cf6',
            inputValidator: (value) => {
                if (!value || !value.trim()) {
                    return 'El DNI es obligatorio para emitir el comprobante de entrega.';
                }
                const clean = value.trim();
                if (!/^\d{7,9}$/.test(clean)) {
                    return 'Ingrese un DNI válido de 7 a 9 dígitos numéricos (sin puntos).';
                }
            }
        });
        if (!dniInput) return;
        currentDni = dniInput.trim();
    }

    const asigData = TP6_RUBRIC[currentAsignacion];
    let allValid = true;
    let missingFields = false;
    const respuestas = { ejA: {}, ejB: {} };

    for (const suffix of ['A', 'B']) {
        const partKey = `ej${suffix}`;
        const dataPart = asigData[partKey];
        const targetId = `${currentAsignacion}_${suffix}`;

        for (const field of KPI_FIELDS) {
            const inputEl = document.getElementById(`input-${suffix}-${field.id}`);
            if (!inputEl) continue;

            // Soporta tanto punto como coma en la entrada
            const rawVal = inputEl.value.trim().replace(',', '.');
            if (!rawVal) {
                missingFields = true;
                inputEl.classList.add("border-red-500");
                allValid = false;
                continue;
            }

            const numVal = parseFloat(rawVal);
            if (isNaN(numVal)) {
                missingFields = true;
                inputEl.classList.add("border-red-500");
                allValid = false;
                continue;
            }

            const formattedVal = numVal.toFixed(4);
            respuestas[partKey][field.id] = formattedVal;

            const expectedHash = dataPart.hashes[field.id];
            const actualHash = await sha256(`${targetId}:${field.id}:${formattedVal}:${SECRET_SALT}`);

            if (actualHash === expectedHash) {
                inputEl.classList.remove("border-red-500", "border-gray-700");
                inputEl.classList.add("border-emerald-500", "bg-emerald-950/20");
            } else {
                inputEl.classList.remove("border-emerald-500", "border-gray-700");
                inputEl.classList.add("border-red-500", "bg-red-950/20");
                allValid = false;
            }
        }
    }

    if (missingFields) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos Incompletos',
            text: 'Por favor completa todos los indicadores para ambos ejercicios (A y B) con 4 decimales antes de validar.',
            background: '#111827',
            color: '#f3f4f6',
            confirmButtonColor: '#f59e0b'
        });
        return;
    }

    if (!allValid) {
        Swal.fire({
            icon: 'error',
            title: 'Discrepancia en los Cálculos',
            html: `Se detectaron diferencias en los campos resaltados en rojo.<br><br>
                   <div class="text-left text-xs text-gray-300 space-y-1 bg-gray-900/60 p-3 rounded-lg border border-red-500/30">
                       <p>📌 <strong>Requisitos de formato:</strong></p>
                       <p>• Ingrese exactamente <strong>4 decimales</strong> (ej: <code>0.7500</code>, <code>0.1429</code>).</p>
                       <p>• Utilice el <strong>punto (.)</strong> como separador decimal.</p>
                       <p>• Conserve la precisión completa en calculadora hasta el redondeo final.</p>
                       <p>• Verifique que W<sub>q</sub> y W estén expresados en <strong>minutos</strong> (multiplicando horas por 60).</p>
                   </div>`,
            background: '#111827',
            color: '#f3f4f6',
            confirmButtonColor: '#ef4444'
        });
        return;
    }

    // Comprobante Certificado con Firma SHA-256
    const timestamp = new Date().toISOString();
    const firmaPayload = `${currentDni}:${currentAsignacion}:${JSON.stringify(respuestas)}:${timestamp}:${SECRET_SALT}`;
    const firmaDigital = await sha256(firmaPayload);

    const comprobante = {
        tp: "TP6",
        titulo: "Teoría de Colas y Modelos de Líneas de Espera",
        catedra: "Modelos y Simulación - UCSE 2026",
        dni: currentDni,
        asignacion: currentAsignacion,
        caso: asigData.caso,
        timestamp: timestamp,
        puntaje: "100/100 Pts",
        respuestas: respuestas,
        firma_sha256: firmaDigital
    };

    // Descargar archivo JSON de comprobante
    const blob = new Blob([JSON.stringify(comprobante, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comprobante_tp6_${currentAsignacion}_DNI_${currentDni}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    Swal.fire({
        icon: 'success',
        title: '¡Felicitaciones! 100/100 Pts',
        html: `Has validado correctamente los modelos de cola <strong>M/M/1</strong> y <strong>M/M/c</strong>.<br><br>
               Se ha descargado tu comprobante oficial firmado criptográficamente para el DNI <strong>${currentDni}</strong>.<br>
               <span class="text-xs text-emerald-400 font-mono mt-2 block">Firma: ${firmaDigital.substring(0, 16)}...</span>`,
        background: '#111827',
        color: '#f3f4f6',
        confirmButtonColor: '#10b981'
    });
}
