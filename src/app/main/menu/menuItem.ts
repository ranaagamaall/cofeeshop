export interface menuItem extends Record<string, any>{
    id: number;
    image: string;
    name: string;
    price: number;
    description?: string;
}