
# Estoque

Esse projeto visa ser um erp simples para logística de Estoque

## Tecnologias/Frameworks e suas versões

* [Node](https://nodejs.org/en) - v21.5.0
* npm - 10.2.4
* yarn - 1.22.19
* [Nest.js](https://nestjs.com/) - 10
* [Mysql](https://www.mysql.com/) - 8

## Pré requisitos

* make (Makefile)
* [Docker](https://www.docker.com/) (com docker-compose)

## Passo a passo

### Subir o projeto

#### Rodar os comandos abaixo

```
cp .env.example .env
make first-install
```

#### Rodar os testes unitários

```
make test 
```

#### Subir o nestjs
```
make start-dev 
```