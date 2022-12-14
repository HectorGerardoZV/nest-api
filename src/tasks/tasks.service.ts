import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './Task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public getAllTasks(): Task[] {
        return this.tasks;
    }

    public getTaskFilter(filterDTO: GetTasksFilterDTO): Task[] {
        const { search, status } = filterDTO;
        const tasksFilter = this.tasks
            .filter(task => status ? task.status === status : task)
            .filter(task => {
                if (search) {
                    const searchFormated = search.trim().toLowerCase();
                    if (task.title.trim().toLowerCase().includes(searchFormated)
                        || task.description.trim().toLowerCase().includes(searchFormated)) {
                        return task;
                    }
                } else {
                    return task;
                }
            });
        return tasksFilter;
    }

    public createTask(createTaskDTO: CreateTaskDTO): Task {
        const { title, description } = createTaskDTO;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    public getTaskById(id: string): Task {
        const task = this.tasks.find(taskAux => taskAux.id === id);
        if (!task) throw new NotFoundException('This task doesn\'t exist');
        return task;
    }

    public deleteTaskById(id: string): string {
        const newTasks: Task[] = this.tasks.filter(taskAux => taskAux.id !== id);
        if (newTasks.length === this.tasks.length) throw new NotFoundException('This task doesn\'t exist');
        return 'Task deleted successfully';
    }

    public updateTaskById(id: string, status: TaskStatus): Task {
        const task: Task = this.tasks.find(taskAux => taskAux.id === id);
        task.status = status;
        this.tasks = this.tasks.map(taskAux => taskAux.id === id ? task : taskAux);
        return task;
    }
}
