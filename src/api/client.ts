export const BASE_URL = "http://localhost:8080/api/v1";

export async function apiFetch<TResponse>(
    path: string,
    options: RequestInit = {}
): Promise<TResponse> {
    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json() as Promise<TResponse>;
}
