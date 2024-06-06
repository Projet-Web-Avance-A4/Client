export interface Payment {
    id_payment: string;

    amount: string;

    currency: string;

    method: string;

    time_payment: Date;
}