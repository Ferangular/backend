import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class RegisterUserDto {

    @ApiProperty({
        description: 'User email',
        example: 'name@example.com', // ejemplo de un correo válido
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'name',
        minLength: 3,
    })
    @IsString()
    name: string;

    @ApiProperty({
        minLength: 6,
    })
    @MinLength(6)
    password: string;

}
