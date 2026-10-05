# Validación pendiente en Android

Esta guía define pruebas reproducibles. Todos los casos de teléfono están pendientes. No se dispone de un dispositivo conectado en esta sesión. Las pruebas automatizadas web y de plugin controlado no certifican sensores físicos.

## Obtención de la aplicación

Abrir GitHub Actions y seleccionar una ejecución satisfactoria de la versión que se va a probar. Si el trabajo Android termina correctamente, descargar el artefacto `studytime-android-debug`, descomprimirlo y localizar `app-debug.apk`. Si el trabajo continúa en cola o falla, todavía no hay un APK acreditado. La firma debug sirve para pruebas, no para distribución de producción.

Registrar el commit y el ID del run. Instalar únicamente el APK generado por ese run en el teléfono de prueba. Android puede pedir permiso para instalar desde la aplicación que abre el archivo. El proyecto usa Android 7.0 o posterior (minSdk 24). Conservar los datos del dispositivo y la versión de Android en el registro, sin incluir información personal innecesaria.

## Casos y evidencias

| Caso | Procedimiento | Resultado esperado | Estado |
| --- | --- | --- | --- |
| Inicio y navegación | Abrir las cuatro tabs, detalle REST y regreso | Controles accesibles y ruta de regreso válida | Pendiente |
| CRUD | Crear, editar, completar, cerrar y abrir la app | Sesión persistente con sus cambios | Pendiente |
| Gestos | Deslizar una sesión y confirmar eliminar, luego refrescar | Eliminación y refresco sin bloqueos | Pendiente |
| Offline | Con la app abierta, activar modo avión y crear una sesión | Indicador Offline y operación local guardada | Pendiente |
| GPS permitido | Activar ubicación, pulsar Mi ubicación y aceptar permiso | Coordenadas del teléfono, precisión y marcador | Pendiente |
| GPS denegado | Denegar el permiso y solicitar ubicación | Mensaje legible, sin cierre inesperado | Pendiente |
| Mapa | Con conexión, cambiar zoom, marcar y limpiar un lugar | Teselas visibles y marcadores operativos | Pendiente |
| BLE | Activar Bluetooth y un periférico BLE que anuncie, conceder permisos y buscar | Dispositivo observado sin duplicados y fin del escaneo | Pendiente |
| BLE al salir | Iniciar búsqueda y cambiar de pantalla durante inicialización/escaneo | Escaneo detenido y resultados tardíos descartados | Pendiente |
| Audio | Reproducir, pausar, detener, mover progreso y salir | Audio real y pausa al salir | Pendiente |
| Cámara | Tomar una foto nueva, mostrarla, quitarla y cancelar otra captura | Vista previa válida y botón desbloqueado | Pendiente |
| REST remoto | Actualizar recursos y enviar POST desde una conexión externa | Respuesta real o error controlado registrado | Pendiente |
| Temporizador | Iniciar, pausar, continuar, reiniciar y cambiar de pantalla | Contador coherente en primer plano | Pendiente |

No usar auriculares Bluetooth clásicos como supuesto periférico BLE de prueba. Esta aplicación busca anuncios BLE y no implementa transferencia de archivos ni emparejamiento de audio. Documentar por separado cualquier comportamiento del temporizador al suspender Android, porque la versión actual no garantiza una alarma en segundo plano.

## Registro de una ejecución

Para cada caso, anotar fecha, responsable que realmente lo ejecutó, commit, dispositivo/Android, condiciones de conexión/permisos, pasos, resultado observado y referencia a captura o video. Usar «pasó», «falló» o «no ejecutado» según la observación. No rellenar por anticipado valores de precisión GPS, nombres de periféricos, IDs de respuesta ni resultados de permisos.

Las capturas mínimas de teléfono son: navegación, sesión recuperada tras abrir de nuevo, Offline, mapa con GPS real, escaneo con periférico BLE y foto nueva. Para audio y gestos, un video breve puede mostrar mejor el comportamiento. No sustituir estas pruebas por las capturas existentes de Chromium.
