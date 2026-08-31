import { useForm, type SubmitHandler } from "react-hook-form"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookMarked, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useRegister } from '@/api/hooks/useAuth';

type Inputs = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
}

export default function RegisterPage() {
    const router = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const { mutate, isPending } = useRegister()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutate(data, {
            onSuccess: (res) => {
                if (res?.ok === "true") {
                    router("/login")
                }
            },
            onError: (err) => {
                console.log(err)
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
                    <p className="text-muted-foreground">Create your account to get started</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Create Account</CardTitle>
                        <CardDescription>Join the community of book enthusiasts</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">


                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstname">First Name</Label>
                                    <Input
                                        id="firstname"
                                        type="text"
                                        placeholder="John"
                                        {...register("firstname", { required: true })}
                                        required
                                        disabled={isPending}
                                    />
                                </div>
                                {errors.firstname && (
                                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                        FirstName field is required
                                    </div>
                                )}
                                {errors.lastname && (
                                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                        LastName field is required
                                    </div>
                                )}
                                {errors.email && (
                                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                        Email field is required
                                    </div>
                                )}
                                {errors.password && (
                                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                        Password field is required
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="lastname">Last Name</Label>
                                    <Input
                                        id="lastname"
                                        type="text"
                                        placeholder="Doe"
                                        {...register("lastname", { required: true })}
                                        required
                                        disabled={isPending}
                                    />
                                </div>
                                {errors.lastname && (
                                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                        LastName field is required
                                    </div>
                                )}
                            </div>

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
                                {errors.email && (
                                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                        Email field is required
                                    </div>
                                )}
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
                                    minLength={8}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Must be at least 8 characters long
                                </p>
                                {errors.password && (
                                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                        Password field is required
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                            <p className="text-sm text-muted-foreground text-center">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary hover:underline font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
