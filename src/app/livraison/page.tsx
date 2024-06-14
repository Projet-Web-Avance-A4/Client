"use client";

import { NextUIProvider } from "@nextui-org/system";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Header from "../components/header/header";
import { Commande } from "../interfaces/commande";
import { Item } from "../interfaces/item";
import React from "react";
import { Spinner } from "@nextui-org/react";

const dividerStyle = {
    width: '1px',
    backgroundColor: 'black',
    height: '100%',
    margin: '0 8px'
};

const LivraisonPage = () => {
    const [livraison, setLivraison] = useState<Commande>();

    useEffect(() => {
        fetch('http://localhost:3001/api/livraison', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customer_id: 1 })
        })
            .then((response) => response.json())
            .then((data) => {
                setLivraison(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <NextUIProvider>
            <Header />
            {livraison ? (
                <Card className="max-w-[60%]" style={{ flex: '1 1 calc(33.333% - 16px)', boxSizing: 'border-box' }}>
                    <CardBody style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        {livraison.payment && livraison.payment.time_payment && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p>
                                    {new Date(livraison.payment.time_payment).toLocaleDateString('fr-FR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </p>
                                <div style={dividerStyle}></div>
                            </div>
                        )}

                        {livraison.items.map((item: Item, index: number) => (
                            <React.Fragment key={index}>
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
                                {livraison.price} €
                            </p>
                        </div>
                    </CardBody>
                </Card>
            ) : (
                <Spinner size="lg" />
            )}
        </NextUIProvider>
    )
}

export default LivraisonPage;