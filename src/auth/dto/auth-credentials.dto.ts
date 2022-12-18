import { 
    IsString, 
    IsNotEmpty, 
    MinLength, 
    MaxLength, 
    Matches,
     
} from 'class-validator';

export class AuthCredentialsDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(25)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(40)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message:"Invalid password format"
    })
    password: string;
}