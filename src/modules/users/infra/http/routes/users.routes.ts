/* As rotas tem que preocupar com: Receber a requisição,
chamar outro arquivo e devolver uma resposta */

import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';
import UsersController from '../controllers/UsersController';
import ensureAutheticated from '../middlewares/ensureAutheticated';

const usersRoute = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// Rota de criação de Agendamentos
usersRoute.post('/', usersController.create);

// Atualizar apenas uma informação do usuario, no nosso caso o avatar
usersRoute.patch(
  '/avatar',
  ensureAutheticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRoute;
