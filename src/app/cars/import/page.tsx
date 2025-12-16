import { getCars } from "@/lib/api";
import CarsClient from "@/components/cars/CarsClient";

export default async function ImportCarsPage() {
    const cars = await getCars("Chine");

    return <CarsClient
        cars={cars}
        pageTitle="Véhicules pour Importation"
        pageDescription="Découvrez notre sélection de véhicules disponibles à l'importation depuis la Chine"
        emptyMessage="Aucun véhicule disponible à l'importation pour le moment"
    />;
}
