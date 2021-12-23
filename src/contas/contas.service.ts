import { HttpException, Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { PrismaService } from 'src/prisma.service';
import { PessoasService } from '../pessoas/pessoas.service';

@Injectable()
export class ContasService {
  constructor(
    private prisma: PrismaService,
    private pessoasService: PessoasService,
  ) {}

  async create(createContaDto: CreateContaDto) {
    try {
      const pessoa = await this.pessoasService.findOne(createContaDto.idPessoa);
      if (!pessoa) {
        console.log(`Pessoa ${createContaDto.idPessoa} não cadastrada`);
      }

      const createConta = await this.prisma.$transaction([
        this.prisma.contas.create({
          data: {
            dataCriacao: new Date(),
            ...createContaDto,
          },
        }),
      ]);
      return createConta;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  findAll() {
    try {
      const findConta = this.prisma.$transaction([
        this.prisma.contas.findMany(),
      ]);
      return findConta;
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    try {
      const findContaById = this.prisma.$transaction([
        this.prisma.contas.findUnique({
          where: {
            idConta: id,
          },
        }),
      ]);
      return findContaById;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  update(id: number, updateContaDto: UpdateContaDto) {
    try {
      const updateConta = this.prisma.$transaction([
        this.prisma.contas.update({
          where: {
            idConta: id,
          },
          data: updateContaDto,
        }),
      ]);
      return updateConta;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  remove(id: number) {
    try {
      const removeConta = this.prisma.$transaction([
        this.prisma.contas.delete({
          where: {
            idConta: id,
          },
        }),
      ]);
      return removeConta;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  blockConta(id: number) {
    try {
      const blockConta = this.prisma.$transaction([
        this.prisma.contas.update({
          where: {
            idConta: id,
          },
          data: {
            flagAtivo: false,
          },
        }),
      ]);
      return blockConta;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  checkSaldo(id: number) {
    try {
      const conta = this.prisma.$transaction([
        this.prisma.contas.findUnique({
          where: {
            idConta: id,
          },
          select: {
            idConta: true,
            saldo: true,
          },
        }),
      ]);
      return conta;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }
}
