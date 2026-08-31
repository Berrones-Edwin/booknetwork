import type { JSX } from "react";
import { Navigate } from "react-router";


export const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem("token");

    if (token) return <Navigate to="/books" replace />

    return children;
};

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/login" replace />

    return children;
};