/**
 * Estructura genérica para todas las respuestas de la API PHP
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

/**
 * Respuesta genérica para la carga de imágenes (`upload_capture.php`)
 */
export interface UploadCaptureResponse {
  success: boolean;
  image?: string;
  message?: string;
}

/**
 * Respuesta del webhook/envío de medios (`send_media.php` / `send_autoresponder.php`)
 */
export interface SendMediaResponse {
  success: boolean;
  session_id?: number;
  phone?: string;
  visitor?: string;
  image?: string;
  message?: string;
}