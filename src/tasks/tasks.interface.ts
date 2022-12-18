import { Task } from "./tasks.entity";
import {
    CreateTaskDTO,
    GetTasksFilterDTO,
} from "./dto";
import { TaskStatus } from "./tasks-status.enum";
import { User } from "src/auth/user.entity";
export interface ITasks {
    createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task>;
    getAllTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]>;
    getTaskById(id: string, user: User): Promise<Task>;
    deleteTaskById(id: string, user: User): Promise<string>;
    updateTaskById(id: string, status: TaskStatus, user: User): Promise<Task>;
}