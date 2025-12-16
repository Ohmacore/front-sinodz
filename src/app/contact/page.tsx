"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone, MessageCircle, Clock, Send } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/layout/Logo";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Contact form submitted:", formData);
        setSubmitted(true);
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Header Section */}
            <section className="bg-secondary text-white pt-32 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contactez-Nous</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Notre équipe est à votre disposition pour répondre à toutes vos questions
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="p-6">


                                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="p-3 bg-primary/10 rounded-xl">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary mb-2">Téléphone</h3>
                                        <a
                                            href="tel:+213552114854"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            +213 552 11 48 54
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="p-3 bg-red-500/10 rounded-xl">
                                        <MessageCircle className="h-6 w-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary mb-2">WhatsApp</h3>
                                        <a
                                            href="https://wa.me/213552114854"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-muted-foreground hover:text-green-500 transition-colors"
                                        >
                                            +213 552 11 48 54
                                        </a>
                                    </div>
                                </div>


                                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="p-3 bg-primary/10 rounded-xl">
                                        <Mail className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary mb-2">Email</h3>
                                        <a
                                            href="mailto:sinodz.import@gmail.com"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            sinodz.import@gmail.com
                                        </a>
                                    </div>
                                </div>


                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-xl">
                                        <Clock className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary mb-2">Horaires</h3>
                                        <div className="text-sm text-muted-foreground space-y-1">
                                            <p>dimanche - jeudi: 9h - 20h</p>
                                            <p>Vendredi: Fermé</p>
                                            <p>Samedi: 9h - 14h</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <div className="space-y-3">
                            <Button
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md"
                                asChild
                            >
                                <a href="https://wa.me/213552114854" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                    <MessageCircle className="h-5 w-5" />
                                    Discuter sur WhatsApp
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-black font-semibold"
                                asChild
                            >
                                <a href="tel:+213552114854" className="flex items-center justify-center gap-2">
                                    <Phone className="h-5 w-5" />
                                    Appeler Maintenant
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="border-gray-200 shadow-lg">
                            <CardContent className="p-8">
                                {submitted ? (
                                    <div className="text-center py-12">
                                        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full">
                                            <Send className="h-8 w-8 text-green-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-secondary mb-2">Message Envoyé!</h3>
                                        <p className="text-muted-foreground">
                                            Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais.
                                        </p>
                                        <Button
                                            onClick={() => setSubmitted(false)}
                                            variant="outline"
                                            className="mt-6 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white"
                                        >
                                            Envoyer un Autre Message
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold text-secondary mb-6">Envoyez-nous un Message</h2>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name" className="text-secondary font-semibold">Nom Complet</Label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="border-gray-300 focus:border-primary focus:ring-primary"
                                                        placeholder="Votre nom"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-secondary font-semibold">Email</Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        className="border-gray-300 focus:border-primary focus:ring-primary"
                                                        placeholder="votre.email@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone" className="text-secondary font-semibold">Téléphone</Label>
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                        className="border-gray-300 focus:border-primary focus:ring-primary"
                                                        placeholder="+213 555 123 456"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="subject" className="text-secondary font-semibold">Sujet</Label>
                                                    <Input
                                                        id="subject"
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        required
                                                        className="border-gray-300 focus:border-primary focus:ring-primary"
                                                        placeholder="Objet de votre message"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="message" className="text-secondary font-semibold">Message</Label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows={6}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                                    placeholder="Décrivez votre demande..."
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-md"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "Envoi en cours..." : "Envoyer le Message"}
                                            </Button>
                                        </form>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-16 max-w-7xl mx-auto">
                    <Card className="border-gray-200 shadow-lg overflow-hidden">
                        <CardContent className="p-0">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.8!2d3.0!3d36.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQyJzAwLjAiTiAzwrAwMCcwMC4wIkU!5e0!3m2!1sen!2sdz!4v1234567890"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full"
                            ></iframe>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
