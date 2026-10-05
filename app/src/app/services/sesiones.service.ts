import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Sesion } from '../models/sesion';
@Injectable({ providedIn: 'root' })
export class SesionesService {
  private storage = inject(Storage);
  // Inicializar una sola vez evita usar la base antes de que esté disponible.
  private ready = this.storage.create();
  private key = 'sesiones';
  async listar(): Promise<Sesion[]> { await this.ready; return (await this.storage.get(this.key)) ?? []; }
  async guardar(sesion: Sesion): Promise<void> {
    if (!sesion.titulo.trim() || !Number.isInteger(sesion.minutos) || sesion.minutos < 1 || sesion.minutos > 240) throw Error('Sesión inválida');
    const sesiones = await this.listar();
    const index = sesiones.findIndex(s => s.id === sesion.id);
    if (index < 0) sesiones.push(sesion); else sesiones[index] = sesion;
    await this.storage.set(this.key, sesiones);
  }
  async eliminar(id: string): Promise<void> { const sesiones = await this.listar(); await this.storage.set(this.key, sesiones.filter(s => s.id !== id)); }
}
