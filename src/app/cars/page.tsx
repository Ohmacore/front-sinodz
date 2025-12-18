import CarsClient from "@/components/cars/CarsClient";

export default function AllCarsPage() {
    // Don't fetch at build time - let CarsClient fetch on the client side
    // This allows the build to succeed without the backend being available
    return <CarsClient />;
}
