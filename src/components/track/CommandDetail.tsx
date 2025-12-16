"use client";

import { Command } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Package,
    Truck,
    CheckCircle,
    Clock,
    CreditCard,
    User,
    Car,
    MapPin,
    Ship,
    Calendar,
    ArrowLeft,
    AlertCircle,
    FileText
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface CommandDetailProps {
    command: Command;
}

const getStatusConfig = (status: string) => {
    const statusLower = status.toLowerCase();

    if (statusLower === "delivered" || statusLower === "livré") {
        return { color: "bg-green-500", text: "Livré", icon: CheckCircle, progress: 100 };
    } else if (statusLower === "arrived" || statusLower === "arrivé") {
        return { color: "bg-green-600", text: "Arrivé", icon: Package, progress: 80 };
    } else if (statusLower === "in shipping" || statusLower === "en transit" || statusLower === "shipping") {
        return { color: "bg-blue-500", text: "En Transit", icon: Truck, progress: 60 };
    } else if (statusLower === "purchased" || statusLower === "acheté") {
        return { color: "bg-purple-500", text: "Acheté", icon: Package, progress: 40 };
    } else if (statusLower === "confirmed" || statusLower === "confirmé") {
        return { color: "bg-indigo-500", text: "Confirmé", icon: CheckCircle, progress: 30 };
    } else if (statusLower === "pending" || statusLower === "en attente") {
        return { color: "bg-yellow-500", text: "En Attente", icon: Clock, progress: 10 };
    } else if (statusLower === "cancelled" || statusLower === "annulé") {
        return { color: "bg-red-500", text: "Annulé", icon: AlertCircle, progress: 0 };
    }

    return { color: "bg-gray-500", text: status, icon: Package, progress: 0 };
};

const getPaymentStatusConfig = (status: string) => {
    const statusLower = status.toLowerCase();

    if (statusLower === "paid" || statusLower === "payé" || statusLower === "full") {
        return { color: "bg-green-500", text: "Payé" };
    } else if (statusLower === "partial" || statusLower === "partiel") {
        return { color: "bg-orange-500", text: "Partiel" };
    } else if (statusLower === "unpaid" || statusLower === "non payé") {
        return { color: "bg-red-500", text: "Non Payé" };
    }

    return { color: "bg-gray-500", text: status };
};

