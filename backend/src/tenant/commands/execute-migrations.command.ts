import { CommandRunner, Command, Option } from "nest-commander"
import { Connection } from "typeorm"
import { getTenantConnection } from "../tenant.utils"
import { actionsByMigrationAction, isValidMigrationAction, messagesByMigratonAction } from "./migration-command.utils"
import { TenantMigrationsCommandOptions } from "./types/tenant-migrations-command-options"


@Command({ name: 'tenant-migrations', description: 'Execute migrations to the tenant' })
export class ExecuteMigrationsCommand implements CommandRunner {

    async run(
        passedParam: string[],
        options: TenantMigrationsCommandOptions
    ): Promise<void> {
        isValidMigrationAction(options.type)

        const message = messagesByMigratonAction[options.type](options.schema)
        console.log(message.START_MESSAGE)
        const connection: Connection = await getTenantConnection(options.schema)
        await actionsByMigrationAction[options.type](connection)
        console.log(message.END_MESSAGE)
    }

    @Option({
        flags: '-s, --schema [string]',
        description: 'The tenant name to execute migrations'
    })
    parseSchema(val: string): string {
        return val;
    }

    @Option({
        flags: '-t, --type [string]',
        description: 'The tenant name to execute migrations'
    })
    parseType(val: string): string {
        return val;
    }

}