import { User } from '../../src/user/schema/user.schema';
import { mockUserPayload } from '../data/user';

export class MockUserService {
  async findByEmail(name: string): Promise<any> {
    return mockUserPayload;
  }

  async create() {

  }
}
