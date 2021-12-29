import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks-status.enum';
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any): any {
    const val = value.toUpperCase();
    if (!this.isValidStatus(val)) {
      throw new BadRequestException(`Invalid ${value} status passed`);
    }
    return val;
  }

  private isValidStatus(status): boolean {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
