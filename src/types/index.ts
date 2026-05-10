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
}

export interface CarImage {
  id: number;
  car_model_id: number;
  image: string;
  order: number;
}

export interface CarVariant {
  id: number;
  car_model_id: number;
  color: string;
  year: number;
  condition: string;
  mileage: number;
  price: number;
  taxe_price: number;
  created_at?: string;
  updated_at?: string;
}

export interface Car {
  id: number;
  model: string;
  transmission: string;
  fuelType: string;
  engine: string;
  isAvailable: string;
  location: string;
  created_at?: string;
  updated_at?: string;
  brand_id: number;
  brand: Brand;
  colors: string[];
  features: Feature[];
  images: CarImage[];
  variants: CarVariant[];
}

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address?: string;
  email?: string;
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
  car_variant_id: number;
  color: string | null;
  partner_id: number | null;
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
  car_variant: CarVariant & {
    car_model?: Car;
  };
  container: Container | null;
}

export interface CommandRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  wilaya: string;
  car_variant_id: number;
  address?: string;
  color?: string;
  partner_code?: string;
}
