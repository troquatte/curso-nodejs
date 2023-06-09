```
> Feature User
-- Model user ( nome, email, password, data de criação, data de alteração ) - OK

-- Crud user

-- Create
--- Nome ( opcional ), Email e password devem ser obrigatórios - OK
--- Id deve ser criado com uuid - OK
--- Os usuários devem conter emails únicos - OK
--- Password deve ser encriptado - OK
--- Assim que o usuário for criado, deve ser criada uma pasta com id dele - OK
---- Iremos armazenar todos seus arquivos - OK
---- assets/files/:id - OK

-- Read
--- Uuid é obrigatório para efetuar a leitura - OK
--- Leitura do usuário deve ser feita pelo uuid - OK
--- Não teremos o read all ou list all - OK

--- Débitos Técnicos
--- Autorização: só pode acessar a rota Logado
--- Não pode ler outro usuário

-- Update
--- Uuid é obrigatório para efetuar a edição - OK
--- A edição é somente para o name - OK

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
