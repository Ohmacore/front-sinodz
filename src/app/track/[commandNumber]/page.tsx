import { Suspense } from "react";
import { getCommand } from "@/lib/api";
import { CommandDetail } from "@/components/track/CommandDetail";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        commandNumber: string;
    }>;
}

export default async function CommandDetailPage({ params }: PageProps) {
    const { commandNumber } = await params;

    // Fetch the command data
    const command = await getCommand(decodeURIComponent(commandNumber));

    // If command not found, show 404
    if (!command) {
        notFound();
    }

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <CommandDetail command={command} />
        </Suspense>
    );
}
