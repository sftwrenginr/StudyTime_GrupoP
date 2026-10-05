# Bitácora verificable — StudyTime Grupo P

## 2026-10-05 — Revisión y preparación del módulo 1

Responsable de la revisión documental: asistente técnico. Responsable del desarrollo asignado del módulo 1: Luis Solano. No atribuir estas modificaciones documentales a código desarrollado por Luis.

Fuente académica: consigna PDF aportada por el usuario. Repositorio: `https://github.com/sftwrenginr/StudyTime_GrupoP.git`. Rama: `main`. Commit inicial: `9800595dea73c9a0ab9665e81c7b6426b73eb08c`.

### Inspección realizada

Se clonó el repositorio y se consultaron `git ls-tree -r --name-only HEAD`, `git log`, los cinco archivos existentes y las herramientas locales. No existen `package.json`, `src/`, configuración Capacitor ni implementación de los módulos descritos en los documentos.

Entorno del asistente, no del equipo: Node v24.19.0, npm 11.9.0 y Git 2.51.1. Esto no demuestra compatibilidad de una app ni instalación de Ionic/Angular/Capacitor. npm imprimió una advertencia sobre la configuración de entorno `http-proxy`; no impidió obtener su versión y no se modificó la configuración del sistema.

### Problemas y tratamiento

| Problema | Evidencia | Acción | Estado |
| --- | --- | --- | --- |
| Falta código ejecutable | Solo cinco archivos en el árbol Git inicial; no `package.json` | Preparar revisión del código local, si existe, o guía de base oficial | Pendiente: Luis debe aportar/generar la base |
| Enlace de repositorio inconsistente | `ENLACE_GITHUB.txt` apuntaba a `AP4_EquipoP` | Corregido para apuntar al repositorio revisado | Corregido en la copia local |
| README describe objetivos de Unidad IV | Carpetas solo contienen promesas de implementación | Mantener antecedentes y aclarar estado del proyecto final | Corregido documentalmente |
| No se puede validar ejecución | No existe app que compilar | Marcar build, navegación y hardware como pendientes | Abierto |

### Cambios y motivos

- `README.md`: estado real, responsables, enlaces a guías, instrucciones condicionadas a existencia de app y evidencias pendientes.
- `ENLACE_GITHUB.txt`: enlace consistente con el repositorio inspeccionado.
- `documentacion/README.md`: enlaces al seguimiento del proyecto final.
- `documentacion/PLAN_TRABAJO.md`: cobertura de diez unidades, reparto en cuatro módulos, responsabilidades, secuencia y condiciones de cierre.
- `documentacion/MODULO_1_PASO_1.md`: primer paso explicado, comandos para ejecución por Luis, pruebas y capturas necesarias.
- `documentacion/BITACORA.md`: problemas, decisiones y resultados verificables.

### Decisiones de esta etapa

Conservar los antecedentes. Proponer app en subcarpeta `app/` para no sobrescribir documentación. Empezar con base oficial mínima y adaptarla gradualmente por el responsable. No escribir módulos completos con IA ni marcar funciones propuestas como implementadas. No iniciar M2, M3 ni M4 antes de validar M1.

### Verificación

| Verificación | Resultado | Límite de la evidencia |
| --- | --- | --- |
| Acceso Git remoto y clonación | Pasó | Revisión de repositorio público, no de código local del equipo |
| Revisión del árbol Git y documentos | Pasó | Se comprobó ausencia de app en el commit inicial |
| Disponibilidad Node/npm/Git del asistente | Pasó con advertencia npm | No representa entorno de Luis |
| Compilación y ejecución de StudyTime | No ejecutada | Falta código |
| Navegación, API y capturas reales M1 | Pendientes | No se generaron resultados ni capturas ficticias |

### Próxima acción

Luis aporta código previo si existe. Si no existe, ejecuta el paso 1 y envía archivos de configuración, resultado de build y captura real. La revisión de ese resultado continúa dentro del módulo 1.

## Plantilla para futuras entradas

Fecha y responsable real. Paso/módulo. Problema concreto. Archivos modificados. Explicación del cambio. Fuente consultada. Comando o acción de prueba. Resultado observado. Captura o registro. Fallos y solución. Condición pendiente para continuar.

## 2026-10-05 — Avance 01, asistencia de IA declarada

