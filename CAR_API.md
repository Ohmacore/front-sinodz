# Car API Documentation

This document outlines the API endpoints available for accessing car-related data in the application.

## Base URL

All API endpoints are prefixed with `/api`.

---

## Endpoints

### 1. List Available Cars

Retrieves a list of all cars that are currently marked as available.

- **URL:** `/cars`
- **Method:** `GET`
- **Auth Required:** No

#### Query Parameters

None.

#### Success Response

- **Code:** `200 OK`
- **Content:** JSON array of car objects.

**Example Response:**

```json
[
  {
    "id": 1,
    "model": "Camry",
    "year": 2023,
    "color": "Silver",
    "transmission": "automatic",
    "fuelType": "hybrid",
    "engine": "2.5L 4-Cylinder",
    "mileage": 15000,
    "price": 28000.00,
    "delivery_price": 500.00,
    "features": [
      {
        "id": 1,
        "name": "Bluetooth",
        "description": "Wireless connectivity",
        "created_at": "...",
        "updated_at": "..."
      },
      {
        "id": 2,
        "name": "Backup Camera",
        "description": "Rear view camera",
        "created_at": "...",
        "updated_at": "..."
      }
    ],
    "isAvailable": 1,
    "location": "Algiers",
    "created_at": "2023-10-27T10:00:00.000000Z",
    "updated_at": "2023-10-27T10:00:00.000000Z",
    "brand_id": 5,
    "brand": {
      "id": 5,
      "name": "Toyota",
      "created_at": "...",
      "updated_at": "..."
    },
    "images": [
      {
        "id": 10,
        "car_model_id": 1,
        "image": "cars/camry_front.jpg",
        "order": 1,
        "created_at": "...",
        "updated_at": "..."
      }
    ]
  }
]
```

#### Field Descriptions

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Unique identifier for the car. |
| `model` | String | The model name of the car. |
| `year` | Integer | Manufacturing year. |
| `color` | String | Exterior color of the car. |
| `transmission` | String | Type of transmission (automatic, manual). |
| `fuelType` | String | Type of fuel (gasoline, diesel, electric, hybrid). |
| `engine` | String | Engine specifications. |
| `mileage` | Integer | Current mileage of the car. |
| `price` | Decimal | Selling price of the car. |
| `delivery_price` | Decimal | Cost for delivery. |
| `features` | Array | List of related Feature objects. |
| `isAvailable` | Boolean | Availability status (1 for available, 0 for unavailable). |
| `location` | String | Current location of the car. |
| `brand` | Object | Details of the car's brand. |
| `images` | Array | List of associated images. |

---

### 2. Get Commande Details

Retrieves details of a specific order (Commande) by its command number.

- **URL:** `/commandes/{commandNumber}`
- **Method:** `GET`
- **Auth Required:** No

#### URL Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `commandNumber` | String | The unique command number (e.g., CMD-20231027-001). |

#### Success Response

- **Code:** `200 OK`
- **Content:** JSON object representing the commande.

**Example Response:**

```json
{
  "id": 1,
  "commandNumber": "CMD-20231027-001",
  "client_id": 10,
  "car_model_id": 5,
  "status": "pending",
  "totalPrice": 30000.00,
  "deposit": 5000.00,
  "price": 28000.00,
  "delivery_price": 2000.00,
  "paymentStatus": "partial",
  "comments": "Customer requested expedited delivery.",
  "deliveredAt": null,
  "container_id": null,
  "created_at": "...",
  "updated_at": "...",
  "client": {
    "id": 10,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "carModel": {
    "id": 5,
    "model": "Camry",
    "brand_id": 5
    // ... other car details
  },
  "container": null
}
```

#### Error Response

- **Code:** `404 Not Found`
- **Content:** `{ "message": "Commande not found" }`

---
