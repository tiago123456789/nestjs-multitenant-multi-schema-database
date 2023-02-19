import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class TenantAndArticleTable1675548784870 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection.options as PostgresConnectionOptions;
    await queryRunner.createTable(
      new Table({
        schema,
        name: 'tenants',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'domain',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        schema,
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            scale: 2,
            isNullable: false,
          },
          {
            name: 'tenant_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection.options as PostgresConnectionOptions;
    await queryRunner.query(`DROP TABLE ${schema}.products`);
    await queryRunner.query(`DROP TABLE ${schema}.tenants`);
  }
}
