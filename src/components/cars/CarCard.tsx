"use client";

import Link from "next/link";
import { Car } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Fuel, Gauge, Settings2, ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CarCardProps {
    car: Car;
}

export function CarCard({ car }: CarCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = car.images.length > 0 ? car.images : [{ id: 0, car_model_id: car.id, image: "/placeholder-car.jpg", order: 1 }];

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <Card className="group overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl bg-white hover:-translate-y-2">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <Image
                    src={images[currentImageIndex].image}
                    alt={car.model}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Elegant Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Image Navigation */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-secondary p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-secondary p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>

                        {/* Image Indicators */}
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                            {images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? "w-6 bg-primary" : "w-1.5 bg-white/70"
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {car.isAvailable ? (
                    <Badge className="absolute top-4 right-4 bg-green-500 text-white hover:bg-green-600 font-semibold shadow-lg">
                        Disponible
                    </Badge>
                ) : (
                    <Badge variant="destructive" className="absolute top-4 right-4 shadow-lg">
                        Vendu
                    </Badge>
                )}
            </div>

            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <Badge variant="outline" className="mb-2 text-xs border-gray-300 text-secondary font-semibold group-hover:border-secondary transition-colors">
                            {car.brand.name}
                        </Badge>
                        <h3 className="text-xl font-bold text-secondary leading-tight mb-2">{car.model}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{car.location}</span>
                            <span className="mx-1">•</span>
                            <span>{car.year}</span>
                        </div>
                    </div>
                </div>

                {/* Price with professional styling */}
                <div className="mb-4 pb-4 border-b border-gray-100">
                    <div className="text-3xl font-bold text-secondary">
                        {(car.price).toLocaleString()} DZD
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Prix arrivé en Algérie</div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-gray-50 border border-gray-100 group-hover:bg-gray-100 transition-colors">
                        <Gauge className="h-4 w-4 text-secondary" />
                        <span className="font-medium text-secondary">{car.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-gray-50 border border-gray-100 group-hover:bg-gray-100 transition-colors">
                        <Settings2 className="h-4 w-4 text-secondary" />
                        <span className="font-medium text-secondary">{car.transmission}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-gray-50 border border-gray-100 group-hover:bg-gray-100 transition-colors">
                        <Fuel className="h-4 w-4 text-secondary" />
                        <span className="font-medium text-secondary">{car.fuelType}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full bg-secondary hover:bg-primary text-white font-semibold shadow-md group-hover:shadow-lg transition-all group">
                    <Link href={`/cars/${car.id}`} className="flex items-center justify-center gap-2">
                        Voir Détails
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
