import { CarDetailsClient } from "@/components/cars/CarDetailsClient";

interface CarDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
    const { id } = await params;

    return <CarDetailsClient carId={parseInt(id)} />;
}
