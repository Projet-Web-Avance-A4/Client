"use client";

import Image from "next/image";
import Header from "./components/Header/header";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { NextUIProvider } from "@nextui-org/system";

export default function Home() {
  return (
    <NextUIProvider className="h-screen bg-beige">
      <Header />
      <div className="container mx-auto">
        <div className="flex flex-wrap place-content-center">
          <Card className="m-8">
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
      </div>
    </NextUIProvider>
  );
}