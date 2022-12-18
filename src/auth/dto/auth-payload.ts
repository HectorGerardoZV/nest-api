import {IsNotEmpty, IsString} from 'class-validator';
export class AuthPayload {
    @IsString()
    @IsNotEmpty()
    accessToken:string;
}