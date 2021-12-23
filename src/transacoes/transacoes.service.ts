import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransacoeDto } from './dto/create-transacoe.dto';
import { UpdateTransacoeDto } from './dto/update-transacoe.dto';
import { ContasService } from '../contas/contas.service';

@Injectable()
export class TransacoesService {
  constructor(
    private prisma: PrismaService,
    private contasService: ContasService,
  ) {}

  async create(createTransacoeDto: CreateTransacoeDto) {
    try {
      const transacao = await this.prisma.$transaction([
        this.prisma.transacoes.create({
          data: {
            dataTransacao: new Date(),
            ...createTransacoeDto,
          },
        }),
      ]);
      return transacao;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    try {
      const transacoes = await this.prisma.$transaction([
        this.prisma.transacoes.findMany(),
      ]);
      return transacoes;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async extrato(id: number) {
    try {
      const transacoes = await this.prisma.$transaction([
        this.prisma.transacoes.findMany({
          where: {
            idConta: id,
          },
        }),
      ]);
      return transacoes;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: number) {
    try {
      const transacao = await this.prisma.$transaction([
        this.prisma.transacoes.findUnique({
          where: {
            idTransacao: id,
          },
        }),
      ]);
      return transacao;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async update(id: number, updateTransacoeDto: UpdateTransacoeDto) {
    try {
      const updateTransacao = await this.prisma.$transaction([
        this.prisma.transacoes.update({
          where: {
            idTransacao: id,
          },
          data: updateTransacoeDto,
        }),
      ]);
      return updateTransacao;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async remove(id: number) {
    try {
      const removeTransacao = await this.prisma.$transaction([
        this.prisma.transacoes.delete({
          where: {
            idTransacao: id,
          },
        }),
      ]);
      return removeTransacao;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async depositar(id: number, valor: number) {
    try {
      const depositar = await this.prisma.$transaction([
        this.prisma.transacoes.create({
          data: {
            idConta: id,
            valor: valor,
            tipo: 1,
            dataTransacao: new Date(),
          },
        }),
      ]);

      const conta = await this.contasService.findOne(id);
      const novoSaldo = Number(conta[0].saldo) + Number(valor);

      await this.prisma.$transaction([
        this.prisma.contas.update({
          where: {
            idConta: id,
          },
          data: {
            saldo: novoSaldo,
          },
          select: {
            idConta: true,
            saldo: true,
          },
        }),
      ]);

      return depositar;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async sacar(id: number, valor: number) {
    try {
      const sacar = await this.prisma.$transaction([
        this.prisma.transacoes.create({
          data: {
            idConta: id,
            valor: valor,
            tipo: 2,
            dataTransacao: new Date(),
          },
        }),
      ]);

      const conta = await this.contasService.findOne(id);
      const novoSaldo = Number(conta[0].saldo) - Number(valor);

      await this.prisma.$transaction([
        this.prisma.contas.update({
          where: {
            idConta: id,
          },
          data: {
            saldo: novoSaldo,
          },
        }),
      ]);

      return sacar;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async consultarExtratoPeriodo(id: number, dtInicio: string, dtFim: string) {
    const extrato = await this.prisma.$transaction([
      this.prisma.transacoes.findMany({
        where: {
          idConta: id,
          dataTransacao: {
            gte: new Date(dtInicio),
            lt: new Date(dtFim),
          },
        },
      }),
    ]);
    return extrato;
  }
}
