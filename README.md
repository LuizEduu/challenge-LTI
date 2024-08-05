# Projeto Challenge LTI

Este projeto é uma aplicação desenvolvida usando **Node.js**, **Docker**, **MySQL**, **NestJS**, e **Prisma**.

## Stack

- **Node.js**: Versão 20
- **Docker**
- **MySQL**
- **NestJS**
- **Prisma**

## Arquitetura do projeto

- Busquei utilizar dos conceitos do clean arch como separação das minhas camadas de aplicação e desacoplamento de tecnologias externas
  como lib para autenticação, hash de senha, conexão e consultas com os bancos.

### Core

- Arquivos essenciais que serão compartilhados entre a camada de negocio do projeto.

### Domain

- Camada de negocio do projeto, ali fica todas as entidades de dominio, regras de negocio que são o coração da aplicação, desacopladas de framewoks e libs

### Infra

- Camada mais externa, ali fica configuração de conexões, acesso a aplicação como http, libs externas como lib para autenticação, lib para banco de dados e afins.

## Observações

- **Segurança**: Sei que não é recomendado commitar arquivos `.env` por questões de segurança, para facilitar o teste da aplicação, o arquivo `.env` foi incluído no repositório.

- **Implementações**
  Infelizmente por questões de tempo, queda de internet(Meu provedor teve um rompimento de fibra e plantão no meu atual emprego) não consegui implementar todos os requisitos pedidos no projeto, faltando as seguintes partes:
- Deverá ser possível gerar folhas de um departamento em lote.
- Departamentos com folhas pendentes em um período determinado.

## Formas de Execução

### Com Docker

1. **Iniciar os Contêineres**

   Na raiz do projeto, execute o comando para iniciar os contêineres definidos no `docker-compose.yml`:

   ```bash
   docker compose up -d
   docker exec -it challenge-lti-app bash
   npm install
   npm run start:dev
   ```

### Caso não tenha o docker instalado executar com o NodeJs no mínimo a versão 20 na máquina

```bash
1. Acessar a raiz do projeto
2. executar o comando npm install para instalação das dependencias
3. npm run start:dev para executar a aplicação
```

### Consumo

**Caso esteja utilizando o Visual Studio Code, instale a extensão HTTP Client.**

- Utilize o arquivo api.http na raiz do projeto para testar as chamadas de API com exemplos prontos.

### Informações Adicionais

Se precisar de mais informações ou tiver dúvidas sobre o projeto, entre em contato comigo atrávez do whatsapp ou e-mail.
