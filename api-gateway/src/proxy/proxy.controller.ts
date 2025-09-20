import { 
    Controller,  
    HttpStatus
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { ProxyService } from './proxy.service';
  import { Public } from '../common/public.decorator';
  
  @ApiTags('Proxy')
  @Controller()
  export class ProxyController {
    constructor(private readonly proxyService: ProxyService) {}
    @Public()
    @Response({ status: 200, description: 'Petición procesada correctamente' })
    async proxyAuth( req: Request,  res: Response) {
      const path = req.url.replace('/api/auth', '');
      
      try {
        const response = await this.proxyService.proxyRequest(
          path,
          req.method,
          req.body,
          req.headers
        );
        
        res.status(response.status).json(response.data);
      } catch (error) {
        this.handleProxyError(error, res);
      }
    }
  

    @Response({ status: 200, description: 'Petición procesada correctamente' })
    async proxyTasks( req: Request,  res: Response) {
      const path = req.url.replace('/api/tasks', '');
      
      try {
        const response = await this.proxyService.proxyRequest(
          'tasks',
          path,
          req.method,
          req.body,
          {
            ...req.headers,
            'x-user-id': (req as any).user?.id,
            'x-user-email': (req as any).user?.email,
          }
        );
        
        res.status(response.status).json(response.data);
      } catch (error) {
        this.handleProxyError(error, res);
      }
    }
  
    @Response({ status: 200, description: 'Petición procesada correctamente' })
    async proxyUsers( req: Request, res: Response) {
      const path = req.url.replace('/api/users', '');
      
      try {
        const response = await this.proxyService.proxyRequest(
          'users',
          path,
          req.method,
          req.body,
          {
            ...req.headers,
            'x-user-id': (req as any).user?.id,
            'x-user-email': (req as any).user?.email,
          }
        );
        
        res.status(response.status).json(response.data);
      } catch (error) {
        this.handleProxyError(error, res);
      }
    }
  
    private handleProxyError(error: any, res: Response) {
      if (error.response) {
        
        res.status(error.response.status).json(error.response.data);
      } else if (error.message?.includes('no disponible')) {
        
        res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
          message: error.message,
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        });
      } else {
        
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error interno del servidor',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

function ApiTags(arg0: string): (target: typeof ProxyController, context: ClassDecoratorContext<typeof ProxyController>) => void | typeof ProxyController {
    throw new Error('Function not implemented.');
}

function ApiOperation(arg0: { summary: string; }): (target: (req: Request, res: Response) => Promise<void>, context: ClassMethodDecoratorContext<ProxyController, (req: Request, res: Response) => Promise<void>> & { any; }) => void | ((req: Request, res: Response) => Promise<void>) {
    throw new Error('Function not implemented.');
}

