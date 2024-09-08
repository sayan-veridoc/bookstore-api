import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  LoginDto,
  RegisterDto,
  UpdateProfileDto,
} from './dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard, LocalAuthGuard } from './guard';
import { User } from '@/users/entities/user.entity';
import { GetUser } from '@/decorators';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
  @Post('registerUser')
  async registerUser(@Body() registerDto: RegisterDto) {
    return await this.authService.crtRegularUser(registerDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginDto,
  })
  @Post('login')
  async login(@Req() req) {
    return req.user;
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('getUser')
  async getUser(@GetUser() user: User) {
    return user;
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch('update-profile')
  async updateProfile(
    @GetUser('id') id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.authService.updateProfile(id, updateProfileDto);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete('remove-user')
  async remove(@GetUser('id') id: number) {
    await this.authService.removeUser(id);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('change-password')
  async changePassword(
    @GetUser('email') email: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.authService.changePassword(email, changePasswordDto);
  }
  // @HttpCode(200)
  // @Post('forgot-password')
  // async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
  //   return await this.authService.forgotPassword(forgotPasswordDto.email);
  // }

  // @HttpCode(200)
  // @Post('reset-password')
  // async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  //   return await this.authService.resetPassword(resetPasswordDto);
  // }
}
