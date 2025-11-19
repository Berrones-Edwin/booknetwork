import { apiFetch } from "./client";
import type { FeedBackRequest, PageResponseFeedBackResponse } from "./types/types";


export const FeedbackApi = {
    save: (body: FeedBackRequest) =>
        apiFetch<number>("/feedbacks", {
            method: "POST",
            body: JSON.stringify(body),
        }),

    findAllByBook: (bookId: number, page = 0, size = 10) =>
        apiFetch<PageResponseFeedBackResponse>(
            `/feedbacks/book/${bookId}?page=${page}&size=${size}`
        ),
};
