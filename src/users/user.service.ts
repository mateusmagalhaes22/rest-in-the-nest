import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService implements OnModuleInit{

  constructor(
      @InjectRepository(User)
      private readonly repository: Repository<User>,
      private readonly configService: ConfigService, 
    ){}
  async onModuleInit() {
    const count = await this.repository.count();
    if (count === 0) {
      const admin = this.repository.create({
        name: 'Admin',
        email: this.configService.get<string>('ADMIN_USER'),
        fone: '+0000000000000',
        password: this.configService.get<string>('ADMIN_PASSWORD'),
      });
      await this.repository.save(admin);
      console.log(`🛠 Admin user created: ${this.configService.get<string>('ADMIN_USER')} / ${this.configService.get<string>('ADMIN_PASSWORD')}`);
    }
  }

  create(dto: CreateUserDto) {
    const user = this.repository.create(dto);
    return this.repository.save(user)
  }

  findAll() {
    return this.repository.find()
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.repository.findOneBy({ id });
    if (!user) return null;
    this.repository.merge(user, dto);
    return this.repository.save(user);
  }

  async remove(id: string) {
    const user = await this.repository.findOneBy({ id });
    if (!user) return null;
    return this.repository.remove(user);
  }
}
