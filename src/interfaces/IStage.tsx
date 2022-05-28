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

export interface IStage {
    description: string | null;
    heat: number;
    mix: number;
    duration: number;
    ingredients: Ingredient[];
}

export interface Recipe {
    _id?: {
        $oid: string;
    };
    imageURL: string,
    description: string,
    stages: IStage[];
    displayName: string;
}