El usuario confirmó continuar con asistencia de IA declarada. Responsable real de esta implementación: asistente. La asignación académica del módulo a Luis se mantiene, pero no implica autoría de estos archivos. La política original de la asignatura sigue siendo la del PDF; este registro no la modifica ni demuestra autorización del facilitador.

Se ejecutó `npx --yes --package=@ionic/cli ionic start app blank --type=angular --capacitor --no-git --no-interactive`. La CLI descargó la base y generó NgModules, no standalone. Se conservó esta arquitectura, y se añadió `@ionic/cli` como dependencia de desarrollo. La ruta `/home` usa `loadChildren`. No se implementaron módulos completos.

Se adaptaron los textos de Inicio, el idioma/título HTML y la identidad Capacitor. El starter incluía Browserslist para navegadores fuera del soporte Angular; se retiró ese archivo para usar objetivos predeterminados. La segunda compilación pasó sin esa advertencia. Permanecen advertencias de dependencias transitivas obsoletas de la CLI y configuración `http-proxy`; no se ocultaron mediante instalación forzada.

La comprobación curl desde otra sesión no alcanzó el servidor. Se repitió de forma controlada iniciando servidor y cliente HTTP en el mismo proceso de prueba: `/home` respondió 200. Esto no se interpreta como validación visual. No se descargó Chromium correctamente; la prueba Playwright no llegó a ejecutarse y no hay captura real.

| Prueba | Resultado | Registro |
| --- | --- | --- |
| `npm run build`, versión final | Pasó | `evidencias/m1/build.txt` |
| Dependencias reales | Ionic 9.0.6, Angular 22.1.7, Capacitor 8.5.2 | `evidencias/m1/versiones.txt` |
| Servidor y GET `/home` | Pasó: HTTP 200, título StudyTime | `evidencias/m1/http.json`, `servidor.txt` |
| Navegador/captura | No ejecutada: instalación Chromium fallida | Problema descrito arriba |
| Tabs, cuatro páginas y API | Pendiente | No implementados |
| Funciones de M2–M4 | Pendiente | No iniciadas |

El detalle de cambios e instrucciones está en `AVANCE_01.md`. Próxima condición: comprobar Inicio y consola en navegador antes de ampliar la navegación. El módulo 1 completo no queda validado.

## 2026-10-05 — Desarrollo autónomo por etapas

Autorización: el usuario pidió resolver el trabajo y GitHub sin ejecución manual de comandos. Responsable real de cambios y pruebas: asistente, con IA declarada. Se mantuvieron las explicaciones por función y se avanzó tras validar cada parte web. El acceso físico a BLE/cámara/GPS y los servicios externos permanecen como límites abiertos.

Se incorporaron tabs y cuatro páginas; las pruebas de navegación pasaron. Se añadió servicio REST, detalle y formulario POST; pasaron éxitos controlados y errores. La API pública no fue accesible desde el entorno. Luego se añadió almacenamiento IndexedDB, CRUD y gestos; después el temporizador. Pasaron las seis pruebas de Plan. Se añadió Network y Leaflet/GPS, y después BLE; pasaron las comprobaciones web/emuladas y el estado no disponible, sin escaneo físico. Se creó audio local y controles; después captura/vista previa mediante Camera web. Pasaron las cuatro pruebas multimedia.

Problemas de prueba corregidos: IndexedDB se comprobó mediante recarga, no por aparición visual únicamente; el temporizador necesitó esperar actualización DOM después de Reiniciar; Ionic mantiene páginas anteriores ocultas, por lo que se limitó el selector Online/Offline a Entorno; el control Range se probó con ArrowRight en vez de End. Estos ajustes no inventaron éxitos ni reemplazaron hardware por resultados aparentes.

El navegador de prueba inicialmente falló al descargar Chromium desde CDN. Se utilizó un paquete Chromium temporal; su extracción automática falló por chown, y se extrajo el ejecutable sin modificar propietarios. Los argumentos de GPU del paquete no funcionaron aquí; se ejecutó con GPU deshabilitada. No se deshabilitó seguridad web. El navegador temporal no se incorpora al proyecto.

Se creó/sincronizó Android con ocho plugins, y se añadió permiso GPS y la declaración BLE neverForLocation. No se compiló APK local: no hay SDK configurado y Java disponible es 17. Se preparó un job Android con Java 21 en Actions. El workflow no se ha ejecutado.

