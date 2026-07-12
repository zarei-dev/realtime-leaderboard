import { Injectable } from '@nestjs/common';
import * as os from 'os';
import type { HealthStatus } from './health-status.interface';

@Injectable()
export class HealthService {
  getHealth(): HealthStatus {
    return {
      status: 'ok',
      uptime: Math.floor(process.uptime()),
      hostname: os.hostname(),
    };
  }
}
