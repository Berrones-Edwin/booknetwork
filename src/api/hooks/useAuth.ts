import { useMutation } from "@tanstack/react-query";
import type { AuthenticationRequest, AuthenticationResponse, RegistrationRequest } from "../types/types";
import { AuthApi } from "../auth";


export const useLogin = () =>
    useMutation<AuthenticationResponse, Error, AuthenticationRequest>({
        mutationFn: (body) => AuthApi.login(body),
    });

export const useRegister = () =>
    useMutation<object, Error, RegistrationRequest>({
        mutationFn: (body) => AuthApi.register(body),
    });
