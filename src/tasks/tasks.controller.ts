import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    UseGuards
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO, GetTasksFilterDTO, UpdateTaskDTO } from './dto';
import { Task } from './tasks.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger();
    constructor(private tasksService: TasksService) { }
    
    @Get()
    async getTasks(
        @Query() filterDTO: GetTasksFilterDTO,
        @GetUser() user: User
    ): Promise<Task[]> {
        this.logger.log('GET/tasks');
        return await this.tasksService.getAllTasks(filterDTO, user);
    }

    @Post()
    async createTask(
        @Body() createTaskDTO: CreateTaskDTO,
        @GetUser() user: User
    ): Promise<Task> {
        return await this.tasksService.createTask(createTaskDTO, user);
    }

    @Get('/:id')
    async getTaskById
        (@Param('id') id: string,
            @GetUser() user: User
        ): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Delete('/:id')
    async deleteTaskById(
        @Param('id') id: string,
        @GetUser() user: User
    ): Promise<string> {
        return this.tasksService.deleteTaskById(id, user);
    }

    @Patch('/:id/status')
    async updateTaskById(
        @Param('id') id: string,
        @Body() updateTaskDTO: UpdateTaskDTO,
        @GetUser() user: User
    ): Promise<Task> {
        const { status } = updateTaskDTO;
        return this.tasksService.updateTaskById(id, status, user);
    }
}
