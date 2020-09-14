import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from './schema/refreshToken.schema';
import { MockModel } from '../../test/mocks/MockModel';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { MockUserService } from '../../test/mocks/MockUserService';
import { mockUserPayload } from '../../test/data/user';
import { AuthenticationError } from './AuthenticationError';



describe('AuthenticationService', () => {
  let service: AuthenticationService;

  const mockUserService = new MockUserService();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({ secret: "asecret" }),
        ConfigModule,
      ],
      providers: [
        AuthenticationService,
        {
          provide: getModelToken(RefreshToken.name),
          useValue: MockModel
        },
        {
          provide: UserService, useValue: mockUserService
        }
        ],
    })
      .compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    let findByEmailSpy = jest.spyOn(mockUserService, 'findByEmail');
    let createMockSpy = jest.spyOn(mockUserService, 'create');

    beforeEach(() => {
      // clear mock calls for every test
      findByEmailSpy.mockClear();
      createMockSpy.mockClear();

    })
    it('should return a new user if no user is found', async () => {
      findByEmailSpy.mockReturnValueOnce(null);
      createMockSpy.mockReturnValueOnce(mockUserPayload as any);


      const result = await service.register(mockUserPayload);
      expect(findByEmailSpy).toHaveBeenCalledTimes(1);
      expect(createMockSpy).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('name', mockUserPayload.name);
    })

    it('should throw AuthenticationError Exception if findByEmail returns existent user', async () => {
      findByEmailSpy.mockReturnValueOnce(mockUserPayload as any);
      createMockSpy.mockReturnValueOnce(mockUserPayload as any);

      const call = async () => {
        return await service.register(mockUserPayload);
      }
      await expect(call())
        .rejects
        .toThrowError('User already existing');
      expect(findByEmailSpy).toHaveBeenCalledTimes(1);
      expect(createMockSpy).not.toHaveBeenCalled();
    })
  })
});
