import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export default function ErrorAlert() {
    return (
        <Alert variant="destructive" className="w-80">
            <AlertCircleIcon />
            <AlertTitle>Unable to load data</AlertTitle>
            <AlertDescription>
                <p>We cannot seem to connect to the server. Please try again.</p>
                <p>If the problem persists contact customer support.</p>
            </AlertDescription>
        </Alert>
    )
}