"use client";

import { Button, Chip, Input, Spinner } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart.context";
import { UserContext } from "../contexts/user.context";
import { decodeAccessToken } from "./utils";

export default function Validation() {
    const [loading, setLoading] = useState<boolean>(false);
    const [isOrderPayed, setOrder] = useState<boolean>(false);

    const { cart, clearCart } = useContext(CartContext);

    async function validatePayment() {
        const accessToken = localStorage.getItem('accessToken')
        const userData = decodeAccessToken(accessToken)
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        setLoading(false);
        setOrder(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        await fetch('http://localhost:4000/order/creation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userData, cart })
        })
        clearCart();
        window.location.assign('accueil');
    }



    return (
        <div>
            {!loading && !isOrderPayed && (
                <div>
                    <Input label="Nom" placeholder="Entrer votre nom" />
                    <Input label="Carte" placeholder="Entrer votre numéro de carte" />
                    <Input label="Date" placeholder="Entrer la date d'expiration de votre carte" />
                    <Input label="CCV" placeholder="Entrer le CCV de votre carte" />
                    <Button onClick={validatePayment}>Valider le paiement</Button>
                </div>
            )}
            {loading && !isOrderPayed && (
                <Spinner size="lg" />
            )}
            {isOrderPayed && (
                <Chip size="lg">Commande payée et validée</Chip>
            )}

        </div>
    )
}