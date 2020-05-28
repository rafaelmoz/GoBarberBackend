import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    // O que tem que ser passado pelo usuário para criar o agendamento
    const { provider_id, date } = request.body;

    // Vai transformar a string que recebe pelo usuário em formato DATA.
    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    // Retornando o agendamento que foi criado
    return response.json(appointment);
  }
}
