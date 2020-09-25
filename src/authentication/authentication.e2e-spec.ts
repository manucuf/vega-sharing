import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { mockUserPayload } from '../../test/data/user';
import { omit } from 'lodash';
import mock = jest.mock;

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('POST /authentication/register', function() {
    it('should return unknown error if no payload is sent', async done => {
      const response = await request(app.getHttpServer()).post('/authentication/register');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Errore sconosciuto');

      done();
    });
    it('should return validation error if no name is sent', async done => {
      const response = await request(app.getHttpServer())
        .post('/authentication/register')
        .send(JSON.stringify(omit(mockUserPayload, ['name'])))

      console.log(response.body);
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Errore sconosciuto');

      done();
    })
  })

});
