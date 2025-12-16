"use client";

import { getCar } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Fuel, Gauge, MapPin, Settings2, Calendar, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { OrderForm } from "@/components/cars/OrderForm";
import { useState, useEffect } from "react";

interface CarDetailsClientProps {
    carId: number;
}

export function CarDetailsClient({ carId }: CarDetailsClientProps) {
    const [car, setCar] = useState<Awaited<ReturnType<typeof getCar>> | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        getCar(carId).then((data) => {
            setCar(data || null);
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
    console.log("detail page")
    return (
        <div className="min-h-screen bg-white">
            <div className="container px-4 mx-auto py-8">
                <div className="mb-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Badge variant="outline" className="text-secondary border-gray-300 px-4 py-1.5 text-sm font-semibold">
                            {car.brand.name}
                        </Badge>
                        {car.isAvailable ? (
                            <Badge className="bg-green-500 text-white hover:bg-green-600 font-semibold">Disponible</Badge>
                        ) : (
                            <Badge variant="destructive">Vendu</Badge>
                        )}
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-4 leading-tight">{car.model}</h1>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">{car.location}</span>
                    </div>
                </div>

                <Separator className="bg-gray-200 mb-8" />

                {/* Two Column Grid: Images + Details */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column: Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-lg">
                            <Image
                                src={images[selectedImage].image}
                                alt={car.model}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-5 gap-3">
                            {images.map((img, idx) => (
                                <button
                                    key={img.id}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`relative aspect-[16/10] overflow-hidden rounded-lg border-2 transition-all duration-200 ${selectedImage === idx
                                        ? "border-secondary ring-2 ring-secondary/20 shadow-md"
                                        : "border-gray-200 hover:border-gray-400 shadow-sm"
                                        }`}
                                >
                                    <Image
                                        src={img.image}
                                        alt={`${car.model} vue ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="space-y-6">
                        {/* Price - Professional Black Styling */}
                        <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 shadow-md">
                            <p className="text-sm text-muted-foreground mb-1 font-semibold uppercase tracking-wide">Prix de Départ</p>
                            <div className="flex items-baseline gap-3">
                                <h2 className="text-5xl font-bold text-secondary">{car.price.toLocaleString()}</h2>
                                <span className="text-lg text-muted-foreground">DZD </span>
                            </div>
                        </div>

                        {/* Specifications Grid */}
                        <div>
                            <h3 className="text-lg font-semibold text-secondary mb-4">Spécifications Techniques</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <Card className="bg-gray-50 border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all">
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white border border-gray-200">
                                            <Calendar className="h-5 w-5 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Année</p>
                                            <p className="font-semibold text-secondary">{car.year}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gray-50 border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all">
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white border border-gray-200">
                                            <Gauge className="h-5 w-5 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Kilométrage</p>
                                            <p className="font-semibold text-secondary">{car.mileage.toLocaleString()} km</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gray-50 border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all">
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white border border-gray-200">
                                            <Settings2 className="h-5 w-5 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Transmission</p>
                                            <p className="font-semibold text-secondary">{car.transmission}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gray-50 border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all">
                                    <CardContent className="p-4 flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white border border-gray-200">
                                            <Fuel className="h-5 w-5 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Carburant</p>
                                            <p className="font-semibold text-secondary">{car.fuelType}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Engine Info */}
                        <Card className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 shadow-sm">
                            <CardContent className="p-5">
                                <p className="text-sm text-muted-foreground mb-1 font-semibold uppercase tracking-wide">Moteur</p>
                                <p className="text-lg font-semibold text-secondary">{car.engine}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 border-y border-gray-200 py-16">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-gray-200 shadow-sm mb-4">
                            <Star className="h-4 w-4 text-secondary" />
                            <span className="text-sm font-semibold text-secondary">Options du véhicule</span>
                        </div>
                        <h2 className="text-3xl font-bold text-secondary mb-3">Tout ce Dont Vous Avez Besoin</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Ce véhicule est équipé de fonctionnalités premium pour le confort, la sécurité et la performance.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {car.features.map((feature) => (
                            <Card key={feature.id} className="bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                                <CardContent className="p-5 flex items-start gap-4">
                                    <div className="mt-1 p-2 rounded-lg bg-gray-100 border border-gray-200 shrink-0">
                                        <Check className="h-5 w-5 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-secondary mb-1">{feature.name}</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Order Form Section */}
            <div className="py-16 bg-white">
                <div className="container px-4 mx-auto max-w-2xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-secondary mb-3">Prêt à Réserver?</h2>
                        <p className="text-muted-foreground">
                            Remplissez le formulaire ci-dessous et notre équipe vous contactera pour finaliser votre commande.
                        </p>
                    </div>
                    <OrderForm carModel={car.model} carPrice={car.price} carId={car.id} />
                </div>
            </div>

            {/* Contact Section */}
            <div className="border-t border-gray-200 py-12 bg-gray-50">
                <div className="container px-4 mx-auto text-center">
                    <p className="text-muted-foreground mb-6">Des questions ou besoin de plus d'informations?</p>
                    <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-8 font-semibold shadow-md hover:shadow-lg transition-all">
                        Contacter l'Équipe Commerciale
                    </Button>
                </div>
            </div>
        </div>
    );
}
