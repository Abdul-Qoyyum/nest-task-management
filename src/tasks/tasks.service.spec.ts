import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({});

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository: TasksRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();
    tasksService = moduleRef.get<TasksService>(TasksService);
  });

  describe('getTasks', () => {
    it('Should call getTasks', () => {
      expect();
    });
  });
});
