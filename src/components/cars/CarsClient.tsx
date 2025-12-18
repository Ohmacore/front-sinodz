"use client";

import { useState, useMemo, useEffect } from "react";
import { CarCard } from "@/components/cars/CarCard";
import { CarCardSkeleton } from "@/components/cars/CarCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Car } from "@/types";
import { getCars } from "@/lib/api";

interface CarsClientProps {
    cars?: Car[];
    location?: string;
    pageTitle?: string;
    pageDescription?: string;
    emptyMessage?: string;
}

export default function CarsClient({
    cars: initialCars,
    location,
    pageTitle = "Notre Catalogue",
    pageDescription = "Parcourez notre inventaire complet de véhicules premium disponibles à l'importation",
    emptyMessage = "Aucun véhicule ne correspond à vos critères"
}: CarsClientProps) {
    const [cars, setCars] = useState<Car[]>(initialCars || []);
    const [loading, setLoading] = useState(!initialCars);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrand, setSelectedBrand] = useState<string>("all");
    const [selectedFuelType, setSelectedFuelType] = useState<string>("all");
    const [selectedTransmission, setSelectedTransmission] = useState<string>("all");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000000]);
    const [showFilters, setShowFilters] = useState(true);

    // Fetch cars on client side if not provided via props
    useEffect(() => {
        if (!initialCars) {
            getCars(location)
                .then((data) => {
                    setCars(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch cars:", err);
                    setError("Impossible de charger les véhicules. Veuillez réessayer.");
                    setLoading(false);
                });
        }
    }, [initialCars, location]);

    // Extract unique values for filters
    const brands = useMemo(() => {
        const uniqueBrands = Array.from(new Set(cars.map(car => car.brand.name)));
        return uniqueBrands.sort();
    }, [cars]);

    const fuelTypes = useMemo(() => {
        const uniqueFuels = Array.from(new Set(cars.map(car => car.fuelType)));
        return uniqueFuels.sort();
    }, [cars]);

    const transmissions = useMemo(() => {
        const uniqueTransmissions = Array.from(new Set(cars.map(car => car.transmission)));
        return uniqueTransmissions.sort();
    }, [cars]);

    const maxPrice = useMemo(() => {
        if (cars.length === 0) return 1000000000;
        return Math.max(...cars.map(car => car.price));
    }, [cars]);

    const filteredCars = useMemo(() => {
        return cars.filter(car => {
            const totalPrice = car.price;
            const matchesSearch = car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.brand.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesBrand = selectedBrand === "all" || car.brand.name === selectedBrand;
            const matchesFuel = selectedFuelType === "all" || car.fuelType === selectedFuelType;
            const matchesTransmission = selectedTransmission === "all" || car.transmission === selectedTransmission;
            const matchesPrice = totalPrice >= priceRange[0] && totalPrice <= priceRange[1];

            return matchesSearch && matchesBrand && matchesFuel && matchesTransmission && matchesPrice;
        });
    }, [cars, searchTerm, selectedBrand, selectedFuelType, selectedTransmission, priceRange]);

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedBrand("all");
        setSelectedFuelType("all");
        setSelectedTransmission("all");
        setPriceRange([0, maxPrice]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Header Section */}
            <section className="bg-secondary text-white pt-32 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{pageTitle}</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {pageDescription}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container px-4 mx-auto py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 border-gray-200 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                                        <SlidersHorizontal className="h-5 w-5" />
                                        Filtres
                                    </h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="lg:hidden"
                                    >
                                        {showFilters ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
                                    </Button>
                                </div>

                                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                                    {/* Search */}
                                    <div className="space-y-2">
                                        <Label className="text-secondary font-semibold">Recherche</Label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Marque ou modèle..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 border-gray-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Brand Filter */}
                                    <div className="space-y-2">
                                        <Label className="text-secondary font-semibold">Marque</Label>
                                        <select
                                            value={selectedBrand}
                                            onChange={(e) => setSelectedBrand(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option value="all">Toutes les marques</option>
                                            {brands.map(brand => (
                                                <option key={brand} value={brand}>{brand}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Fuel Type */}
                                    <div className="space-y-2">
                                        <Label className="text-secondary font-semibold">Carburant</Label>
                                        <select
                                            value={selectedFuelType}
                                            onChange={(e) => setSelectedFuelType(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option value="all">Tous types</option>
                                            {fuelTypes.map(fuel => (
                                                <option key={fuel} value={fuel}>{fuel}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Transmission */}
                                    <div className="space-y-2">
                                        <Label className="text-secondary font-semibold">Transmission</Label>
                                        <select
                                            value={selectedTransmission}
                                            onChange={(e) => setSelectedTransmission(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option value="all">Toutes</option>
                                            {transmissions.map(trans => (
                                                <option key={trans} value={trans}>{trans}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Price Range */}
                                    <div className="space-y-2">
                                        <Label className="text-secondary font-semibold">
                                            Prix Max: {priceRange[1].toLocaleString()} DZD
                                        </Label>
                                        <input
                                            type="range"
                                            min="0"
                                            max={maxPrice}
                                            step="1000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                            className="w-full accent-primary"
                                        />
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>0 DZD</span>
                                            <span>{maxPrice.toLocaleString()} DZD</span>
                                        </div>
                                    </div>

                                    {/* Reset Button */}
                                    <Button
                                        variant="outline"
                                        className="w-full border-2 border-gray-300 hover:bg-gray-100"
                                        onClick={resetFilters}
                                    >
                                        Réinitialiser
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Cars Grid */}
                    <div className="lg:col-span-3">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-muted-foreground">
                                {loading ? (
                                    <span className="text-secondary">Chargement...</span>
                                ) : (
                                    <>
                                        <span className="font-semibold text-secondary">{filteredCars.length}</span> véhicule{filteredCars.length !== 1 ? 's' : ''} trouvé{filteredCars.length !== 1 ? 's' : ''}
                                    </>
                                )}
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden border-gray-300"
                            >
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                Filtres
                            </Button>
                        </div>

                        {/* Loading State with Skeletons */}
                        {loading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <CarCardSkeleton key={i} />
                                ))}
                            </div>
                        )}

                        {/* Error State */}
                        {!loading && error && (
                            <Card className="border-red-200 bg-red-50">
                                <CardContent className="p-12 text-center">
                                    <p className="text-red-600 mb-4">{error}</p>
                                    <Button
                                        onClick={() => window.location.reload()}
                                        variant="outline"
                                        className="border-2 border-red-300 text-red-600 hover:bg-red-100"
                                    >
                                        Réessayer
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Cars Grid */}
                        {!loading && !error && filteredCars.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredCars.map((car) => (
                                    <CarCard key={car.id} car={car} />
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && !error && filteredCars.length === 0 && (
                            <Card className="border-gray-200">
                                <CardContent className="p-12 text-center">
                                    <p className="text-muted-foreground mb-4">{emptyMessage}</p>
                                    <Button onClick={resetFilters} variant="outline" className="border-2 border-secondary">
                                        Réinitialiser les filtres
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
