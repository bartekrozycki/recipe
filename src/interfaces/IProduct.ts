export interface Product {
    _id: {
        $oid: string;
    };
    displayName: string;
    price: number;
    amount: number;
    unit: "ml" | "pcs" | "g";
}