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
        // let errorMessage = "An unknow error has ocurred"
        let errorInfo: { message?: string, error?: string, detail?: string } = {

        }
        try {
            errorInfo = await response.json()
            // errorMessage = errorInfo.message
            //     || errorInfo.error
            //     || errorInfo.detail
            //     || JSON.stringify(errorInfo)
        } catch (e) {
            errorInfo.message = await response.text()
        }
        const error = Error(`API error: ${response.status}`);
        error.message = "" + errorInfo
        error.cause = errorInfo
        throw error;

    }

    return response.json() as Promise<TResponse>;
}
