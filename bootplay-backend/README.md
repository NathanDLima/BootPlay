# README

# bootplay-backend

## Projeto BootPlay Backend - Nathan Lima

O Projeto Backend é um projeto API desenvolvido por Nathan Davison Lima, que possui como objetivo desenvolver o backend de um sistema de e-commerce de discos de vinil, assim como implementar no mesmo, um sistema de pontos para maior fidelização dos seus clientes.     
Foi utilizado como base, a API do Spotify para a importação e utilização dos álbums.

## Pré-Requisitos

Java 17+    
Docker  
Postman (opcional)  
DBeaver (ou outra ferramenta que suporte PostgreSQL)

## Buildando a aplicação

1. Execute o projeto com o Maven e com seu Modo de Testes desabilitado
```properties
mvn clean install
```
Obs: Reabilite o Modo de Testes do Maven quando for verificar os testes unitários que forem realizados.
Obs: Utilize uma conta Spotify para gerar o ClientId e ClientSecret no Spotify Developer Dashboard, e insira eles dentro do arquivo SpotifyApi, que está no seguinte caminho: bootplay-backend\app-integration-api\src\main\java\br\com\sysmap\bootcamp\domain\service\integration

2. Utilize, dentro da pasta raiz da aplicação, os comandos para construir e subir os containers do Docker
```properties
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up
```
3. Para ver os resultados dos endpoints sendo salvos no banco de dados PostgreSQL, utilize sua ferramenta preferida que suporte o SGBD escolhido.
   Obs: Recomendo o DBeaver, visto que foi o mesmo utilizado para verificar durante o desenvolvimento do projeto.

## Utilizando a aplicação

Para utilizar e realizar as ações da API, pode-se utilizar o Postman:
#### app-user-api:
```properties
localhost:8081/api/
```
#### app-integration-api
```properties
localhost:8082/api/
```


Ou o próprio Swagger nos seguintes endereços:
#### app-user-api
http://localhost:8081/api/swagger-ui/index.html#

#### app-integration-api
http://localhost:8082/api/swagger-ui/index.html#


