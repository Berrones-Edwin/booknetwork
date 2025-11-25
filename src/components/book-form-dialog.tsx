import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import type { BookResponse } from '@/api/types/types';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useSaveBook } from '@/api/hooks/useBooks';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

interface BookFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book?: BookResponse | null;
}
type Inputs = {
  id?: number;
  title: string;
  authorName: string;
  isbn: string;
  synopsis: string;
  shareable: boolean;
}
export function BookFormDialog({ open, onOpenChange, book }: BookFormDialogProps) {
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    defaultValues: {
      title: "",
      authorName: '',
      isbn: '',
      synopsis: '',
      shareable: true
    }
  })
  const { mutate, isPending } = useSaveBook()
  useEffect(() => {
    if (book) {
      reset({
        id: book.id,
        title: book.title,
        authorName: book.authorName,
        isbn: book.isbn,
        synopsis: book.synopsis,
        shareable: book.shareable,
      });
    } else {
      reset({
        title: '',
        authorName: '',
        isbn: '',
        synopsis: '',
        shareable: true,
      });
    }
  }, [book, open, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {

      // console.log({ data })
      // return

      mutate(data, {
        onSuccess: () => {

          if (!data?.id) {
            toast.success("book has been created")
          } else {
            toast.success("book has been edited")
          }
        }, onError: (err) => {
          const errorPayload = (err as any).cause || {};
          let message = err.message || "An unknown error has occurred";

          if (errorPayload && errorPayload.validationErrors) {
            // Mapear los códigos de error 100-103 a mensajes legibles
            const errorMap: { [key: string]: string } = {
              "100": "Title is required.",
              "101": "Author Name is required.",
              "102": "ISBN is required.",
              "103": "Synopsis is required."
            };

            const clientMessages = errorPayload.validationErrors
              .map((code: string) => errorMap[code] || `Validation Error Code: ${code}`)
              .join('\n');

            message = clientMessages;
          }

          toast.error(message);

        }
      })

    } catch (error) {
      console.error('Error submitting book form:', error);
    } finally {
      onOpenChange(false);
      reset()
    }
  };

  return (
    <>
      <Toaster />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{book ? 'Edit Book' : 'Add New Book'}</DialogTitle>
            <DialogDescription>
              {book ? 'Update the details of your book' : 'Add a new book to your collection'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  required
                  disabled={isPending}
                  {...register("title")}
                />
              </div>
              {errors.title && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  Title is required
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="authorName">Author *</Label>
                <Input
                  id="authorName"
                  required
                  disabled={isPending}
                  {...register("authorName")}

                />
              </div>
              {errors.authorName && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  Author Name is required
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN *</Label>
                <Input
                  id="isbn"
                  required
                  {...register("isbn")}
                  disabled={isPending}
                />
              </div>
              {errors.isbn && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  Isbn is required
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="synopsis">Synopsis</Label>
                <Textarea
                  id="synopsis"
                  disabled={isPending}
                  rows={4}
                  {...register("synopsis")}
                />
              </div>
              {errors.synopsis && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  Synopsis is required
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shareable">Shareable</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow others to borrow this book
                  </p>
                </div>
                <Controller name="shareable" control={control} render={({ field }) => (
                  <Switch
                    id="shareable"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending}
                  />
                )} />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  book ? 'Update Book' : 'Add Book'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
