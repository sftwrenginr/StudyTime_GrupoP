# Guía de defensa de StudyTime

Material de preparación del Grupo P. Las diapositivas y las notas orientan la explicación individual de cinco minutos. El reparto no acredita autoría estudiantil ni una exposición ya realizada. La asistencia de IA permanece declarada en README e informe.

Antes de exponer, abrir la aplicación, comprobar qué servicios externos responden y consultar el resultado actual de Actions. Las capturas automatizadas son apoyo visual. Cuando una prueba usa GPS emulado, una respuesta HTTP interceptada o un PNG elegido, identificarlo expresamente.

## Luis Solano

Usar diapositivas 3 y 4. Presentar durante treinta segundos el propósito de Inicio y Recursos. En dos minutos, recorrer las cuatro tabs, abrir un detalle, volver y enviar un POST de práctica. Si el servidor no responde, mostrar el error real y utilizar la captura controlada únicamente para explicar el caso exitoso.

Dedicar noventa segundos a `app/src/app/pages/tabs/tabs-routing.module.ts` y `app/src/app/services/api.service.ts`. Explicar `loadChildren`, HttpClient, GET/POST, `firstValueFrom` y `timeout(10000)`. El detalle conserva una ruta de regreso. La precarga de Angular puede descargar páginas después del arranque aunque las rutas empleen carga diferida.

Cerrar con un minuto sobre validación y errores. Pregunta probable: ¿el POST conserva una sesión? Respuesta: JSONPlaceholder devuelve una respuesta de demostración, pero no conserva el envío. Las sesiones de StudyTime se guardan por separado en IndexedDB.

## Joseph Reina

Usar diapositivas 5 y 6. Presentar la organización de actividades. Demostrar crear, editar, completar y recargar para comprobar persistencia. Deslizar una sesión, eliminar con confirmación y refrescar la lista. Iniciar el temporizador, pausar, continuar, cambiar de tab y regresar.

Seguir `app/src/app/services/sesiones.service.ts` desde la apertura de Storage hasta `storage.set`. El servicio conserva una colección pequeña bajo una clave y diferencia creación/edición por ID. Los minutos deben ser enteros entre 1 y 240. Explicar cómo el formulario bloquea una escritura pendiente.

En `temporizador.service.ts`, explicar la fecha de fin. Conservar el contador entre páginas no equivale a guardarlo tras recargar. No afirmar ejecución garantizada cuando Android suspende la aplicación. Pregunta probable: ¿qué ocurre si se borran los datos de la aplicación? También puede perderse IndexedDB.

## Alexander Tejeda

Usar diapositivas 7 y 8. Mostrar el estado de red y solicitar ubicación conscientemente. Si hay un dispositivo real y permisos, situar el marcador, cambiar zoom y añadir/limpiar un lugar. Si se usa una ubicación emulada, indicarlo. Las imágenes del mapa dependen de OpenStreetMap y de la conexión externa.

Explicar `red.service.ts` y la página Entorno. Network informa conectividad, pero no comprueba que un servidor concreto esté disponible. GPS y los resultados BLE son funciones diferentes. El valor `androidNeverForLocation` declara que el escaneo BLE no se utiliza para derivar ubicación.

Seguir `ble.service.ts`: inicialización, escaneo nativo de ocho segundos, deduplicación y detención. En web se abre un selector compatible. Explicar por qué `busquedaActual` descarta respuestas tardías y `operacionesPendientes` evita solicitudes solapadas. Cuatro pruebas con plugin controlado pasaron. Pregunta probable: ¿una lista vacía prueba un fallo? Puede significar que no hay periféricos anunciando. Todavía falta un escaneo físico documentado.

## Alex Santana

Usar diapositivas 9 y 10. Reproducir el WAV local, pausar, detener, cambiar progreso y activar repetición. Cambiar de pantalla para mostrar la pausa. Solicitar una foto, mostrarla y quitarla. En navegador, seleccionar una imagen no acredita una captura con lente.

Seguir `app/src/app/components/multimedia/multimedia.component.ts`. Explicar HTMLMediaElement y sus eventos, el control Range y `Camera.takePhoto`. El WAV tiene procedencia y licencia CC0 documentadas. La foto utiliza `webPath` o conversión de URI nativa. El bloque finally libera el botón también después de cancelar.

Pregunta probable: ¿dónde se conserva la fotografía? La vista previa está en memoria, no en IndexedDB ni galería. Se pierde al recargar. La comprobación física y los permisos Android siguen pendientes.

## Material de apoyo

La presentación está en `presentacion/Presentacion_StudyTime.pptx`. Sus notas incluyen fuentes del repositorio y sugerencias de explicación. El informe Word sigue siendo una instantánea del estado anterior a aceptar el PR #1. Para el estado posterior de GitHub, consultar README y bitácora.

Los participantes deben practicar sobre las funciones reales y responder con lo que comprendan y hayan observado. No convertir los guiones en afirmaciones de experiencias o contribuciones no comprobadas.
