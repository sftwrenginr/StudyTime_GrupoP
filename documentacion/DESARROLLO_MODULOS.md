# Desarrollo explicado por módulos

Registro del asistente, 5 de octubre de 2026. La asignación de un módulo a un integrante es académica; no prueba autoría estudiantil. Código generado con asistencia de IA declarada. Se desarrollaron funciones por etapas y se ejecutó validación web antes de incorporar el siguiente módulo. Las restricciones externas y de hardware permanecen abiertas.

## Módulo 1 — asignado a Luis Solano

El objetivo es conectar las pantallas y demostrar consumo REST sin mezclar solicitudes con HTML. Primero se creó la base oficial, se modificaron los textos y la identidad de Capacitor y se compiló. Después se añadió el contenedor Tabs y se validaron los cuatro clics. Finalmente se añadió HttpClient y se probaron solicitudes y errores.

`app-routing.module.ts` carga el contenedor Tabs. Sus hijos cargan Inicio, Plan, Entorno y Recursos mediante importaciones dinámicas. El detalle de recurso incluye un botón de regreso con ruta de respaldo, para que funcione incluso al abrir el detalle directamente. Una ruta desconocida vuelve a Inicio. `PreloadAllModules` puede descargar páginas después del arranque: lazy loading no implica ausencia de precarga.

```typescript
{ path: 'plan', loadChildren: () => import('../plan/plan.module').then(m => m.PlanPageModule) }
```

`ApiService` contiene la URL pública, GET de lista/detalle y POST. `provideHttpClient()` configura la dependencia en AppModule. `firstValueFrom()` permite explicar el flujo con async/await; `timeout(10000)` impide espera indefinida. Las pantallas usan signals para carga/error/resultado y así actualizan la interfaz en Angular sin depender de Zone.js.

POST envía título, descripción y userId de prueba. El formulario rechaza campos vacíos. La confirmación aclara que JSONPlaceholder no guarda permanentemente el envío. Si falla GET, los recursos anteriores permanecen en memoria hasta recargar; no se promete una caché persistente ni sincronización automática.

Validación: las cuatro tabs pasaron; detalle/regreso, formulario, solicitudes correctas y estados de error pasaron con red controlada. La API pública real no respondió desde este entorno; el mensaje de error real sí se comprobó. Evidencias: `evidencias/m1/navegacion.json`, `api.json` y capturas M1. Los POST controlados no son prueba de un envío remoto.

## Módulo 2 — asignado a Joseph Reina

El problema es planificar actividades y conservarlas sin conexión. Primero se añadieron los tipos de sesión y un servicio de almacenamiento. Luego se implementaron formulario, edición, marcado de completada y eliminación con confirmación. Después se incorporaron swipe y pull-to-refresh. Por último se agregó el temporizador.

`IonicStorageModule` configura únicamente IndexedDB; no se cae silenciosamente a localStorage. `SesionesService` inicializa la base una vez y espera esa promesa antes de cada operación. Guarda una lista pequeña de sesiones bajo una clave. Esta decisión simplifica el proyecto; no pretende escalar a miles de registros ni sustituir una base relacional.

```typescript
const index = sesiones.findIndex(s => s.id === sesion.id);
if (index < 0) sesiones.push(sesion); else sesiones[index] = sesion;
await this.storage.set(this.key, sesiones);
```

Crear y actualizar comparten el formulario, pero el servicio decide si añade o reemplaza por ID. Eliminar filtra por ID. Cada sesión tiene título, categoría, minutos y estado completada. La validación acepta minutos enteros de 1 a 240. Los controles se bloquean mientras se escribe para reducir operaciones simultáneas. La eliminación requiere confirmación explícita.

`ion-item-sliding` expone Eliminar al deslizar; `ion-refresher` recarga la lista y siempre completa el refresco, incluso ante error. El temporizador es un servicio raíz: continúa entre pantallas y permite iniciar/pausar/continuar/reiniciar. Calcula contra una fecha de fin, no restando uno a una variable en cada tick. No garantiza ejecución en segundo plano nativo ni conserva el contador al reiniciar la app.

