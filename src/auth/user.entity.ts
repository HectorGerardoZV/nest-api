import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BeforeInsert,
    OneToMany
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/tasks/tasks.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ unique: true })
    username: string;
    @Column()
    password: string;
    @OneToMany((_type) => Task, (task) => task.user, { eager: true })
    tasks: Task[];
    @BeforeInsert()
    async encryptPassword(): Promise<void> {
        this.password = await bcrypt.hashSync(this.password, 10);
    }
    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}