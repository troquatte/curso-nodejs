```
> Feature Cliente Files
-- Model client Files ( name* , date*, file*, description, data de criação, data de alteração )

-- Crud Client Files

-- Create
--- Nome*, data*, arquivo* e descrição ( opcional );
--- Id deve ser criado com uuid
--- Os arquivos devem ser validados com os formatos ['png', 'jpg', 'jpeg']
--- Deve conter o paramsId de UserClient user-cliente-files/:id
---- Iremos armazenar todos seus arquivos dentro da pasta
---- assets/files/:userId/:clientId

-- Read
--- Uuid é obrigatório para efetuar a leitura
--- Leitura deve ser feita pelo Client Files uuid ( paramsId )

-- List all
--- Devemos listar todos os Client File do nosso Client do usuário
--- Client uuid deve conter no paramsId

-- Update
--- Uuid é obrigatório para efetuar a edição, Client uuid ( paramsId ) e uuid Client Files
    no body
--- Nome*, data*, arquivo* e descrição ( opcional );

-- Delete
--- Todos os dados deste Client Files do usuário devem ser deletados, como:
---- Arquivos
---- Dados no banco
---- Tudo relacionado ao Client Files do usuário
---- OBS.: Caso você utilize esta ferramenta para venda, leia mais sobre LGPD

---- IMPORTANTE: Definition of done
--- Autorização: só pode acessar a rota Logado
--- Não pode editar dados de outros usuários
--- Upload deve ser compartilhado para outras rotas então crie um middleware
```
