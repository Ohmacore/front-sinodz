"use client";

import { getCar } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Fuel, MapPin, Settings2, Star, Calendar, Gauge, Receipt, CarFront, CircleDot } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { OrderForm } from "@/components/cars/OrderForm";
import { useState, useEffect } from "react";
import { CarVariant } from "@/types";

interface CarDetailsClientProps {
    carId: number;
}

/** Formats the condition string nicely for users */
function formatCondition(condition: string) {
    if (!condition) return "";
    const c = condition.toLowerCase().replace(/_/g, ' ');
    
    if (c.includes('new') && c.includes('3')) return 'Nouvelle -3 ans';
    if (c.includes('used') && c.includes('3')) return 'Occasion -3 ans';
    if (c === 'new' || c === 'neuf' || c === 'nouvelle') return 'Nouvelle';
    if (c === 'used' || c === 'occasion') return 'Occasion';
    
    return condition
        .split('_')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

function getConditionColor(condition: string) {
    const formatted = formatCondition(condition).toLowerCase();
    if (formatted.includes('nouvelle -3 ans')) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (formatted.includes('nouvelle')) return "bg-green-100 text-green-800 border-green-200";
    if (formatted.includes('occasion -3 ans')) return "bg-amber-100 text-amber-800 border-amber-200";
    if (formatted.includes('occasion')) return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
}

function getColorHex(colorName: string) {
    const colorMap: Record<string, string> = {
        'black': '#000000', 'noir': '#000000',
        'white': '#FFFFFF', 'blanc': '#FFFFFF',
        'silver': '#E8E8E8', 'argent': '#E8E8E8',
        'gray': '#808080', 'gris': '#808080',
        'red': '#FF0000', 'rouge': '#FF0000',
        'blue': '#0000FF', 'bleu': '#0000FF',
        'green': '#008000', 'vert': '#008000',
        'nardo': '#a3a9a6', 'nardo grey': '#a3a9a6',
        'chalk': '#dfdcd4', 'craie': '#dfdcd4',
        'yellow': '#FFD700', 'jaune': '#FFD700',
        'brown': '#8B4513', 'marron': '#8B4513'
    };
    return colorMap[colorName.toLowerCase()] || undefined;
}

export function CarDetailsClient({ carId }: CarDetailsClientProps) {
    const [car, setCar] = useState<Awaited<ReturnType<typeof getCar>> | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState<CarVariant | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        getCar(carId).then((data) => {
            setCar(data || null);
            if (data && data.variants && data.variants.length > 0) {
                const cheapest = [...data.variants].sort((a, b) => a.price - b.price)[0];
                setSelectedVariant(cheapest);
            }
            setLoading(false);
        });
    }, [carId]);

    if (loading) {
        return (
            <div className="container px-4 mx-auto py-12 flex items-center justify-center min-h-[60vh]">
                <p className="text-muted-foreground">Chargement...</p>
            </div>
        );
    }

    if (!car) {
        notFound();
    }

    const images = car.images.length > 0 ? car.images : [{ id: 0, car_model_id: car.id, image: "/placeholder-car.jpg", order: 1 }];
    const isAvailable = car.isAvailable?.toLowerCase() === "disponible";

    return (
        <div className="min-h-screen bg-white">
            <div className="container px-4 mx-auto py-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Badge variant="outline" className="text-secondary border-gray-300 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider">
                            {car.brand.name}
                        </Badge>
                        {isAvailable ? (
                            <Badge className="bg-green-500 text-white hover:bg-green-600 font-semibold px-3 py-1">Disponible sur commande</Badge>
                        ) : (
                            <Badge variant="destructive" className="px-3 py-1">Indisponible</Badge>
                        )}
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-4 leading-tight">{car.model}</h1>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">{car.location}</span>
                    </div>
                </div>

                <Separator className="bg-gray-200 mb-8" />

                {/* Two Column Grid: Images & Specs */}
                <div className="grid lg:grid-cols-[1fr_450px] gap-8 lg:gap-12 mb-12">
                    {/* Left Column: Images & Features */}
                    <div className="space-y-8">
                        {/* Images Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-md">
                                <Image
                                    src={images[selectedImage].image}
                                    alt={car.model}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="grid grid-cols-5 gap-3">
                                {images.map((img, idx) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`relative aspect-[16/10] overflow-hidden rounded-lg border-2 transition-all duration-200 ${selectedImage === idx
                                            ? "border-secondary ring-2 ring-secondary/20 shadow-sm"
                                            : "border-transparent border-gray-200 hover:border-gray-400"
                                            }`}
                                    >
                                        <Image src={img.image} alt={`${car.model} vue ${idx + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Features Section */}
                        {car.features.length > 0 && (
                            <div className="hidden lg:block pt-8 border-t border-gray-200 mt-8">
                                <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                                    <Star className="h-5 w-5 text-primary" />
                                    Équipements et Options
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {car.features.map((feature) => (
                                        <div key={feature.id} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 transition-colors hover:bg-gray-100">
                                            <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-secondary text-sm">{feature.name}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Static Configuration */}
                    <div className="space-y-8">
                        {/* Static Specs */}
                        <div>
                            <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                                <Settings2 className="h-5 w-5" />
                                Spécifications du Modèle
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3 transition-colors hover:bg-gray-100">
                                    <div className="bg-white p-2 text-secondary rounded-lg shadow-sm border border-gray-100">
                                        <Settings2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wide">Transmission</p>
                                        <p className="font-bold text-secondary">{car.transmission}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3 transition-colors hover:bg-gray-100">
                                    <div className="bg-white p-2 text-secondary rounded-lg shadow-sm border border-gray-100">
                                        <Fuel className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wide">Carburant</p>
                                        <p className="font-bold text-secondary">{car.fuelType}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 w-full transition-colors hover:bg-gray-100">
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wide mb-1">Motorisation</p>
                                <p className="font-bold text-secondary text-lg">{car.engine}</p>
                            </div>

                            {/* Available Colors - Model Level */}
                            {car.colors && car.colors.length > 0 && (
                                <div className="mt-8 border-t border-gray-200 pt-6">
                                    <p className="text-sm text-secondary font-bold uppercase tracking-wide mb-4">Couleurs catalogue du modèle</p>
                                    <div className="flex flex-wrap gap-2">
                                        {car.colors.map((color) => {
                                            const hex = getColorHex(color);
                                            return (
                                                <div key={color} className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                                                    {hex ? (
                                                        <div 
                                                            className="h-4 w-4 rounded-full border border-gray-300 shadow-inner" 
                                                            style={{ backgroundColor: hex }} 
                                                            title={color}
                                                        />
                                                    ) : (
                                                        <CircleDot className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                    <span className="text-sm font-semibold text-secondary">{color}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <Button 
                                className="w-full mt-8 bg-secondary hover:bg-secondary/90 text-white text-lg py-6 shadow-md"
                                onClick={() => document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Passer Commande
                            </Button>
                        </div>
                    </div>
                </div>

                {/* FULL WIDTH: Variants List (Actual Vehicles Available) */}
                {car.variants.length > 0 && (
                    <div className="scroll-mt-24 mb-16" id="vehicles-section">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                            <h3 className="text-3xl font-bold text-secondary flex items-center gap-3">
                                <CarFront className="h-8 w-8 text-primary" />
                                Véhicules Disponibles
                            </h3>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-none w-fit text-base px-4 py-1.5">
                                {car.variants.length} en stock
                            </Badge>
                        </div>
                        <p className="text-lg text-muted-foreground mb-6">
                            Sélectionnez l'un des véhicules de notre inventaire pour remplir le formulaire de commande.
                        </p>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            {car.variants.map((variant) => {
                                const isSelected = selectedVariant?.id === variant.id;
                                const conditionFmt = formatCondition(variant.condition);
                                const condColorInfo = getConditionColor(variant.condition);

                                return (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`w-full text-left rounded-xl transition-all duration-200 relative group overflow-hidden ${
                                            isSelected
                                                ? "border-2 border-secondary bg-white shadow-md ring-4 ring-secondary/5"
                                                : "border-2 border-gray-100 bg-gray-50 hover:border-gray-300 hover:bg-white hover:shadow-sm"
                                        }`}
                                    >
                                        <div className={`absolute left-0 top-0 bottom-0 w-2 transition-colors ${isSelected ? "bg-secondary" : "bg-transparent group-hover:bg-gray-300"}`} />

                                        <div className="p-6 pl-8">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div>
                                                    <div className="flex items-center gap-3 flex-wrap mb-2">
                                                        <h4 className="font-bold text-secondary text-2xl leading-none">{variant.color}</h4>
                                                        <Badge className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 border ${condColorInfo}`}>
                                                            {conditionFmt}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-base font-medium text-muted-foreground mt-2">
                                                        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {variant.year}</span>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                                        <span className="flex items-center gap-1.5"><Gauge className="h-4 w-4" /> {variant.mileage.toLocaleString()} km</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-none pt-4 sm:pt-0 border-gray-200">
                                                    <div className="font-black text-secondary text-3xl whitespace-nowrap">
                                                        {variant.price.toLocaleString()} <span className="text-xl font-semibold text-muted-foreground">DZD</span>
                                                    </div>
                                                    <div className="text-sm font-medium text-muted-foreground mt-1 flex items-center sm:justify-end gap-1.5">
                                                        <Receipt className="h-4 w-4 text-secondary/60" /> Frais douane inclus : <strong className="text-secondary">{variant.taxe_price.toLocaleString()} DZD</strong>
                                                    </div>
                                                    {isSelected && (
                                                        <div className="text-sm font-bold text-primary mt-2 flex items-center sm:justify-end gap-1.5 bg-primary/10 w-fit sm:ml-auto px-2 py-0.5 rounded text-secondary">
                                                            <Check className="h-4 w-4" /> Sélectionné
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Features Section */}
            {car.features.length > 0 && (
                <div className="lg:hidden bg-gray-50 border-y border-gray-200 py-12 mt-8">
                    <div className="container px-4 mx-auto">
                        <div className="mb-8 pl-2">
                            <h2 className="text-2xl font-bold text-secondary flex items-center gap-2 mb-2">
                                <Star className="h-5 w-5 text-primary" />
                                Équipements
                            </h2>
                            <p className="text-muted-foreground text-sm">Ce véhicule est équipé de fonctionnalités premium.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {car.features.map((feature) => (
                                <div key={feature.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 rounded-md bg-gray-100 border border-gray-200 shrink-0">
                                            <Check className="h-4 w-4 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-secondary text-sm mb-1">{feature.name}</p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Order Form Section */}
            <div id="order-section" className="py-20 bg-gray-50 relative border-t border-gray-200">
                <div className="container px-4 mx-auto max-w-2xl">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-secondary mb-4">Prêt à Passer Commande ?</h2>
                        <p className="text-gray-600 text-lg max-w-lg mx-auto">
                            Remplissez le formulaire ci-dessous et notre équipe commerciale vous contactera rapidement pour finaliser votre dossier.
                        </p>
                    </div>
                    
                    <div className="shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl overflow-hidden border border-gray-100 bg-white">
                        <OrderForm
                            carModel={car.model}
                            variants={car.variants}
                            colors={car.colors}
                            selectedVariant={selectedVariant}
                            onVariantChange={setSelectedVariant}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
