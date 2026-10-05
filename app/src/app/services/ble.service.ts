import { Injectable, signal } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BleClient, BleDevice } from '@capacitor-community/bluetooth-le';
@Injectable({ providedIn: 'root' })
export class BleService {
  dispositivos = signal<BleDevice[]>([]); escaneando = signal(false); mensaje = signal('');
  private timer?: ReturnType<typeof setTimeout>;
  private busquedaActual = 0;
  private operacionesPendientes = 0;
  async buscar() {
    if(this.escaneando() || this.operacionesPendientes > 0) return;
    this.dispositivos.set([]); this.mensaje.set('');
    if(!Capacitor.isNativePlatform() && !('bluetooth' in navigator)) { this.mensaje.set('Bluetooth no está disponible en este navegador. Utiliza Android o un navegador compatible con Web Bluetooth.'); return; }
    this.escaneando.set(true);
    const busqueda = ++this.busquedaActual;
    ++this.operacionesPendientes;
    try {
      await BleClient.initialize({ androidNeverForLocation: true });
      // Salir de la página invalida incluso una inicialización pendiente.
      if (busqueda !== this.busquedaActual) return;
      if(!Capacitor.isNativePlatform()) {
        const device = await BleClient.requestDevice({});
        if (busqueda !== this.busquedaActual) return;
        this.dispositivos.set([device]); this.mensaje.set('Dispositivo seleccionado.'); this.escaneando.set(false);
      } else {
        await BleClient.requestLEScan({}, result => {
          if (busqueda !== this.busquedaActual) return;
          this.dispositivos.update(devices => devices.some(d => d.deviceId === result.device.deviceId) ? devices : [...devices, result.device]);
        });
        // requestLEScan también puede terminar después de la cancelación.
        if (busqueda !== this.busquedaActual) {
          await BleClient.stopLEScan();
          return;
        }
        this.mensaje.set('Buscando dispositivos BLE durante 8 segundos…');
        this.timer = setTimeout(() => { void this.detener(); }, 8000);
      }
    } catch {
      if (busqueda !== this.busquedaActual) return;
      await this.detener(); this.mensaje.set('No se pudo buscar, o se canceló la selección. Comprueba Bluetooth y los permisos.');
    } finally {
      --this.operacionesPendientes;
    }
  }
  async detener() {
    ++this.busquedaActual;
    ++this.operacionesPendientes;
    try {
    if(this.timer)clearTimeout(this.timer);this.timer=undefined;
    if(this.escaneando() && Capacitor.isNativePlatform()) { try { await BleClient.stopLEScan(); } catch { /* No hay escaneo activo si falló initialize. */ } }
    this.escaneando.set(false);
    this.mensaje.set(this.dispositivos().length ? 'Búsqueda finalizada.' : 'Búsqueda finalizada sin dispositivos encontrados.');
    } finally {
      --this.operacionesPendientes;
    }
  }
}
