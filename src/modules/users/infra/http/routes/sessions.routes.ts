/* As rotas tem que preocupar com: Receber a requisição,
chamar outro arquivo e devolver uma resposta */

import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsController = new SessionsController();
const sessionsRoute = Router();

// Rota de criação de Agendamentos
sessionsRoute.post('/', sessionsController.create);

export default sessionsRoute;
