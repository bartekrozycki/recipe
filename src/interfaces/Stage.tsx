export interface Product {
    _id: {
        $oid: string;
    };
    displayName: string;
    price: number;
    amount: number;
    unit: "ml" | "pcs" | "g";
}

export interface Ingredient {
    product: Product;
    amount: number;
}

export interface Stage {
    description: string | null;
    heat: number;
    mix: number;
    duration: number;
    ingredients: Ingredient[];
}

export interface Recipe {
    stages: Stage[];
    displayName: string;
}