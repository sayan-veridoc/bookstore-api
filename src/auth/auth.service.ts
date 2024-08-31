import { UserService } from '@/user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ChangePasswordDto,
  LoginDto,
  RegisterDto,
  UpdateProfileDto,
} from './dto';
import { compareSync, hashSync } from 'bcryptjs';
import { PostgresErrorCode } from '@/enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // private schedulerRegistry: SchedulerRegistry,
    private configService: ConfigService,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    const password = hashSync(registerDto.password);

    try {
      const createdUser = await this.usersService.create({
        ...registerDto,
        password,
      });

      return createdUser;
    } catch (error: any) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'A user with that username and/or email already exists.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    await this.verifyPassword(dto.password, user.password);

    const accessToken = await this.signToken(user.id, user.email);

    return { user, accessToken };
  }
  async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = compareSync(password, hashedPassword);

    if (!isPasswordMatching) {
      throw new HttpException(
        'The username/email and password combination provided was incorrect.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  async updateProfile(id: number, newData: UpdateProfileDto) {
    return await this.usersService.update(id, newData);
  }
  async removeUser(id: number) {
    return await this.usersService.remove(id);
  }
  async changePassword(email: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findByEmail(email);

    await this.verifyPassword(changePasswordDto.oldPassword, user.password);

    const password = hashSync(changePasswordDto.newPassword);

    await this.usersService.update(user.id, {
      password,
    });
    return {
      message: 'Password changed successfully!',
      status: HttpStatus.OK,
    };
  }
  async signToken(id: number, email: string): Promise<string> {
    const payload = {
      sub: id,
      email,
    };
    const secret = this.configService.getOrThrow('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: 604800,
      secret: secret,
    });

    return token;
  }
}
