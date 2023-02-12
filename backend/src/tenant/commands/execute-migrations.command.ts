import { CommandRunner, Command, Option } from "nest-commander"
import { Connection } from "typeorm"
import { getTenantConnection } from "../tenant.utils"

interface TenantMigrationsCommandOptions {
    schema: string;
}

@Command({ name: 'tenant-migrations', description: 'Execute migrations to the tenant' })
export class ExecuteMigrationsCommand implements CommandRunner {

    async run(
        passedParam: string[],
        options: TenantMigrationsCommandOptions
    ): Promise<void> {
        console.log(`>>>> Executing migrations to the schema ${options.schema}`)
        const connection: Connection = await getTenantConnection(options.schema)
        await connection.runMigrations()
        console.log(`>>>> Executed migrations success`)
    }

    @Option({
        flags: '-s, --schema [string]',
        description: 'The tenant name to execute migrations'
    })
    parseString(val: string): string {
        return val;
    }

}