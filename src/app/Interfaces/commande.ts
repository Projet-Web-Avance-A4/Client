import { Customer } from "./customer";
import { Deliverer } from "./deliverer";
import { Item } from "./item";
import { Payment } from "./payment";
import { Restaurant } from "./restaurant";

export interface Commande {
    id_order: number;

    customer : Customer;

    restaurant : Restaurant;

    items : Item[];

    price : number;

    status_order : string;

    verification_code : number;

    estimated_delivery_time : Date;

    payment : Payment;

    deliverer : Deliverer;
}