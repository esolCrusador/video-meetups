import "reflect-metadata";

import { Injectable } from "injection-js";
import { ReduxAccessor } from "../store/ReduxAccessor";
import { fetch, addTask } from "domain-task";
import { ExecutionResult } from "../models/ExecutionResult";
import { DIContainer } from "../DIContainer";

@Injectable()
export class ApiUtil {
    constructor(private readonly reduxAccessor: ReduxAccessor) {
    }

    public ApiRequest<TResponse>(url: string, method: "GET" | "POST", data?: any): Promise<ExecutionResult<TResponse>> {
        const headers: { [name: string]: string } = {
            "Authorization": `Bearer ${this.GetToken()}`
        };
        const request: RequestInit = {
            method: method,
            headers: headers
        };
        if (data) {
            request.body = JSON.stringify(data);
            headers["Content-Type"] = "application/json";
        }

        const task = fetch(url, request).then(response => response.json() as Promise<ExecutionResult<TResponse>>);
        addTask(task);

        return task;
    }

    private GetToken(): string {
        return this.reduxAccessor.GetServerMetadata().token;
    }
}

DIContainer.register(ApiUtil);