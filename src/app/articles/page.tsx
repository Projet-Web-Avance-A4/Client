"use client";

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@nextui-org/react";
import { Article } from "@/app/interfaces/article";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart.context";
import { useHeader } from "../contexts/header.context";

const ArticlesPage = () => {
    const [articleList, setArticleList] = useState<Article[]>([]);

    const { setShowMyAccount } = useHeader();

    useEffect(() => {
        setShowMyAccount(true);
    }, []);

    useEffect(() => {
        fetch('http://localhost:4000/product/article')
            .then((response) => response.json())
            .then((data) => {
                setArticleList(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (article: Article) => {
        addToCart(article);
    };


    return (
            <div>
                {articleList.map((article: Article) => (
                    <Card key={article.id_article} className="max-w-[300px]">
                        <CardHeader style={{ display: 'flex', justifyContent: 'center' }}>
                            <p className="text-md">{article.name_article}</p>
                        </CardHeader>
                        <Divider />
                        <CardBody>
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
                                <p>{article.price_article} €</p>
                                <Button onClick={() => handleAddToCart(article)}>Add to Cart</Button>
                        </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
    );
}

export default ArticlesPage;