"use client";

import { Card, CardBody, CardFooter, CardHeader, Divider, Image, Link, Spinner } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { useHeader } from "../contexts/header.context";
import { UserContext } from "../contexts/user.context";
import { decodeAccessToken } from "./utils";
import { Commande } from "../Interfaces/commande";
import { Item } from "../Interfaces/item";

const CommandesPage = () => {
    const [commandesList, setCommandesList] = useState<Commande[]>([]);

    const { setShowMyAccount } = useHeader();

    useEffect(() => {
        setShowMyAccount(true);
    }, [setShowMyAccount]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        const userData = decodeAccessToken(accessToken)
        const id = userData?.id_user;
        console.log(id);
        fetch('http://localhost:4000/order/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then((response) => response.json())
            .then((data) => {
                data.forEach((order: Commande) => {
                    order.items = order.items.map((item) => {
                        return {
                            id: item.id_dish ?? item.id_menu ?? item.id_article,
                            name: item.name_menu ?? item.name_article,
                            price: item.price_menu ?? item.price_article
                        };
                    });
                });
                setCommandesList(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            {commandesList ? (

                commandesList.map((commande: Commande) => (
                    <div key={commande.order_id}>
                        <Card className="max-w-[60%]">
                            <CardBody>
                                {commande.payment.payment_time && (
                                    <div>
                                        <p>
                                            {new Date(commande.payment.payment_time).toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                )}

                                {commande.items.map((item: Item) => (
                                    <React.Fragment key={item.id}>
                                        <div>
                                            <p>
                                                Produit : {item.name}
                                            </p>
                                        </div>
                                    </React.Fragment>
                                ))}

                                <div>
                                    <p>
                                        Prix : {commande.total_price} €
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))
            ) : (
                <Spinner size="lg" />
            )}
        </div>
    )
}

export default CommandesPage;