# StudyTime — Plan del Proyecto Práctico Final

Fecha de revisión: 2026-10-05. Equipo: Grupo P. Fuente: consigna del Proyecto Práctico Final ISW-307 entregada por el equipo, especialmente secciones 3, 5, 8, 9 y 10.

## Punto de partida y forma de trabajo

El repositorio público `sftwrenginr/StudyTime_GrupoP`, rama `main`, commit `9800595dea73c9a0ab9665e81c7b6426b73eb08c`, tiene cinco archivos de documentación y ningún proyecto ejecutable. No se pueden atribuir funcionalidades a sus carpetas por el nombre o por lo que promete su README.

Si existe código local previo, debe incorporarse a la revisión antes de generar una base. La organización `app/` que se propone abajo permite conservar los documentos de la Unidad IV; todavía no existe.

Cada cambio seguirá este ciclo: explicar el problema, consultar documentación oficial, implementación pequeña por el responsable, revisión/depuración, prueba real y registro de evidencia. La IA no generará módulos completos. El equipo no presentará documentación redactada por el asistente como prueba de autoría de código.

## Distribución propuesta

| Módulo / responsable | Función en StudyTime | Unidades y requisitos | Evidencia para cerrar |
| --- | --- | --- | --- |
| 1 — Luis Solano | Estructura base y recursos de estudio desde una API | U1–2: Ionic/Angular/Capacitor, tabs, routing, lazy loading, mínimo cuatro páginas. U10: GET y POST, carga y errores | Compilación; navegación por cuatro páginas y regreso desde detalle; respuestas GET/POST en Network; manejo de error; explicación de rutas y servicio |
| 2 — Joseph Reina | Planificar sesiones de estudio, lectura, exámenes y ocio; temporizador sencillo | U3: cards, lists, inputs, swipe y pull-to-refresh. U9: CRUD persistente con @ionic/storage-angular respaldado por IndexedDB en web | Crear, leer, editar y eliminar sesión; persistencia al recargar; swipe; refresco; temporizador iniciar/pausar/reiniciar |
| 3 — Alexander Tejeda | Estado de red, ubicación de estudio y dispositivos BLE cercanos | U4: @capacitor/network. U5: escaneo con plugin BLE real. U6: GPS, mapa Leaflet interactivo y marcadores | Cambio online/offline; permiso GPS concedido/denegado; marcador real; mapa navegable; escaneo BLE en equipo compatible o estado de limitación documentado |
| 4 — Alex Santana | Audio para concentración y foto de apuntes | U7: audio local con play/pause/stop y progreso personalizado. U8: fotografía con @capacitor/camera | Reproducción y controles; captura, cancelación y permiso denegado; evidencia en navegador compatible y móvil cuando sea posible |

La carga de Alexander incluye tres integraciones; se limita BLE al escaneo, sin emparejamiento, envío ni recepción de datos. La captura de foto satisface U8 sin añadir QR. El temporizador mantiene el propósito original de StudyTime.

## Pantallas e integración

Cuatro páginas principales bajo tabs: Inicio, Plan de estudio, Entorno y Recursos. Una página secundaria, Detalle del recurso, permitirá demostrar navegación de regreso. Inicio mostrará presentación/resumen; Plan agrupará sesiones y temporizador; Entorno contendrá conectividad, mapa y BLE; Recursos reunirá recursos REST, audio y cámara.

Luis prepara el contenedor y rutas. En este módulo las páginas de Joseph, Alexander y Alex solo tendrán título y aviso explícito de funcionalidad pendiente. Alex trabajará posteriormente en un componente multimedia/cámara dentro de Recursos, sin modificar el servicio REST de Luis. No habrá botones que aparenten funciones inexistentes.

Organización objetivo dentro de `app/`: `src/app/pages/`, `services/`, `models/`, `components/` y `src/assets/`. Las versiones se obtendrán del proyecto real, no de las versiones de ejemplo de la consigna. Capacitor permitirá preparar Android posteriormente; el desarrollo inicial será en navegador.

## Decisiones sencillas para revisar al implementarlas

