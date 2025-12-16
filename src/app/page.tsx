import { getCars } from "@/lib/api";
import HomeClient from "@/components/home/HomeClient";

export default async function Home() {
  const importCars = await getCars("Chine");
  const stockCars = await getCars("Algérie");

  return <HomeClient importCars={importCars} stockCars={stockCars} />;
}
