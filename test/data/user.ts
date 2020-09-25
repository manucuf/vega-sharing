import { UserPayloadDto } from '../../src/user/dto/UserPayloadDto';


export const USER_PASSWORD = 'someuserpassword';
export const mockUserPayload: UserPayloadDto = {
  name: "Foo",
  lastname: "Bar",
  email: "foobar@mail.com",
  password: USER_PASSWORD,
  username: "BestUsername"
};
