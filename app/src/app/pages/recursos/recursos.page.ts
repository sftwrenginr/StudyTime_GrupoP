import { Component, inject, signal, ViewChild } from '@angular/core';
import { MultimediaComponent } from '../../components/multimedia/multimedia.component';
import { ApiService } from '../../services/api.service';
import { Recurso } from '../../models/recurso';
@Component({ selector: 'app-recursos', templateUrl: './recursos.page.html', standalone: false })
export class RecursosPage {
  @ViewChild(MultimediaComponent) media?: MultimediaComponent;
  ionViewWillLeave() { this.media?.pausar(); }
  private api = inject(ApiService);
  recursos = signal<Recurso[]>([]); cargando = signal(false); enviando = signal(false);
  error = signal(''); respuesta = signal(''); titulo = ''; descripcion = '';
  ionViewWillEnter() { if (!this.recursos().length) void this.cargar(); }
  async cargar() {
    this.cargando.set(true); this.error.set('');
    try { this.recursos.set(await this.api.listar()); }
    catch { this.error.set('No se pudieron cargar los recursos. Revisa tu conexión y vuelve a intentar.'); }
    finally { this.cargando.set(false); }
  }
  async enviar() {
    this.respuesta.set('');
    if (!this.titulo.trim() || !this.descripcion.trim()) { this.respuesta.set('Completa el título y la descripción.'); return; }
    this.enviando.set(true);
    try {
      const result = await this.api.enviar({ title: this.titulo.trim(), body: this.descripcion.trim(), userId: 1 });
      this.respuesta.set(`Envío de prueba aceptado: ID ${result.id}. La API de demostración no guarda este envío permanentemente.`);
    } catch { this.respuesta.set('No se pudo enviar. Revisa tu conexión y vuelve a intentar.'); }
    finally { this.enviando.set(false); }
  }
}
