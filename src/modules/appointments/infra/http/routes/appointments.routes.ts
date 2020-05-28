/* As rotas tem que preocupar com: Receber a requisição,
chamar outro arquivo e devolver uma resposta */

import { Router } from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import AppointmentController from '../controllers/AppointmentsController';

const appointmentRoute = Router();
const appointmentsController = new AppointmentController();

// Vai aplicar o middleware em todas as rotas de agendamentos
appointmentRoute.use(ensureAutheticated);

// Rota que vai listar todos os agendamentos
// appointmentRoute.get('/', async (request, response) => {
// Variável que vai receber o método all() que esta dentro do nosso repositório de agendamentos
// const appointments = await appointmentsRepository.find();

// Vai retornar o agendamento
// return response.json(appointments);
// });

// Rota de criação de Agendamentos
appointmentRoute.post('/', appointmentsController.create);

export default appointmentRoute;
