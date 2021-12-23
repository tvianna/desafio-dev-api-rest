import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseFloatPipe,
  Query,
  ParseArrayPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { CreateTransacoeDto } from './dto/create-transacoe.dto';
import { UpdateTransacoeDto } from './dto/update-transacoe.dto';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @Post()
  create(@Body() createTransacoeDto: CreateTransacoeDto) {
    return this.transacoesService.create(createTransacoeDto);
  }

  @Post('/depositar/:id')
  depositar(
    @Param('id') id: string,
    @Body('valor', ParseFloatPipe) valor: number,
  ) {
    return this.transacoesService.depositar(+id, valor);
  }

  @Post('/sacar/:id')
  sacar(@Param('id') id: string, @Body('valor', ParseFloatPipe) valor: number) {
    return this.transacoesService.sacar(+id, valor);
  }

  @Get()
  findAll() {
    return this.transacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transacoesService.findOne(+id);
  }

  @Get('/extrato/:id')
  consultarExtrato(@Param('id') id: string, @Body() data) {
    return this.transacoesService.consultarExtrato(
      +id,
      data.dtInicio,
      data.dtFim,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransacoeDto: UpdateTransacoeDto,
  ) {
    return this.transacoesService.update(+id, updateTransacoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transacoesService.remove(+id);
  }
}
