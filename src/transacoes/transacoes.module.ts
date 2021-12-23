import { Module } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { TransacoesController } from './transacoes.controller';
import { PrismaService } from 'src/prisma.service';
import { ContasService } from 'src/contas/contas.service';
import { PessoasService } from 'src/pessoas/pessoas.service';

@Module({
  controllers: [TransacoesController],
  providers: [TransacoesService, PrismaService, ContasService, PessoasService],
})
export class TransacoesModule {}
