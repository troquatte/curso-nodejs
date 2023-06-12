```
> Feature User
-- Model user ( nome, email, password, data de criação, data de alteração )

-- Crud user

-- Create
--- Nome ( opcional ), Email e password devem ser obrigatórios
--- Id deve ser criado com uuid
--- Os usuários devem conter emails únicos
--- Password deve ser encriptado
--- Assim que o usuário for criado, deve ser criada uma pasta com id dele
---- Iremos armazenar todos seus arquivos
---- assets/files/:id

-- Read
--- Uuid é obrigatório para efetuar a leitura
--- Leitura do usuário deve ser feita pelo uuid
--- Não teremos o read all ou list all

--- Débitos Técnicos
--- Autorização: só pode acessar a rota Logado
--- Não pode ler outro usuário

-- Update
--- Uuid é obrigatório para efetuar a edição
--- A edição é somente para o name

--- Débitos Técnicos
--- Autorização: só pode acessar a rota Logado
--- Não pode editar outro usuário

-- Delete
--- Todos os dados deste usuário devem ser deletados, como:
---- Arquivos
---- Dados no banco
---- Tudo relacionado a ele
---- OBS.: Caso você utilize esta ferramenta para venda, leia mais sobre LGPD

--- Débitos Técnicos
--- Autorização: só pode acessar a rota Logado
--- Não pode deletar outro usuário
```
