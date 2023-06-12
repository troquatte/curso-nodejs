```
> Feature Auth

-- Rota Login
--- Validar os dados do usuários como: email e password
--- Criar e retornar o Token JWT e Refresh Token
--- Refresh Token deve possuir apenas ID

-- Rota Token
--- Assim que o tempo do JWT expirar, devemos criar o seu refresh
--- O Refresh token deve ser utilizado para gerar um novo token
--- Criar e retornar o Token JWT e Refresh Token
--- Refresh Token deve possuir apenas ID

-- Débitos técnicos User --

--- Read
---- Autorização: só pode acessar a rota Logado
---- Não pode ler outro usuário

--- Update
---- Autorização: só pode acessar a rota Logado
---- Não pode editar outro usuário

-- Delete
---- Autorização: só pode acessar a rota Logado
---- Não pode deletar outro usuário
```
