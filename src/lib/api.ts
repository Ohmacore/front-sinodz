import { Car, Command, CommandRequest } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://10.1.1.101:8000/api";
const USE_MOCK = false; // Set to false to use real API

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
    const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || "http://127.0.0.1:8000/storage";

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
