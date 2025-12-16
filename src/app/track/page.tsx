import { Suspense } from "react";
import { TrackingWidget } from "@/components/track/TrackingWidget";
import { Loader2 } from "lucide-react";

export default function TrackPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Header Section */}
            <section className="bg-secondary text-white pt-32 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Suivi de Commande</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Restez informé de l'état de votre importation en temps réel
                    </p>
                    <div className="mt-6 inline-block px-4 py-2 rounded-full bg-primary/20 text-white text-sm font-semibold border border-primary/30">
                        Fonctionnalité Beta
                    </div>
                </div>
            </section>

            {/* Tracking Widget */}
            <div className="container px-4 mx-auto py-16">
                <div className="max-w-3xl mx-auto">
                    <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin text-primary" /></div>}>
                        <TrackingWidget />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
