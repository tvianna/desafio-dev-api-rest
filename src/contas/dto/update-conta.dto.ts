import { PartialType } from '@nestjs/mapped-types';
import { CreateContaDto } from './create-conta.dto';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContaDto extends PartialType(CreateContaDto) {
  @IsInt()
  @ApiProperty()
  idPessoa: number;

  @IsNumber()
  @ApiProperty()
  saldo: number;

  @IsNumber()
  @ApiProperty()
  limiteSaqueDiario: number;

  @IsBoolean()
  @ApiProperty()
  flagAtivo: boolean;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  tipoConta: number;

  dataCriacao: Date;
}
