import { Injectable, BadGatewayException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class ProxyService {
  private readonly webServiceUrl: string;
  private readonly clienteServiceUrl: string;

  constructor(private configService: ConfigService) {
    this.webServiceUrl = this.configService.get<string>('WEBS_SERVICE_URL') || 'http://webs-service:3002';
    this.clienteServiceUrl = this.configService.get<string>('CLIENTES_SERVICE_URL') || 'http://clientes-service:3003';
  }

  async proxyRequest(
    service: 'webs' | 'clientes',
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
        
        throw error;
      } else if (error.request) {
       
        throw new BadGatewayException(`Servicio ${service} no disponible`);
      } else {
       
        throw new BadGatewayException(`Error al comunicarse con el servicio ${service}`);
      }
    }
  }

  private getServiceUrl(service: 'webs' | 'clientes'): string {
    switch (service) {
      case 'webs':
        return this.webServiceUrl;
      case 'clientes':
        return this.clienteServiceUrl;
      default:
        throw new Error(`Servicio desconocido: ${service}`);
    }
  }
}