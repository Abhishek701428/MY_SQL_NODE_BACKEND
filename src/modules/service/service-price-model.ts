export interface ServicePriceOption {
    id?: number;
    serviceId: number;
    duration: string;
    price: number;
    type: "Hourly" | "Weekly" | "Monthly";
}
