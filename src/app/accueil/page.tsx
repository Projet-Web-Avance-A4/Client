"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useEffect } from "react";
import { useHeader } from "../contexts/header.context";

export default function Home() {
    const { setShowMyAccount } = useHeader();

    useEffect(() => {
        setShowMyAccount(true);
    }, []);
    
    return (
        <div className="flex flex-wrap place-content-center">
            <Card className="w-96 m-8">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">Menu</h4>
                    <small className="text-default-500">Consulter les différents menus</small>
                </CardHeader>
                <CardBody>
                    <Button as={Link} href="/menus">
                        <p>Accéder</p>
                    </Button>
                </CardBody>
            </Card>

            <Card className="m-8">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">Articles</h4>
                    <small className="text-default-500">Consulter les différents articles</small>
                </CardHeader>
                <CardBody>
                    <Button as={Link} href="/articles">
                        <p>Accéder</p>
                    </Button>
                </CardBody>
            </Card>
            <Card className="m-8">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">Commandes</h4>
                    <small className="text-default-500">Consulter vos commandes</small>
                </CardHeader>
                <CardBody>
                    <Button as={Link} href="/commandes">
                        <p>Accéder</p>
                    </Button>
                </CardBody>
            </Card>
            <Card className="m-8">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">Livraison en cours</h4>
                    <small className="text-default-500">Suivre votre livraison</small>
                </CardHeader>
                <CardBody>
                    <Button as={Link} href="/livraison">
                        <p>Accéder</p>
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}