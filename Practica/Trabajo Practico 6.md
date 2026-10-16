# **UNIVERSIDAD CATÓLICA DE SANTIAGO DEL ESTERO**
## **Facultad de Ciencias de la Salud y Tecnologías de la Información**
### **Carrera: Ingeniería en Informática (Plan 2019 - 4° Año)**
### **Cátedra: Modelos y Simulación (Ciclo Lectivo 2026)**
**Equipo Docente:** Ing. María Fernanda Vázquez (Prof. Asociada) | Ing. Fabio Damián Argañaraz Azua (Jefe de Trabajos Prácticos)  

---

# **TRABAJO PRÁCTICO N° 6: TEORÍA DE COLAS Y MODELOS DE LÍNEAS DE ESPERA**
### **Tema:** Modelado Analítico Estocástico ($M/M/1$ y $M/M/c$), Elementos de Simulación y Preparación para el Trabajo Final en FlexSim

---

## **1. OBJETIVOS DE APRENDIZAJE**

Al finalizar este Trabajo Práctico, el estudiante de Ingeniería en Informática será capaz de:
1. **Identificar los 5 elementos fundamentales de un sistema de simulación:** Entidades, Atributos, Actividades, Estados y Eventos en contextos organizacionales reales.
2. **Modelar analíticamente líneas de espera** empleando la **Notación de Kendall** ($A/B/c$) para sistemas de canal simple ($M/M/1$) y multicanal en paralelo ($M/M/c$, con $c$ pequeño para cálculo áulico).
3. **Calcular cuantitativamente las medidas de rendimiento (KPIs):** Factor de utilización ($\rho$), probabilidad de ocio ($P_0$), probabilidad de espera ($P(n \ge c)$), longitud media de cola ($L_q$), cantidad en el sistema ($L$), tiempo medio de espera ($W_q$), tiempo de respuesta ($W$) y percentiles de espera ($P(W_q > t)$).
4. **Dimensionar capacidad y evaluar Acuerdos de Nivel de Servicio (SLA):** Determinar la cantidad de servidores o la velocidad de atención requerida para garantizar metas de calidad de servicio.
5. **Realizar análisis de sensibilidad y trade-off:** Comparar la incorporación de servidores frente a la capacitación del personal para elevar la tasa de servicio $\mu$ o la derivación de demanda para reducir $\lambda$.
6. **Diseñar el modelo conceptual en FlexSim:** Mapear el flujo con objetos estándar (`Source`, `Queue`, `Processor`, `Sink`), definir condiciones de experimentación y contrastar las predicciones teóricas con los resultados de simulación.

---

## **2. MARCO TEÓRICO RESUMIDO Y FORMULARIO DE CÁTEDRA**

### **2.1. Notación de Kendall ($A / B / c$)**
* **$A$**: Distribución del tiempo entre llegadas (típicamente $M$ = Exponencial / Poisson con tasa $\lambda$).
* **$B$**: Distribución del tiempo de servicio (típicamente $M$ = Exponencial con tasa $\mu$).
* **$c$**: Número de servidores idénticos en paralelo que comparten una cola única ($c \ge 1$).
* **Disciplina:** FIFO (*First-In, First-Out*), capacidad de cola ilimitada y población infinita.

---

### **2.2. Parámetros Básicos y Fórmulas de Cálculo**
* **$\lambda$**: Tasa promedio de llegadas (clientes/entidades por hora o por minuto).
* **$\mu$**: Tasa promedio de servicio por servidor (entidades atendidas por hora o por minuto).
* **Intensidad de tráfico en Erlangs:** $r = \frac{\lambda}{\mu}$
* **Factor de utilización del servidor:** $\rho = \frac{\lambda}{c \cdot \mu} = \frac{r}{c}$ *(Condición de estabilidad: $\rho < 1$)*

---

#### **A. Modelo $M/M/1$ (Servidor Único, $c = 1$)**
* Factor de uso: $\rho = \frac{\lambda}{\mu} < 1$
* Probabilidad de servidor libre: $P_0 = 1 - \rho$
* Probabilidad de esperar en cola: $P(\text{esperar}) = P(n \ge 1) = \rho$
* Longitud media de cola: $L_q = \frac{\lambda^2}{\mu(\mu - \lambda)} = \frac{\rho^2}{1 - \rho}$
* Cantidad media en el sistema: $L = \frac{\lambda}{\mu - \lambda} = \frac{\rho}{1 - \rho} = L_q + \rho$
* Tiempo medio en cola: $W_q = \frac{L_q}{\lambda} = \frac{\lambda}{\mu(\mu - \lambda)}$
* Tiempo medio total en sistema: $W = W_q + \frac{1}{\mu} = \frac{1}{\mu - \lambda}$
* Probabilidad de esperar más de un tiempo $t$ en cola:
  $$P(W_q > t) = \rho \cdot e^{-\mu(1 - \rho)t}$$

---

#### **B. Modelo $M/M/c$ (Servidores Múltiples en Paralelo, $c \ge 1$)**
* Intensidad de tráfico: $r = \frac{\lambda}{\mu}$
* Factor de utilización por servidor: $\rho = \frac{\lambda}{c \cdot \mu} = \frac{r}{c} < 1$
* Probabilidad de que todos los servidores estén libres ($P_0$):
  $$P_0 = \left[ \sum_{n=0}^{c-1} \frac{r^n}{n!} + \frac{r^c}{c! (1 - \rho)} \right]^{-1}$$
  *Para $c = 2$:* $P_0 = \left[ 1 + r + \frac{r^2}{2(1 - \rho)} \right]^{-1}$  
  *Para $c = 3$:* $P_0 = \left[ 1 + r + \frac{r^2}{2} + \frac{r^3}{6(1 - \rho)} \right]^{-1}$
