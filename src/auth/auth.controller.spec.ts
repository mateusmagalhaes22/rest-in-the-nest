import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

describe('AuthController', () => {
  let controller: AuthController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [ConfigService]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have admin credentials', () => {
    expect(configService.get<string>('ADMIN_USER')).toBeDefined();
    expect(configService.get<string>('ADMIN_PASSWORD')).toBeDefined();
  })

  it('should reject login with wrong email', () => {
    expect(controller.login({
      email: "wrongemail@example.com",
      password: configService.get<string>('ADMIN_PASSWORD')!
    })).toThrow(UnauthorizedException)
  });

  it('should reject login with wrong password', () => {
    expect(controller.login({
      email: configService.get<string>('ADMIN_USER')!,
      password: "wrongpassword"
    })).toThrow(UnauthorizedException)
  })

  it('should accept login with correct credentials', () => {
    expect(controller.login({
      email: configService.get<string>('ADMIN_USER')!,
      password: configService.get<string>('ADMIN_PASSWORD')!
    })).toThrow(UnauthorizedException)
  })

});
