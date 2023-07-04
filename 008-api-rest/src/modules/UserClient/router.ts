import { Router } from 'express';
import { userClientController } from './controller/user-client-controller';
import { MiddlewareAuth } from 'middleware/auth-middleware';

// Router
const router = Router();
const baseUrl = '/user-client';

router.use(MiddlewareAuth.authenticate);
router.post(`${baseUrl}`, userClientController.create);
router.get(`${baseUrl}`, userClientController.listAll);
router.get(`${baseUrl}/:id`, userClientController.read);
router.patch(`${baseUrl}/:id`, userClientController.update);
router.delete(`${baseUrl}/:id`, userClientController.delete);

export const userClientRouter = router;

/**
 * GET: É usado para recuperar dados de um recurso existente no servidor.
 * Exemplo: GET /api/users - Recupera todos os usuários do sistema.
 *
 * POST: É usado para enviar dados para o servidor e criar um novo recurso.
 * Exemplo: POST /api/users - Cria um novo usuário com os dados fornecidos.
 *
 * PUT: É usado para atualizar um recurso existente no servidor com os
 * dados fornecidos.
 * Exemplo: PUT /api/users/1 - Atualiza os dados do usuário com ID 1 com os dados fornecidos.
 *
 * PATCH: É usado para atualizar parcialmente um recurso existente
 * no servidor com os dados fornecidos.
 * Exemplo: PATCH /api/users/1 - Atualiza apenas alguns campos
 * do usuário com ID 1 com os dados fornecidos.
 *
 * DELETE: É usado para excluir um recurso existente no servidor.
 * Exemplo: DELETE /api/users/1 - Exclui o usuário com ID 1 do sistema.
 */
