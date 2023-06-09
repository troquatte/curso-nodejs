import { Router } from 'express';
import { userController } from './controller/user-controller';

// Router
const router = Router();
const baseUrl = '/user';

router.post(`${baseUrl}`, userController.create);
router.get(`${baseUrl}/:id`, userController.read);
router.patch(`${baseUrl}/:id`, userController.update);
router.delete(`${baseUrl}/:id`, userController.delete);

export const userRouter = router;

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