* Probabilidad de que una entidad entrante deba esperar (Fórmula $C$ de Erlang):
  $$P(\text{esperar}) = P(n \ge c) = \frac{r^c}{c! (1 - \rho)} \cdot P_0$$
* Longitud media de cola:
  $$L_q = P(n \ge c) \cdot \frac{\rho}{1 - \rho} = \frac{r^c \cdot \rho}{c! (1 - \rho)^2} \cdot P_0$$
* Tiempo medio en cola: $W_q = \frac{L_q}{\lambda}$
* Tiempo medio total en sistema: $W = W_q + \frac{1}{\mu}$
* Cantidad media en el sistema: $L = L_q + r = \lambda \cdot W$
* Probabilidad de que una entidad espere más de un tiempo $t$ en la cola:
  $$P(W_q > t) = P(n \ge c) \cdot e^{-c \cdot \mu \cdot (1 - \rho) \cdot t}$$

---

## **3. MATRIZ DE ASIGNACIÓN INDIVIDUALIZADA (8 ALUMNOS × 2 EJERCICIOS)**

Siguiendo el estándar pedagógico de la cátedra, cada alumno cuenta con **dos ejercicios diferenciados**:
* **Ejercicio A:** Modelo $M/M/1$ (Cola Simple).
* **Ejercicio B:** Modelo $M/M/c$ (Cola Múltiple con $c=2$ o $c=3$ para simplificar la resolución analítica áulica).

| Alumno | Caso de Estudio Asignado | Ejercicio A: Modelo $M/M/1$ | Ejercicio B: Modelo $M/M/c$ |
| :---: | :--- | :--- | :--- |
| **Clase** | **Demostración Cátedra** | $\lambda = 30\text{ cl/h}, \mu = 40\text{ cl/h}$ | $\lambda = 20\text{ lotes/h}, \mu = 15\text{ lotes/h}, c = 2$ |
| **Alumno #1** | *Mercado Flash (Fulfillment)* | $\lambda = 18\text{ paq/h}, \mu = 24\text{ paq/h}$ | $\lambda = 24\text{ paq/h}, \mu = 16\text{ paq/h}, c = 2$ |
| **Alumno #2** | *Peaje Ruta 9 (Concesiones Viales)* | $\lambda = 45\text{ veh/h}, \mu = 60\text{ veh/h}$ | $\lambda = 120\text{ veh/h}, \mu = 50\text{ veh/h}, c = 3$ |
| **Alumno #3** | *StarCoffee Nieva (Cafetería)* | $\lambda = 40\text{ ped/h}, \mu = 50\text{ ped/h}$ | $\lambda = 30\text{ cafés/h}, \mu = 20\text{ cafés/h}, c = 2$ |
| **Alumno #4** | *CallCenter BGH (Soporte Técnico)* | $\lambda = 25\text{ llam/h}, \mu = 35\text{ llam/h}$ | $\lambda = 18\text{ incid/h}, \mu = 8\text{ incid/h}, c = 3$ |
| **Alumno #5** | *Banco Santander (Sucursal Céntrica)*| $\lambda = 15\text{ cl/h}, \mu = 20\text{ cl/h}$ | $\lambda = 20\text{ cl/h}, \mu = 14\text{ cl/h}, c = 2$ |
| **Alumno #6** | *CyberShop Express (Cross-docking)* | $\lambda = 50\text{ bult/h}, \mu = 70\text{ bult/h}$ | $\lambda = 42\text{ bult/h}, \mu = 18\text{ bult/h}, c = 3$ |
| **Alumno #7** | *AutoTech Motores (Ensamble)* | $\lambda = 28\text{ pzs/h}, \mu = 35\text{ pzs/h}$ | $\lambda = 16\text{ pzs/h}, \mu = 10\text{ pzs/h}, c = 2$ |
| **Alumno #8** | *FarmaSalud 24hs (Farmacia Central)* | $\lambda = 12\text{ rec/h}, \mu = 16\text{ rec/h}$ | $\lambda = 36\text{ cl/h}, \mu = 15\text{ cl/h}, c = 3$ |

---

## **4. PARTE I: EJERCICIOS DEMOSTRATIVOS RESUELTOS EN CLASE**

---

### **DEMO 1 (DOCENTE - COLA SIMPLE $M/M/1$)**
* **Caso:** Cafetería Universitaria *Byte & Coffee* (Terminal de Pedidos Express).
* **Parámetros:** $\lambda = 30$ clientes/hora, $\mu = 40$ clientes/hora ($t_s = 1.5$ minutos).

#### **Resolución Paso a Paso:**
1. **Elementos del Sistema:**
   * Entidad: Clientes / Estudiantes.
   * Atributos: Hora de llegada, tipo de pedido.
   * Actividades: Cobro y registro del pedido en la terminal.
   * Estados: Cajero (Libre/Ocupado), Cola (cantidad esperando).
   * Eventos: Arribo de cliente, inicio de cobro, fin de cobro y salida.
