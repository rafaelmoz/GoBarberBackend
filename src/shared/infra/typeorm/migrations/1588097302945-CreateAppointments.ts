/**
 * Migrations: Linha do tempo
 * 1 semana: criou tabela agendamentos
 * 2 semana: criou a tabela usuarios
 * 3 semana: entrou um novo funcionário, editou a tabela agendamentos
 * 4 semana: criou a tabela compras.
 * Padroniza o banco de dados, evita que o banco fica diferente entre os ambientes/participantes do projeto
 */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1588097302945
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
