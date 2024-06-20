import { Address } from "./address";

export interface Customer {
    customer_id : number;

    name : string;

    email : string;

    phone : number;

    address : Address;
}