import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { PrismaService } from 'src/prisma.service';
import { PessoasService } from 'src/pessoas/pessoas.service';

@Module({
  controllers: [ContasController],
  providers: [ContasService, PrismaService, PessoasService],
})
export class ContasModule {}
