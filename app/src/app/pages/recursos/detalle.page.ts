import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Recurso } from '../../models/recurso';
@Component({ selector: 'app-detalle', standalone: false, template: `
<ion-header><ion-toolbar><ion-buttons slot="start"><ion-back-button defaultHref="/tabs/recursos"></ion-back-button></ion-buttons><ion-title>Detalle del recurso</ion-title></ion-toolbar></ion-header>
<ion-content class="ion-padding">
@if (cargando()) { <ion-spinner aria-label="Cargando detalle"></ion-spinner> }
@if (error()) { <p role="alert">{{ error() }}</p><ion-button (click)="cargar()">Reintentar</ion-button> }
@if (recurso(); as item) { <ion-card><ion-card-header><ion-card-title>{{ item.title }}</ion-card-title></ion-card-header><ion-card-content>{{ item.body }}</ion-card-content></ion-card> }
</ion-content>` })
export class DetallePage {
  private api = inject(ApiService); private route = inject(ActivatedRoute);
  recurso = signal<Recurso | null>(null); error = signal(''); cargando = signal(false);
  ionViewWillEnter() { void this.cargar(); }
  async cargar() {
    this.cargando.set(true); this.error.set(''); this.recurso.set(null);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try { if (!Number.isInteger(id) || id <= 0) throw Error('ID inválido'); this.recurso.set(await this.api.obtener(id)); }
    catch { this.error.set('No se pudo abrir este recurso.'); }
    finally { this.cargando.set(false); }
  }
}
