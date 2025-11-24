import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import type { BorrowedBookResponse } from '@/api/types/types';


interface BorrowedBookCardProps {
  book: BorrowedBookResponse;
  onReturn?: (id: number) => void;
  onApprove?: (id: number) => void;
  showReturnButton?: boolean;
  showApproveButton?: boolean;
}

export function BorrowedBookCard({
  book,
  onReturn,
  onApprove,
  showReturnButton = false,
  showApproveButton = false,
}: BorrowedBookCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 relative">
        <div className="w-full h-full flex items-center justify-center">
          <BookOpen className="h-16 w-16 text-muted-foreground/50" />
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.authorName}</p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          {book.returned ? (
            book.returnApproved ? (
              <Badge className="gap-1 bg-green-500/10 text-green-500 border-green-500/20">
                <CheckCircle2 className="h-3 w-3" />
                Return Approved
              </Badge>
            ) : (
              <Badge className="gap-1 bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                Pending Approval
              </Badge>
            )
          ) : (
            <Badge variant="secondary">Currently Borrowed</Badge>
          )}
        </div>

        {book.isbn && (
          <p className="text-xs text-muted-foreground">
            ISBN: {book.isbn}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        {showReturnButton && !book.returned && onReturn && (
          <Button
            size="sm"
            onClick={() => book.id && onReturn(book.id)}
            className="flex-1"
          >
            Return Book
          </Button>
        )}

        {showApproveButton && book.returned && !book.returnApproved && onApprove && (
          <Button
            size="sm"
            onClick={() => book.id && onApprove(book.id)}
            className="flex-1 gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Approve Return
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
