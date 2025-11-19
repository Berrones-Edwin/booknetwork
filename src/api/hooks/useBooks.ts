import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { BookRequest, BookResponse, PageResponseBookResponse, PageResponseBorrowedBookResponse } from "../types/types";
import { BooksApi } from "../books";

// -----------------------
// QUERIES
// -----------------------

export const useBooks = (page = 0, size = 10) =>
    useQuery<PageResponseBookResponse>({
        queryKey: ["books", page, size],
        queryFn: () => BooksApi.findAll(page, size),
    });

export const useBooksByOwner = (page = 0, size = 10) =>
    useQuery<PageResponseBookResponse>({
        queryKey: ["books-owner", page, size],
        queryFn: () => BooksApi.findAllByOwner(page, size),
    });

export const useBorrowedBooks = (page = 0, size = 10) =>
    useQuery<PageResponseBorrowedBookResponse>({
        queryKey: ["books-borrowed", page, size],
        queryFn: () => BooksApi.findAllBorrowed(page, size),
    });

export const useReturnedBooks = (page = 0, size = 10) =>
    useQuery<PageResponseBorrowedBookResponse>({
        queryKey: ["books-returned", page, size],
        queryFn: () => BooksApi.findAllReturned(page, size),
    });

export const useBookById = (bookID: number) =>
    useQuery<BookResponse>({
        queryKey: ["book", bookID],
        queryFn: () => BooksApi.findById(bookID),
        enabled: !!bookID,
    });

// -----------------------
// MUTATIONS CON INVALIDACIÓN
// -----------------------

export const useSaveBook = () => {
    const queryClient = useQueryClient();
    return useMutation<number, Error, BookRequest>({
        mutationFn: (data) => BooksApi.save(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            queryClient.invalidateQueries({ queryKey: ["books-owner"] });
        },
    });
};

export const useUpdateShareable = () => {
    const queryClient = useQueryClient();
    return useMutation<number, Error, number>({
        mutationFn: (bookId) => BooksApi.updateShareable(bookId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
    });
};

export const useUpdateArchived = () => {
    const queryClient = useQueryClient();
    return useMutation<number, Error, number>({
        mutationFn: (bookId) => BooksApi.updateArchived(bookId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            queryClient.invalidateQueries({ queryKey: ["books-owner"] });
        },
    });
};

export const useBorrowBook = () => {
    const queryClient = useQueryClient();
    return useMutation<number, Error, number>({
        mutationFn: (bookId) => BooksApi.borrow(bookId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            queryClient.invalidateQueries({ queryKey: ["books-borrowed"] });
        },
    });
};

export const useReturnBook = () => {
    const queryClient = useQueryClient();
    return useMutation<number, Error, number>({
        mutationFn: (bookId) => BooksApi.returnBorrow(bookId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books-borrowed"] });
            queryClient.invalidateQueries({ queryKey: ["books-returned"] });
        },
    });
};

export const useApproveReturnBook = () => {
    const queryClient = useQueryClient();
    return useMutation<number, Error, number>({
        mutationFn: (bookId) => BooksApi.approveReturn(bookId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books-borrowed"] });
            queryClient.invalidateQueries({ queryKey: ["books-returned"] });
        },
    });
};

export const useUploadCover = () => {
    const queryClient = useQueryClient();
    return useMutation<object, Error, { bookId: number; file: File }>({
        mutationFn: ({ bookId, file }) => BooksApi.uploadCover(bookId, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
        },
    });
};
