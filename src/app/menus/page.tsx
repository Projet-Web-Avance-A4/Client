"use client";

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@nextui-org/react";
import { Menu } from "@/app/Interfaces/menu";
import { NextUIProvider } from "@nextui-org/system";
import Header from "@/app/components/Header/header";
import { useEffect, useState } from "react";

const MenuPage = () => {
    const [menuList, setMenuList] = useState<Menu[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/menus')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMenuList(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <NextUIProvider>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '10px' }}>
                {menuList.map((menu: Menu) => (
                    <Card key={menu.id_menu} className="max-w-[300px]" style={{ flex: '1 1 calc(33.333% - 16px)', boxSizing: 'border-box' }}>
                        <CardHeader style={{ display: 'flex', justifyContent: 'center' }}>
                            <p className="text-md">{menu.name_menu}</p>
                        </CardHeader>
                        <Divider />
                        <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Image
                                alt="menu logo"
                                radius="sm"
                                src="https://img.freepik.com/free-vector/menu-logo-graphic-design_24908-54835.jpg"
                                width={200}
                            />
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <p style={{ flex: '0 0 50%', margin: 0, textAlign: 'center' }}>{menu.price_menu} €</p>
                                <Button color="primary" style={{ flex: '0 0 50%', margin: 0 }}>
                                    Sélectionner
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </NextUIProvider >
    );
}

export default MenuPage;