2. **Cálculos de Desempeño:**
   * Utilización: $\rho = \frac{30}{40} = 0.75$ ($75\%$).
   * Probabilidad de servidor libre: $P_0 = 1 - 0.75 = 0.25$ ($25\%$).
   * Probabilidad de esperar en cola: $P(n \ge 1) = \rho = 0.75$ ($75\%$).
   * Clientes en cola: $L_q = \frac{0.75^2}{1 - 0.75} = \frac{0.5625}{0.25} = 2.25\text{ clientes}$.
   * Clientes en el sistema: $L = L_q + \rho = 2.25 + 0.75 = 3.00\text{ clientes}$.
   * Tiempo en cola: $W_q = \frac{2.25}{30} = 0.075\text{ horas} = 0.075 \times 60 = 4.50\text{ minutos}$.
   * Tiempo total en el sistema: $W = W_q + \frac{1}{\mu} = 4.50 + 1.50 = 6.00\text{ minutos}$.
3. **Probabilidad de esperar más de 3 minutos en cola ($t = 3/60 = 0.05\text{ h}$):**
   $$P(W_q > 3\text{ min}) = 0.75 \cdot e^{-40 \cdot 0.25 \cdot 0.05} = 0.75 \cdot e^{-0.50} = 0.75 \times 0.6065 \approx 0.4549 \quad (45.49\%)$$
4. **Alternativa de Capacitación ($\mu = 50\text{ cl/h}$):**
   * $\rho = 30/50 = 0.60$.
   * $L_q = \frac{0.60^2}{1 - 0.60} = \frac{0.36}{0.40} = 0.90\text{ clientes}$.
   * $W_q = \frac{0.90}{30} \times 60 = 1.80\text{ minutos}$ *(reducción de espera del $60\%$)*.

---

### **DEMO 2 (DOCENTE - COLA MÚLTIPLE $M/M/2$)**
* **Caso:** Centro de Control de Calidad *TechQuality*.
* **Parámetros:** $\lambda = 20$ lotes/hora, $\mu = 15$ lotes/hora por inspector, $c = 2$ inspectores en paralelo.

#### **Resolución Paso a Paso:**
1. **Intensidad de tráfico y utilización:**
   * $r = \frac{\lambda}{\mu} = \frac{20}{15} = 1.3333\text{ Erlangs}$.
   * $\rho = \frac{r}{c} = \frac{1.3333}{2} = 0.6667 \quad (66.67\% < 1 \implies \text{Estable})$.
2. **Cálculo de $P_0$ para $c = 2$:**
   $$\sum_{n=0}^{1} \frac{r^n}{n!} = 1 + 1.3333 = 2.3333$$
   $$\frac{r^2}{2!(1 - \rho)} = \frac{1.3333^2}{2 \times (1 - 0.6667)} = \frac{1.7778}{2 \times 0.3333} = \frac{1.7778}{0.6667} = 2.6667$$
   $$P_0 = \left[ 2.3333 + 2.6667 \right]^{-1} = \frac{1}{5.0000} = 0.2000 \quad (20\%)$$
3. **Probabilidad de esperar (Erlang C):**
   $$P(\text{esperar}) = P(n \ge 2) = 2.6667 \times 0.2000 = 0.5333 \quad (53.33\%)$$
4. **Longitudes y Tiempos Medios:**
   * $L_q = P(n \ge 2) \cdot \frac{\rho}{1 - \rho} = 0.5333 \cdot \frac{0.6667}{0.3333} = 0.5333 \times 2 = 1.0667\text{ lotes}$.
   * $L = L_q + r = 1.0667 + 1.3333 = 2.4000\text{ lotes}$.
   * $W_q = \frac{L_q}{\lambda} = \frac{1.0667}{20} = 0.05333\text{ horas} = 0.05333 \times 60 = 3.20\text{ minutos}$.
   * $W = W_q + \frac{1}{\mu} = 3.20 + 4.00 = 7.20\text{ minutos}$.
5. **Efecto de incorporar un 3er inspector ($c = 3$):**
   * $\rho = \frac{1.3333}{3} = 0.4444$. $P_0 = 0.2542$, $P(\text{esperar}) = 0.1808$.
   * $L_q = 0.1446\text{ lotes}$, $W_q = 0.43\text{ minutos (26 segundos)}$.

---

## **5. PARTE II: GUÍA DE EJERCICIOS PRÁCTICOS PARA ESTUDIANTES**

*Para cada uno de los ejercicios (A y B), el alumno debe:*
* **Consigna 1:** Identificar los 5 elementos del sistema (Entidades, Atributos, Actividades, Estados, Eventos).
* **Consigna 2:** Justificar la Notación de Kendall y calcular $\rho, P_0, P(\text{esperar}), L_q, L, W_q$ (en minutos) y $W$ (en minutos).
* **Consigna 3:** Dimensionar capacidad para cumplir con el SLA exigido por la gerencia.
* **Consigna 4:** Realizar análisis de sensibilidad evaluando la alternativa de capacitación o reducción de demanda.
* **Consigna 5:** Describir la configuración del modelo de eventos discretos en FlexSim (`Source`, `Queue`, `Processors`, `Sink`).

---

### **ALUMNO #1: Caso "Mercado Flash (Fulfillment)"**
* **Ejercicio A (M/M/1 - Pesaje y Etiquetado):**  
  Los paquetes que salen de recolección (picking) llegan a la báscula de pesaje y etiquetado automático a una tasa de $\lambda = 18$ paquetes/hora siguiendo un proceso de Poisson. El puesto cuenta con un único operario cuya tasa media de servicio es $\mu = 24$ paquetes/hora (distribución exponencial).
