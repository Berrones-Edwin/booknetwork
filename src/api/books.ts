import { apiFetch, BASE_URL } from "./client";
import type { BookRequest, BookResponse, PageResponseBookResponse, PageResponseBorrowedBookResponse } from "./types/types";


export const BooksApi = {
    findAll: (page = 0, size = 10) =>
        apiFetch<PageResponseBookResponse>(`/books?page=${page}&size=${size}`),

    findById: (bookID: number) =>
        apiFetch<BookResponse>(`/books/${bookID}`),

    findAllByOwner: (page = 0, size = 10) =>
        apiFetch<PageResponseBookResponse>(
            `/books/owner?page=${page}&size=${size}`
        ),

    findAllBorrowed: (page = 0, size = 10) =>
        apiFetch<PageResponseBorrowedBookResponse>(
            `/books/borrowed?page=${page}&size=${size}`
        ),

    findAllReturned: (page = 0, size = 10) =>
        apiFetch<PageResponseBorrowedBookResponse>(
            `/books/returned?page=${page}&size=${size}`
        ),

    save: (body: BookRequest) =>
        apiFetch<number>("/books", {
            method: "POST",
            body: JSON.stringify(body),
        }),

    updateShareable: (bookId: number) =>
        apiFetch<number>(`/books/shareable/${bookId}`, { method: "PATCH" }),

    updateArchived: (bookId: number) =>
        apiFetch<number>(`/books/archived/${bookId}`, { method: "PATCH" }),

    borrow: (bookId: number) =>
        apiFetch<number>(`/books/borrow/${bookId}`, { method: "PATCH" }),

    returnBorrow: (bookId: number) =>
        apiFetch<number>(`/books/borrow/return/${bookId}`, { method: "PATCH" }),

    approveReturn: (bookId: number) =>
        apiFetch<number>(`/books/borrow/return/apporove/${bookId}`, {
            method: "PATCH",
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
