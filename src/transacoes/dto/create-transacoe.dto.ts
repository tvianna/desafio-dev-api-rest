import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransacoeDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  idTransacao: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  idConta: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  valor: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  tipo: number;

  @IsNotEmpty()
  @ApiProperty()
  dataTransacao: Date;

  dtInicio: Date;

  dtFim: Date;
}
