import { Car, Command, CommandRequest } from "@/types";

const API_BASE_URL = "/api/proxy";
const USE_MOCK = false; // Set to false to use real API

const MOCK_CARS: Car[] = [
    {
        id: 1,
        model: "Mock Car",
        year: 2023,
        color: "Black",
        transmission: "Automatic",
        fuelType: "Gasoline",
        engine: "2.0L",
        mileage: 10000,
        price: 25000,
        delivery_price: 500,
        features: [],
        isAvailable: 1,
        location: "Algiers",
        brand_id: 1,
        brand: { id: 1, name: "Mock Brand" },
        images: [],
    }
];

const MOCK_COMMANDS: { [key: string]: Command } = {
    "CMD123": {
        id: 1,
        commandNumber: "CMD123",
        client_id: 1,
        car_model_id: 1,
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
        car_model: MOCK_CARS[0],
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
    // Use environment variable or fallback to localhost
    // For production or network access, set NEXT_PUBLIC_STORAGE_URL to your server's IP
    const STORAGE_BASE_URL = "/storage/proxy";

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

    // Assuming there's an endpoint for single car, or we filter from list if not
    // The docs didn't explicitly show GET /cars/{id}, but it's standard. 
    // If not, we might need to fetch all and find.
    // For now, let's try a direct fetch if real API existed.
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