* **Ejercicio B (M/M/2 - Mesa de Empaque Final):**  
  Los paquetes pasan a la mesa de empaque final atendida por $c = 2$ operarios idénticos con fila única. La tasa de arribos es $\lambda = 24$ paquetes/hora y cada operario despacha en promedio en $3.75$ minutos ($\mu = 16$ paquetes/hora por operario, exponencial).

---

### **ALUMNO #2: Caso "Peaje Ruta 9 (Concesiones Viales)"**
* **Ejercicio A (M/M/1 - Vía de Motocicletas):**  
  Las motocicletas llegan a una vía exclusiva de peaje con $\lambda = 45$ motos/hora (Poisson). El cajero atiende en un tiempo exponencial con media $\mu = 60$ motos/hora ($1$ min/moto).
* **Ejercicio B (M/M/3 - Cobro Manual de Automóviles):**  
  Los autos llegan a las cabinas manuales a razón de $\lambda = 120$ vehículos/hora (Poisson). Se tienen $c = 3$ cabinas manuales con fila común. Cada cajero atiende a razón de $\mu = 50$ vehículos/hora (exponencial, $1.2$ min/auto).

---

### **ALUMNO #3: Caso "StarCoffee Nieva (Cafetería)"**
* **Ejercicio A (M/M/1 - Caja Única):**  
  Los clientes arriban a la caja de cobro y registro de pedidos a razón de $\lambda = 40$ pedidos/hora (Poisson). La cajera opera a una tasa exponencial de $\mu = 50$ pedidos/hora.
* **Ejercicio B (M/M/2 - Barra de Preparación):**  
  Los pedidos se preparan en la barra por $c = 2$ baristas en paralelo con fila única. Arriban a razón de $\lambda = 30$ cafés/hora (Poisson) y cada barista tarda en promedio $3$ minutos ($\mu = 20$ cafés/hora por barista, exponencial).

---

### **ALUMNO #4: Caso "CallCenter BGH (Soporte Técnico)"**
* **Ejercicio A (M/M/1 - Triage de Llamadas):**  
  Las llamadas son recibidas inicialmente por un operador de triage a razón de $\lambda = 25$ llamadas/hora (Poisson). El tiempo de clasificación sigue una distribución exponencial con tasa media $\mu = 35$ llamadas/hora.
* **Ejercicio B (M/M/3 - Soporte Técnico Nivel 2):**  
  Las fallas complejas son derivadas a una mesa atendida por $c = 3$ técnicos en paralelo. Las llamadas entran a una cola única con $\lambda = 18$ incidentes/hora (Poisson) y cada técnico atiende a razón de $\mu = 8$ incidentes/hora (exponencial, media $7.5$ min).

---

### **ALUMNO #5: Caso "Banco Santander (Sucursal Céntrica)"**
* **Ejercicio A (M/M/1 - Entrega Rápida de Documentos):**  
  Los clientes que retiran chequeras o tarjetas arriban a un mostrador único con $\lambda = 15$ clientes/hora (Poisson). El tiempo de entrega sigue una distribución exponencial con tasa media $\mu = 20$ clientes/hora.
* **Ejercicio B (M/M/2 - Cajas de Atención Presencial):**  
  Las operaciones monetarias de caja reciben clientes a razón de $\lambda = 20$ clientes/hora (Poisson). Se dispone de $c = 2$ cajeros con fila única turnero. Cada cajero atiende a una tasa exponencial de $\mu = 14$ clientes/hora.

---

### **ALUMNO #6: Caso "CyberShop Express (Cross-docking)"**
* **Ejercicio A (M/M/1 - Escaneo Óptico):**  
  Los paquetes que ingresan al depósito son escaneados en un puesto único a razón de $\lambda = 50$ bultos/hora (Poisson). La tasa media de servicio es $\mu = 70$ bultos/hora (exponencial).
* **Ejercicio B (M/M/3 - Bahía de Carga a Camiones):**  
  Los bultos clasificados llegan a la bahía de estiba a razón de $\lambda = 42$ bultos/hora (Poisson). Trabajan $c = 3$ operarios de carga en paralelo con fila común. Cada uno carga a una tasa exponencial de $\mu = 18$ bultos/hora.

---

### **ALUMNO #7: Caso "AutoTech Motores (Ensamble Industrial)"**
* **Ejercicio A (M/M/1 - Calibración Láser):**  
  Las piezas mecanizadas llegan a la estación de calibración láser con $\lambda = 28$ piezas/hora (Poisson). La máquina calibra con tasa exponencial $\mu = 35$ piezas/hora.
* **Ejercicio B (M/M/2 - Banco de Prueba de Calidad):**  
  Las piezas pasan al banco de prueba donde $c = 2$ inspectores controlan las piezas en paralelo desde una tarima común. Arriban a razón de $\lambda = 16$ piezas/hora (Poisson) y cada inspector procesa a razón de $\mu = 10$ piezas/hora (exponencial).

---

### **ALUMNO #8: Caso "FarmaSalud 24hs (Farmacia Central)"**
* **Ejercicio A (M/M/1 - Ventanilla Nocturna de Urgencias):**  
  Las recetas de urgencia nocturnas llegan a ventanilla única a razón de $\lambda = 12$ recetas/hora (Poisson). El farmacéutico despacha a una tasa exponencial de $\mu = 16$ recetas/hora.
* **Ejercicio B (M/M/3 - Mostrador Diurno de Afiliados):**  
  Durante la tarde, los afiliados llegan a razón de $\lambda = 36$ clientes/hora (Poisson). Se dispone de $c = 3$ puestos de farmacia en paralelo con fila única. Cada farmacéutico atiende a una tasa exponencial de $\mu = 15$ clientes/hora.

