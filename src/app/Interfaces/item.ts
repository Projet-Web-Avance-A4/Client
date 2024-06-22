export interface Item {
    category?: number;
    id_dish?: number;
    id_menu?: number;
    id_article?: number;
    name_menu?: string;
    name_article?: string;
    price_menu?: number;
    price_article?: number;
    [key: string]: any; // Pour des propriétés supplémentaires non définies explicitement
}