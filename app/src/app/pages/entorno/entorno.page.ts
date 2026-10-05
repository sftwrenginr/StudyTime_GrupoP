import { Component, OnDestroy, inject, signal } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { BleService } from '../../services/ble.service';
import { RedService } from '../../services/red.service';
import * as L from 'leaflet';
@Component({ selector: 'app-entorno', templateUrl: './entorno.page.html', standalone: false })
export class EntornoPage implements OnDestroy {
  red = inject(RedService); ble = inject(BleService); error = signal(''); buscando = signal(false); ubicacion = signal('');
  private mapa?: L.Map; private marcador?: L.CircleMarker; private lugares: L.CircleMarker[] = [];
  ionViewDidEnter() {
    if (!this.mapa) {
      this.mapa = L.map('study-map').setView([19.45,-70.69], 12);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap contributors' }).addTo(this.mapa);
      this.mapa.on('click', event => {
        const marker = L.circleMarker(event.latlng, { color:'#ec7d25', radius:8 }).addTo(this.mapa!).bindPopup('Lugar de estudio marcado por ti');
        this.lugares.push(marker);
      });
    }
    this.mapa.invalidateSize();
  }
  async localizar() {
    this.error.set(''); this.buscando.set(true);
    try {
      const pos = await Geolocation.getCurrentPosition({enableHighAccuracy:true, timeout:10000});
      const coords: L.LatLngExpression = [pos.coords.latitude, pos.coords.longitude];
      this.ubicacion.set(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)} · precisión ±${Math.round(pos.coords.accuracy)} m`);
      this.marcador?.remove(); this.marcador = L.circleMarker(coords,{color:'#2856a5',radius:10}).addTo(this.mapa!).bindPopup('Mi ubicación');
      this.mapa!.setView(coords,16);
    } catch { this.error.set('No se pudo obtener tu ubicación. Comprueba el permiso de ubicación y el GPS.'); }
    finally { this.buscando.set(false); }
  }
  limpiar() { this.lugares.forEach(m => m.remove()); this.lugares = []; }
  ionViewWillLeave() { void this.ble.detener(); }
  ngOnDestroy() { this.mapa?.remove(); void this.ble.detener(); }
}
