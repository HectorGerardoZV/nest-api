import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthPayload } from './dto/auth-payload';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
        private jwtService: JwtService,
    ) { }

    public async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        await this.userRepository.createUser(authCredentialsDTO);
    }

    public async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<AuthPayload> {
        const { password, username } = authCredentialsDTO;
        const userFound: User = await this.userRepository.getUserByUsername(username);

        if (!userFound || (!await userFound.comparePassword(password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const token: string = await this.jwtService.sign({ username });
        const authAccess: AuthPayload = {
            accessToken: token
        }
        return authAccess;
    }
}
