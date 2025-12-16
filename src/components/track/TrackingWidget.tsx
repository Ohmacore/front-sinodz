"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCommand } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search, AlertCircle } from "lucide-react";
    
export function TrackingWidget() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const [query, setQuery] = useState(initialQuery);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (initialQuery) {
            handleSearch(initialQuery);
        }
    }, [initialQuery]);

    const handleSearch = async (q: string) => {
        if (!q.trim()) return;
        setLoading(true);
        setError("");

        try {
            const result = await getCommand(q);
            if (result) {
                // Redirect to detail page
                router.push(`/track/${encodeURIComponent(q)}`);
            } else {
                setError("Commande introuvable. Veuillez vérifier le numéro et réessayer.");
            }
        } catch (err) {
            setError("Une erreur s'est produite lors de la recherche de la commande.");
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(query);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <Card className="bg-white shadow-elegant-lg border-gray-200">
                <CardHeader>
                    <CardTitle>Suivre votre commande</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Entrez votre numéro de commande pour suivre l'état de votre importation
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ex: CMD-20251123-629"
                                className="pl-9"
                                disabled={loading}
                            />
                        </div>
                        <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90">
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Rechercher"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {error && (
                <Card className="bg-red-50 border-red-200 shadow-elegant animate-fade-in">
                    <CardContent className="p-4 flex items-center gap-3 text-red-700">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p>{error}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
