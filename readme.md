## Dock Desafio API

## Descrição

Para este projeto, foi utilizado o framework [Nest](https://github.com/nestjs/nest) com ORM [Prisma](https://www.prisma.io/).

## Instalação
Acesse o diretório raiz do projeto, onde se encontra o arquivo docker-compose.yml e execute o comando:
```bash
$ npm install
```

## Iniciando os containers
Ainda no diretório raiz, execute o comando:
```bash
# development
$ docker-compose up
```

Serão criados dois serviços no docker:
  - dock-desafio-mysql:
    - container que comportará o banco de dados mysql;
    - as tabelas do bando de dados serão criadas automaticamente após a finalização da criação dos serviços no docker.
  - dock-api-dev:
    - container que comportará a aplicação.

## Pontos de atenção

As tabelas e seus relacionamentos serão criados automaticamente pelo [prisma](https://www.prisma.io/), a estrutura de tabelas está definida no arquivo schema.prisma, que está na pasta prisma do projeto.

## Paths criados
#
## Pessoas
- Criar pessoa

  POST http://localhost:3000/pessoas
```bash
# body
  {
    "nome": "Pessoa XPTO",
    "cpf": "12345675421",
    "dataNascimento": "2021-12-23T03:45:07.902Z"
  }
```
## Contas
- Criar conta validando pessoa cadastrada

  POST http://localhost:3000/contas
```bash
# body
  {
    "idPessoa": 1,
    "saldo": 10,
    "limiteSaqueDiario": 0,
    "flagAtivo": true,
    "tipoConta": 0
  }
```
- Consultar saldo (passando :id da conta)

  GET http://localhost:3000/contas/saldo/1

- Bloquear conta (passando :id da conta)

  PATCH http://localhost:3000/contas/bloquear/1

## Transações
- Depositar valor na conta (passando :id da conta)

  POST http://localhost:3000/transacoes/depositar/1
```bash
# body 
{
  "idConta": 1,
  "valor": 10
}
``` 
- Sacar valor da conta (passando :id da conta)

  POST http://localhost:3000/transacoes/sacar/1
```bash
# body 
{
  "idConta": 1,
  "valor": 10
}
``` 
- Extrato da conta (passando :id da conta)

  GET http://localhost:3000/transacoes/extrato/1


- Extrato por período (passando :id da conta)

  GET http://localhost:3000/transacoes/extratoPeriodo/1
```bash
# body
{
  "idConta": 1,
  "dtInicio": "2021-12-21",
  "dtFim": "2021-12-23"
}
``` 
#

## Documentação API
A documentação da API foi implementada utilizando OPEN API (swagger). Neste projeto, o swagger foi implementado com conceito de reflection. As alterações realizadas nas DTOs do projeto irão refletir automaticamente na documentação.

O acesso a esta documentação, que contempla todos os endpoints criados além dos que foram listados neste documento deve ser realizado pelo link: http://localhost:3000/api .

#
Projeto desenvolvido por [Taís Vianna](https://github.com/tvianna).
