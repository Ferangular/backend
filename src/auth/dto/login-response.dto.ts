import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';


export class LoginResponseDto{
  @ApiProperty()
  user: User;
  @ApiProperty()
  token: string;
}
