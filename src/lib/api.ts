import { Car, Command, CommandRequest } from "@/types";

const API_BASE_URL = "/api/proxy";
const USE_MOCK = false; // Set to false to use real API

const MOCK_CARS: Car[] = [
    {
        id: 1,
        model: "Mock Car",
        transmission: "Automatic",
        fuelType: "Gasoline",
        engine: "2.0L",
        isAvailable: "Disponible",
        location: "Algiers",
        brand_id: 1,
        brand: { id: 1, name: "Mock Brand" },
        colors: ["Black", "Silver"],
        features: [],
        images: [],
        variants: [
            {
                id: 1,
                car_model_id: 1,
                color: "Black",
                year: 2023,
                condition: "neuf",
                mileage: 0,
                price: 25000,
                taxe_price: 500,
            },
            {
                id: 2,
                car_model_id: 1,
                color: "Silver",
                year: 2022,
                condition: "occasion",
                mileage: 15000,
                price: 26000,
                taxe_price: 500,
            },
        ],
    }
];

const MOCK_COMMANDS: { [key: string]: Command } = {
    "CMD123": {
        id: 1,
        commandNumber: "CMD123",
        client_id: 1,
        car_variant_id: 1,
        color: "Black",
        partner_id: null,
        status: "Pending",
        totalPrice: 25500,
        deposit: 5000,
        price: 25000,
        delivery_price: 500,
        paymentStatus: "Pending",
        comments: null,
        deliveredAt: null,
        container_id: null,
        client: {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "123456789",
            address: "123 Mock Street",
            email: "john.doe@example.com",
            wilaya: "Algiers",
        },
        car_variant: {
            id: 1,
            car_model_id: 1,
            color: "Black",
            year: 2023,
            condition: "neuf",
            mileage: 0,
            price: 25000,
            taxe_price: 500,
            car_model: MOCK_CARS[0],
        },
        container: null,
    }
};

export async function createCommand(data: CommandRequest): Promise<void> {
    if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return;
    }
    const res = await fetch(`${API_BASE_URL}/commandes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create command");
    }
}



// Helper function to transform image URLs from API
const transformCarImages = (car: Car): Car => {
    // Use direct backend storage URL for images (not proxy) so Next.js Image optimization works
    const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || "https://sinodz-backend.ohmacore.cloud/storage";

    return {
        ...car,
        images: car.images.map(img => ({
            ...img,
            image: img.image.startsWith('http') ? img.image : `${STORAGE_BASE_URL}/${img.image}`
        }))
    };
};

export async function getCars(location?: string): Promise<Car[]> {
    if (USE_MOCK) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return MOCK_CARS;
    }

    const url = location
        ? `${API_BASE_URL}/cars?location=${encodeURIComponent(location)}`
        : `${API_BASE_URL}/cars`;

    const res = await fetch(url);
    console.log("url", url);
    if (!res.ok) throw new Error("Failed to fetch cars");
    const json = await res.json();
    const cars: Car[] = json.data || [];
    return cars.map(transformCarImages);
}

export async function getCar(id: number): Promise<Car | undefined> {
    if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_CARS.find(c => c.id === id);
    }

    const res = await fetch(`${API_BASE_URL}/cars/${id}`);
    if (!res.ok) return undefined;
    const json = await res.json();
    const car: Car = json.data || json;
    return transformCarImages(car);
}

export async function getCommand(commandNumber: string): Promise<Command | null> {
    if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return MOCK_COMMANDS[commandNumber] || null;
    }

    const res = await fetch(`${API_BASE_URL}/commandes/${commandNumber}`);
    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch command");
    }
    return res.json();
}
