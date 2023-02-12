import { CommandRunner, Command } from "nest-commander"
import { EntityManager, Connection } from "typeorm"
import { InjectEntityManager } from '@nestjs/typeorm';
import { getTenantConnection } from "../tenant.utils";

@Command({ name: 'tenant-all-migrations', description: 'Execute migrations to all tenants' })
export class ExecuteMigrationsAllTenantsCommand implements CommandRunner {

    constructor(
        @InjectEntityManager() private readonly entityManager: EntityManager
    ) {
    }

    async run(
        passedParam: string[],
    ): Promise<void> {
        let schemas = await this.entityManager.query(`select nspname from pg_catalog.pg_namespace`)
        schemas = schemas
                    .filter(item => {
                        return item.nspname.startsWith("tenant_")
                    })
                    .map(item => item.nspname)

        for (let index = 0; index < schemas.length; index++) {
            const schemaToRunMigrations = schemas[index].split("_")[1];
            console.log(`>>>> Executing migrations to the schema ${schemaToRunMigrations}`)
            const connection: Connection = await getTenantConnection(schemaToRunMigrations)
            await connection.runMigrations()
            await connection.close()
            console.log(`>>>> Executed migrations success to the schema ${schemaToRunMigrations}`)
        }
       
    }

}