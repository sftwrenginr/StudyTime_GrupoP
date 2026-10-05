import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';
import { Recurso, EnvioSesion } from '../models/recurso';
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private url = 'https://jsonplaceholder.typicode.com/posts';
  // Un límite evita dejar al usuario esperando indefinidamente.
  listar(): Promise<Recurso[]> { return firstValueFrom(this.http.get<Recurso[]>(this.url + '?_limit=6').pipe(timeout(10000))); }
  obtener(id: number): Promise<Recurso> { return firstValueFrom(this.http.get<Recurso>(`${this.url}/${id}`).pipe(timeout(10000))); }
  enviar(sesion: EnvioSesion): Promise<Recurso> { return firstValueFrom(this.http.post<Recurso>(this.url, sesion).pipe(timeout(10000))); }
}
