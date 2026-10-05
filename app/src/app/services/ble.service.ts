import { Injectable, signal } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BleClient, BleDevice } from '@capacitor-community/bluetooth-le';
@Injectable({ providedIn: 'root' })
export class BleService {
  dispositivos = signal<BleDevice[]>([]); escaneando = signal(false); mensaje = signal('');
  private timer?: ReturnType<typeof setTimeout>;
  async buscar() {
    if(this.escaneando()) return;
    this.dispositivos.set([]); this.mensaje.set('');
    if(!Capacitor.isNativePlatform() && !('bluetooth' in navigator)) { this.mensaje.set('Bluetooth no está disponible en este navegador. Utiliza Android o un navegador compatible con Web Bluetooth.'); return; }
    this.escaneando.set(true);
    try {
      await BleClient.initialize({ androidNeverForLocation: true });
      if(!Capacitor.isNativePlatform()) {
        const device = await BleClient.requestDevice({});
        this.dispositivos.set([device]); this.mensaje.set('Dispositivo seleccionado.'); this.escaneando.set(false);
      } else {
        await BleClient.requestLEScan({}, result => {
          this.dispositivos.update(devices => devices.some(d => d.deviceId === result.device.deviceId) ? devices : [...devices, result.device]);
        });
        this.mensaje.set('Buscando dispositivos BLE durante 8 segundos…');
        this.timer = setTimeout(() => { void this.detener(); }, 8000);
      }
    } catch {
      await this.detener(); this.mensaje.set('No se pudo buscar, o se canceló la selección. Comprueba Bluetooth y los permisos.');
    }
  }
  async detener() {
    if(this.timer)clearTimeout(this.timer);this.timer=undefined;
    if(this.escaneando() && Capacitor.isNativePlatform()) { try { await BleClient.stopLEScan(); } catch { /* No hay escaneo activo si falló initialize. */ } }
    this.escaneando.set(false);
    this.mensaje.set(this.dispositivos().length ? 'Búsqueda finalizada.' : 'Búsqueda finalizada sin dispositivos encontrados.');
  }
}
