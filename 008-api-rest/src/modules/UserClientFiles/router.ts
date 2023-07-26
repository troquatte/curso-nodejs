import { Router } from 'express';
import { userClientFilesController } from './controller/user-client-files-controller';
import multer from 'multer';

// Middleware
import { MiddlewareAuth } from 'middleware/auth-middleware';
import { middlewareUpload } from 'middleware/upload-middleware';

// Router
const router = Router();
const baseUrl = '/user-client-files';

router.use(MiddlewareAuth.authenticate);
router.post(
  `${baseUrl}/:id`,
  multer(middlewareUpload.getConfig).single('file'),
  userClientFilesController.create,
);

router.get(`${baseUrl}/:id`, userClientFilesController.read);
router.get(`${baseUrl}/list/:year/:id`, userClientFilesController.listAll);

router.patch(
  `${baseUrl}/:id`,
  multer(middlewareUpload.getConfig).single('file'),
  userClientFilesController.update,
);
router.delete(`${baseUrl}/:id`, userClientFilesController.delete);

export const userClientFilesRouter = router;

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
