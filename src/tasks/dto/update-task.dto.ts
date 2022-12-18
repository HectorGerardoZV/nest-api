import { IsNotEmpty, IsEnum } from "class-validator";
import { TaskStatus } from "../tasks-status.enum";

export class UpdateTaskDTO {
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus
}