# README

# bootplay-frontend

## Projeto BootPlay Frontend - Nathan Lima

O Projeto Frontend é um projeto React + Vite desenvolvido por Nathan Davison Lima, que possui como objetivo desenvolver o frontend de um sistema de e-commerce de discos de vinil
Foi utilizado como base, a API do Spotify para a importação e utilização dos álbums, assim como a API do backend do projeto BootPlay para a criação da lógica de negócio e dos endpoints do projeto.

## Tecnologias e Linguagens utilizadas

Node 20.12.8    
React 18.2.66   
TailwindCSS 3.4.3   
TypeScript 5.2.2    
Vite 5.2.0  
Docker  
Postman (opcional)  
DBeaver (ou outra ferramenta que suporte PostgreSQL)

## Buildando a aplicação

1. Abra um terminal dentro da pasta do projeto, utilize o comando abaixo para instalar as dependências e pacotes utilizados no projeto
```properties
npm install
```

2. Após isso, caso ainda não tenha utilizado os comandos do Docker, utilize os comandos abaixo no terminal, um após o outro, para a construção dos contêineres do projeto
```properties
docker-compose build
docker-compose up
```
3. Para executar o projeto, tenha os contêineres rodando, e utilize o comando a seguir no terminal
```properties
npm run dev
```

Obs: Abaixo está o conteúdo do README criado ao criar o projeto, caso tenha algum problema ou queira ver algumas dicas dos desenvolvedores de algumas das tecnologias usadas.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
