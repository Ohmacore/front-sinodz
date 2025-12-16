import { getCars } from "@/lib/api";
import CarsClient from "@/components/cars/CarsClient";

export default async function StockCarsPage() {
    const cars = await getCars("algeria");

    return <CarsClient
        cars={cars}
        pageTitle="Véhicules en Stock"
        pageDescription="Véhicules déjà importés en Algérie, disponibles immédiatement"
        emptyMessage="Aucun véhicule en stock pour le moment"
    />;
}