---

## **6. PARTE III: LINEAMIENTOS METODOLÓGICOS Y GUÍA HACIA EL TRABAJO FINAL**

### **6.1. Requisitos del Informe Técnico Individual**
1. **Carátula:** Datos del estudiante, DNI y caso asignado.
2. **Desarrollo Metódico:** Responder las 5 consignas para el Ejercicio A y para el Ejercicio B.
3. **Memoria de Cálculo:** Desarrollar las fórmulas algebraicas paso a paso, manteniendo unidades homogéneas (horas y minutos), conservando la precisión completa en calculadora y redondeando a **4 decimales** para el reporte y validación web.
4. **Validación Web y Comprobante:** Adjuntar el archivo `comprobante_tp6_asignacion_X_DNI_XXXXX.json` generado al obtener 100/100 Pts en la plataforma interactiva web (`index.html`).

---

### **6.2. Guía de Experimentación y Validación en FlexSim 2026**
*Para contrastar adecuadamente la solución analítica con la simulación de eventos discretos en FlexSim 2026:*

> ### 🚨 **¡ALERTA CONCEPTUAL CRÍTICA: ¿Por qué si el problema dice "Poisson" se DEBE elegir "Exponential" en FlexSim?**
> * **Enunciado Teórico:** *"Las llegadas siguen un proceso de Poisson con tasa $\lambda$"*. La distribución de Poisson mide el **número discreto de eventos por unidad de tiempo** (variable aleatoria discreta entera, ej: 18 paquetes/hora).
> * **En FlexSim (`Source > Inter-Arrival Time`):** El software no pide cuántos paquetes llegan en una hora, sino el **tiempo continuo transcurrido entre una entidad y la siguiente ($\Delta t$)**.
> * **Propiedad Matemática Fundamental:** En procesos estocásticos de conteo, si el número de arribos sigue una distribución de Poisson con tasa $\lambda$, **el tiempo transcurrido entre arribos sucesivos sigue estrictamente una distribución EXPONENCIAL con media $1/\lambda$**.
> * **¡Error Típico de Laboratorio!:** Si en FlexSim se selecciona la opción `poisson` en el desplegable con valor $18$, FlexSim programará la llegada de un paquete cada ~18 horas (de forma discreta entera), colapsando el modelo. **NUNCA elegir `poisson` en `Inter-Arrival Time`. Seleccionar SIEMPRE `Exponential` con $\text{Scale} = 1/\lambda$.**
> * **En el Processor:** El tiempo de servicio también se modela seleccionando **`Exponential`** en `Process Time`, ingresando $\text{Scale} = 1/\mu$.

1. **Configuración del Source (Llegadas $\lambda$):**
   * **Paso a paso en FlexSim:** Seleccione el objeto `Source` en el lienzo 3D $\to$ mire el panel derecho `Properties` (sección `Source`) $\to$ verifique que `Arrival Style` esté en `Inter-Arrival Time`.
   * **Distribución Exponencial:** Haga clic en la flecha de opciones del campo $\to$ `Statistical Distribution` $\to$ seleccione **`Exponential`** (¡NUNCA `poisson`!). Aparecerá la función `exponential(location, scale, stream)`.
   * **¡Cuidado con el parámetro Scale!:** En FlexSim, `Scale` representa el **tiempo promedio entre arribos ($1/\lambda$)**, NUNCA la tasa directa $\lambda$.
   * **Ejemplos según la unidad seleccionada al lado del campo (`hr`, `min`, `s`):**
     * **Si la unidad dice 'hr' (Horas):** $\text{Scale} = 1 / \lambda$.
       * *Ejemplo ($\lambda = 18\text{ paq/h}$):* ingresar `1 / 18` (o `0.0556` hr).
       * *Ejemplo ($\lambda = 30\text{ cl/h}$):* ingresar `1 / 30` (o `0.0333` hr).
     * **Si la unidad dice 'min' (Minutos):** $\text{Scale} = 60 / \lambda$.
       * *Ejemplo ($\lambda = 18\text{ paq/h}$):* ingresar `60 / 18 = 3.3333` min.
     * **Si la unidad dice 's' (Segundos):** $\text{Scale} = 3600 / \lambda$.
       * *Ejemplo ($\lambda = 18\text{ paq/h}$):* ingresar `3600 / 18 = 200` s $\to$ `exponential(0, 200, getstream(current))`.
       * *Ejemplo ($\lambda = 30\text{ cl/h}$):* ingresar `3600 / 30 = 120` s.

