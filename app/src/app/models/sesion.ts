export type TipoSesion = 'Estudio' | 'Lectura' | 'Examen' | 'Ocio';
export interface Sesion { id: string; titulo: string; minutos: number; tipo: TipoSesion; completada: boolean; }
