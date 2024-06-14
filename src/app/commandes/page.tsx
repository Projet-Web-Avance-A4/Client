"use client";

import { NextUIProvider } from "@nextui-org/system";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Header from "../components/header/header";
import { Commande } from "../interfaces/commande";
import { Item } from "../interfaces/item";
import React from "react";

const dividerStyle = {
    width: '1px',
    backgroundColor: 'black',
    height: '100%',
    margin: '0 8px'
};

const CommandesPage = () => {
    const [commandesList, setCommandesList] = useState<Commande[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/commandes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customer_id: 1 })
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
        <NextUIProvider>
            <Header />
            {commandesList ? (

                commandesList.map((commande: Commande) => (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }} key={commande.id_order}>
                        <Card className="max-w-[60%]" style={{ flex: '1 1 calc(33.333% - 16px)', boxSizing: 'border-box' }}>
                            <CardBody style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                {commande.payment.time_payment && (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p>
                                            {new Date(commande.payment.time_payment).toLocaleDateString('fr-FR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}
                                        </p>
                                        <div style={dividerStyle}></div>
                                    </div>
                                )}

                                {commande.items.map((item: Item, index: number) => (
                                    <React.Fragment key={item.id}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <p>
                                                {item.name}
                                            </p>
                                            <div style={dividerStyle}></div>
                                        </div>
                                    </React.Fragment>
                                ))}

                                <div style={{ display: 'flex', alignItems: 'center' }}>
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
        </NextUIProvider >
    )
}

export default CommandesPage;