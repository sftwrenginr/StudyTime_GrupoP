# Validación final del avance integrado

Fecha: 5 de octubre de 2026. Entorno: Node 24.19.0, npm 11.9.0 y Chromium 153.0.8010.0 automatizado. Pruebas realizadas por el asistente, no por los integrantes ni en sus equipos.

## Resultados

| Área | Resultado observado | Límite |
| --- | --- | --- |
| Build | Pasó | Producción web, no APK |
| Lint | Pasó | No valida funciones físicas |
| Navegación | Cuatro tabs, detalle y regreso pasaron | Navegador automatizado |
| API | GET/POST y errores controlados pasaron | Éxitos con respuestas interceptadas; API pública no accesible desde este entorno |
| CRUD | Crear, leer, editar, completar, eliminar y persistir pasaron | IndexedDB en Chromium |
| Gestos | Swipe y pull-to-refresh táctil pasaron | Acciones reales enviadas al navegador automatizado |
| Temporizador | Inicio, pausa, continuar y reinicio pasaron | Sin prueba de suspensión de app Android |
| Offline | Crear sesión/audio en app abierta pasó | No hay arranque PWA offline en frío |
| Red | Cambios online/offline pasaron | No acredita conectividad a cada servidor externo |
| Mapa | Controles y marcadores pasaron | No se acredita descarga real de teselas |
| GPS | Posición emulada y permiso denegado pasaron | No medición con sensor físico |
| BLE | Estado sin soporte/adapter correctamente informado | Escaneo de periférico físico pendiente |
| Audio | WAV reproducido, pausa/stop/progreso y salida de pantalla pasaron | No prueba subjetiva de calidad de sonido |
| Cámara | Selección, carga y retirada de PNG mediante Camera web pasaron | No captura con lente físico ni prueba de permisos Android |
| Android | `cap add` y `cap sync` pasaron | APK debug compilado en GitHub; integridad del ZIP/APK comprobada; instalación física pendiente |
| GitHub | PR #1 aceptado y código en main; Actions iniciado | Android exitoso con artefacto; web cancelado y reintento solicitado |

Las cinco suites volvieron a pasar en conjunto después de integrar todos los módulos. Tras corregir la cancelación BLE, pasaron cuatro pruebas específicas con el plugin controlado, build, lint y la suite Entorno. Los resultados JSON y capturas se generan desde `app/scripts/`. Los registros distinguen los datos controlados de los físicos y remotos.

## Evidencias

- `evidencias/build-final.txt`, `lint.txt` y `dependencias.txt`.
- M1: `evidencias/m1/navegacion.json`, `api.json`; capturas Inicio, GET y POST controlados.
- M2: `evidencias/m2/pruebas.json`; capturas Plan y eliminación.
- M3: `evidencias/m3/pruebas.json`, `ble-cancelacion.json`, `build-cancelacion.txt` y `lint-cancelacion.txt`; capturas Offline y mapa con GPS emulado.
- M4: `evidencias/m4/pruebas.json`; capturas reproductor y PNG de prueba.
- Android: `evidencias/android-sync.txt`.

El primer avance no tenía navegador. Se consiguió Chromium posteriormente con un paquete de prueba, se extrajo su ejecutable y se usó sin GPU en este entorno. Ese paquete y ejecutable son herramientas temporales, no dependencias de StudyTime. Las pruebas del repositorio usan Playwright estándar; `STUDYTIME_CHROMIUM_PATH` permite indicar opcionalmente un ejecutable disponible.

## Reproducir pruebas

Dentro de `app/`: `npm ci`, `npx playwright install chromium`, `npm run test:e2e`. El script corre las suites secuencialmente y se detiene si una falla. No se necesitan credenciales para las pruebas locales; los éxitos REST controlados se identifican en su salida.

GitHub Actions incluye build, lint, test:ble y E2E con capturas, y un job Android debug con Java 21. Android terminó correctamente en el run 37371974148 y publicó `studytime-android-debug`. Se descargó el ZIP, se verificó su SHA-256 y la integridad del APK. El job web fue cancelado y se solicitó reintento. Las cinco suites locales volvieron a pasar, además de build, lint y las cuatro pruebas BLE.

## Condiciones pendientes para una entrega académica completa

Confirmar la modalidad de asistencia de IA según la política de la asignatura. Añadir matrículas y portada UAPA con datos reales. Se creó el borrador del informe Word con más de 25 páginas e índice automático en informe/Informe_Tecnico_StudyTime.docx. Falta completar los datos institucionales, incorporar pruebas físicas y realizar la defensa individual.

Revisar el reintento del job web de Actions. Validar la API pública desde un entorno con acceso externo, mapa con teselas y sensores/permiso en un teléfono. Ejecutar escaneo BLE con un periférico anunciando, cámara física y GPS real. Estas pruebas no pueden sustituirse por capturas simuladas ni afirmar su éxito a partir de un build web.

## Material de defensa

Presentación editable de doce diapositivas en presentacion/Presentacion_StudyTime.pptx, notas de apoyo y GUIA_DEFENSA.md. Los casos de teléfono en PRUEBAS_ANDROID.md continúan pendientes. El informe Word conserva el estado previo a aceptar el PR #1; README y bitácora documentan la aceptación.
