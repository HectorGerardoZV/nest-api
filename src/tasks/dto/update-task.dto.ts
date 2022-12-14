import { IsNotEmpty, IsEnum } from "class-validator";
import { TaskStatus } from "../Task.model";

export class UpdateTaskDTO {
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus
}