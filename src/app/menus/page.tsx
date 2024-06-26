"use client";

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { Menu } from "@/app/Interfaces/menu";
import { CartContext } from "../contexts/cart.context";
import { useHeader } from "../contexts/header.context";

const MenuPage = () => {
    const [menuList, setMenuList] = useState<Menu[]>([]);

    const { setShowMyAccount } = useHeader();

    useEffect(() => {
        setShowMyAccount(true);
    }, []);

    useEffect(() => {
        fetch('http://localhost:4000/product/menu')
            .then((response) => response.json())
            .then((data) => {
                setMenuList(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (menu: Menu) => {
        addToCart(menu);
    };

    return (
            <div className="flex justify-center flex-wrap gap-16 my-10 h-fit">
                {menuList.map((menu: Menu) => (
                    <Card key={menu.id_menu}>
                        <CardHeader className="flex justify-center">
                            <p className="text-md">
                                {menu.name_menu}
                            </p>
                        </CardHeader>
                        <Divider />
                        <CardBody className="flex justify-center items-center h-full">
                            <Image
                                alt="menu logo"
                                radius="sm"
                                src="https://img.freepik.com/free-vector/menu-logo-graphic-design_24908-54835.jpg"
                                width={200}
                            />
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <div className="flex justify-center items-center w-full">
                                <p style={{ flex: '0 0 50%', margin: 0, textAlign: 'center' }}>{menu.price_menu} €</p>
                                <Button onClick={() => handleAddToCart(menu)}>Add to Cart</Button>
                        </div>
                    </CardFooter>
                    </Card>
                ))}
        </div>
    );
}

export default MenuPage;