import { NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { Repository, EntityRepository } from "typeorm";
import { CreateTaskDTO, GetTasksFilterDTO } from "./dto";
import { TaskStatus } from "./tasks-status.enum";
import { Task } from "./tasks.entity";
import { ITasks } from "./tasks.interface";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> implements ITasks {

    async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        const task = this.create({
            ...createTaskDTO,
            status: TaskStatus.OPEN,
            user: user
        });
        const taskCreated: Task = await this.save(task);
        return taskCreated;
    }

    async getAllTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
        const { search, status } = filterDTO;
        const query = this.createQueryBuilder('task')
            .andWhere('task.userId= :userId', { userId: user.id })
        if (status) query.andWhere('task.status=:status', { status });
        if (search) query.andWhere(
            'task.title LIKE :search OR task.description LIKE :search',
            { search: `%${search}%` }
        );
        const tasks = await query.getMany();
        return tasks
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const task = await this.findOne({ where: { id: id, user } });
        if (!task) throw new NotFoundException('This task doesn\'t exist');
        return task;
    }

    async deleteTaskById(id: string, user: User): Promise<string> {
        const taskDeleted = await this.delete({ id, user });
        const { affected } = taskDeleted;
        if (affected === 0) throw new NotFoundException('This taks doesn\'t exist');
        return 'Task deleted successfully';
    }

    async updateTaskById(id: string, status: TaskStatus, user: User): Promise<Task> {
        const taskToUpdate = await this.getTaskById(id, user);
        taskToUpdate.status = status;
        await this.save(taskToUpdate);
        return taskToUpdate;
    }
}