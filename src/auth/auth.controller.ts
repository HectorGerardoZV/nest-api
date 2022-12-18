import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthPayload } from './dto/auth-payload';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(
        @Body()
        authCredentialsDTO: AuthCredentialsDTO
    ): Promise<void> {
        return await this.authService.signUp(authCredentialsDTO);
    }
    @Post('/signin')
    async signIn(
        @Body()
        authCredentialsDTO: AuthCredentialsDTO
    ): Promise<AuthPayload> {        
        return await this.authService.signIn(authCredentialsDTO);
    }


}
