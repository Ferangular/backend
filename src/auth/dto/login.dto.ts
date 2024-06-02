import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class LoginDto {
    @ApiProperty({
        description: 'User email',
        example: 'name@example.com', // ejemplo de un correo válido
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password',
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    password: string;

}
