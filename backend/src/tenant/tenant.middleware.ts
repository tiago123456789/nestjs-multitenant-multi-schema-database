import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken"
import RequestWithTenantId from "src/common/contracts/request-with-tenantId.contract";

export function tenantMiddleware(
    request: RequestWithTenantId, response: Response, next: NextFunction
) {
    const host = request.headers["origin"] || request.headers["host"];
    let accessToken = request.get('Authorization');

    const tenantId = host.split(".")[0];
    request.tenantId = tenantId;

    if (!accessToken && host) {
        const tenantId = host.split(".")[0];
        request.tenantId = tenantId;
        next();
        return;
    }

    if (!host && !accessToken) {
        return response.status(403).json({ message: 'You need informed accessToken' });
    }

    try {
        accessToken = accessToken.replace('Bearer ', '');
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
        // @ts-ignore
        request.tenantId = payload.tenantId;
        return next();
    } catch (error) {
        console.log(error)
        return response.status(403).json({ message: 'You need informed accessToken valid' });
    }
}