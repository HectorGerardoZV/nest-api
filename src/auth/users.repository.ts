import { ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
@EntityRepository(User)
export class UsersRepository extends Repository<User>{

    public async createUser(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        const { password, username } = authCredentialsDTO;
        const user = this.create({ password, username });
        try {
            const userCreated = await this.save(user);
            return userCreated;
        } catch (error) {
            const { code } = error;
            if (code === '23505') throw new ConflictException('Username already exist');
            else throw new InternalServerErrorException('Error while creating user');
        }
    }
    public async getUserByUsername(username: string): Promise<User> {
        const query = this.createQueryBuilder('user').andWhere('user.username=:username', { username });
        const user: User = await query.getOne();
        if (!user) throw new UnauthorizedException('Invalid credentials');
        return user;
    }
}