import { Controller, Get, UseGuards, Post, Req } from '@nestjs/common';
import { LocalAuthGaurd } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGaurd)
  @Post('login')
  async login(@Req() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Req() req): string {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req): Promise<any> {
    // Invalidate the user's JWT token
    req.logout();

    // Return a message indicating successful logout
    return { message: 'Logged out successfully' };
  }
}
