import CarsClient from "@/components/cars/CarsClient";

export default function ImportCarsPage() {
    // Don't fetch at build time - let CarsClient fetch on the client side
    return <CarsClient
        location="Chine"
        pageTitle="Véhicules pour Importation"
        pageDescription="Découvrez notre sélection de véhicules disponibles à l'importation depuis la Chine"
        emptyMessage="Aucun véhicule disponible à l'importation pour le moment"
    />;
}
