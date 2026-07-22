import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ActiveSessionData {
  capturedImageBase64?: string;
  originalImagePath?: string;
  aiImagePath?: string;
  phone?: string;
  sessionId?: number;
  downloadCode?: string;
  downloadUrl?: string;
  qrImagePath?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionStateService {

  private readonly STORAGE_KEY = 'ana_active_session';
  private sessionDataSubject: BehaviorSubject<ActiveSessionData>;
  public sessionData$;

  constructor() {
    // Intentar recuperar los datos guardados en el navegador al iniciar el servicio
    const savedData = sessionStorage.getItem(this.STORAGE_KEY);
    const initialData: ActiveSessionData = savedData ? JSON.parse(savedData) : {};
    
    this.sessionDataSubject = new BehaviorSubject<ActiveSessionData>(initialData);
    this.sessionData$ = this.sessionDataSubject.asObservable();
  }

  /**
   * Obtiene los datos actuales de la sesión.
   */
  get currentData(): ActiveSessionData {
    return this.sessionDataSubject.getValue();
  }

  /**
   * Actualiza parcialmente los datos de la sesión activa y guarda en almacenamiento local.
   */
  updateSession(data: Partial<ActiveSessionData>): void {
    const updated = {
      ...this.currentData,
      ...data
    };
    
    // Guardar en memoria y en almacenamiento del navegador
    this.sessionDataSubject.next(updated);
    try {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
    //  console.warn('⚠️ No se pudo persistir en sessionStorage (posible límite de tamaño):', e);
    }
  }

  /**
   * Reinicia el estado de la sesión para un nuevo visitante.
   */
  resetSession(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this.sessionDataSubject.next({});
  }
}