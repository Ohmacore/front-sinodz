"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCars } from "@/lib/api";
import { Car } from "@/types";
import { CarCard } from "@/components/cars/CarCard";
import { CarCardSkeleton } from "@/components/cars/CarCardSkeleton";
import { ArrowRight, Shield, Zap, Globe, Car as CarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HomeClientProps {
    importCars?: Car[];
    stockCars?: Car[];
}

export default function HomeClient({
    importCars: initialImportCars,
    stockCars: initialStockCars
}: HomeClientProps) {
    const [importCars, setImportCars] = useState<Car[]>(initialImportCars || []);
    const [stockCars, setStockCars] = useState<Car[]>(initialStockCars || []);
    const [loadingImport, setLoadingImport] = useState(!initialImportCars);
    const [loadingStock, setLoadingStock] = useState(!initialStockCars);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        // Fetch import cars if not provided
        if (!initialImportCars) {
            getCars("Chine")
                .then((data) => {
                    setImportCars(data);
                    setLoadingImport(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch import cars:", err);
                    setLoadingImport(false);
                });
        }

        // Fetch stock cars if not provided
        if (!initialStockCars) {
            getCars("Algérie")
                .then((data) => {
                    setStockCars(data);
                    setLoadingStock(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch stock cars:", err);
                    setLoadingStock(false);
                });
        }
    }, [initialImportCars, initialStockCars]);

    const featuredImportCars = importCars.slice(0, 3);
    const featuredStockCars = stockCars.slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section with Background Image */}
            <section className="relative h-[85vh] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop"
                        alt="Luxury car background"
                        fill
                        className="object-cover animate-slow-zoom"
                        priority
                    />
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 relative z-10">
                    <div className={`max-w-3xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            Service d'Importation Premium
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Importez la Voiture de{" "}
                            <span className="text-primary animate-pulse-slow">Vos Rêves</span>
                        </h1>

                        <p className="text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed">
                            Service d'importation de véhicules premium. De la recherche à la livraison, nous gérons tout pour vous.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90 text-white font-semibold shadow-xl transition-all hover:scale-105" asChild>
                                <Link href="/cars/import">Parcourir les Véhicules</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-secondary font-semibold shadow-xl transition-all hover:scale-105" asChild>
                                <Link href="/track">Suivre ma Commande</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
                        <div className="w-1.5 h-3 bg-white/50 rounded-full animate-scroll"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: "Garantie Complète", desc: "Tous nos véhicules sont vérifiés et garantis pour votre tranquillité d'esprit.", delay: "0ms" },
                            { icon: Zap, title: "Livraison Rapide", desc: "Importation et livraison en 4-6 semaines seulement.", delay: "100ms" },
                            { icon: Globe, title: "Réseau International", desc: "Accès à plus de 15 pays pour trouver votre véhicule idéal.", delay: "200ms" }
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-4 animate-slide-up opacity-0"
                                style={{ animationDelay: feature.delay, animationFillMode: 'forwards' }}
                            >
                                <div className="p-3 bg-primary/10 rounded-xl shrink-0 transition-all hover:scale-110 hover:bg-primary/20">
                                    <feature.icon className="h-7 w-7 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary mb-2 text-lg">{feature.title}</h3>
                                    <p className="text-muted-foreground text-sm">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-secondary text-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
                        {[
                            { value: "500+", label: "Véhicules Importés", delay: "0ms" },
                            { value: "98%", label: "Clients Satisfaits", delay: "100ms" },
                            // { value: "15+", label: "Pays Sources", delay: "200ms" },
                            { value: "24/7", label: "Support Client", delay: "300ms" }
                        ].map((stat, idx) => (
                            <div
                                key={idx}
                                className="animate-fade-in-up opacity-0"
                                style={{ animationDelay: stat.delay, animationFillMode: 'forwards' }}
                            >
                                <div className="text-4xl font-bold text-primary mb-2 transition-all hover:scale-110">{stat.value}</div>
                                <div className="text-sm text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Import Cars Section */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container px-4 mx-auto">

                    <div className="text-center mb-12 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-bold mb-4">
                            <Globe className="h-4 w-4" />
                            Importation sur Commande
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">Véhicules pour importation</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Découvrez quelques-uns de nos véhicules premium disponibles à l'importation.</p>
                    </div>

                    {/* Loading State */}
                    {loadingImport && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {[...Array(3)].map((_, i) => (
                                <CarCardSkeleton key={i} />
                            ))}
                        </div>
                    )}

                    {/* Cars Grid - only show when not loading */}
                    {!loadingImport && featuredImportCars.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {featuredImportCars.map((car, idx) => (
                                <div
                                    key={car.id}
                                    className="animate-slide-up opacity-0"
                                    style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
                                >
                                    <CarCard car={car} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State - only show when not loading and no cars */}
                    {!loadingImport && featuredImportCars.length === 0 && (
                        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm mb-12 animate-fade-in">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6">
                                <CarIcon className="h-10 w-10 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Aucun véhicule disponible</h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                Nous n'avons pas de véhicules dans cette catégorie pour le moment.
                                <br />Revenez plus tard ou contactez-nous pour une recherche personnalisée.
                            </p>
                        </div>
                    )}

                    {/* Simple Call to Action */}
                    <div className="text-center animate-fade-in mt-8">
                        <p className="text-muted-foreground mb-4">
                            plus de véhicules disponibles à l'importation dans notre catalogue complet
                        </p>
                        <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-black font-semibold px-10 transition-all hover:scale-105" asChild>
                            <Link href="/cars/import" className="flex items-center gap-2">
                                Parcourir Tous les Véhicules
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stock Cars Section */}
            <section className="py-20 bg-white border-t">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-12 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-4">
                            <Zap className="h-4 w-4" />
                            Livraison Immédiate
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">Véhicules Disponibles Immédiatement</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Véhicules déjà importés et prêts à être livrés en Algérie.
                        </p>
                    </div>

                    {/* Loading State */}
                    {loadingStock && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {[...Array(3)].map((_, i) => (
                                <CarCardSkeleton key={i} />
                            ))}
                        </div>
                    )}

                    {/* Cars Grid - only show when not loading */}
                    {!loadingStock && featuredStockCars.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {featuredStockCars.map((car, idx) => (
                                <div
                                    key={car.id}
                                    className="animate-slide-up opacity-0"
                                    style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
                                >
                                    <CarCard car={car} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State - only show when not loading and no cars */}
                    {!loadingStock && featuredStockCars.length === 0 && (
                        <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm mb-12 animate-fade-in">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white mb-6">
                                <CarIcon className="h-10 w-10 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Stock épuisé</h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                Tous nos véhicules en stock ont été vendus.
                                <br />Consultez nos véhicules sur commande ou contactez-nous.
                            </p>
                        </div>
                    )}

                    {/* Simple Call to Action */}
                    <div className="text-center animate-fade-in mt-8">
                        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-10 shadow-lg transition-all hover:scale-105" asChild>
                            <Link href="/cars/stock" className="flex items-center gap-2">
                                Voir Tout le Stock
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section - Professional & Subtle */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container px-4 mx-auto">
                    <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-12 md:p-20 text-center shadow-2xl shadow-black/5 border border-white/50 relative overflow-hidden isolate">
                        {/* Background Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50/50 -z-10" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 opacity-50" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 tracking-tight">
                                Prêt à importer votre <span className="text-primary">prochain véhicule</span> ?
                            </h2>
                            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                                Bénéficiez de notre expertise et de notre réseau international pour une acquisition en toute sérénité.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                                <Button size="lg" className="h-14 px-10 text-base bg-secondary hover:bg-primary text-white font-semibold rounded-full shadow-xl shadow-secondary/10 hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group" asChild>
                                    <Link href="/cars/import">
                                        Lancer ma recherche
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="h-14 px-10 text-base border-2 border-gray-200 text-secondary hover:border-secondary hover:bg-transparent font-semibold rounded-full transition-all duration-300" asChild>
                                    <Link href="/contact">Nous contacter</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
