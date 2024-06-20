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
        fetch('http://localhost:4000/order/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
            .then((response) => response.json())
            .then((data) => {
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
                    <div key={commande.id_order}>
                        <Card className="max-w-[60%]">
                            <CardBody>
                                {commande.payment.time_payment && (
                                    <div>
                                        <p>
                                            {new Date(commande.payment.time_payment).toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                )}

                                {commande.items.map((item: Item, index: number) => (
                                    <React.Fragment key={item.id}>
                                        <div>
                                            <p>
                                                {item.name}
                                            </p>
                                        </div>
                                    </React.Fragment>
                                ))}

                                <div>
                                    <p>
                                        {commande.price} €
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