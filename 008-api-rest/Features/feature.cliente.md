```
> Feature Cliente
-- Model cliente ( name* , email, phone, data de criação, data de alteração )

-- Crud Cliente

-- Create
--- Nome ( obrigatório ), Email e telefone devem ser opcional;
--- Id deve ser criado com uuid
--- Assim que o Cliente for criado, deve ser criada uma pasta com id dele dentro
    da pasta do id do usuário
---- Iremos armazenar todos seus arquivos dentro da pasta
---- assets/files/:userId/:clientId

-- Read
--- Uuid é obrigatório para efetuar a leitura
--- Leitura do Cliente deve ser feita pelo uuid

-- List all
--- Devemos listar todos os clientes do nosso usuário
--- Deve conter paginação depois de 11 clientes
--- Busca de clientes

-- Update
--- Uuid é obrigatório para efetuar a edição
--- Nome ( obrigatório ), Email e telefone devem ser opcional

-- Delete
--- Todos os dados deste cliente do usuário devem ser deletados, como:
---- Arquivos
---- Dados no banco
---- Tudo relacionado ao cliente do usuário
---- OBS.: Caso você utilize esta ferramenta para venda, leia mais sobre LGPD

---- IMPORTANTE: Definition of done
--- Autorização: só pode acessar a rota Logado
--- Não pode editar dados de outros usuários
```
