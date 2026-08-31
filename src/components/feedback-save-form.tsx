import { useForm, type SubmitHandler } from "react-hook-form"
import { Label } from "@radix-ui/react-label";
import { Star, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { useSaveFeedback } from "@/api/hooks/useFeedback";
import type { FeedBackRequest } from "@/api/types/types";
import toast, { Toaster } from 'react-hot-toast';


type Inputs = {
    rating: number,
    comment: string,
}


export default function FeedBackForm({ id }: { id: number }) {


    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<Inputs>({
        defaultValues: {
            rating: 0
        },
    })
    const currentRating = watch("rating")

    const { mutate, isPending } = useSaveFeedback()


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const d: FeedBackRequest = {
            note: data.rating,
            comment: data.comment,
            bookId: id
        }
        mutate(d, {
            onSuccess: () => {
                toast.success("Feedback has been created")
                reset()

            }, onError: (err) => {
                toast.error("Something was wrong " + err)

            }
        })
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Leave a Review</CardTitle>
            </CardHeader>
            <CardContent>

                <Toaster />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div className="space-y-2">
                        <Label>Rating</Label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setValue("rating", star, { shouldValidate: true })}
                                    className="transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`h-8 w-8 ${star <= currentRating
                                            ? 'fill-primary text-primary'
                                            : 'text-muted-foreground'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <input type="hidden" {...register("rating", { required: true })} />

                        {errors.rating && <span className="text-red-500 text-sm">La calificación es requerida</span>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="comment">Your Review</Label>
                        <Textarea
                            id="comment"
                            {...register("comment", { required: true })}
                            placeholder="Share your thoughts about this book..."
                            rows={4}
                            required
                        />
                    </div>

                    {errors.comment && (
                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                            Comment is required
                        </div>
                    )}

                    <Button type="submit" disabled={isPending || currentRating === 0}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            'Submit Review'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}