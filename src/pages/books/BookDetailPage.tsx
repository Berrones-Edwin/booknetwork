import { NavBar } from '@/components/nav-bar';
import { Button } from '@/components/ui/button';
import { Star, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useBookById } from '@/api/hooks/useBooks';
import { useFeedbackByBook } from '@/api/hooks/useFeedback';
import FeedbackList from '@/components/feedback-list';
import FeedBackForm from '@/components/feedback-save-form';
import { useState } from 'react';
import ErrorAlert from '@/components/error-alert';



export default function FeedbackPage() {
    const router = useNavigate();
    const params = useParams();
    const bookId = parseInt(params.id as string);
    const [page, setPage] = useState(0)
    const { data: book, isPending, error } = useBookById(bookId)
    const { data: feedbacks, isPending: isPendingFeedback, error: errorFeedback } = useFeedbackByBook(bookId, page, 5)

    if (error) {

        return (
            <div className="min-h-screen bg-background">
                <NavBar />
                <div className="flex items-center justify-center py-20">
                    <ErrorAlert />
                </div>
            </div>
        );
    }

    if (isPending) {
        return (
            <div className="min-h-screen bg-background">
                <NavBar />
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <NavBar />

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <Button variant="ghost" onClick={() => router("/books")} className="mb-6 gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>

                <div className="space-y-8">
                    {book && (
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold">{book.title}</h1>
                            <p className="text-lg text-muted-foreground">by {book.authorName}</p>
                            <p className="text-lg text-muted-foreground">{book.synopsis}</p>
                            {book.rate !== undefined && (
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-5 w-5 ${star <= Math.round(book.rate || 0)
                                                    ? 'fill-primary text-primary'
                                                    : 'text-muted-foreground'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {book.rate.toFixed(1)} average rating
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <FeedBackForm id={bookId} />
                    {
                        errorFeedback && <ErrorAlert />
                    }

                    {
                        isPendingFeedback ? <p>Loading feedbacks</p> : <FeedbackList feedbacks={feedbacks} page={page} setPage={setPage} />
                    }

                </div>
            </main>
        </div>
    );
}
