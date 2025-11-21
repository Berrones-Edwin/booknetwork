import type { PageResponseFeedBackResponse } from "@/api/types/types";
import FeedbackCard from "./feedback-card";
import Pagination from "./pagination";

export default function FeedbackList({ feedbacks, page, setPage }: { feedbacks: PageResponseFeedBackResponse, page: number, setPage: (n: number) => void }) {

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Reviews</h2>
            {feedbacks.content.length === 0 ? (
                <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {feedbacks.content.map((feedback, index) => (
                            <FeedbackCard feedback={feedback} key={index} />
                        ))}
                    </div>
                    {feedbacks.totalPages > 1 && (
                        <Pagination page={page} first={feedbacks.first} number={feedbacks.number} totalPages={feedbacks.totalPages} setPage={setPage} />
                    )}

                </>

            )}
        </div>
    )
}