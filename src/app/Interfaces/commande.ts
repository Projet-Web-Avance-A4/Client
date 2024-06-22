import { Customer } from "./customer";
import { Deliverer } from "./deliverer";
import { Item } from "./item";
import { Payment } from "./payment";
import { Restaurant } from "./restaurant";

export interface Commande {
    order_id: number;

    customer : Customer;

    restaurant : Restaurant;

    items : Item[];

    total_price : number;

    order_status : string;

    verification_code : number;

    payment : Payment;

    deliverer : Deliverer;
}