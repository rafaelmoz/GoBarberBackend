/* Os services são onde vão ficar as regras de negócios,
as regras de negócio são as particularidades da nossa
aplicação */
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    // Vai zerar os minutos/segundos da DATA, pois os agendamentos são apenas 1 por hora.
    const appointmentDate = startOfHour(date);

    // Variável que vai achar se existe um agendamento no mesmo dia
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    // Se encontrar um agendamento no mesmo horário vai retornar um erro informando.
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    // Se atender todas as condições cria o Agendamento em base do AppointmentRepository
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
