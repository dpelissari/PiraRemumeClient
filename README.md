# PiraREMUME (client)

PiraREMUME é a consulta pública da Relação Municipal de Medicamentos Essenciais de Piracicaba. REMUME é o elenco da cidade: os medicamentos que a Prefeitura se compromete a oferecer na rede pública.

O projeto não inventa essa lista. Organiza o que já está no site da Prefeitura para ficar fácil de buscar. Dá para saber se o medicamento faz parte da REMUME, se sai em toda a rede ou só em algumas farmácias, e onde fica a unidade do posto. Não diz se tem o item na prateleira hoje. Isso só a farmácia confirma. Farmácia particular (Drogal, Drogaria São Paulo e outras) não entra.

Este repositório é o **site**, em Angular 22. Ele não guarda o catálogo. Tudo que a pessoa vê vem da [PiraREMUME (API)](https://github.com/dpelissari/MedMinimalAPI). Sem a API no ar, a consulta não funciona.

A versão publicada está em [pira-remume-client-alpha.vercel.app](https://pira-remume-client-alpha.vercel.app/). A primeira carga pode demorar se a API no Render estiver dormindo.

Fontes oficiais (as mesmas da API):

- [Página da REMUME](https://piracicaba.sp.gov.br/servicos/relacao-municipal-de-medicamentos-essenciais-remume/)
- [Farmácias municipais](https://piracicaba.sp.gov.br/servicos/farmacias-municipais/)

## O que este site faz

A parte pública não pede login. Os `GET` abaixo estão descritos na [API](https://github.com/dpelissari/MedMinimalAPI#endpoints).

- **Consulta** (`/`): busca medicamento por nome ou grupo farmacológico. Chama `GET /medicamentos` e `GET /medicamentos/grupos`
- **Medicamento** (`/medicamentos/:id`): apresentações e se o item sai em toda a rede ou só em algumas farmácias. Chama `GET /medicamentos/{id}`
- **Farmácias** (`/farmacias`): endereços, horários e unidades de referência. Chama `GET /farmacias`
- **Farmácia** (`/farmacias/:slug`): detalhe da unidade. Chama `GET /farmacias/{slug}`
- **Sobre** (`/sobre`): o que é a REMUME, de onde vêm os dados e o que o site não faz

A parte admin usa JWT, descrito na [API](https://github.com/dpelissari/MedMinimalAPI#autenticação-jwt).

- **Entrar** (`/login`): `POST /login`. O token fica no client e o interceptor manda no header nas chamadas seguintes
- **Sincronismo** (`/admin/sincronismo`): só Admin. Vê as URLs vigiadas, o intervalo e o resultado da última leitura. Chama `GET`, `PUT` e `POST /admin/sincronismo`

Se a Prefeitura mudar o PDF ou a página das farmácias, quem entra nessa tela dispara a verificação. A API é quem lê a fonte e atualiza o banco. O site só mostra o status.

## Autenticação JWT

Quem busca medicamento ou farmácia **não precisa entrar**. O token existe para quem cuida das fontes. Na API, o mesmo assunto está em [Autenticação JWT](https://github.com/dpelissari/MedMinimalAPI#autenticação-jwt).

O login pede usuário e senha cadastrados na API. A resposta traz token, nome, perfil e validade. Só perfil Admin passa do guard e chega em `/admin/sincronismo`. Sair apaga o token.

Cadastrar usuário (`POST /registrar`) continua na API, protegido para Admin. Este site não tem tela de cadastro.

## Como rodar

Primeiro a [API](https://github.com/dpelissari/MedMinimalAPI#como-rodar), em `http://localhost:5272`.

```bash
npm install
npm start
```

O site sobe em `http://localhost:4200`.
