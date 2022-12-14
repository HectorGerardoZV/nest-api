import { TaskStatus } from "../Task.model";
import { IsString, IsEnum, IsOptional } from 'class-validator';
export class GetTasksFilterDTO {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}