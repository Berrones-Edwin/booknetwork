import { useForm, type SubmitHandler } from "react-hook-form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookMarked, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useLogin } from "@/api/hooks/useAuth";

type Inputs = {
    email: string,
    password: string,
}

export default function LoginPage() {
    const router = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const { mutate, isPending } = useLogin()


    const onSubmit: SubmitHandler<Inputs> = (data) => {

        mutate(data, {
            onSuccess: (res) => {
                if (res.token) {
                    localStorage.setItem("token", JSON.stringify(res.token));

                    router("/books", {
                        replace: true
                    })
                }
            }
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold">
                        <BookMarked className="h-8 w-8 text-primary" />
                        <span>BookSocial</span>
                    </Link>
                    <p className="text-muted-foreground">Welcome back to your library</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            {errors.email && (
                                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                    Email is required
                                </div>
                            )}
                            {errors.password && (
                                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                    Password is required
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register("email", { required: true })}
                                    required
                                    disabled={isPending}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password", { required: true })}
                                    required
                                    disabled={isPending}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                            <p className="text-sm text-muted-foreground text-center">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-primary hover:underline font-medium">
                                    Create one
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
