import { HttpException, Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PessoasService {
  constructor(private prisma: PrismaService) {}

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const createPessoa = await this.prisma.$transaction([
        this.prisma.pessoas.create({
          data: {
            dataNascimento: createPessoaDto.dataNascimento,
            ...createPessoaDto,
          },
        }),
      ]);

      return createPessoa;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    try {
      const findPessoas = await this.prisma.$transaction([
        this.prisma.pessoas.findMany(),
      ]);
      return findPessoas;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: number) {
    try {
      const findPessoaByID = await this.prisma.$transaction([
        this.prisma.pessoas.findUnique({
          where: {
            idPessoa: id,
          },
        }),
      ]);
      return findPessoaByID;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    try {
      const updatePessoa = await this.prisma.$transaction([
        this.prisma.pessoas.update({
          where: {
            idPessoa: id,
          },
          data: updatePessoaDto,
        }),
      ]);
      return updatePessoa;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async remove(id: number) {
    try {
      const removePessoa = await this.prisma.$transaction([
        this.prisma.pessoas.delete({
          where: {
            idPessoa: id,
          },
        }),
      ]);
      return removePessoa;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }
}
