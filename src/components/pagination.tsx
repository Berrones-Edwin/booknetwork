import { Button } from "./ui/button";


type Props = {
    page: number,
    first: boolean,
    number: number,
    totalPages: number,
    setPage: (n: number) => void
}
export default function Pagination({ page, first, number, totalPages, setPage }: Props) {
    return (
        <div className="flex items-center justify-center gap-2 pt-4">
            <Button
                variant="outline"
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={first}
            >
                Previous
            </Button>
            <span className="text-sm text-muted-foreground">
                Page {number + 1} of {totalPages}
            </span>
            <Button
                variant="outline"
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={number >= totalPages - 1}
            >
                Next
            </Button>
        </div>
    )
}