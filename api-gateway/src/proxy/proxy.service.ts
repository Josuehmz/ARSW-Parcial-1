import { Injectable, BadGatewayException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class ProxyService {
  private readonly tasksServiceUrl: string;
  private readonly usersServiceUrl: string;

  constructor(private configService: ConfigService) {
    this.tasksServiceUrl = this.configService.get<string>('TASKS_SERVICE_URL') || 'http://tasks-service:3002';
    this.usersServiceUrl = this.configService.get<string>('USERS_SERVICE_URL') || 'http://users-service:3003';
  }

  async proxyRequest(
    service: 'tasks' | 'users',
    path: string,
    method: string,
    data?: any,
    headers?: any
  ): Promise<AxiosResponse> {
    const serviceUrl = this.getServiceUrl(service);
    const url = `${serviceUrl}${path}`;

    try {
      const response = await axios({
        method: method.toLowerCase() as any,
        url,
        data,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      return response;
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error
        throw error;
      } else if (error.request) {
        // La petición fue hecha pero no hubo respuesta
        throw new BadGatewayException(`Servicio ${service} no disponible`);
      } else {
        // Error en la configuración de la petición
        throw new BadGatewayException(`Error al comunicarse con el servicio ${service}`);
      }
    }
  }

  private getServiceUrl(service: 'auth' | 'tasks' | 'users'): string {
    switch (service) {
      case 'tasks':
        return this.tasksServiceUrl;
      case 'users':
        return this.usersServiceUrl;
      default:
        throw new Error(`Servicio desconocido: ${service}`);
    }
  }
}