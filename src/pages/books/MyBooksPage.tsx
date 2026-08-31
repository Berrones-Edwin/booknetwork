import { useState } from 'react';
import { NavBar } from '@/components/nav-bar';
import { BookCard } from '@/components/book-card';
import { BookFormDialog } from '@/components/book-form-dialog';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import type { BookResponse } from '@/api/types/types';
import { useBooksByOwner, useUpdateArchived, useUpdateShareable } from '@/api/hooks/useBooks';
import ErrorAlert from '@/components/error-alert';
import Pagination from '@/components/pagination';
import toast, { Toaster } from 'react-hot-toast';

export default function MyBooksPage() {
    const [page, setPage] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<BookResponse | null>(null);
    const { data: books, isPending, error } = useBooksByOwner(page, 10)
    const { mutateAsync: mutateAsyncArchived } = useUpdateArchived()
    const { mutateAsync: mutateAsyncShareable } = useUpdateShareable()


    const handleEdit = (book: BookResponse) => {
        setEditingBook(book);
        setDialogOpen(true);
    };

    const handleArchive = async (id: number) => {

        mutateAsyncArchived(id, {
            onSuccess: () => {
                toast.success("You have archived the book ")

            }, onError: (err) => {
                toast.error("Error: " + err.cause?.error)

            }
        })

    };

    const handleShare = async (id: number) => {

        mutateAsyncShareable(id, {
            onSuccess: () => {
                toast.success("The book " + id + " is shareable with everyone!")

            }, onError: (err) => {
                toast.error("Error: " + err.cause?.error)

            }
        })

    };
    if (error || books === undefined) {

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
            <Toaster />

            <main className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">My Books</h1>
                            <p className="text-muted-foreground">Manage your personal collection</p>
                        </div>
                        <Button onClick={() => { setEditingBook(null); setDialogOpen(true); }} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Book
                        </Button>
                    </div>

                    {isPending ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : books.content.length === 0 ? (
                        <div className="text-center py-20 space-y-4">
                            <p className="text-muted-foreground">You haven't added any books yet</p>
                            <Button onClick={() => setDialogOpen(true)} className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add Your First Book
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {books.content.map((book) => (
                                    <BookCard
                                        key={book.id}
                                        book={book}
                                        onEdit={handleEdit}
                                        onArchive={handleArchive}
                                        onShare={handleShare}
                                        isOwner={true}
                                    />
                                ))}
                            </div>
                            <Pagination page={page} first={books.first} number={books.number} totalPages={books.totalPages} setPage={setPage} />
                        </>
                    )}
                </div>
            </main>

            <BookFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                book={editingBook}
            />
        </div>
    );
}
