import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { UserPayloadDto } from './dto/UserPayloadDto';
import mock = jest.mock;
import { Document } from 'mongoose';
import Mock = jest.Mock;
import { MockModel } from '../../test/mocks/MockModel';
import { mockUserPayload, USER_PASSWORD } from '../../test/data/user';




const mockModel = new MockModel();

describe.skip('UserService', () => {
  let service: UserService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: MockModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hash', () => {

    it('should return an hashed password', async() => {
      // @ts-ignore - because of the private method
      const hashed = await  UserService.hash("somepassword");
      expect(hashed).not.toBe('somepassword');
    })
  })
  describe('passwordMatches', () => {
    it('should return FALSE if I give different passwords', async () => {
      const mockUser = {
        // @ts-ignore
        password: await bcrypt.hash(USER_PASSWORD, 10)
      };
      // @ts-ignore
      const result = await UserService.passwordMatches(mockUser, 'someotherpassword');
      expect(result).toBeFalsy();
    });
    it('should return TRUE if I give matching passwords', async () => {
      const mockUser = {
        // @ts-ignore
        password: await bcrypt.hash(USER_PASSWORD, 10)
      };
      // @ts-ignore
      const result = await UserService.passwordMatches(mockUser, USER_PASSWORD);
      expect(result).toBeTruthy();
    });

  });

  describe('create', async () => {

    it('should return a new user ', async() => {

      const spy = jest.spyOn(MockModel.prototype, 'save').mockReturnValueOnce({
        ...mockUserPayload,
        password: await bcrypt.hash(mockUserPayload.password, 10),
      } as any );
      await  service.create(mockUserPayload.name, mockUserPayload.lastname, mockUserPayload.email, mockUserPayload.password);
      const value = spy.mock.results[0].value;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(value).toHaveProperty('name', mockUserPayload.name);
      expect(value).toHaveProperty('lastname', mockUserPayload.lastname );
      expect(value).toHaveProperty('email', mockUserPayload.email);
      expect(value.password).not.toBe(mockUserPayload.password); // hashed
    });

  })


});