2. **Configuración del Processor (Servicio $\mu$ y Capacidad):**
   * **Paso a paso en FlexSim:** Seleccione el objeto `Processor` $\to$ en el panel derecho `Properties` busque la sección `Processor`.
   * **Max Content:** Mantener en `1` para cada servidor individual en paralelo.
   * **Setup Time:** Debe permanecer en `0` (sin tiempo de alistamiento en colas estándar).
   * **Process Time:** Por defecto viene un valor constante (`10 hr`). **¡No dejarlo en constante!** Haga clic en la flecha desplegable $\to$ `Statistical Distribution` $\to$ `Exponential`.
   * **Expresión:** `exponential(0, scale, getstream(current))` donde $\text{Scale} = 1/\mu$ (tiempo medio de servicio).
   * **Ejemplos según la unidad visible (`hr`, `min`, `s`):**
     * **Si dice 'hr' (Horas):** $\text{Scale} = 1 / \mu$.
       * *Ejemplo Alumno #1 ($\mu = 24\text{ paq/h}$):* ingresar `1 / 24` (o `0.0417` hr).
       * *Ejemplo Demo Docente ($\mu = 40\text{ cl/h}$):* ingresar `1 / 40` (o `0.0250` hr).
     * **Si dice 'min' (Minutos):** $\text{Scale} = 60 / \mu$.
       * *Ejemplo Alumno #1 ($\mu = 24\text{ paq/h}$):* ingresar `60 / 24 = 2.5` min.
       * *Ejemplo Demo Docente ($\mu = 40\text{ cl/h}$):* ingresar `60 / 40 = 1.5` min.
     * **Si dice 's' (Segundos):** $\text{Scale} = 3600 / \mu$.
       * *Ejemplo Alumno #1 ($\mu = 24\text{ paq/h}$):* ingresar `3600 / 24 = 150` s $\to$ `exponential(0, 150, getstream(current))`.
       * *Ejemplo Demo Docente ($\mu = 40\text{ cl/h}$):* ingresar `3600 / 40 = 90` s.

3. **Topología para Multicanal ($M/M/c$) y Regla de Ruteo en la Queue:**
   * Conecte la `Queue` a los $c$ objetos `Processor` en paralelo mediante conexiones de puerto ('A-connect').
   * En las propiedades de la `Queue` $\to$ sección `Output` $\to$ en `Send To Port` elija **`Round Robin > Round Robin if Available`**.
   * **Justificación de Ingeniería:**
     * **Balanceo de Carga Equitativo (*Load Balancing*):** Si se utiliza `First Available`, FlexSim siempre intenta despachar primero al Puerto 1 (`Processor1`). Esto genera un sesgo artificial donde `Processor1` termina con una utilización del 80% y `Processor2` con solo 40%, distorsionando la simetría de servidores idénticos. `Round Robin` alterna circularmente el despacho para que ambos operadores tengan utilizaciones medias homogéneas ($\rho_1 \approx \rho_2 \approx \rho$).
     * **Principio *Work-Conserving* (Sin Ocio Forzado):** La variante `if Available` garantiza que si al servidor que le toca el turno se encuentra ocupado, la entidad pasa de inmediato al procesador que esté libre. Esto evita retenciones forzadas y cumple estrictamente la disciplina $M/M/c$ con fila única de Kendall.

4. **¿Cuántos días simular? (Régimen Permanente vs Transitorio):**
   * *Pregunta recurrente:* ¿Por qué una simulación de 1 o 2 horas no coincide con la teoría?
     * Las fórmulas teóricas asumen régimen permanente ($t \to \infty$). Al arrancar en $t = 0$, el modelo inicia vacío (*Empty & Idle*), introduciendo un sesgo transitorio inicial.
   * *Tiempo de Corrida (Run Time):* Simule entre **7 y 14 días continuos**:
     * $7\text{ días} = 7 \times 24 \times 3600 = \mathbf{604.800\text{ segundos}}$.
     * $14\text{ días} = 14 \times 24 \times 3600 = \mathbf{1.209.600\text{ segundos}}$.
     * Esto asegura procesar entre $15.000$ y $35.000$ entidades para que la media estocástica converja a la analítica.
   * *Warm-up Time (Tiempo de Calentamiento en Versión Estudiantil):*
     * En la barra de herramientas superior de FlexSim (junto a los botones *Reset* y *Run*), haga clic en la **flechita desplegable (▼)** ubicada a la derecha de la casilla **Run Time**.
     * Active la casilla **Warmup Time** e ingrese `24.00` horas ($1$ día).
     * Active la casilla **Stop Times** e ingrese `168.00` horas ($7$ días) o `336.00` horas ($14$ días).
     * *Efecto:* A las 24 horas simuladas, FlexSim purgará automáticamente el sesgo del arranque en frío (sistema vacío) y registrará métricas limpias del régimen permanente hasta finalizar la corrida.

5. **Contraste de Métricas en Dashboards:**
   * $\rho$: Gráfico `State Bar / Pie` de Processors $\to$ `% Processing` $\approx \rho$.
   * $L_q$: Gráfico `Content vs Time` de Queue $\to$ `Average Content` $\approx L_q$.
   * $W_q$: Gráfico `Staytime` de Queue $\to$ `Average Staytime / 60` $\approx W_q$ (minutos).
   * $W$: Gráfico `Staytime` en Sink $\to$ `Average Staytime / 60` $\approx W$ (minutos).

6. **Tabla Maestra de Configuración FlexSim 2026 para TODOS los Ejercicios:**
   *Recuerde que en todos los casos la distribución a elegir en FlexSim es estrictamente **`Exponential`**.*