export function CommandDetail({ command }: CommandDetailProps) {
    const statusConfig = getStatusConfig(command.status);
    const paymentConfig = getPaymentStatusConfig(command.paymentStatus);
    const StatusIcon = statusConfig.icon;

    const balance = command.totalPrice - command.deposit;
    const progress = (command.deposit / command.totalPrice) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Header */}
            <section className="bg-secondary text-white pt-32 pb-12">
                <div className="container mx-auto px-4">
                    <Button
                        variant="ghost"
                        className="text-white hover:bg-white/10 mb-6"
                        asChild
                    >
                        <Link href="/track">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour à la recherche
                        </Link>
                    </Button>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-gray-400 mb-2">Numéro de commande</p>
                            <h1 className="text-4xl md:text-5xl font-bold text-white">
                                {command.commandNumber}
                            </h1>
                        </div>
                        <Badge className={`${statusConfig.color} text-white px-6 py-3 text-lg flex items-center gap-2 w-fit`}>
                            <StatusIcon className="h-5 w-5" />
                            {statusConfig.text}
                        </Badge>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Status Timeline */}
                        <Card className="border-gray-200 shadow-elegant-lg animate-fade-in">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5 text-primary" />
                                    Suivi de commande
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative pt-8 pb-4">
                                    {/* Progress Bar */}
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-1000"
                                            style={{
                                                width: `${statusConfig.progress}%`
                                            }}
                                        />
                                    </div>

                                    {/* Timeline Steps */}
                                    <div className="flex justify-between text-xs mt-4">
                                        <div className="flex flex-col items-center gap-2 flex-1">
                                            <div className={`p-3 rounded-full ${statusConfig.progress >= 30 ? "bg-primary text-white" : "bg-gray-200 text-gray-400"}`}>
                                                <Package className="h-6 w-6" />
                                            </div>
                                            <span className={`font-medium text-center ${statusConfig.progress >= 30 ? "text-primary" : "text-gray-400"}`}>
                                                Confirmé
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 flex-1">
                                            <div className={`p-3 rounded-full ${statusConfig.progress >= 60 ? "bg-primary text-white" : "bg-gray-200 text-gray-400"}`}>
                                                <Truck className="h-6 w-6" />
                                            </div>
                                            <span className={`font-medium text-center ${statusConfig.progress >= 60 ? "text-primary" : "text-gray-400"}`}>
                                                En Transit
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 flex-1">
                                            <div className={`p-3 rounded-full ${statusConfig.progress >= 100 ? "bg-primary text-white" : "bg-gray-200 text-gray-400"}`}>
                                                <CheckCircle className="h-6 w-6" />
                                            </div>
                                            <span className={`font-medium text-center ${statusConfig.progress >= 100 ? "text-primary" : "text-gray-400"}`}>
                                                Livré
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Dates */}
                                <Separator className="my-6" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Date de commande</p>
                                        <p className="font-medium">{formatDate(command.created_at || "")}</p>
                                    </div>
                                    {command.deliveredAt && (
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Date de livraison</p>
                                            <p className="font-medium">{formatDate(command.deliveredAt)}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Vehicle Information */}
                        <Card className="border-gray-200 shadow-elegant-lg animate-fade-in" style={{ animationDelay: "100ms" }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Car className="h-5 w-5 text-primary" />
                                    Informations du véhicule
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-secondary">
                                            {command.car_model.brand.name} {command.car_model.model}
                                        </h3>
                                        <p className="text-muted-foreground">Année {command.car_model.year}</p>
                                    </div>

                                    <Separator />

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Couleur</p>
                                            <p className="font-medium">{command.car_model.color}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Transmission</p>
                                            <p className="font-medium capitalize">{command.car_model.transmission}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Carburant</p>
                                            <p className="font-medium capitalize">{command.car_model.fuelType}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Moteur</p>
                                            <p className="font-medium">{command.car_model.engine}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Kilométrage</p>
                                            <p className="font-medium">{command.car_model.mileage.toLocaleString()} km</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Localisation</p>
                                            <p className="font-medium">{command.car_model.location}</p>
                                        </div>
                                    </div>

                                    <Separator />


                                </div>
                            </CardContent>
                        </Card>

                        {/* Shipping Information */}
                        {command.container && (
                            <Card className="border-gray-200 shadow-elegant-lg animate-fade-in" style={{ animationDelay: "200ms" }}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Ship className="h-5 w-5 text-primary" />
                                        Informations d'expédition
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                                            <p className="text-sm text-muted-foreground mb-1">Code conteneur</p>
                                            <p className="text-xl font-bold text-primary">{command.container.code}</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        Départ estimé
                                                    </p>
                                                    <p className="font-medium">{formatDate(command.container.estimated_departure)}</p>
                                                </div>
                                                {command.container.actual_departure && (
                                                    <div>
                                                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            Départ réel
                                                        </p>
                                                        <p className="font-medium text-green-600">{formatDate(command.container.actual_departure)}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        Arrivée estimée
                                                    </p>
                                                    <p className="font-medium">{formatDate(command.container.estimated_arrival)}</p>
                                                </div>
                                                {command.container.actual_arrival && (
                                                    <div>
                                                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            Arrivée réelle
                                                        </p>
                                                        <p className="font-medium text-green-600">{formatDate(command.container.actual_arrival)}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Comments */}
                        {command.comments && (
                            <Card className="border-gray-200 shadow-elegant-lg animate-fade-in" style={{ animationDelay: "300ms" }}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-primary" />
                                        Notes et commentaires
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                        <p className="text-secondary">{command.comments}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column - Summary Cards */}
                    <div className="space-y-6">
                        {/* Payment Summary */}
                        <Card className="border-gray-200 shadow-elegant-lg animate-fade-in" style={{ animationDelay: "400ms" }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-primary" />
                                    Résumé des paiements
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Badge className={`${paymentConfig.color} text-white mb-4`}>
                                        {paymentConfig.text}
                                    </Badge>

                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Prix total</span>
                                            <span className="font-semibold">{command.totalPrice.toLocaleString()} DZD</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Acompte versé</span>
                                            <span className="font-semibold text-green-600">{command.deposit.toLocaleString()} DZD</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between text-lg">
                                            <span className="font-semibold">Solde restant</span>
                                            <span className="font-bold text-primary">{balance.toLocaleString()} DZD</span>
                                        </div>
                                    </div>

                                    {/* Payment Progress Bar */}
                                    <div className="mt-4">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-muted-foreground">Progression</span>
                                            <span className="font-medium">{Math.round(progress)}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Client Information */}
                        <Card className="border-gray-200 shadow-elegant-lg animate-fade-in" style={{ animationDelay: "500ms" }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    Informations client
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Nom complet</p>
                                    <p className="font-medium">{command.client.firstName} {command.client.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                                    <p className="font-medium text-sm">{command.client.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Téléphone</p>
                                    <p className="font-medium">{command.client.phoneNumber}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        Adresse
                                    </p>
                                    <p className="font-medium text-sm">{command.client.address}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{command.client.wilaya}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