- Componentes standalone si la base oficial seleccionada los genera. No mezclar NgModules y standalone sin necesidad.
- Servicio REST separado de la pantalla, mediante HttpClient. API de práctica candidata: JSONPlaceholder. Antes de integrarla se verificará su documentación y disponibilidad. GET listará recursos de demostración; POST enviará una sesión de prueba. Su respuesta no se presentará como guardado permanente en servidor.
- @ionic/storage-angular para CRUD, verificando driver IndexedDB y persistencia. No afirmar cumplimiento usando únicamente localStorage.
- Audio incluido como archivo local con licencia o autoría identificada, para reducir dependencia de conexión.
- @capacitor/camera para foto. Las adaptaciones web y permisos se revisarán en el módulo 4.
- Leaflet y GPS con botón de ubicación, permiso explícito y errores legibles. Las teselas online no se tratarán como mapa offline.
- BLE con plugin comunitario real cuya versión compatible se comprobará antes de instalar. La demostración nativa queda pendiente hasta disponer de hardware; una lista ficticia no equivale a escaneo.

No se añaden autenticación, pagos, sincronización automática, geofencing ni un servidor propio al alcance mínimo. Los datos de prueba no deben incluir información personal.

## Secuencia de desarrollo y puertas de validación

| Etapa | Trabajo autorizado en esta etapa | Condición para continuar |
| --- | --- | --- |
| 1.1, actual | Diagnóstico, preparación guiada de la base y registro del entorno | Luis aporta archivos de la base, resultado de compilación y captura real |
| 1.2 | Revisar la base; adaptar una pantalla y una ruta a la vez; completar cuatro páginas, tabs y detalle | Navegación y regreso funcionan; rutas diferidas revisadas |
| 1.3 | Explicar y revisar GET; después POST; carga y errores | Operaciones verificadas en Network; manejo de error visible; Luis explica el flujo |
| Cierre M1 | Revisar build, capturas, README y demostración de Luis | Todas las pruebas de M1 pasan o se resuelve cada fallo; aprobación técnica registrada |
| M2 | Desarrollo guiado de Joseph | CRUD, persistencia, gestos y temporizador comprobados |
| M3 | Desarrollo guiado de Alexander | Red, GPS/mapa y BLE real comprobados; limitaciones registradas |
| M4 | Desarrollo guiado de Alex | Audio y cámara comprobados |
| Integración final | Pruebas cruzadas, informe y defensas | Checklist de diez unidades y evidencias completas |

La primera entrega solo abordó la etapa 1.1. El equipo autorizó después continuar con asistencia de IA declarada, sin atribución ficticia de autoría. Se está preparando la base y una adaptación pequeña de Inicio. No se inicia ningún módulo posterior mientras el anterior no esté validado. Los planes de los otros módulos son asignaciones, no implementaciones.

## Registro y defensa

Por cada cambio, la bitácora guardará fecha, responsable real, archivos, motivo, resultado de prueba, problema/solución y captura. Los commits del código deben reflejar las contribuciones reales del equipo. Una explicación escrita por el asistente no sustituye la demostración del responsable.

Cada integrante preparará cinco minutos: necesidad del usuario, funcionamiento, código relevante, decisión técnica, prueba y limitación; después responderá dos o tres preguntas. Para M1: ¿qué diferencia hay entre ruta y página?, ¿qué se carga de forma diferida?, ¿qué diferencia hay entre GET y POST?, ¿dónde se captura el error?

## Informe final que se construirá durante el trabajo

La consigna pide portada UAPA e índice, introducción/objetivos/alcance, Canvas de nueve bloques, arquitectura y plugins con versiones reales, interfaces y navegación, desarrollo por integrante, pruebas/despliegue, conclusiones, referencias APA y anexos. El checklist indica 25 o más páginas. Cada módulo necesita al menos dos o tres capturas reales. Se requieren diez fuentes, al menos tres publicadas entre 2021 y 2026; no se inventarán fechas para documentación sin fecha.

El README final incluirá instalación reproducible, equipo con matrículas y módulos, tecnologías y capturas. No se redactarán conclusiones de éxito ni resultados de pruebas hasta obtener evidencia.

## Actualización del avance integrado

El usuario pidió continuar de manera autónoma con asistencia de IA declarada. Se implementaron y validaron las partes web de M1–M4 en pasos: navegación, REST controlado, CRUD/gestos, temporizador, red/mapa, estado BLE y multimedia/cámara web. Las validaciones nativas y externas permanecen pendientes; los resultados actuales y límites están en VALIDACION.md. Las etapas anteriores son históricas. No hay autoría estudiantil ni pruebas de hardware acreditadas.
