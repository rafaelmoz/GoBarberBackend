import { Router } from 'express';

import appointmentRoute from '@modules/appointments/infra/http/routes/appointments.routes';
import userRoute from '@modules/users/infra/http/routes/users.routes';
import sessionsRoute from '@modules/users/infra/http/routes/sessions.routes';

const rotas = Router();

// Toda a rota que iniciar com agendamentos, vai repassar para a rotaAgendamento
rotas.use('/appointments', appointmentRoute);

// Toda a rota que iniciar com users
rotas.use('/users', userRoute);

// Toda a rota que iniciar com sessions
rotas.use('/sessions', sessionsRoute);

export default rotas;
