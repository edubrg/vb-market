# VbMarket

Monorepo Angular com arquitetura de microfrontends (Native Federation). Projeto de portfólio para demonstrar fundação arquitetural: Shell como host, MFEs remotos e bibliotecas compartilhadas.

## Estrutura do projeto

| Projeto                 | Tipo    | Porta | Descrição                                   |
| ----------------------- | ------- | ----- | --------------------------------------------- |
| **shell**         | App     | 4200  | Host/orquestrador, navegação e contexto     |
| **mfe-products**  | App     | 4201  | MFE de listagem de produtos                   |
| **mfe-cart**      | App     | 4202  | MFE de carrinho                               |
| **lib-contracts** | Library | -     | Tipos, interfaces e contratos (ex.: contexto) |
| **vb-lib-ui**     | Library | -     | Componentes de UI reutilizáveis              |

## Pré-requisitos

- **Node.js** 20.19.1
- **npm** 9+
- Angular CLI: 19.2.19

## Instalação

```bash
npm install
```

## Como rodar (desenvolvimento)

O Shell consome as libs e os remotes. Para tudo funcionar, siga esta ordem:

### 1. Build das bibliotecas (obrigatório antes do primeiro `serve`)

O Shell e o mfe-products dependem de **vb-lib-ui**, que é resolvido a partir de `dist/`. É necessário gerar o build das libs uma vez:

```bash
npm run build lib-contracts
npm run build vb-lib-ui
```

### 2. Subir Shell e remotes

Abra **três terminais** na raiz do repositório.

**Terminal 1 – Shell (host):**

```bash
ng serve shell
```

Acesse: **http://localhost:4200**

**Terminal 2 – MFE Products:**

```bash
ng serve mfe-products
```

**Terminal 3 – MFE Cart:**

```bash
ng serve mfe-cart
```

Com os três em execução, a aplicação no navegador (localhost:4200) carrega o Shell e os microfrontends nas rotas `/products` e `/cart`.

### Resumo rápido (já com dependências instaladas e libs buildadas)

```bash
# Terminal 1
ng serve shell

# Terminal 2
ng serve mfe-products

# Terminal 3
ng serve mfe-cart
```

## Build para produção

Build das libs e depois do Shell (os remotes são buildados conforme uso no seu fluxo de deploy):

```bash
ng build lib-contracts
ng build vb-lib-ui
ng build shell
ng build mfe-products
ng build mfe-cart
```

Ou apenas o Shell (se as libs já estiverem em `dist/`):

```bash
ng build
```

## Testes e lint

*obs: Os testes serão desenvolvidos ao decorrer do projeto.*

```bash
# Testes (Karma) – executar por projeto, ex.:
ng test shell

# Lint em todo o monorepo
npm run lint
```

## Recursos adicionais

- [Angular CLI](https://v19.angular.dev/overview)
- [Native Federation (Angular Architects)](https://www.npmjs.com/package/@angular-architects/native-federation)
