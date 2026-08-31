
import { NavBar } from '@/components/nav-bar';
import { BookCard } from '@/components/book-card';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useBooks, useBorrowBook } from '@/api/hooks/useBooks';
import { useState } from 'react';
import Pagination from '@/components/pagination';
import ErrorAlert from '@/components/error-alert';
import toast, { Toaster } from 'react-hot-toast';



export default function BooksPage() {
    const router = useNavigate();
    const [page, setPage] = useState(0)
    const { data, error, isPending } = useBooks(page, 10)
    const [searchQuery, setSearchQuery] = useState('');
    const { mutate } = useBorrowBook();


    const handleBorrow = async (id: number, title: string) => {

        mutate(id, {
            onSuccess: () => {
                toast.success("You have borrowed the book " + title)

            }, onError: (err) => {
                toast.error("Error: " + err.cause?.error)

            }
        })
    };

    const handleViewFeedback = (id: number) => {
        router(`/books/${id}`);
    };

    const filteredBooks = data?.content?.filter((book) =>
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authorName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (error || data === undefined) {

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
            <><Toaster /></>

            <main className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Discover Books</h1>
                            <p className="text-muted-foreground">Browse and borrow from the community</p>
                        </div>
                    </div>

                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search books or authors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {isPending ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : filteredBooks.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">No books found</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredBooks.map((book) => (

                                    <BookCard
                                        key={book.id}
                                        book={book}
                                        onBorrow={handleBorrow}
                                        onViewFeedback={handleViewFeedback}
                                        isOwner={false}
                                    />

                                ))}
                            </div>

                            {data.totalPages > 1 && (
                                <Pagination page={page} first={data.first} number={data.number} totalPages={data.totalPages} setPage={setPage} />
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
