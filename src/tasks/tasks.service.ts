import { Injectable } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto';
import { InjectRepository } from "@nestjs/typeorm";
import { TaskRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { ITasks } from "./tasks.interface";
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private tasksRepository: ITasks
    ) { }

    public async getAllTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
        return await this.tasksRepository.getAllTasks(filterDTO, user);
    }

    public async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        return await this.tasksRepository.createTask(createTaskDTO, user);
    }

    public async getTaskById(id: string, user: User): Promise<Task> {
        return await this.tasksRepository.getTaskById(id, user);
    }

    public async deleteTaskById(id: string, user: User): Promise<string> {
        return await this.tasksRepository.deleteTaskById(id, user);
    }

    public async updateTaskById(id: string, status: TaskStatus, user: User): Promise<Task> {
        return await this.tasksRepository.updateTaskById(id, status, user);
    }
}
