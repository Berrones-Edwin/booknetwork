import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";
import { Link } from "react-router";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-primary" />
                        <span className="text-xl font-semibold">BookSocial</span>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="ghost">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button>Get Started</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1">
                <section className="container mx-auto px-4 py-20 md:py-32">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            <Star className="h-4 w-4" />
                            Join thousands of book lovers
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
                            Your Personal Library,{' '}
                            <span className="text-primary">Shared</span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                            Manage your book collection, share with friends, and discover new reads.
                            Join a community of passionate readers today.
                        </p>

                        <div className="flex items-center justify-center gap-4 pt-4">
                            <Link to="/register">
                                <Button size="lg" className="gap-2">
                                    Start Reading <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button size="lg" variant="outline">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-4 py-20 border-t border-border">
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="space-y-4 p-6 rounded-lg bg-card border border-border">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">Manage Your Library</h3>
                            <p className="text-muted-foreground">
                                Organize, update, and archive your book collection with ease. Keep track of everything you own.
                            </p>
                        </div>

                        <div className="space-y-4 p-6 rounded-lg bg-card border border-border">
                            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                                <Users className="h-6 w-6 text-accent" />
                            </div>
                            <h3 className="text-xl font-semibold">Share & Borrow</h3>
                            <p className="text-muted-foreground">
                                Lend books to friends and borrow from others. Build a community around shared reading experiences.
                            </p>
                        </div>

                        <div className="space-y-4 p-6 rounded-lg bg-card border border-border">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Star className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">Rate & Review</h3>
                            <p className="text-muted-foreground">
                                Share your thoughts and discover what others think. Help the community find their next great read.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-border py-8">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    <p>&copy; 2025 BookSocial. Built for book lovers, by book lovers.</p>
                </div>
            </footer>
        </div>
    );
}