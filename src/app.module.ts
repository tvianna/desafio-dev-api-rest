import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { ContasModule } from './contas/contas.module';
import { TransacoesModule } from './transacoes/transacoes.module';

@Module({
  imports: [PessoasModule, ContasModule, TransacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
