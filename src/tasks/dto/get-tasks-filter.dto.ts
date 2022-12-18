import { TaskStatus } from "../tasks-status.enum";
import { IsString, IsEnum, IsOptional } from 'class-validator';
export class GetTasksFilterDTO {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}