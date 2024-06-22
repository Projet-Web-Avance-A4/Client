export interface Payment {
    method: string;

    transaction_id: number;
    
    amount: number;

    currency: string;

    payment_time: Date;
}