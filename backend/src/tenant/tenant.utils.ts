import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { typeormConfig } from "../common/configs/typeorm"

export const getTenantConnection = (tenantId: string, isLoadSeedersConfig: boolean = false): Promise<Connection> => {
    const connectionName = getTenantName(tenantId)
    const connectionManager = getConnectionManager()

    if (connectionManager.has(connectionName)) {
        const connection = connectionManager.get(connectionName)
        return Promise.resolve(connection.isConnected ? connection : connection.connect());
    }

    const config = typeormConfig(isLoadSeedersConfig)
    // @ts-ignore
    return createConnection({
        ...config,
        name: connectionName,
        schema: connectionName
    })
}

export function getTenantName(tenantId: string) {
    return `tenant_${tenantId}`
}