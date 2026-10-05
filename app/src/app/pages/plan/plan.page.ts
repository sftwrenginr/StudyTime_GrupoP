import { TemporizadorService } from '../../services/temporizador.service';
import { Component, inject, signal } from '@angular/core';
import { RefresherCustomEvent, AlertController } from '@ionic/angular';
import { SesionesService } from '../../services/sesiones.service';
import { Sesion, TipoSesion } from '../../models/sesion';
@Component({ selector: 'app-plan', templateUrl: './plan.page.html', standalone: false })
export class PlanPage {
  timer = inject(TemporizadorService);
  private store = inject(SesionesService); private alerts = inject(AlertController);
  sesiones = signal<Sesion[]>([]); error = signal(''); ocupado = signal(false);
  titulo = ''; minutos = 25; tipo: TipoSesion = 'Estudio'; editando: string | null = null;
  ionViewWillEnter() { void this.cargar(); }
  async cargar(event?: RefresherCustomEvent) {
    try { this.sesiones.set(await this.store.listar()); this.error.set(''); }
    catch { this.error.set('No se pudo abrir el almacenamiento IndexedDB.'); }
    finally { await event?.target.complete(); }
  }
  async guardar() {
    if (this.ocupado()) return;
    const minutes = Number(this.minutos);
    if (!this.titulo.trim() || !Number.isInteger(minutes) || minutes < 1 || minutes > 240) { this.error.set('Indica un título y una duración entera entre 1 y 240 minutos.'); return; }
    this.ocupado.set(true);
    try {
      const previa = this.sesiones().find(s => s.id === this.editando);
      await this.store.guardar({ id: this.editando ?? crypto.randomUUID(), titulo: this.titulo.trim(), minutos: minutes, tipo: this.tipo, completada: previa?.completada ?? false });
      this.cancelar(); await this.cargar();
    } catch { this.error.set('No se pudo guardar la sesión.'); }
    finally { this.ocupado.set(false); }
  }
  editar(s: Sesion) { this.editando = s.id; this.titulo = s.titulo; this.minutos = s.minutos; this.tipo = s.tipo; }
  cancelar() { this.editando = null; this.titulo = ''; this.minutos = 25; this.tipo = 'Estudio'; }
  async completar(s: Sesion) {
    if(this.ocupado()) return; this.ocupado.set(true);
    try { await this.store.guardar({ ...s, completada: !s.completada }); await this.cargar(); }
    catch { this.error.set('No se pudo actualizar la sesión.'); }
    finally { this.ocupado.set(false); }
  }
  async eliminar(s: Sesion) {
    if(this.ocupado()) return;
    const alert = await this.alerts.create({ header: 'Eliminar sesión', message: '¿Deseas eliminar esta sesión?', buttons: [{text:'Cancelar',role:'cancel'},{text:'Eliminar',role:'confirm'}] });
    await alert.present(); const result = await alert.onDidDismiss(); if(result.role !== 'confirm') return;
    this.ocupado.set(true);
    try { await this.store.eliminar(s.id); if (this.editando === s.id) this.cancelar(); await this.cargar(); }
    catch { this.error.set('No se pudo eliminar la sesión.'); }
    finally { this.ocupado.set(false); }
  }
}
