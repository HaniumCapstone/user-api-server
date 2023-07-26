import { Test, TestingModule, } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';


const mockRepository = () => ({
  join: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  users: jest.fn(),
  profile: jest.fn(),
  createMBTI: jest.fn(),
  updateMBTI: jest.fn()
})

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: getRepositoryToken(User), useValue: mockRepository()
      }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
