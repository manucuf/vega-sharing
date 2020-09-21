import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthenticationModule } from './authentication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppModule } from '../app.module';

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/authentication/register (POST)', async done => {
    const response = await request(app.getHttpServer()).post('/authentication/register');
    console.log("aaaa", response);
    expect(response.status).toBe(200);
    expect(response.body).toBe("Hello World!");

    done();
  });
});
