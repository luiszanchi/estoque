
ps:
	@docker-compose ps

up:
	@docker-compose up -d

down:
	@docker-compose down

reset:
	make down && make up

build:
	@docker-compose build --no-cache

in:
	@docker-compose exec app sh

install:
	@docker-compose exec app sh -c "yarn install"

start-dev:
	@docker-compose exec app sh -c "yarn run start:dev"

migrate:
	@docker-compose exec app sh -c "sequelize-cli db:migrate"

test:
	@docker-compose exec app sh -c "yarn run test"

first-install:
	make build
	make up
	make install
	make migrate
