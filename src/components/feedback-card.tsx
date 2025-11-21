import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import type { FeedBackResponse } from "@/api/types/types";

export default function FeedbackCard({ feedback }: { feedback: FeedBackResponse }) {
    return (
        <Card>
            <CardContent className="pt-6 space-y-2">
                <div className="flex items-center gap-2">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`h-4 w-4 ${star <= (feedback.note || 0)
                                    ? 'fill-primary text-primary'
                                    : 'text-muted-foreground'
                                    }`}
                            />
                        ))}
                    </div>
                    {feedback.ownFeedBack && (
                        <span className="text-xs text-primary">(Your review)</span>
                    )}
                </div>
                <p className="text-sm">{feedback.comment}</p>
            </CardContent>
        </Card>
    )
}