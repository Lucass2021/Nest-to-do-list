import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalGuard)
  @ApiOperation({
    summary: 'Login',
    description: 'Endpoint to login',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'securePassword123!' },
      },
      required: ['email', 'password'],
    },
  })
  login(@Req() req: Request) {
    return this.authService.login(req);
  }

  @Get('/status')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'User JWT content',
    description: 'Endpoint to get user JWT content',
  })
  status(@Req() req: Request) {
    return req.user;
  }
}
