// Prueba de secuencias asíncronas con plugin controlado, sin radio BLE físico.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const ts = require('typescript');

function pendiente() {
  let resolver;
  const promesa = new Promise(resolve => { resolver = resolve; });
  return { promesa, resolver };
}

(async () => {
  await import('@angular/compiler');
  const { BleClient } = await import('@capacitor-community/bluetooth-le');
  const { Capacitor } = await import('@capacitor/core');
  const directorio = fs.mkdtempSync(path.join(__dirname, '../node_modules/.studytime-qa-'));
  const archivo = path.join(directorio, 'ble.mjs');
  const original = {
    initialize: BleClient.initialize,
    requestLEScan: BleClient.requestLEScan,
    stopLEScan: BleClient.stopLEScan,
    isNativePlatform: Capacitor.isNativePlatform,
  };
  let servicio;
  try {
    const codigo = fs.readFileSync(path.join(__dirname, '../src/app/services/ble.service.ts'), 'utf8');
    fs.writeFileSync(archivo, ts.transpileModule(codigo, {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022, experimentalDecorators: true },
    }).outputText);
    const { BleService } = await import(pathToFileURL(archivo).href);
    Capacitor.isNativePlatform = () => true;
    BleClient.stopLEScan = async () => {};
    const results = [];

    const inicializacion = pendiente();
    let escaneos = 0;
    BleClient.initialize = () => inicializacion.promesa;
    BleClient.requestLEScan = async () => { escaneos++; };
    servicio = new BleService();
    const primera = servicio.buscar();
    await servicio.detener();
    await servicio.buscar(); // No abre otra búsqueda mientras initialize siga pendiente.
    inicializacion.resolver();
    await primera;
    assert.equal(escaneos, 0);
    assert.equal(servicio.escaneando(), false);
    results.push({ test: 'Salir durante initialize no inicia escaneo ni permite otra operación solapada', result: 'passed' });

    const inicioEscaneo = pendiente();
    let callback;
    let paradas = 0;
    BleClient.initialize = async () => {};
    BleClient.requestLEScan = async (_, listener) => { callback = listener; await inicioEscaneo.promesa; };
    BleClient.stopLEScan = async () => { paradas++; };
    servicio = new BleService();
    const segunda = servicio.buscar();
    await Promise.resolve();
    await servicio.detener();
    callback({ device: { deviceId: 'controlado-1' } });
    inicioEscaneo.resolver();
    await segunda;
    assert.equal(servicio.dispositivos().length, 0);
    assert.equal(servicio.escaneando(), false);
    assert.equal(paradas, 2); // Parada inicial y limpieza del inicio tardío.
    results.push({ test: 'Cancelar requestLEScan ignora callbacks tardíos y vuelve a detener el escaneo', result: 'passed' });

    BleClient.requestLEScan = async (_, listener) => {
      listener({ device: { deviceId: 'controlado-2' } });
      listener({ device: { deviceId: 'controlado-2' } });
    };
    servicio = new BleService();
    await servicio.buscar();
    assert.equal(servicio.dispositivos().length, 1);
    assert.equal(servicio.escaneando(), true);
    await servicio.detener();
    assert.equal(servicio.escaneando(), false);
    results.push({ test: 'Una búsqueda posterior funciona y deduplica dispositivos controlados', result: 'passed' });

    BleClient.initialize = async () => { throw Error('permiso controlado'); };
    servicio = new BleService();
    await servicio.buscar();
    assert.equal(servicio.escaneando(), false);
    assert.match(servicio.mensaje(), /No se pudo buscar/);
    results.push({ test: 'Error de inicialización libera controles y muestra el mensaje', result: 'passed' });
    const evidencia = { kind: 'plugin controlado sin hardware', results, realBLEScan: 'pendiente' };
    fs.writeFileSync(path.join(__dirname, '../../documentacion/evidencias/m3/ble-cancelacion.json'), JSON.stringify(evidencia, null, 2) + '\n');
    console.log(JSON.stringify(evidencia));
  } finally {
    if (servicio) await servicio.detener();
    BleClient.initialize = original.initialize;
    BleClient.requestLEScan = original.requestLEScan;
    BleClient.stopLEScan = original.stopLEScan;
    Capacitor.isNativePlatform = original.isNativePlatform;
    fs.rmSync(directorio, { recursive: true, force: true });
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
