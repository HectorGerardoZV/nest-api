import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Query
} from '@nestjs/common';
import { Task, TaskStatus } from './Task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDTO, GetTasksFilterDTO, UpdateTaskDTO } from './dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(
        @Query() filterDTO: GetTasksFilterDTO
    ): Task[] {
        if (Object.keys(filterDTO).length) return this.tasksService.getTaskFilter(filterDTO);
        else return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
        return this.tasksService.createTask(createTaskDTO);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): string {
        return this.tasksService.deleteTaskById(id);
    }
    @Patch('/:id/status')
    updateTaskById(@Param('id') id: string, @Body() updateTaskDTO: UpdateTaskDTO): Task {
        const { status } = updateTaskDTO;
        return this.tasksService.updateTaskById(id, status);
    }
}
