import { apiFetch, BASE_URL } from "./client";
import type { BookRequest, BookResponse, PageResponseBookResponse, PageResponseBorrowedBookResponse } from "./types/types";
import { getToken } from "./utils/token";

const token = getToken();
export const BooksApi = {
    findAll: (page = 0, size = 10) =>
        apiFetch<PageResponseBookResponse>(`/books?page=${page}&size=${size}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }),

    findById: (bookID: number) =>
        apiFetch<BookResponse>(`/books/${bookID}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }),

    findAllByOwner: (page = 0, size = 10) =>
        apiFetch<PageResponseBookResponse>(
            `/books/owner?page=${page}&size=${size}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        ),

    findAllBorrowed: (page = 0, size = 10) =>
        apiFetch<PageResponseBorrowedBookResponse>(
            `/books/borrowed?page=${page}&size=${size}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        ),

    findAllReturned: (page = 0, size = 10) =>
        apiFetch<PageResponseBorrowedBookResponse>(
            `/books/returned?page=${page}&size=${size}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        ),

    save: (body: BookRequest) =>
        apiFetch<number>("/books", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }),

    updateShareable: (bookId: number) =>
        apiFetch<number>(`/books/shareable/${bookId}`, {
            method: "PATCH", headers: {
                "Authorization": `Bearer ${token}`
            }
        }),

    updateArchived: (bookId: number) =>
        apiFetch<number>(`/books/archived/${bookId}`, {
            method: "PATCH", headers: {
                "Authorization": `Bearer ${token}`
            }
        }),

    borrow: (bookId: number) =>
        apiFetch<number>(`/books/borrow/${bookId}`, {
            method: "PATCH", headers: {
                "Authorization": `Bearer ${token}`
            }
        }),

    returnBorrow: (bookId: number) =>
        apiFetch<number>(`/books/borrow/return/${bookId}`, {
            method: "PATCH", headers: {
                "Authorization": `Bearer ${token}`
            }
        }),

    approveReturn: (bookId: number) =>
        apiFetch<number>(`/books/borrow/return/apporove/${bookId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }),

    uploadCover: async (bookId: number, file: File): Promise<object> => {
        const form = new FormData();
        form.append("file", file);

        const res = await fetch(`${BASE_URL}/books/cover/${bookId}`, {
            method: "POST",
            body: form,
        });

        if (!res.ok) throw new Error(`Upload failed: ${res.status}`);

        return res.json();
    },
};
