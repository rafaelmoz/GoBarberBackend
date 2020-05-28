/* Sempre que vamos armazenar alguma coisa,
seja em BD ou memória vamos criar um modelo.
representção de como o dado é salvo */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

// Vai pegar a função entity e passar a classe por parametro
@Entity('appointments')
class Appointment {
  // Passamos esse entity pois o id é nossa primary key e é gerato automaticamente
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Indicamos que o provider é uma coluna do BB e () vazio significa varchar
  @Column()
  provider_id: string;

  // Muitos agendamentos para UM usuário
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  // Date é a outra coluna com o valor de timestamp
  @Column('timestamp with time zone')
  date: Date;

  // Created_at
  @CreateDateColumn()
  created_at: Date;

  // Updated_at
  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
