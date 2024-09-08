import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import { randomBytes } from 'crypto';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user);

    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return { users };
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      return user;
    }

    throw new HttpException(
      'A user with this username/email does not exist.',
      HttpStatus.NOT_FOUND,
    );
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      return user;
    }

    throw new HttpException(
      'A user with this email does not exist.',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
    const updatedUser = {
      ...user,
      ...updateUserDto,
    };

    await this.userRepository.save(updatedUser);

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async generateResetToken(email: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (user) {
      const currentTime = new Date().getTime();
      const tokenAgeInMinutes = user.resetTokenTime
        ? (currentTime - new Date(user.resetTokenTime).getTime()) / 60000
        : 16;

      if (tokenAgeInMinutes < 15) {
        throw new HttpException(
          'Please wait at least 15 minutes before resetting your password again.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
    }

    const resetToken = randomBytes(32).toString('hex');
    await this.userRepository.update(
      { email: email },
      {
        resetToken: resetToken,
        resetTokenTime: new Date(),
      },
    );

    // await this.mailService.sendForgotPasswordEmail(user, resetToken);

    return {
      message: 'Password reset token sent successfully!',
      status: HttpStatus.OK,
    };
  }
}
