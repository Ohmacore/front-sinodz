"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { createCommand } from "@/lib/api";
import { CommandRequest, CarVariant } from "@/types";

interface OrderFormProps {
    carModel: string;
    variants: CarVariant[];
    colors: string[];
    selectedVariant: CarVariant | null;
    onVariantChange: (variant: CarVariant) => void;
}

const WILAYAS = [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar",
    "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers",
    "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
    "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh",
    "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued",
    "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
    "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès",
    "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Meniaa"
];

function formatCondition(condition: string) {
    if (!condition) return "";
    const c = condition.toLowerCase().replace(/_/g, ' ');
    if (c.includes('new') && c.includes('3')) return 'Nouvelle -3 ans';
    if (c.includes('used') && c.includes('3')) return 'Occasion -3 ans';
    if (c === 'new' || c === 'neuf' || c === 'nouvelle') return 'Nouvelle';
    if (c === 'used' || c === 'occasion') return 'Occasion';
    return condition.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function OrderForm({ carModel, variants, colors, selectedVariant, onVariantChange }: OrderFormProps) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        wilaya: "",
        address: "",
        color: "",
        partnerCode: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Auto-select color from selected variant
    useEffect(() => {
        if (selectedVariant && !formData.color) {
            setFormData(prev => ({ ...prev, color: selectedVariant.color }));
        }
    }, [selectedVariant]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedVariant) {
            setError("Veuillez sélectionner une variante.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const commandData: CommandRequest = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phone,
                wilaya: formData.wilaya,
                car_variant_id: selectedVariant.id,
                ...(formData.address && { address: formData.address }),
                ...(formData.color && { color: formData.color }),
                ...(formData.partnerCode && { partner_code: formData.partnerCode }),
            };

            await createCommand(commandData);
            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'envoi de votre commande");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (submitted) {
        return (
            <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-green-700 mb-2">Demande Envoyée !</h3>
                    <p className="text-green-800">
                        Merci pour votre intérêt pour la {carModel}. Notre équipe vous contactera très bientôt.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
                <CardTitle className="text-secondary">Commander ce Véhicule</CardTitle>
                <CardDescription>Remplissez le formulaire ci-dessous et nous vous recontacterons.</CardDescription>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-4 text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-gray-700">Prénom</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="bg-white border-gray-300 text-gray-900 focus:border-secondary focus:ring-secondary"
                                placeholder="Votre Prenom"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-gray-700">Nom</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="bg-white border-gray-300 text-gray-900 focus:border-secondary focus:ring-secondary"
                                placeholder="Votre Nom"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700">Numéro de Téléphone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="bg-white border-gray-300 text-gray-900 focus:border-secondary focus:ring-secondary"
                            placeholder="votre numéro"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="wilaya" className="text-gray-700">Wilaya</Label>
                            <select
                                id="wilaya"
                                name="wilaya"
                                value={formData.wilaya}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                            >
                                <option value="" className="text-gray-500">Sélectionnez votre wilaya...</option>
                                {WILAYAS.map((wilaya) => (
                                    <option key={wilaya} value={wilaya} className="text-gray-900">
                                        {wilaya}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-gray-700">Adresse</Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="bg-white border-gray-300 text-gray-900 focus:border-secondary focus:ring-secondary"
                                placeholder="15 Rue Didouche Mourad"
                            />
                        </div>
                    </div>

                    {/* Variant Selector */}
                    {variants.length > 0 && (
                        <div className="space-y-2">
                            <Label className="text-gray-700">Variante</Label>
                            <select
                                value={selectedVariant?.id || ""}
                                onChange={(e) => {
                                    const variant = variants.find(v => v.id === parseInt(e.target.value));
                                    if (variant) {
                                        onVariantChange(variant);
                                        setFormData(prev => ({ ...prev, color: variant.color }));
                                    }
                                }}
                                required
                                className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                            >
                                <option value="">Sélectionnez un véhicule...</option>
                                {variants.map((variant) => (
                                    <option key={variant.id} value={variant.id}>
                                        {formatCondition(variant.condition)} · {variant.year} · {variant.color} · {variant.mileage.toLocaleString()} km — {variant.price.toLocaleString()} DZD
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Color Selector */}
                    {colors.length > 0 && (
                        <div className="space-y-2">
                            <Label htmlFor="color" className="text-gray-700">Couleur </Label>
                            <select
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                            >
                                <option value="">Sélectionnez une couleur...</option>
                                {colors.map((color) => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Partner Code */}
                    <div className="space-y-2">
                        <Label htmlFor="partnerCode" className="text-gray-700">Code Partenaire <span className="text-muted-foreground text-xs">(optionnel)</span></Label>
                        <Input
                            id="partnerCode"
                            name="partnerCode"
                            value={formData.partnerCode}
                            onChange={handleChange}
                            className="bg-white border-gray-300 text-gray-900 focus:border-secondary focus:ring-secondary"
                            placeholder="Ex: P8X9A2FD"
                            maxLength={8}
                        />
                    </div>

                    {/* Summary */}
                    {selectedVariant && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-muted-foreground mb-2 font-semibold">Récapitulatif</p>
                            <div className="flex justify-between items-center">
                                <span className="text-secondary font-medium">{carModel} — {selectedVariant.color}</span>
                                <span className="font-bold text-secondary">{selectedVariant.price.toLocaleString()} DZD</span>
                            </div>
                        </div>
                    )}

                    <Button type="submit" size="lg" className="w-full text-lg bg-secondary hover:bg-secondary/90 text-white" disabled={isSubmitting || !selectedVariant}>
                        {isSubmitting ? "Envoi en cours..." : "Envoyer la Demande"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
