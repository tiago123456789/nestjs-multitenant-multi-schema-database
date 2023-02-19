import { CommandRunner, Command, Option } from "nest-commander"
import { EntityManager, Connection } from "typeorm"
import { InjectEntityManager } from '@nestjs/typeorm';
import { getTenantConnection } from "../tenant.utils";
import { MigrationActions } from "./types/migrations-action";
import { TenantAllMigrationsCommandOptions } from "./types/tenant-all-migrations-command-options.interface"
import { actionsByMigrationAction, isValidMigrationAction, messagesByMigratonAction } from "./migration-command.utils";

@Command({ name: 'tenant-all-migrations', description: 'Execute migrations to all tenants' })
export class ExecuteMigrationsAllTenantsCommand implements CommandRunner {

    constructor(
        @InjectEntityManager() private readonly entityManager: EntityManager
    ) {
    }

    async run(
        passedParam: string[],
        options: TenantAllMigrationsCommandOptions
    ): Promise<void> {
        isValidMigrationAction(options.type)
        
        let schemas = await this.entityManager.query(`select nspname from pg_catalog.pg_namespace`)
        schemas = schemas
                    .filter(item => {
                        return item.nspname.startsWith("tenant_")
                    })
                    .map(item => item.nspname)

        for (let index = 0; index < schemas.length; index++) {
            const schemaToRunMigrations = schemas[index].split("_")[1];
            const message = messagesByMigratonAction[options.type](schemaToRunMigrations)
            console.log(message.START_MESSAGE)
            const connection: Connection = await getTenantConnection(schemaToRunMigrations)
            await actionsByMigrationAction[options.type](connection)
            await connection.close()
            console.log(message.END_MESSAGE)
        }
       
    }

    @Option({
        flags: '-t, --type [string]',
        description: 'The action to execute. You can set RUN to run migrations and DOWN undo the last migration'
    })
    parseSchema(val: string): string {
        return val
    }

}