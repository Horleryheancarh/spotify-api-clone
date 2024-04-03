import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import { User } from './user.entity';
import { CreateUserDTO } from './dtos/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    const user = new User();
    const salt = await bcrypt.genSalt();

    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.password = await bcrypt.hash(data.password, salt);
    user.apiKey = uuid4();

    const savedUser = await this.userRepository.save(data);
    delete savedUser.password;

    return savedUser;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }

  async updateSecretKey(id: number, secret: string) {
    return await this.userRepository.update(
      { id },
      { twoFASecret: secret, enable2FA: true },
    );
  }

  async disable2FA(id: number): Promise<UpdateResult> {
    return await this.userRepository.update(
      { id },
      { twoFASecret: null, enable2FA: false },
    );
  }

  async findByApiKey(apiKey: string) {
    return this.userRepository.findOneBy({ apiKey });
  }
}
