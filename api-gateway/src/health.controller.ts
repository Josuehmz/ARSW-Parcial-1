import { Controller, Get } from '@nestjs/common';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Verificar estado del API Gateway' })
  @ApiResponse({ 
    status: 200, 
    description: 'API Gateway está funcionando correctamente',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'OK' },
        message: { type: 'string', example: 'API Gateway está funcionando correctamente' },
        timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
        version: { type: 'string', example: '1.0.0' }
      }
    }
  })
  getHealth() {
    return {
      status: 'OK',
      message: 'API Gateway está funcionando correctamente',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        tasks: process.env.TASKS_SERVICE_URL || 'http://tasks-service:3002',
        users: process.env.USERS_SERVICE_URL || 'http://users-service:3003',
      }
    };
  }
}

function ApiTags(arg0: string): (target: typeof HealthController, context: ClassDecoratorContext<typeof HealthController>) => void | typeof HealthController {
  throw new Error('Function not implemented.');
}


function ApiOperation(arg0: { summary: string; }): (target: () => { status: string; message: string; timestamp: string; version: string; services: { auth: string; tasks: string; users: string; }; }, context: ClassMethodDecoratorContext<HealthController, () => { status: string; message: string; timestamp: string; version: string; services: { auth: string; tasks: string; users: string; }; }> & { ...; }) => void | (() => { status: string; message: string; timestamp: string; version: string; services: { auth: string; tasks: string; users: string; }; }) {
  throw new Error('Function not implemented.');
}
