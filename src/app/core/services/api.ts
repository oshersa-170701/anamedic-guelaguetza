import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl; // e.g., 'http://localhost/guelaguetza-v2'

  constructor(private http: HttpClient) {}

  /**
   * Envía la imagen capturada al script PHP generate_image.php
   */
  generateAiImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.http.post<any>(`${this.baseUrl}/api/generate_image.php`, formData);
  }

  /**
   * Registra la sesión enviando los datos en formato JSON como requiere register_session.php
   */
  registerSession(phone: string, originalImage: string, aiImage: string): Observable<any> {
    const body = {
      phone: phone,
      original_image: originalImage,
      ai_image: aiImage,
      theme: 'guelaguetza',
      consent: 1
    };

    return this.http.post<any>(`${this.baseUrl}/api/register_session.php`, body);
  }

  /**
   * Genera el código QR de descarga
   */
  generateQr(sessionId: number): Observable<any> {
    const body = { session_id: sessionId };
    return this.http.post<any>(`${this.baseUrl}/api/generate_qr.php`, body);
  }
}