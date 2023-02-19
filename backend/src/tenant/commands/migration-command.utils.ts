import { MigrationActions } from "./types/migrations-action";
import { Connection } from "typeorm"

export const actionsByMigrationAction = {
    [MigrationActions.DOWN]: (connection: Connection) => {
        return connection.undoLastMigration()
    },
    [MigrationActions.RUN]: (connection: Connection) => {
        return connection.runMigrations()
    }
};

export const messagesByMigratonAction = {
    [MigrationActions.DOWN]: (schema: string) => {
        return {
            START_MESSAGE: `>>>> Executing rollback the migrations to the schema ${schema}`,
            END_MESSAGE: ` >>>> Executed rollback the migrations success to the schema ${schema}`
        }
    },
    [MigrationActions.RUN]: (schema: string) => {
        return {
            START_MESSAGE: `>>>> Executing the migrations to the schema ${schema}`,
            END_MESSAGE: ` >>>> Executed the migrations success to the schema ${schema}`
        }
    }
}

export const isValidMigrationAction = (action: string) => {
    if (
        action != MigrationActions.RUN && 
        action != MigrationActions.DOWN
    ) {
        throw new Error("The action value is invalid.")
    }
}