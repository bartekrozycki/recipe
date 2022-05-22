export interface Product {
    uid: number;
    displayName: string;
    price: number;
    amount: number;
    unit: string;
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