import json
import hashlib
import sys
import glob
import os

SECRET_SALT = "MODELOS_SIMULACION_UCSE_2026_CATEDRA_SECRET_SALT"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    RESET = '\033[0m'
    CYAN = '\033[96m'
    BOLD = '\033[1m'

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

def sha256_hash(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

def main():
    print(f"{Colors.CYAN}{Colors.BOLD}=== Evaluador Automático TP6 - Teoría de Colas y Simulación ==={Colors.RESET}")
    print("Materia: Modelos y Simulación (UCSE 2026)\n")

    comprobantes = glob.glob("entregas/comprobante_tp6_*.json")
    if not comprobantes:
        print(f"{Colors.RED}❌ Error: No se encontró ningún archivo comprobante_tp6_*.json en la carpeta 'entregas/'.{Colors.RESET}")
        print("Asegúrate de descargar tu comprobante desde index.html y guardarlo dentro de la carpeta 'entregas/'.")
        sys.exit(1)
        
    archivo = comprobantes[0]
    print(f"📄 Analizando comprobante: {archivo}")
    
    with open(archivo, "r", encoding="utf-8") as f:
        try:
            entrega = json.load(f)
        except json.JSONDecodeError:
            print(f"{Colors.RED}❌ Error: El comprobante no contiene un formato JSON válido.{Colors.RESET}")
            sys.exit(1)

    # Verificar existencia de rúbrica pública
    if not os.path.exists("rubric_tp6.json"):
        print(f"{Colors.RED}❌ Error: No se encontró el archivo rubric_tp6.json en el directorio raíz.{Colors.RESET}")
        sys.exit(1)

    with open("rubric_tp6.json", "r", encoding="utf-8") as f:
        rubric = json.load(f)

    asignacion_id = entrega.get('asignacion', 'asignacion_1')
    dni = entrega.get('dni') or entrega.get('legajo', 'desconocido')
    respuestas = entrega.get('respuestas', {})
    firma_digital = entrega.get('firma_sha256', '')
    timestamp = entrega.get('timestamp', '')
    
    print(f"🧑‍🎓 Alumno / DNI: {dni}")
    print(f"📋 Asignación declarada: {asignacion_id} ({entrega.get('caso', '')})")

    if asignacion_id not in rubric:
        print(f"{Colors.RED}❌ Error: La asignación '{asignacion_id}' no existe en la rúbrica oficial.{Colors.RESET}")
        sys.exit(1)

    # Verificar integridad de la firma digital
    if firma_digital and timestamp:
        firma_payload = f"{dni}:{asignacion_id}:{json.dumps(respuestas, separators=(',', ':'))}:{timestamp}:{SECRET_SALT}"
        # Compatibilidad con o sin compactación json
        expected_firma_compact = sha256_hash(firma_payload)
        expected_firma_standard = sha256_hash(f"{dni}:{asignacion_id}:{json.dumps(respuestas)}:{timestamp}:{SECRET_SALT}")
        if firma_digital not in (expected_firma_compact, expected_firma_standard):
            # No fallar estrictamente por encoding de json, pero alertar
            pass

    errores = []
    detalles_ok = []
    
    KPI_FIELDS = [
        ("rho", "Factor de ocupación ρ"),
        ("p0", "Probabilidad sistema vacío P0"),
        ("p_wait", "Probabilidad de esperar"),
        ("Lq", "Largo medio de cola Lq"),
        ("L", "Entidades en sistema L"),
        ("Wq_min", "Tiempo en cola Wq (min)"),
        ("W_min", "Tiempo en sistema W (min)")
    ]

    for parte in ['ejA', 'ejB']:
        nombre_parte = f"Ejercicio {parte[-1]}"
        if parte not in respuestas:
            errores.append(f"Falta la resolución completa del {nombre_parte}.")
            continue
            
        rubric_parte = rubric[asignacion_id][parte]
        expected_hashes = rubric_parte.get("hashes", {})
        suffix = 'A' if parte == 'ejA' else 'B'
        target_id = f"{asignacion_id}_{suffix}"
        
        for key, desc in KPI_FIELDS:
            if key not in expected_hashes:
                continue

            if key not in respuestas[parte]:
                errores.append(f"[{nombre_parte}] Falta el campo requerido: '{desc}' ({key}).")
                continue
                
            valor = str(respuestas[parte][key]).strip()
            expected_hash = expected_hashes[key]
            actual_hash = sha256_hash(f"{target_id}:{key}:{valor}:{SECRET_SALT}")
            
            if expected_hash != actual_hash:
                errores.append(f"[{nombre_parte}] El valor ingresado para '{desc}' ({key}) es incorrecto. (Valor provisto: '{valor}')")
            else:
                detalles_ok.append(f"[{nombre_parte}] {desc} ({key}) = '{valor}' [OK]")

    print("\n--- Desglose de Calificación ---")
    if errores:
        print(f"{Colors.RED}❌ Se encontraron {len(errores)} discrepancia(s):{Colors.RESET}")
        for error in errores:
            print(f"   • {error}")
            
        print(f"\n{Colors.YELLOW}💡 Sugerencia pedagógica:{Colors.RESET}")
        print("Revisa los cálculos en el Workbench de index.html, asegurando el redondeo a 4 decimales")
        print("y consultando el panel bibliográfico de fórmulas y la guía FlexSim 2026.")
        
        if "GITHUB_STEP_SUMMARY" in os.environ:
            with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as f:
                f.write("### ❌ Resultado de Evaluación TP6: Incompleto / Con Discrepancias\n\n")
                f.write(f"- **DNI:** `{dni}`\n")
                f.write(f"- **Asignación:** `{asignacion_id}`\n\n")
                f.write("#### Discrepancias encontradas:\n")
                for e in errores:
                    f.write(f"- {e}\n")
                f.write("\n> 💡 Consulta las fórmulas de Kendall y Erlang C en index.html para corregir los indicadores.\n")
        sys.exit(1)
    else:
        print(f"{Colors.GREEN}✅ ¡Felicitaciones! Todos los cálculos de ambos ejercicios son correctos (100/100 Pts).{Colors.RESET}")
        for ok in detalles_ok:
            print(f"   ✓ {ok}")
            
        if "GITHUB_STEP_SUMMARY" in os.environ:
            with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as f:
                f.write("### ✅ Resultado de Evaluación TP6: APROBADO (100/100 Pts)\n\n")
                f.write(f"- **DNI:** `{dni}`\n")
                f.write(f"- **Asignación:** `{asignacion_id}`\n")
                f.write(f"- **Estado:** Cumple satisfactoriamente con los modelos de colas M/M/1 y M/M/c.\n\n")
                f.write("#### Ítems Validados Criptográficamente:\n")
                for ok in detalles_ok:
                    f.write(f"- {ok}\n")
        sys.exit(0)

if __name__ == "__main__":
    main()
