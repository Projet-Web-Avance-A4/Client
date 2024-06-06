import { Address } from "./address";

export interface Customer {
    id_customer : number;

    name_customer : string;

    email_customer : string;

    phone_customer : number;

    address_customer : Address;
}