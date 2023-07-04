```
> Feature Cliente
-- Model cliente ( name* , email, phone, data de criação, data de alteração ) - OK

-- Crud Cliente

-- Create - OK
--- Nome ( obrigatório ), Email e telefone devem ser opcional; - OK
--- Id deve ser criado com uuid - OK
--- Assim que o Cliente for criado, deve ser criada uma pasta com id dele dentro - OK
    da pasta do id do usuário
---- Iremos armazenar todos seus arquivos dentro da pasta - OK
---- assets/files/:userId/:clientId - OK

-- Read
--- Uuid é obrigatório para efetuar a leitura - OK
--- Leitura do Cliente deve ser feita pelo uuid - OK

-- List all
--- Devemos listar todos os clientes do nosso usuário - OK
--- Deve conter paginação depois de 11 clientes - OK
--- Busca de clientes

-- Update
--- Uuid é obrigatório para efetuar a edição - OK
--- Nome ( obrigatório ), Email e telefone devem ser opcional - OK

-- Delete
--- Todos os dados deste cliente do usuário devem ser deletados, como:
---- Arquivos - OK
---- Dados no banco - OK
---- Tudo relacionado ao cliente do usuário - OK
---- OBS.: Caso você utilize esta ferramenta para venda, leia mais sobre LGPD - OK

---- IMPORTANTE: Definition of done
--- Autorização: só pode acessar a rota Logado
--- Não pode editar dados de outros usuários
```
