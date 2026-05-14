import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogindDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  

  @Post('/login')
  login(@Body() data: LogindDto) {
    return this.auth.login(data);
  }
}
