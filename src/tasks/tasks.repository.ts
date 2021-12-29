import { EntityRepository, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './tasks-status.enum';
import { FilterTaskDto } from './dto/filter-task-dto';
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: FilterTaskDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('Task');
    if (status) {
      query.andWhere('status=:status', { status });
    }

    if (search) {
      query.andWhere('title LIKE :search OR description LIKE :search', {
        search: `%${search}%`,
      });
    }

    return await query.getMany();
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
}
