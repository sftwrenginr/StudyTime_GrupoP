import { Injectable, OnDestroy, computed, signal } from '@angular/core';
import { Sesion } from '../models/sesion';
@Injectable({ providedIn: 'root' })
export class TemporizadorService implements OnDestroy {
  segundos = signal(0); activo = signal(false); titulo = signal('Selecciona una sesión');
  texto = computed(() => `${Math.floor(this.segundos() / 60).toString().padStart(2,'0')}:${(this.segundos() % 60).toString().padStart(2,'0')}`);
  private duracion = 0; private fin = 0; private interval?: ReturnType<typeof setInterval>;
  iniciar(sesion: Sesion) { this.detenerIntervalo(); this.titulo.set(sesion.titulo); this.duracion = sesion.minutos * 60; this.segundos.set(this.duracion); this.reanudar(); }
  reanudar() {
    if (this.activo() || this.segundos() <= 0) return;
    // Calcular contra un instante final reduce el desfase al volver de segundo plano.
    this.fin = Date.now() + this.segundos() * 1000; this.activo.set(true);
    this.interval = setInterval(() => this.actualizar(), 250);
  }
  private actualizar() { this.segundos.set(Math.max(0, Math.ceil((this.fin - Date.now()) / 1000))); if (!this.segundos()) this.detenerIntervalo(); }
  pausar() { if (this.activo()) this.actualizar(); this.detenerIntervalo(); }
  reiniciar() { this.detenerIntervalo(); this.segundos.set(this.duracion); }
  private detenerIntervalo() { if(this.interval) clearInterval(this.interval); this.interval = undefined; this.activo.set(false); }
  ngOnDestroy() { this.detenerIntervalo(); }
}
