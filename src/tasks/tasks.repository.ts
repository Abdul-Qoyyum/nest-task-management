import { EntityRepository, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './tasks-status.enum';
import { FilterTaskDto } from './dto/filter-task-dto';
import { User } from 'src/auth/user.entity';
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

  async createTask(createTaskDto: CreateTaskDto, user: User) {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }
}
