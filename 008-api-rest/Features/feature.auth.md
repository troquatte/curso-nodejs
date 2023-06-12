```
> Feature Auth

-- Rota Login
--- Validar os dados do usuários como: email e password - Ok
--- Criar e retornar o Token JWT e Refresh Token - Ok
--- Refresh Token deve possuir apenas ID - Ok

-- Rota Token
--- Assim que o tempo do JWT expirar, devemos criar o seu refresh - Ok
--- O Refresh token deve ser utilizado para gerar um novo token - Ok
--- Criar e retornar o Token JWT e Refresh Token - Ok
--- Refresh Token deve possuir apenas ID - Ok

-- Débitos técnicos User --

--- Read
---- Autorização: só pode acessar a rota Logado - Ok
---- Não pode ler outro usuário - Ok

--- Update
---- Autorização: só pode acessar a rota Logado - Ok
---- Não pode editar outro usuário - Ok

-- Delete
---- Autorização: só pode acessar a rota Logado - Ok
---- Não pode deletar outro usuário - Ok
```
