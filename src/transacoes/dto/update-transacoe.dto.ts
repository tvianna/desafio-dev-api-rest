import { PartialType } from '@nestjs/mapped-types';
import { CreateTransacoeDto } from './create-transacoe.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransacoeDto extends PartialType(CreateTransacoeDto) {
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
}
