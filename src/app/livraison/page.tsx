"use client";

import { Card, CardBody, Divider } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { Commande } from "../Interfaces/commande";
import React from "react";
import { Spinner } from "@nextui-org/react";
import { useHeader } from "../contexts/header.context";
import { UserContext } from "../contexts/user.context";
import { decodeAccessToken } from "./utils";
import { Item } from "../Interfaces/item";

const LivraisonPage = () => {
    const [order, setOrder] = useState<Commande>();

    const { setShowMyAccount } = useHeader();

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
                data.items = data.items.map((item: Item) => {
                    return {
                        id: item.id_dish ?? item.id_menu ?? item.id_article,
                        name: item.name_menu ?? item.name_article,
                        price: item.price_menu ?? item.price_article
                    };
                });
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
                                {order.payment && order.payment.payment_time && (
                                    <div className="text-center">
                                        <p>
                                            {new Date(order.payment.payment_time).toLocaleDateString('fr-FR', {
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
                                        Prix : {order.total_price} €
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