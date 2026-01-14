import CarsClient from "@/components/cars/CarsClient";

export default function StockCarsPage() {
    // Don't fetch at build time - let CarsClient fetch on the client side
    return <CarsClient
        location="Algérie"
        pageTitle="Véhicules en Stock"
        pageDescription="Véhicules déjà importés en Algérie, disponibles immédiatement"
        emptyMessage="Aucun véhicule en stock pour le moment"
    />;
}
