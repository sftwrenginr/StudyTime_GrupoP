import { Injectable, OnDestroy, signal } from '@angular/core';
import { Network } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';
@Injectable({ providedIn: 'root' })
export class RedService implements OnDestroy {
  conectado = signal<boolean | null>(null); private listener?: PluginListenerHandle;
  constructor() { void this.iniciar(); }
  private async iniciar() {
    try {
      this.listener = await Network.addListener('networkStatusChange', status => this.conectado.set(status.connected));
      this.conectado.set((await Network.getStatus()).connected);
    } catch { this.conectado.set(null); }
  }
  ngOnDestroy() { void this.listener?.remove(); }
}
