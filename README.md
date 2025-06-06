# Projeto Ecommerce TMDB (Vue 3 + Vuetify 3)

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [API TMDB](#api-tmdb)
- [Máscaras e Validações](#máscaras-e-validações)
- [Estado com Vuex](#estado-com-vuex)
- [Estilização com Vuetify 3](#estilização-com-vuetify-3)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Descrição do Projeto

Este projeto é um e-commerce focado em filmes utilizando dados da API TMDB (The Movie Database). Desenvolvido em Vue 3 com Vuetify 3 para interface, Vuex para gerenciamento global de estado e integração com a API TMDB para exibir filmes populares, buscar por título, adicionar favoritos e finalizar compras.

## Tecnologias Utilizadas

- **Vue 3** — Framework JavaScript progressivo para interfaces de usuário.
- **Vuetify 3** — Biblioteca de componentes UI baseada em Material Design.
- **Vuex** — Gerenciamento de estado centralizado para Vue.
- **TypeScript** — Superset do JavaScript que adiciona tipagem estática.
- **Axios** — Cliente HTTP para requisições REST.
- **TMDB API** — Fonte de dados dos filmes.
- **vue-the-mask** — Máscaras para inputs.

## Funcionalidades

- Exibição de filmes populares.
- Busca de filmes por título.
- Adicionar e remover filmes dos favoritos (armazenados no Vuex).
- Carrinho de compras com controle de itens e valores totais.
- Formulário de checkout com validações e máscaras (CPF, celular, CEP).
- Autopreenchimento de endereço via API ViaCEP ao inserir o CEP.
- Modal de confirmação de compra.

## Estrutura do Projeto

```
src/
├── assets/             # Imagens, ícones, estilos globais
├── components/         # Componentes Vue reutilizáveis (List, CartSummary, CheckoutForm, Modal, etc)
├── composables/        # Funções reutilizáveis (ex: usePriceFormatter)
├── router/             # Configuração das rotas com Vue Router
├── services/           # Serviços de API para TMDB e ViaCEP
├── store/              # Vuex store e módulos (favorites, cart, etc)
├── views/              # Páginas do projeto (Home, Checkout, Favorites)
└── App.vue             # Componente raiz
```

## Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

Instale as dependências:

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com a chave da API TMDB:

```env
VITE_TMDB_API_KEY=seu_api_key_aqui
```

## Execução

Para rodar o projeto em modo desenvolvimento:

```bash
npm run dev
```

Abra no navegador: [http://localhost:5173](http://localhost:5173)

Para build produção:

```bash
npm run build
```

## API TMDB

O projeto consome a API pública TMDB para buscar filmes e gêneros. A integração está encapsulada em `src/services/api.js` com funções para:

- Buscar filmes populares (`fetchPopularMovies`)
- Buscar gêneros (`fetchGenresApi`)
- Buscar filmes por busca (`searchMovies`)

## Máscaras e Validações

O formulário utiliza o pacote `vue-the-mask` para aplicar máscaras nos campos:

- CPF: `###.###.###-##`
- Celular: `(##) #####-####`
- CEP: `#####-###`

Validações são feitas via métodos no componente de checkout para garantir dados corretos antes do envio.

## Estado com Vuex

O Vuex é usado para controlar:

- Filmes favoritos (adicionar/remover)
- Itens do carrinho
- Cálculo do total do pedido

## Estilização com Vuetify 3

Utiliza o Vuetify 3 com seu sistema de grid, botões, inputs estilizados e componentes prontos para UI Material Design.

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue para discutir as mudanças ou envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License.
