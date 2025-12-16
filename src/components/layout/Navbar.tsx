"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Accueil", href: "/" },
    {
        name: "Véhicules",
        href: "/cars",
        subItems: [
            { name: "Pour Importation", href: "/cars/import" },
            { name: "En Stock (Algérie)", href: "/cars/stock" },
        ]
    },
    { name: "Suivi Commande", href: "/track" },
    { name: "Contactez-nous", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed w-full z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/90 backdrop-blur-md shadow-md py-2"
                    : "bg-white py-4"
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Logo className="h-10 w-auto transition-transform group-hover:scale-105" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.subItems ? (
                                    <button
                                        className="flex items-center gap-1 text-sm font-medium text-secondary hover:text-primary transition-colors py-2"
                                    >
                                        {item.name}
                                        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-sm font-medium text-secondary hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-0.5 after:bg-primary after:transition-all group-hover:after:w-full"
                                    >
                                        {item.name}
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                {item.subItems && (
                                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 w-56 overflow-hidden">
                                            {item.subItems.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="block px-4 py-3 text-sm text-secondary hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <Button className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105" asChild>
                            <Link href="/cars/import">
                                Commander
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-secondary hover:text-primary transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl animate-slide-up">
                        <div className="flex flex-col p-4 space-y-2">
                            {navItems.map((item) => (
                                <div key={item.name}>
                                    {item.subItems ? (
                                        <div>
                                            <button
                                                onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                                                className="flex items-center justify-between w-full p-3 text-secondary font-medium hover:bg-gray-50 rounded-lg"
                                            >
                                                {item.name}
                                                <ChevronDown className={cn("h-4 w-4 transition-transform", activeSubmenu === item.name && "rotate-180")} />
                                            </button>
                                            {activeSubmenu === item.name && (
                                                <div className="pl-4 mt-1 space-y-1 border-l-2 border-gray-100 ml-3">
                                                    {item.subItems.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className="block p-3 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="block p-3 text-secondary font-medium hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="pt-4 mt-2 border-t border-gray-100">
                                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold" asChild>
                                    <Link href="/cars/import" onClick={() => setIsOpen(false)}>
                                        Commander un Véhicule
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
