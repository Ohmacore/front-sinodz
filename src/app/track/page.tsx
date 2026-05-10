"use client";

import { MapPin, ArrowRight, Cog, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TrackPage() {
    return (
        <div className="min-h-[100dvh] bg-gray-50 flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden font-sans">
            {/* Subtle background decoration matches site */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-gray-100 to-transparent pointer-events-none" />

            {/* Decorative background circle */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-[80px]" />
            <div className="absolute top-1/2 -left-32 w-80 h-80 bg-secondary/5 rounded-full blur-[80px]" />

            <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">

                {/* Central Icon Container */}
                <div className="relative mb-10 w-32 h-32 flex items-center justify-center">
                    {/* Animated rings */}
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                    <div className="absolute inset-2 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 z-10">
                        <MapPin className="h-12 w-12 text-primary" />
                        <Cog className="h-5 w-5 text-secondary absolute -bottom-1 -right-1 animate-spin-slow bg-white rounded-full shadow-sm" />
                    </div>
                </div>

                {/* Badge matching rest of the site */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-secondary text-sm font-bold tracking-wide uppercase mb-6 shadow-sm">
                    <LayoutGrid className="h-4 w-4 text-primary" />
                    En Cours de Developpement
                </div>


                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-black text-secondary mb-6 tracking-tight">
                    Bientôt Disponible
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
                    L'interface de suivi géolocalisé pour l'importation de vos véhicules est actuellement en phase finale de développement. Vous pourrez très prochainement suivre l'acheminement de votre commande en temps réel.
                </p>

                {/* Feature Grid that matches CarDetails spec grids */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-12 text-left">
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-colors hover:border-gray-200">
                        <div className="bg-gray-50 inline-flex p-2 rounded-lg mb-3">
                            <MapPin className="h-5 w-5 text-secondary" />
                        </div>
                        <h3 className="font-bold text-secondary text-base mb-1">Tracking Précis</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">Suivez la position exacte du véhicule durant tout le trajet maritime et terrestre.</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-colors hover:border-gray-200">
                        <div className="bg-gray-50 inline-flex p-2 rounded-lg mb-3">
                            <ArrowRight className="h-5 w-5 text-secondary" />
                        </div>
                        <h3 className="font-bold text-secondary text-base mb-1">Mises à jour</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">Notifications en temps réel lors du passage des douanes et du déchargement.</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-colors hover:border-gray-200">
                        <div className="bg-gray-50 inline-flex p-2 rounded-lg mb-3">
                            <Cog className="h-5 w-5 text-secondary" />
                        </div>
                        <h3 className="font-bold text-secondary text-base mb-1">Espace Client</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">Vos documents et factures centralisés dans un espace professionnel et sécurisé.</p>
                    </div>
                </div>

                {/* Action Button matching CarDetails logic */}
                <Link href="/">
                    <Button
                        size="lg"
                        className="bg-secondary hover:bg-secondary/90 text-white px-10 py-7 font-bold text-lg rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 group"
                    >
                        Retourner à l'accueil
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>

            {/* Bottom border separator */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
    );
}
