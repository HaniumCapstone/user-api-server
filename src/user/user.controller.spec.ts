import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const mockRepository = () => ({
  join: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  users: jest.fn(),
  profile: jest.fn(),
  createMBTI: jest.fn(),
  updateMBTI: jest.fn()
})

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,
        {
          provide: getRepositoryToken(User), useValue: mockRepository()
        }
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
