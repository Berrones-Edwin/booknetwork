import { apiFetch } from "./client";
import type { FeedBackRequest, PageResponseFeedBackResponse } from "./types/types";
import { getToken } from "./utils/token";

const token = getToken()
export const FeedbackApi = {
    save: (body: FeedBackRequest) =>
        apiFetch<number>("/feedbacks", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }),

    findAllByBook: (bookId: number, page = 0, size = 10) =>
        apiFetch<PageResponseFeedBackResponse>(
            `/feedbacks/book/${bookId}?page=${page}&size=${size}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        ),
};
