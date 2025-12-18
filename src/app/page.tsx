import HomeClient from "@/components/home/HomeClient";

export default function Home() {
  // Don't fetch at build time - let HomeClient fetch on the client side
  // This allows the build to succeed without the backend being available
  return <HomeClient />;
}