Las seis pruebas de la suite Plan pasaron: CRUD y persistencia, temporizador, creación offline en una app abierta, swipe y refresco táctil. La primera comprobación de reinicio leyó el DOM antes de actualizarse; al esperar la condición observable pasó sin cambiar la implementación. Evidencias: `evidencias/m2/pruebas.json` y capturas M2.

## Módulo 3 — asignado a Alexander Tejeda

El objetivo es informar de conectividad, ubicar un lugar de estudio y demostrar integración BLE básica. Primero se instaló Network y se creó un servicio con estado inicial y listener. Después se incorporó Leaflet y un botón GPS. Finalmente se añadió el plugin BLE con ramas nativa/web y errores legibles.

El indicador usa el estado que reporta Network; Online no prueba que JSONPlaceholder u OpenStreetMap sean accesibles. `RedService` elimina su listener al destruirse. IndexedDB permite seguir gestionando sesiones cuando la app abierta pasa a offline.

Leaflet se crea una sola vez por página y actualiza su tamaño al entrar. GPS se solicita al pulsar el botón; no hay rastreo continuo ni localización en segundo plano. Un círculo azul indica ubicación; tocar el mapa crea un marcador naranja definido por el usuario. Limpiar elimina esos marcadores y conserva la ubicación. Los lugares no persisten al recargar. Las teselas son externas y necesitan internet; no se garantiza un mapa offline.

BLE nativo usa `initialize()` y `requestLEScan()` durante ocho segundos; se deduplican dispositivos por `deviceId`, y `stopLEScan()` detiene el escaneo al terminar o salir. La rama web usa `requestDevice()` para abrir el selector del navegador. Si no existe soporte o se cancela, se muestra el problema. No hay conexiones GATT, transferencia de archivos ni soporte Bluetooth clásico. `androidNeverForLocation` indica que los resultados BLE no se usan para derivar ubicación; GPS es una función separada.

Se validaron cambios online/offline, coordenadas emuladas, marcadores, zoom, limpiar y permiso denegado. Se validó el mensaje BLE sin soporte/adapter. **No se hizo un escaneo BLE físico ni una medición GPS real.** La descarga de teselas no se acredita. Evidencias: `evidencias/m3/pruebas.json` y capturas M3; la captura GPS está etiquetada como emulada.

## Módulo 4 — asignado a Alex Santana

El objetivo es reproducir audio con controles propios y mostrar una foto de apuntes. Primero se creó un WAV local de veinte segundos con volumen reducido; después se conectaron eventos multimedia y botones; finalmente se añadió Camera y la vista previa.

El componente multimedia se declara dentro del módulo Recursos y conserva separada la lógica REST de Luis. El audio usa HTMLMediaElement; Play, Pause y Stop llaman métodos reales del elemento. Los eventos actualizan estado y progreso. El control Ionic Range cambia `currentTime`; el toggle establece `loop`. Salir de Recursos pausa el audio. El archivo local tiene procedencia documentada y licencia CC0; no usa grabaciones comerciales ni afirma efectos terapéuticos.

Camera usa `takePhoto()` de la versión instalada, que evita la API anterior `getPhoto()` marcada como obsoleta. En web `webUseInput: true` permite usar la selección/captura que ofrece el navegador. En Android se solicita una fotografía al plugin. La vista previa utiliza `webPath`, o la conversión de URI nativa. No se promete guardar la foto en IndexedDB ni galería: la vista previa se pierde al recargar. El botón se desbloquea también en caso de cancelación/error.

Las pruebas comprobaron reproducción real del WAV, pausa, detener, avance con teclado, pausa al salir, uso offline en app abierta y selección/vista previa/eliminación de un PNG. La prueba inicial de progreso utilizó End, que el control no aplicó en este entorno; se verificó ArrowRight, operación realmente admitida. **El PNG elegido por automatización no prueba una captura con cámara física.** Evidencias: `evidencias/m4/pruebas.json` y capturas M4.
