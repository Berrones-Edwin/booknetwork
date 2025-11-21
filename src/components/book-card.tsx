import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Archive, Share2, Edit, BookOpen } from 'lucide-react';
import type { BookResponse } from '@/api/types/types';


interface BookCardProps {
  book: BookResponse;
  onEdit?: (book: BookResponse) => void;
  onArchive?: (id: number) => void;
  onShare?: (id: number) => void;
  onBorrow?: (id: number, title: string) => void;
  onViewFeedback?: (id: number) => void;
  showActions?: boolean;
  isOwner?: boolean;
}

export function BookCard({
  book,
  onEdit,
  onArchive,
  onShare,
  onBorrow,
  onViewFeedback,
  showActions = true,
  isOwner = false,
}: BookCardProps) {
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors">
      <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 relative">
        {book.cover ? (
          <img
            src={book.cover || "/placeholder.svg"}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-muted-foreground/50" />
          </div>
        )}
        {book.archived && (
          <Badge className="absolute top-2 right-2 bg-muted">
            Archived
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.authorName}</p>
        </div>

        {book.synopsis && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {book.synopsis}
          </p>
        )}

        <div className="flex items-center gap-4 pt-2">
          {book.rate !== undefined && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{book.rate.toFixed(1)}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            {book.shareable && (
              <Badge variant="secondary" className="text-xs">
                Shareable
              </Badge>
            )}
          </div>
        </div>

        {book.owner && (
          <p className="text-xs text-muted-foreground">
            Owner: {book.owner}
          </p>
        )}
      </CardContent>

      {showActions && (
        <CardFooter className="p-4 pt-0 flex gap-2">
          {isOwner ? (
            <>
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(book)}
                  className="flex-1 gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              )}
              {onShare && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => book.id && onShare(book.id)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
              {onArchive && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => book.id && onArchive(book.id)}
                >
                  <Archive className="h-4 w-4" />
                </Button>
              )}
            </>
          ) : (
            <>
              {onBorrow && book.shareable && !book.archived && (
                <Button
                  size="sm"
                  onClick={() => book.id && onBorrow(book.id, book.title)}
                  className="flex-1"
                >
                  Borrow
                </Button>
              )}
              {onViewFeedback && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => book.id && onViewFeedback(book.id)}
                  className="flex-1"
                >
                  Reviews
                </Button>
              )}
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
