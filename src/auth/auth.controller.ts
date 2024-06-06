import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { User } from './entities/user.entity';
import {
  ApiBearerAuth, ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, LoginDto, LoginResponseDto, RegisterUserDto } from './dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user', description: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Login user', description: 'Login user' })
  @Post('/login')
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ status: 200, description: 'User logged in successfully', type: LoginResponseDto, schema: {
      example: {
        user: {
          id: '60ba0c1b6e3c1c43a0d4172c',
          name: 'John Doe',
          email: 'john@example.com'
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  login( @Body() loginDto: LoginDto) : Promise<LoginResponseDto> {
    return this.authService.login( loginDto );
  }


  @ApiOperation({ summary: 'Register user', description: 'Register user' })
  @Post('/register')
  @ApiBody({ type: RegisterUserDto })
  @ApiCreatedResponse({ status: 200, description: 'User register in successfully', type: LoginResponseDto, schema: {
      example: {
        user: {
          id: '60ba0c1b6e3c1c43a0d4172c',
          name: 'John Doe',
          email: 'john@example.com'
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
  }})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
   register( @Body() registerDto: RegisterUserDto  ) : Promise<LoginResponseDto> {
    return  this.authService.register( registerDto );
  }
  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth() // Aplicar el esquema de seguridad a este endpoint
  @ApiOperation({ summary: 'Get all users', description: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users', type: [User] })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll( @Request() req: Request ) {
    // const user = req['user'];



    // return user;
    return this.authService.findAll();
  }


  // LoginResponse
  @UseGuards( AuthGuard )
  @Get('check-token')
  @ApiBearerAuth() // Aplicar el esquema de seguridad a este endpoint
  @ApiOperation({ summary: 'Check token validity', description: 'Check token validity' })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  checkToken( @Request() req: Request ): LoginResponseDto {
      
    const user = req['user'] as User;

    return {
      user,
      token: this.authService.getJwtToken({ id: user._id })
    }

  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