| Asignación | Ej. | Modelo | $\lambda$ | $\mu$ | $c$ | Source: `Inter-Arrival Time` | Processor: `Process Time` | Queue: `Send To Port` |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- | :--- | :--- |
| **Demo Clase** | **A** | $M/M/1$ | $30$ | $40$ | $1$ | `exponential(0, 1/30)` ($0.0333$ hr / $2$ min) | `exponential(0, 1/40)` ($0.0250$ hr / $1.5$ min) | Directo (Puerto 1) |
| **Demo Clase** | **B** | $M/M/2$ | $20$ | $15$ | $2$ | `exponential(0, 1/20)` ($0.0500$ hr / $3$ min) | `exponential(0, 1/15)` ($0.0667$ hr / $4$ min) | `Round Robin if Available` |
| **Alumno #1** | **A** | $M/M/1$ | $18$ | $24$ | $1$ | `exponential(0, 1/18)` ($0.0556$ hr / $3.33$ min) | `exponential(0, 1/24)` ($0.0417$ hr / $2.5$ min) | Directo (Puerto 1) |
| **Alumno #1** | **B** | $M/M/2$ | $24$ | $16$ | $2$ | `exponential(0, 1/24)` ($0.0417$ hr / $2.5$ min) | `exponential(0, 1/16)` ($0.0625$ hr / $3.75$ min) | `Round Robin if Available` |
| **Alumno #2** | **A** | $M/M/1$ | $45$ | $60$ | $1$ | `exponential(0, 1/45)` ($0.0222$ hr / $1.33$ min) | `exponential(0, 1/60)` ($0.0167$ hr / $1$ min) | Directo (Puerto 1) |
| **Alumno #2** | **B** | $M/M/3$ | $120$ | $50$ | $3$ | `exponential(0, 1/120)` ($0.0083$ hr / $0.5$ min / $30$ s) | `exponential(0, 1/50)` ($0.0200$ hr / $1.2$ min / $72$ s) | `Round Robin if Available` |
| **Alumno #3** | **A** | $M/M/1$ | $40$ | $50$ | $1$ | `exponential(0, 1/40)` ($0.0250$ hr / $1.5$ min) | `exponential(0, 1/50)` ($0.0200$ hr / $1.2$ min) | Directo (Puerto 1) |
| **Alumno #3** | **B** | $M/M/2$ | $30$ | $20$ | $2$ | `exponential(0, 1/30)` ($0.0333$ hr / $2$ min) | `exponential(0, 1/20)` ($0.0500$ hr / $3$ min) | `Round Robin if Available` |
| **Alumno #4** | **A** | $M/M/1$ | $25$ | $35$ | $1$ | `exponential(0, 1/25)` ($0.0400$ hr / $2.4$ min) | `exponential(0, 1/35)` ($0.0286$ hr / $1.71$ min) | Directo (Puerto 1) |
| **Alumno #4** | **B** | $M/M/3$ | $18$ | $8$ | $3$ | `exponential(0, 1/18)` ($0.0556$ hr / $3.33$ min) | `exponential(0, 1/8)` ($0.1250$ hr / $7.5$ min) | `Round Robin if Available` |
| **Alumno #5** | **A** | $M/M/1$ | $15$ | $20$ | $1$ | `exponential(0, 1/15)` ($0.0667$ hr / $4$ min) | `exponential(0, 1/20)` ($0.0500$ hr / $3$ min) | Directo (Puerto 1) |
| **Alumno #5** | **B** | $M/M/2$ | $20$ | $14$ | $2$ | `exponential(0, 1/20)` ($0.0500$ hr / $3$ min) | `exponential(0, 1/14)` ($0.0714$ hr / $4.29$ min) | `Round Robin if Available` |
| **Alumno #6** | **A** | $M/M/1$ | $50$ | $70$ | $1$ | `exponential(0, 1/50)` ($0.0200$ hr / $1.2$ min) | `exponential(0, 1/70)` ($0.0143$ hr / $0.86$ min) | Directo (Puerto 1) |
| **Alumno #6** | **B** | $M/M/3$ | $42$ | $18$ | $3$ | `exponential(0, 1/42)` ($0.0238$ hr / $1.43$ min) | `exponential(0, 1/18)` ($0.0556$ hr / $3.33$ min) | `Round Robin if Available` |
| **Alumno #7** | **A** | $M/M/1$ | $28$ | $35$ | $1$ | `exponential(0, 1/28)` ($0.0357$ hr / $2.14$ min) | `exponential(0, 1/35)` ($0.0286$ hr / $1.71$ min) | Directo (Puerto 1) |
| **Alumno #7** | **B** | $M/M/2$ | $16$ | $10$ | $2$ | `exponential(0, 1/16)` ($0.0625$ hr / $3.75$ min) | `exponential(0, 1/10)` ($0.1000$ hr / $6$ min) | `Round Robin if Available` |
| **Alumno #8** | **A** | $M/M/1$ | $12$ | $16$ | $1$ | `exponential(0, 1/12)` ($0.0833$ hr / $5$ min) | `exponential(0, 1/16)` ($0.0625$ hr / $3.75$ min) | Directo (Puerto 1) |
| **Alumno #8** | **B** | $M/M/3$ | $36$ | $15$ | $3$ | `exponential(0, 1/36)` ($0.0278$ hr / $1.67$ min) | `exponential(0, 1/15)` ($0.0667$ hr / $4$ min) | `Round Robin if Available` |

---

### **6.3. Rúbrica de Calificación (Escala 1 a 10)**

