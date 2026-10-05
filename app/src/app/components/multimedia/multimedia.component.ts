import { Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { RangeCustomEvent } from '@ionic/angular';
import { Camera } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
@Component({ selector: 'app-multimedia', templateUrl: './multimedia.component.html', standalone: false })
export class MultimediaComponent implements OnDestroy {
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;
  reproduciendo = signal(false); tiempo = signal(0); duracion = signal(0); errorAudio = signal('');
  foto = signal(''); errorFoto = signal(''); capturando = signal(false); repetir = false;
  metadatos() { const duration = this.audio.nativeElement.duration; this.duracion.set(Number.isFinite(duration) ? duration : 0); }
  actualizar() { this.tiempo.set(this.audio.nativeElement.currentTime); }
  async reproducir() { this.errorAudio.set(''); try { await this.audio.nativeElement.play(); } catch { this.errorAudio.set('No se pudo reproducir el audio. Intenta de nuevo.'); } }
  pausar() { this.audio?.nativeElement.pause(); }
  detener() { this.pausar(); if(this.audio)this.audio.nativeElement.currentTime = 0; this.tiempo.set(0); }
  mover(event: RangeCustomEvent) { if(typeof event.detail.value === 'number' && this.duracion()) { this.audio.nativeElement.currentTime = Math.max(0,Math.min(this.duracion(),event.detail.value)); this.actualizar(); } }
  async capturar() {
    if(this.capturando())return; this.capturando.set(true); this.errorFoto.set('');
    try {
      const result = await Camera.takePhoto({quality:70,saveToGallery:false,webUseInput:true});
      const url = result.webPath ?? (result.uri ? Capacitor.convertFileSrc(result.uri) : '');
      if(!url)throw Error('Sin imagen'); this.foto.set(url);
    } catch { this.errorFoto.set('Captura cancelada o no disponible. Comprueba la cámara y sus permisos.'); }
    finally { this.capturando.set(false); }
  }
  ngOnDestroy() { this.pausar(); }
}
