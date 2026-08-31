import { apiFetch } from "./client";
import type { AuthenticationRequest, AuthenticationResponse, RegistrationRequest } from "./types/types";


export const AuthApi = {
    login: (body: AuthenticationRequest) =>
        apiFetch<AuthenticationResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(body),
        }),

    register: (body: RegistrationRequest) =>
        apiFetch<object>("/auth/register", {
            method: "POST",
            body: JSON.stringify(body),
        }),
};
