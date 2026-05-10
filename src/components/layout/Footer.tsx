import Link from "next/link";
import { ShipIcon } from "../icons/ShipIcon";
import { Logo } from "./Logo";

export function Footer() {
    return (
        <footer className="border-t bg-secondary text-white py-12">
            <div className="container mx-auto px-4 grid gap-8 md:grid-cols-4">
                <div className="space-y-4">
                    <div className="text-white">
                        <Logo />
                    </div>
                    <p className="text-sm text-gray-300">
                        Service d'importation de véhicules premium. Nous livrons la voiture de vos rêves à votre porte.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-4">Liens Rapides</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/cars" className="text-gray-300 hover:text-primary transition-colors">Véhicules Disponibles</Link></li>
                        <li><Link href="/track" className="text-gray-300 hover:text-primary transition-colors">Suivi Commande</Link></li>
                        <li><Link href="#" className="text-gray-300 hover:text-primary transition-colors">À Propos</Link></li>
                        <li><Link href="#" className="text-gray-300 hover:text-primary transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li>Alger, Algérie</li>
                        <li>contact@sinodz.com</li>
                        <li>+213 552 11 48 54</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-4">Horaires</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li>Lun - Ven: 9h - 18h</li>
                        <li>Samedi: 9h - 14h</li>
                        <li>Dimanche: Fermé</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} SinoDz Import/Export. Tous droits réservés.</p>
            </div>
        </footer>
    );
}
