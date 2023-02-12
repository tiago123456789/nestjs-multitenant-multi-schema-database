import { CommandRunner, Command, Option } from "nest-commander"
import { Connection } from "typeorm"
import { getTenantConnection } from "../tenant.utils"

interface TenantSeedsCommandOptions {
    schema: string;
}

@Command({ name: 'tenant-seeds', description: 'Execute seeds to the tenant' })
export class ExecuteSeedCommand implements CommandRunner {

    async run(
        passedParam: string[],
        options: TenantSeedsCommandOptions
    ): Promise<void> {
        console.log(`>>>> Executing seeds to the schema ${options.schema}`)
        const connection: Connection = await getTenantConnection(options.schema, true)
        await connection.runMigrations()
        console.log(">>>> Executed seeds success")
    }

    @Option({
        flags: '-s, --schema [string]',
        description: 'The tenant name to execute migrations'
    })
    parseString(val: string): string {
        return val;
    }

}