GitHub: prueba de push en seco a studytime/asistencia-ia falló por ausencia de credenciales. No hubo publicación ni cambios remotos. Se identificó un plugin GitHub disponible, pero no se confirmó conexión. Los commits y la propuesta de publicación quedan preparados localmente.

Verificación final: build, lint y cinco suites E2E pasaron. Consulte VALIDACION.md y los registros bajo evidencias/. Las capturas ahora existentes son reales del navegador de prueba; algunas contienen datos controlados identificados como tales.

## Cierre local y conexión GitHub — 5 de octubre de 2026

GitHub figura instalado. El catálogo de herramientas de la sesión no expone operaciones GitHub y Git no dispone de credenciales para el remoto. No se publicó ninguna rama ni se ejecutó Actions. Se validó la sintaxis YAML del workflow con PyYAML; esto no demuestra que los jobs hayan corrido. Se guarda una rama local con la implementación y sus evidencias, usando identidad del asistente.

## Nombre y comprobación de permisos GitHub

La rama local se renombró a `studytime/desarrollo`. Las herramientas GitHub ya están disponibles y la cuenta autenticada es sftwrenginr, con permiso push sobre StudyTime_GrupoP. Sin embargo, la creación del primer blob devolvió HTTP 403, Resource not accessible by integration. La única instalación que informa el conector corresponde a cruzayala, no al propietario sftwrenginr. No se creó rama remota ni se publicó código. Se requiere instalar/configurar la integración en la cuenta propietaria y habilitar StudyTime_GrupoP.

## Publicación en GitHub

Se confirmó la instalación del conector en sftwrenginr y pasó la prueba de escritura. Se publicaron los archivos mediante la API Git de GitHub, verificando las huellas SHA de los blobs binarios. La rama studytime/desarrollo contiene el avance y se abrió el PR #1 como borrador: https://github.com/sftwrenginr/StudyTime_GrupoP/pull/1 . El commit inicial remoto es f2f419ba2928217232036dcd5ef6bf030702c049. Actions inició el run 37367850362 y los jobs web/android están en cola. Todavía no hay resultado remoto ni APK. Se conserva el historial de etapas local en studytime/historial-local.

## Revisión de cancelación BLE e informe técnico

Se corrigió una carrera asíncrona: initialize/requestLEScan podían finalizar después de salir de Entorno. Un número de búsqueda invalida resultados tardíos y un contador bloquea solicitudes solapadas durante la limpieza. Pasaron cuatro pruebas específicas con el plugin controlado, build, lint y la suite Entorno. Las evidencias no acreditan escaneo físico.

Se preparó el informe Word con índice automático, Canvas, arquitectura, explicaciones, nueve capturas locales identificadas, resultados y 21 referencias. Se revisaron los renders y se corrigieron saltos, código justificado y filas partidas. La portada y las pruebas físicas siguen incompletas por falta de datos y dispositivos. La asistencia permanece declarada.

## Aceptación del PR y preparación de defensa

El usuario aceptó el PR #1. main contiene el merge 14616d7b401d148c4f70f1875cc031383a8d3311. Actions inició el run 37371974148 y los trabajos seguían en cola, sin pasos ni logs. No se reintentó una compilación que no había fallado ni se afirmó disponer de APK.

Se prepararon una presentación editable de doce diapositivas, notas de apoyo, guía de defensa por integrante y casos Android pendientes. La presentación usa capturas existentes del navegador, identifica datos controlados y conserva la declaración de asistencia. No se inventaron resultados de teléfono. README refleja ahora main.

## APK Android y nueva validación funcional

El 5 de octubre se confirmó que el job Android 111971107843 del run 37371974148 terminó correctamente, compiló assembleDebug y publicó el artefacto 11370717990. Se descargó el ZIP y se verificó su SHA-256, la integridad de ambas estructuras ZIP y la presencia de AndroidManifest.xml/classes.dex. Las huellas están en evidencias/android-apk.json. No se instaló en hardware.

El job web 111971107526 fue cancelado; se solicitó reintentar únicamente ese trabajo. Localmente volvieron a pasar build, lint, cuatro pruebas BLE y las cinco suites E2E, sin errores JavaScript no controlados. Los éxitos REST siguen interceptados, GPS emulado y cámara con PNG elegido. Se conservan las capturas previas porque la aplicación no cambió.
