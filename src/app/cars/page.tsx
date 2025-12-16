import { getCars } from "@/lib/api";
import CarsClient from "@/components/cars/CarsClient";

export default async function AllCarsPage() {
    const cars = await getCars();
    return <CarsClient cars={cars} />;
}
