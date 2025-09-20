import { Controller, Get } from '@nestjs/common';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  getHealth() {
    return {
      status: 'OK',
      message: 'API Gateway está funcionando correctamente',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        tasks: process.env.TASKS_SERVICE_URL || 'http://web-service:3002',
        users: process.env.USERS_SERVICE_URL || 'http://cliente-service:3003',
      }
    };
  }
}

function ApiOperation(arg0: { summary: string; }): (target: () => { status: string; message: string; timestamp: string; version: string; services: { tasks: string; users: string; }; }, context: ClassMethodDecoratorContext<HealthController, () => { status: string; message: string; timestamp: string; version: string; services: { tasks: string; users: string; }; }> & { any: any; }) => void | (() => { status: string; message: string; timestamp: string; version: string; services: { tasks: string; users: string; }; }) {
  throw new Error('Function not implemented.');
}
function ApiTags(arg0: string): (target: typeof HealthController, context: ClassDecoratorContext<typeof HealthController>) => void | typeof HealthController {
  throw new Error('Function not implemented.');
}

