# Módulo 1 — Luis Solano — Paso 1

## Objetivo y estado

Preparar una base Ionic + Angular + Capacitor entendida por Luis y comprobar que se ejecuta. Esta guía no implementa el módulo completo: todavía no hay navegación de StudyTime ni servicio API. La guía se escribió antes de crear la app; el asistente está ejecutando esta etapa con asistencia de IA declarada, autorizada después por el equipo. Los resultados actuales se registran en la bitácora.

Primero comprueba si tienes una aplicación StudyTime local. Si existe, no generes otra: aporta `package.json`, el archivo de rutas, la configuración Capacitor y el código pertinente para revisar su estado.

## Preparación

Desde una terminal, consulta:

```bash
node --version
npm --version
git --version
```

Node ejecuta las herramientas; npm instala las dependencias; Git registra los cambios. Conserva sus salidas como evidencia del entorno. Si falta alguno, comparte el error antes de instalar paquetes o modificar permisos. La documentación oficial de Ionic recomienda Node LTS; la compatibilidad exacta se verificará con las versiones que instale la CLI, especialmente Angular y Capacitor.

Si no tienes una copia del repositorio:

```bash
git clone https://github.com/sftwrenginr/StudyTime_GrupoP.git
cd StudyTime_GrupoP
```

Si ya la tienes, entra a ella sin volver a clonarla y comprueba `git status`. No borres modificaciones locales. Los documentos preparados por el asistente están en una copia local de revisión; todavía no se han publicado en GitHub.

## Crear únicamente la base oficial

Solo si no existe código previo, estando en `StudyTime_GrupoP/` y verificando que no exista `app/`, ejecuta:

```bash
npx --package=@ionic/cli ionic start app blank --type=angular --capacitor --no-git
```

`app` es la carpeta de trabajo dentro del repositorio; `blank` es el punto de partida mínimo oficial; `--type=angular` selecciona Angular; `--capacitor` integra el runtime móvil; `--no-git` evita crear otro repositorio Git dentro del existente. Si pregunta por arquitectura, selecciona Standalone. Si solicita abrir una cuenta Ionic, puedes omitirla para el trabajo local. Si la CLI cambia una opción o aparecen incompatibilidades, detente y comparte la salida: no uses `--force` ni `--legacy-peer-deps` para ocultarlas.

El punto de partida no es un proyecto final: en pasos siguientes Luis adaptará estructura, pantallas, navegación y comportamiento de StudyTime. La política exige comprender y modificar significativamente cualquier base. La CLI no sustituye el desarrollo del equipo.

Después:

```bash
cd app
npm install --save-dev @ionic/cli
npm ls @ionic/angular @angular/core @capacitor/core @capacitor/cli
npm run build
npx ionic serve
```

La dependencia de desarrollo permite reproducir la herramienta sin instalación global. `npm ls` registra versiones reales; `build` verifica compilación; `serve` inicia un servidor local. Conserva `package-lock.json` para que el equipo pueda repetir la instalación con `npm ci`. No añadas `node_modules/` ni archivos de compilación a Git. Revisa el `.gitignore` que genere la CLI.

Abre la URL que indique la terminal. Todavía verás la pantalla inicial de Ionic, no las cuatro páginas definitivas. Detén el servidor con Ctrl+C cuando termines. No continúes creando funciones de otros módulos.

## Entender antes de modificar

Localiza `package.json`, `capacitor.config.ts` (o su equivalente), `src/main.ts` y `src/app/app.routes.ts` (o archivo de rutas equivalente de la base generada).

Explica con tus palabras: `package.json` declara dependencias y comandos; la configuración Capacitor identifica la app y el directorio de recursos web compilados; `main.ts` arranca Angular; las rutas conectan URLs con páginas. Comprueba si la ruta de inicio utiliza importación diferida. No hagas una reestructuración hasta revisar los archivos reales.

## Pruebas y evidencia del paso

| ID | Acción | Resultado esperado | Estado actual |
| --- | --- | --- | --- |
| M1-01 | Inspeccionar la base | Dependencias Ionic/Angular/Capacitor y configuración presentes | Pendiente |
| M1-02 | Ejecutar `npm run build` | Salida sin errores y recursos compilados | Pendiente |
| M1-03 | Ejecutar `npx ionic serve` | Pantalla base visible; sin errores de ejecución en consola | Pendiente |
| M1-04 | Explicar archivos de arranque y rutas | Luis identifica la responsabilidad de cada archivo | Pendiente |

Guarda una captura real de la pantalla base y otra del resultado de compilación/versiones. Nombres sugeridos: `documentacion/capturas/m1/01-base.png` y `02-build-versiones.png`, en la raíz del repositorio. No publiques capturas con credenciales ni datos privados. Todavía no existen estas imágenes.

Para revisión, comparte la salida de build, la captura de pantalla y los archivos `package.json`, configuración Capacitor y rutas. Si falla, comparte el mensaje completo y el comando usado. Al validar este paso revisaremos una modificación pequeña de la pantalla Inicio; después construiremos la navegación. No se declara validado todo el módulo por compilar una pantalla base.

## Fuentes consultadas, 2026-10-05

- Ionic: primer proyecto Angular, https://ionicframework.com/docs/angular/your-first-app
- Capacitor: instalación y configuración, https://capacitorjs.com/docs/getting-started

Los ejemplos de estas fuentes se estudiarán y adaptarán; no se copiará una aplicación completa. Consulta la bitácora para distinguir las instrucciones originales de los comandos ya ejecutados.
