/* Onde vão ficar todas as operações que são
armazenadas no BD, criar, deletar, alterar, listar
 Reposiótio vai trabalhar com o dado (listar, deletar, criar...) */

/* Só criar repositório quando vai se ter uma regra que não é nativa,
ou seja, create, delete, update, quando for algo muito
específico da aplicação. */

import { getRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  // Método que vai ser responsável por identificar se tem um agendamento na mesma data
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment; // Vai retornar nullo caso não encontre
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
