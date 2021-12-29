import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      const { username, password } = authCredentialsDto;
      const user = new User();
      user.username = username;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      await user.save();
    } catch (e) {
      if (e.code === '23505') {
        //already existing user
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (user && (await user.validateUserPassword(password))) {
      return user.username;
    } else {
      throw new NotFoundException('Invalid Credentials');
    }
  }
}
