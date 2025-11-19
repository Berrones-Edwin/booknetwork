import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FeedbackApi } from "../feedback";
import type { PageResponseFeedBackResponse, FeedBackRequest } from "../types/types";


// -----------------------
// QUERIES
// -----------------------

export const useFeedbackByBook = (bookId: number, page = 0, size = 10) =>
    useQuery<PageResponseFeedBackResponse>({
        queryKey: ["feedback", bookId, page, size],
        queryFn: () => FeedbackApi.findAllByBook(bookId, page, size),
        enabled: !!bookId,
    });

// -----------------------
// MUTATION CON INVALIDACIÓN
// -----------------------

export const useSaveFeedback = () => {
    const queryClient = useQueryClient();
    return useMutation<number, Error, FeedBackRequest>({
        mutationFn: (body) => FeedbackApi.save(body),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["feedback", variables.bookId],
            });
        },
    });
};
