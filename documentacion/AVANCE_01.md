# Avance 01 — Base e Inicio

## Qué se realizó

El asistente creó la base mediante la CLI oficial de Ionic, con Angular y Capacitor. Este avance se elaboró con asistencia de IA declarada. No se atribuye su autoría a Luis ni a sus compañeros y no demuestra que hayan ejecutado pruebas en sus equipos.

La CLI generó NgModules; conservamos esa estructura para no añadir una migración innecesaria. El texto y nombre de la pantalla inicial se adaptaron a StudyTime. No existen aún las cuatro páginas, tabs, API ni funcionalidades de módulos posteriores.

## Explicación de los cambios

| Archivo | Cambio | Motivo |
| --- | --- | --- |
| `app/src/app/home/home.page.html` | Títulos StudyTime y texto de organización del tiempo | Adaptar la primera pantalla al propósito de la app |
| `app/src/index.html` | Idioma `es` y título StudyTime | Identificar la app y su idioma para navegador/accesibilidad |
| `app/capacitor.config.ts` | `appName: StudyTime`, identificador `com.grupop.studytime` | Evitar la identidad genérica del starter |
| `app/package.json` y lockfile | Dependencias oficiales y CLI Ionic local | Preparar compilación y comandos reproducibles |
| Configuración Browserslist | Se retiró el archivo antiguo del starter | Usar los objetivos predeterminados del builder Angular y eliminar la advertencia de navegadores incompatibles |

Angular arranca desde `app/src/main.ts`, que carga `AppModule`. Este importa `AppRoutingModule`. La ruta vacía redirige a `/home`, y `loadChildren` importa el módulo de Inicio en un archivo separado. Con `PreloadAllModules`, Angular puede precargar ese archivo después del arranque; separar archivos no significa que nunca se descarguen hasta pulsar una opción.

Capacitor usa `webDir: www`, que coincide con el resultado del build Angular. Todavía no se creó un proyecto Android ni se probaron funciones nativas.

## Ejecutar este avance

Descomprime el ZIP. Abre una terminal dentro de `StudyTime_GrupoP/app`. El entorno probado usa Node 24.19.0 y npm 11.9.0. Después:

```bash
npm ci
npx ionic serve
```

Abre la URL que indique la terminal. También puedes iniciar con `npm start`. Para compilar:

```bash
npm run build
```

No se incluyen `node_modules` ni recursos compilados; `npm ci` los instala desde el lockfile y requiere conexión al registro npm.

## Evidencia real y límites

- Compilación de producción: pasó. Registro: `evidencias/m1/build.txt`.
- Versiones instaladas: `evidencias/m1/versiones.txt`.
- Servidor Angular: `/home` devolvió HTTP 200 y HTML con título StudyTime. Registros: `evidencias/m1/http.json` y `servidor.txt`.
- Validación visual y consola en navegador: pendiente. Playwright estaba disponible como biblioteca, pero faltaba su ejecutable Chromium; la descarga falló por recibir un archivo inválido. No se produjo una captura.
- Prueba en equipo de Luis/Android: pendiente.

HTTP 200 comprueba que el servidor entrega la página; no demuestra que Angular renderice correctamente ni que la interfaz funcione. El próximo paso es abrir Inicio en tu navegador, comprobar la consola y aportar una captura real. Si aparecen errores, se depurarán antes de ampliar la navegación.

## Fuente técnica

Angular, compatibilidad y soporte de navegadores: https://angular.dev/reference/versions (consultada el 5 de octubre de 2026). Las fuentes Ionic y Capacitor están en la guía del paso 1.
