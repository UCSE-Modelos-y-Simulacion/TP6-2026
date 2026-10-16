# 📊 TP6: Teoría de Colas y Simulación de Líneas de Espera ($M/M/1$ y $M/M/c$)

> **Cátedra:** Modelos y Simulación — Ciclo Lectivo 2026  
> **Institución:** Universidad Católica de Santiago del Estero (UCSE) — Facultad de Ciencias de la Salud y Tecnologías de la Información  
> **Carrera:** Ingeniería en Informática (Plan 2019 - 4º Año)  
> **Equipo Docente:** Ing. María Fernanda Vázquez (Prof. Asociada) | Ing. Fabio Damián Argañaraz Azua (Jefe de Trabajos Prácticos)  
> **Plataformas:** GitHub Classroom | Classmoji (`app.classmoji.io`) | Moodle UCSE  

---

## 🎯 Propósito y Enfoque del Trabajo Práctico

Este Trabajo Práctico entrena a los estudiantes en el **análisis cuantitativo de sistemas de espera estocásticos**, sirviendo de **puente directo hacia el Trabajo Final de Simulación en FlexSim**.

Combina:
1. **Modelado Analítico Estocástico:** Notación de Kendall, Leyes de Little, probabilidades de ocio ($P_0$), fórmulas de Erlang C para probabilidad de espera ($P(n \ge c)$), longitudes de cola ($L_q$), tiempos de respuesta ($W_q, W$) y dimensionamiento para cumplimiento de Acuerdos de Nivel de Servicio (SLA).
2. **Identificación de los 5 Elementos de Simulación:** Entidades, Atributos, Actividades, Estados y Eventos.
3. **Laboratorio Web Interactivo con Autoevaluación Zero-Knowledge (`index.html`):** Interfaz moderna con *Dark Mode* y *Glassmorphism*, un simulador animado de eventos discretos en Canvas HTML5, gráfico interactivo Chart.js de la distribución $P_n$, y validación criptográfica local mediante SHA-256 (Web Crypto API).

---

## 🧑‍🎓 Matriz de Asignaciones Individualizadas (8 Alumnos × 2 Ejercicios)

Cada estudiante tiene asignado un caso de estudio real con **dos ejercicios diferenciados**:
* **Ejercicio A:** Modelo $M/M/1$ (Cola Simple de un solo servidor).
* **Ejercicio B:** Modelo $M/M/c$ (Cola Múltiple con $c=2$ o $c=3$ para permitir el cálculo áulico manual sin sumatorias extensas).

| Asignación | Caso de Estudio Asignado | Ejercicio A ($M/M/1$) | Ejercicio B ($M/M/c$) |
| :---: | :--- | :--- | :--- |
| **Clase** | **Demostración Cátedra (Pizarra)** | $\lambda = 30\text{ cl/h}, \mu = 40\text{ cl/h}$ | $\lambda = 20\text{ lotes/h}, \mu = 15\text{ lotes/h}, c = 2$ |
| **Alumno #1** | *Mercado Flash (Fulfillment)* | $\lambda = 18\text{ paq/h}, \mu = 24\text{ paq/h}$ | $\lambda = 24\text{ paq/h}, \mu = 16\text{ paq/h}, c = 2$ |
| **Alumno #2** | *Peaje Ruta 9 (Concesiones Viales)* | $\lambda = 45\text{ veh/h}, \mu = 60\text{ veh/h}$ | $\lambda = 120\text{ veh/h}, \mu = 50\text{ veh/h}, c = 3$ |
| **Alumno #3** | *StarCoffee Nieva (Cafetería)* | $\lambda = 40\text{ ped/h}, \mu = 50\text{ ped/h}$ | $\lambda = 30\text{ cafés/h}, \mu = 20\text{ cafés/h}, c = 2$ |
| **Alumno #4** | *CallCenter BGH (Soporte Técnico)* | $\lambda = 25\text{ llam/h}, \mu = 35\text{ llam/h}$ | $\lambda = 18\text{ incid/h}, \mu = 8\text{ incid/h}, c = 3$ |
| **Alumno #5** | *Banco Santander (Sucursal Céntrica)*| $\lambda = 15\text{ cl/h}, \mu = 20\text{ cl/h}$ | $\lambda = 20\text{ cl/h}, \mu = 14\text{ cl/h}, c = 2$ |
| **Alumno #6** | *CyberShop Express (Cross-docking)* | $\lambda = 50\text{ bult/h}, \mu = 70\text{ bult/h}$ | $\lambda = 42\text{ bult/h}, \mu = 18\text{ bult/h}, c = 3$ |
| **Alumno #7** | *AutoTech Motores (Ensamble)* | $\lambda = 28\text{ pzs/h}, \mu = 35\text{ pzs/h}$ | $\lambda = 16\text{ pzs/h}, \mu = 10\text{ pzs/h}, c = 2$ |
| **Alumno #8** | *FarmaSalud 24hs (Farmacia Central)* | $\lambda = 12\text{ rec/h}, \mu = 16\text{ rec/h}$ | $\lambda = 36\text{ cl/h}, \mu = 15\text{ cl/h}, c = 3$ |

---

## 💻 Plataforma Web Interactiva (`index.html`)

Para ejecutar el laboratorio interactivo, no se requiere instalación de software ni servidores web locales:
* Simplemente hacer **doble clic en `index.html`** para abrirlo en cualquier navegador web moderno (Google Chrome, Edge, Firefox, Brave).
* **Características principales:**
  * **Resumen Teórico Desplegable:** Fórmulas con KaTeX, Kendall, Little y citas bibliográficas obligatorias.
  * **Sandbox y Simulador de Colas:** Sliders interactivos de $\lambda, \mu, c$, animación de entidades en Canvas HTML5 y gráfico de distribución $P_n$ en Chart.js.
  * **Autograding Zero-Knowledge:** Validación instantánea mediante Web Crypto API SHA-256. Al obtener 100/100 Pts, permite descargar el archivo `comprobante_tp6_asignacion_X_legajo.json` firmado digitalmente.

---

## 📁 Estructura del Directorio

```text
TP6-Teoria-de-Colas/
├── index.html                      # Plataforma interactiva Web-First (abrir con doble clic)
├── README.md                       # Documentación general y matriz del TP
├── css/
│   └── styles.css                  # Estilos Dark Mode y Glassmorphism de alta gama
├── js/
│   ├── ejercicios_data.js          # Rúbrica criptográfica pública con hashes SHA-256
│   ├── visualizadores.js           # Motor Canvas de simulación animada y gráfico Pn
│   └── app.js                      # Orquestador UI, sliders, validación y exportador de comprobantes
├── rubric_tp6.json                 # Rúbrica pública con hashes
├── rubric_tp6_master.json          # Rúbrica privada docente con valores exactos
├── Practica/
│   ├── Trabajo Practico 6.md       # Enunciados completos, consignas y solucionario docente
│   ├── ejemplos.docx               # Ejemplos históricos de la cátedra
│   └── ejemplos2.docx              # Ejemplos históricos con FlexSim
├── MODELOS_Y_SIMULACION_-_unidad_4.pdf # Diapositivas teóricas de la profesora titular
└── TEORIA_DE_COLAS.pdf             # Apunte oficial de cátedra
```
