import { useState } from 'react';

import { NavBar } from '@/components/nav-bar';
import { BorrowedBookCard } from '@/components/borrowed-book-card';
import { Loader2 } from 'lucide-react';
import { useBorrowedBooks, useReturnBook } from '@/api/hooks/useBooks';
import ErrorAlert from '@/components/error-alert';
import Pagination from '@/components/pagination';
import toast, { Toaster } from 'react-hot-toast';


export default function BookBorrowedPage() {
    const [page, setPage] = useState(0)

    const { data: books, isPending, error } = useBorrowedBooks(page, 10)
    const { mutate } = useReturnBook()


    const handleReturn = async (id: number) => {
        mutate(id, {
            onSuccess: () => {
                toast.success("The book has been returned ")

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


    return (
        <div className="min-h-screen bg-background">
            <NavBar />
            <><Toaster /></>

            <main className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">Borrowed Books</h1>
                        <p className="text-muted-foreground">Books you've borrowed from others</p>
                    </div>

                    {isPending ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : books.content.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">You haven't borrowed any books yet</p>
                        </div>
                    ) : (
                        <>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {books.content.map((book) => (
                                    <BorrowedBookCard
                                        key={book.id}
                                        book={book}
                                        onReturn={handleReturn}
                                        showReturnButton={true}
                                    />
                                ))}
                            </div>
                            <Pagination page={page} first={books.first} number={books.number} totalPages={books.totalPages} setPage={setPage} />
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
