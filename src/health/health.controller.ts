import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import type { HealthStatus } from './health-status.interface';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  healthCheck(): HealthStatus {
    return this.healthService.getHealth();
  }
}