| Criterio | Ponderación | Excelente (9 - 10) | Aprobado (6 - 8) | Insuficiente (1 - 5) |
| :--- | :---: | :--- | :--- | :--- |
| **Identificación de Elementos del Sistema** | **$20\%$** | Define con total precisión Entidades, Atributos, Actividades, Estados y Eventos para ambos casos. | Identifica los elementos con leves confusiones conceptuales. | Incompleto o sin correspondencia con el caso. |
| **Resolución Analítica ($M/M/1$ y $M/M/c$)** | **$40\%$** | Aplica las fórmulas de Kendall y Erlang C con exactitud matemática rigurosa a 4 decimales. | Cálculos correctos con pequeños errores de redondeo. | Fórmulas mal aplicadas o errores graves de concepto. |
| **Dimensionamiento y Toma de Decisiones** | **$25\%$** | Evalúa las alternativas de mejora y responde a los SLAs con fundamentación sólida. | Justifica las alternativas pero con análisis superficial. | No fundamenta decisiones de ingeniería. |
| **Vinculación con FlexSim y Comprobante** | **$15\%$** | Mapea objetos, configura régimen permanente con días suficientes y adjunta comprobante DNI válido. | Descripción aceptable pero genérica de FlexSim. | No vincula con FlexSim ni adjunta comprobante. |

---

## **7. PARTE IV: ANEXO DOCENTE - GUÍA DE CONTROL NUMÉRICO (SOLUCIONARIO)**

*Tabla de control oficial con las soluciones analíticas exactas para los 8 alumnos y los 2 ejercicios demostrativos.*

| Asignación | Ej. | Modelo | $\lambda$ | $\mu$ | $c$ | $\rho$ | $P_0$ | $P(\text{espera})$ | $L_q$ | $L$ | $W_q\text{ (min)}$ | $W\text{ (min)}$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Demo Clase** | **A** | $M/M/1$ | $30$ | $40$ | $1$ | $0.7500$ | $0.2500$ | $0.7500$ | $2.2500$ | $3.0000$ | $4.5000$ | $6.0000$ |
| **Demo Clase** | **B** | $M/M/2$ | $20$ | $15$ | $2$ | $0.6667$ | $0.2000$ | $0.5333$ | $1.0667$ | $2.4000$ | $3.2000$ | $7.2000$ |
| **Alumno #1** | **A** | $M/M/1$ | $18$ | $24$ | $1$ | $0.7500$ | $0.2500$ | $0.7500$ | $2.2500$ | $3.0000$ | $7.5000$ | $10.0000$ |
| **Alumno #1** | **B** | $M/M/2$ | $24$ | $16$ | $2$ | $0.7500$ | $0.1429$ | $0.6429$ | $1.9286$ | $3.4286$ | $4.8214$ | $8.5714$ |
| **Alumno #2** | **A** | $M/M/1$ | $45$ | $60$ | $1$ | $0.7500$ | $0.2500$ | $0.7500$ | $2.2500$ | $3.0000$ | $3.0000$ | $4.0000$ |
| **Alumno #2** | **B** | $M/M/3$ | $120$ | $50$ | $3$ | $0.8000$ | $0.0562$ | $0.6472$ | $2.5888$ | $4.9888$ | $1.2944$ | $2.4944$ |
| **Alumno #3** | **A** | $M/M/1$ | $40$ | $50$ | $1$ | $0.8000$ | $0.2000$ | $0.8000$ | $3.2000$ | $4.0000$ | $4.8000$ | $6.0000$ |
| **Alumno #3** | **B** | $M/M/2$ | $30$ | $20$ | $2$ | $0.7500$ | $0.1429$ | $0.6429$ | $1.9286$ | $3.4286$ | $3.8571$ | $6.8571$ |
| **Alumno #4** | **A** | $M/M/1$ | $25$ | $35$ | $1$ | $0.7143$ | $0.2857$ | $0.7143$ | $1.7857$ | $2.5000$ | $4.2857$ | $6.0000$ |
| **Alumno #4** | **B** | $M/M/3$ | $18$ | $8$ | $3$ | $0.7500$ | $0.0748$ | $0.5678$ | $1.7033$ | $3.9533$ | $5.6776$ | $13.1776$ |
| **Alumno #5** | **A** | $M/M/1$ | $15$ | $20$ | $1$ | $0.7500$ | $0.2500$ | $0.7500$ | $2.2500$ | $3.0000$ | $9.0000$ | $12.0000$ |
| **Alumno #5** | **B** | $M/M/2$ | $20$ | $14$ | $2$ | $0.7143$ | $0.1667$ | $0.5952$ | $1.4881$ | $2.9167$ | $4.4643$ | $8.7500$ |
| **Alumno #6** | **A** | $M/M/1$ | $50$ | $70$ | $1$ | $0.7143$ | $0.2857$ | $0.7143$ | $1.7857$ | $2.5000$ | $2.1429$ | $3.0000$ |
| **Alumno #6** | **B** | $M/M/3$ | $42$ | $18$ | $3$ | $0.7778$ | $0.0642$ | $0.6114$ | $2.1399$ | $4.4733$ | $3.0570$ | $6.3904$ |
| **Alumno #7** | **A** | $M/M/1$ | $28$ | $35$ | $1$ | $0.8000$ | $0.2000$ | $0.8000$ | $3.2000$ | $4.0000$ | $6.8571$ | $8.5714$ |
| **Alumno #7** | **B** | $M/M/2$ | $16$ | $10$ | $2$ | $0.8000$ | $0.1111$ | $0.7111$ | $2.8444$ | $4.4444$ | $10.6667$ | $16.6667$ |
| **Alumno #8** | **A** | $M/M/1$ | $12$ | $16$ | $1$ | $0.7500$ | $0.2500$ | $0.7500$ | $2.2500$ | $3.0000$ | $11.2500$ | $15.0000$ |
| **Alumno #8** | **B** | $M/M/3$ | $36$ | $15$ | $3$ | $0.8000$ | $0.0562$ | $0.6472$ | $2.5888$ | $4.9888$ | $4.3146$ | $8.3146$ |

---
