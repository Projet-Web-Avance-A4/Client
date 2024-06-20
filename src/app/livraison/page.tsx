"use client";

import { Card, CardBody, Divider } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { Commande } from "../Interfaces/commande";
import React from "react";
import { Spinner } from "@nextui-org/react";
import { useHeader } from "../contexts/header.context";
import { UserContext } from "../contexts/user.context";
import { decodeAccessToken } from "./utils";

const LivraisonPage = () => {
    const [order, setOrder] = useState<Commande>();

    const { setShowMyAccount } = useHeader();

    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem('myItem');
        // ...
    } else {
        // Gérer le cas où localStorage n'est pas disponible (côté serveur)
        console.warn('localStorage is not available in this environment');
    }

    useEffect(() => {
        setShowMyAccount(true);
        const accessToken = localStorage.getItem('accessToken')
        const userData = decodeAccessToken(accessToken)
        const id = userData?.id_user;
        fetch('http://localhost:4000/order/inprogress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then((response) => response.json())
            .then((data) => {
                setOrder(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            {order ? (
                <div className="flex items-center justify-center">
                    <div className="bg-beige p-16">
                        <Card>
                            <CardBody>
                                {order.payment && order.payment.time_payment && (
                                    <div className="text-center">
                                        <p>
                                            {new Date(order.payment.time_payment).toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                )}

                                <Divider />

                                {order.items.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <div className="text-center">
                                            <p>
                                                Produit : {item.name}
                                            </p>
                                        </div>
                                    </React.Fragment>
                                ))}
                                
                                <Divider />

                                <div>
                                    <p className="text-center">
                                        Prix : {order.price} €
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            ) : (
                <div className="h-screen flex items-center justify-center">
                    <Spinner size="lg" />
                </div>)}
        </div>
    )
}

export default LivraisonPage;