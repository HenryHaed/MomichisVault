import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly ollamaUrl = 'http://localhost:11434/api/generate';
  private readonly modelName = 'llama3.2:3b'; // El modelo local que descargaste

  constructor() {
    this.logger.log(`Conectando IA localmente vía Ollama usando el modelo: ${this.modelName}`);
  }

  async generarResumen(texto: string): Promise<string | null> {
    try {
      const prompt = `Analiza el siguiente texto extraído de un documento PDF y proporciona un resumen ejecutivo, claro y estructurado. 
      Usa viñetas para los puntos clave y mantén un tono profesional.
      
      Texto a resumir:
      ${texto}`;

      const response = await fetch(this.ollamaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.modelName,
          prompt: prompt,
          stream: false // Desactivamos el streaming para recibir la respuesta de una vez
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en Ollama: ${response.statusText} (${response.status})`);
      }

      const data = await response.json();
      return `Soy sistema Momichis y el resumen del presente documento es:\n\n${data.response}`;
    } catch (error) {
      this.logger.error('Error al generar resumen con Ollama:', error);
      return null;
    }
  }
}
