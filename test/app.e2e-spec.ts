import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ContasModule } from './../src/contas/contas.module';
import { PessoasModule } from './../src/pessoas/pessoas.module';

describe('PessoasController (e2e)', () => {
  let app: INestApplication;

  afterAll((done) => {
    done();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PessoasModule, ContasModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/pessoas (POST)', () => {
    it('Deve criar uma pessoa', () => {
      request(app.getHttpServer())
        .post('/pessoas')
        .send({
          nome: 'teste xpto',
          cpf: '12345432',
          dataNascimento: '1986-01-29',
        })
        .expect(201);
    });
  });
});
