export interface Brand {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Feature {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface CarImage {
  id: number;
  car_model_id: number;
  image: string;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Car {
  id: number;
  model: string;
  year: number;
  color: string;
  transmission: string;
  fuelType: string;
  engine: string;
  mileage: number;
  price: number;
  delivery_price: number;
  features: Feature[];
  isAvailable: number | boolean; // API says 1, but boolean is easier to work with if transformed
  location: string;
  created_at?: string;
  updated_at?: string;
  brand_id: number;
  brand: Brand;
  images: CarImage[];
}

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  wilaya: string;
  created_at?: string;
  updated_at?: string;
}

export interface SocieteMaritime {
  id: number;
  name?: string;
}

export interface Container {
  id: number;
  code: string;
  societe_maritime_id: number;
  estimated_departure: string;
  estimated_arrival: string;
  actual_departure: string | null;
  actual_arrival: string | null;
  created_at?: string;
  updated_at?: string;
  societe_maritime?: SocieteMaritime;
}

export interface Command {
  id: number;
  commandNumber: string;
  client_id: number;
  car_model_id: number;
  status: string;
  totalPrice: number;
  deposit: number;
  price: number;
  delivery_price: number;
  paymentStatus: string;
  comments: string | null;
  deliveredAt: string | null;
  container_id: number | null;
  created_at?: string;
  updated_at?: string;
  client: Client;
  car_model: Car;
  container: Container | null;
}

export interface CommandRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  wilaya: string;
  vehicule_id: number;
}
