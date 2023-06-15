```
> Feature Reset Password
-- Model ResetPasswordSecret ( id, secret, user relation, userId relation )
-- Model User ( relation ResetPasswordSecret )

-- Rota Validate User
--- Validar os dados do usuários como: email
--- Verificar se este email existe no banco de dados
--- Gerar código de segurança com 6 digitos numéricos
--- Salvar esse código no ResetPasswordSecret relacionando com o usuário 1 para 1
--- Enviar o código para o email do usuário
--- Retornar o código gerado e email enviado

-- Rota Validate Security Code
--- Validar os dados do usuários como: email e código gerado
--- Verificar se este email e código gerado existem no banco de dados
--- Retornar o código gerado e email enviado

-- Rota Reset Password
--- Validar os dados do usuários como: email, código gerado e nova senha
--- Verificar se este email e código gerado existem no banco de dados
--- Gerar uma nova senha ( edite a senha atual para a nova senha )
--- Deletar a secret ( ResetPasswordSecret ) gerada no banco de dados
```
