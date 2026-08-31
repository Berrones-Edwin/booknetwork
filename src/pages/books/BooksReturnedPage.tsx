import { useState } from 'react';

import { NavBar } from '@/components/nav-bar';
import { BorrowedBookCard } from '@/components/borrowed-book-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useApproveReturnBook, useReturnedBooks } from '@/api/hooks/useBooks';
import ErrorAlert from '@/components/error-alert';
import toast, { Toaster } from 'react-hot-toast';

export default function BooksReturnedPage() {

    const [page, setPage] = useState(0)
    const { data: books, isPending, error } = useReturnedBooks(page, 10)
    const { mutate } = useApproveReturnBook()




    const handleApprove = async (id: number) => {
        mutate(id, {
            onSuccess: () => {
                toast.success("You have borrowed the book " + title)

            }, onError: (err) => {
                toast.error("Error: " + err.cause?.error)

            }
        })
    };

    const pendingBooks = books.content.filter(book => !book.returnApproved);
    const approvedBooks = books.content.filter(book => book.returnApproved);

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
                        <h1 className="text-3xl font-bold">Returned Books</h1>
                        <p className="text-muted-foreground">Manage book returns from borrowers</p>
                    </div>

                    {isPending ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <Tabs defaultValue="pending" className="w-full">
                            <TabsList className="grid w-full max-w-md grid-cols-2">
                                <TabsTrigger value="pending">
                                    Pending Approval ({pendingBooks.length})
                                </TabsTrigger>
                                <TabsTrigger value="approved">
                                    Approved ({approvedBooks.length})
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="pending" className="mt-6">
                                {pendingBooks.length === 0 ? (
                                    <div className="text-center py-20">
                                        <p className="text-muted-foreground">No pending returns</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {pendingBooks.map((book) => (
                                            <BorrowedBookCard
                                                key={book.id}
                                                book={book}
                                                onApprove={handleApprove}
                                                showApproveButton={true}
                                            />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="approved" className="mt-6">
                                {approvedBooks.length === 0 ? (
                                    <div className="text-center py-20">
                                        <p className="text-muted-foreground">No approved returns yet</p>
                                    </div>
                                ) : (

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {approvedBooks.map((book) => (
                                            <BorrowedBookCard
                                                key={book.id}
                                                book={book}
                                            />
                                        ))}
                                    </div>

                                )}
                            </TabsContent>
                        </Tabs>
                    )}
                </div>
            </main>
        </div>
    );
}
