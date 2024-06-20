'use client';

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from 'react';
import DeleteUserModal from "../deleteUserModal";
import SponsorModal from "../sponsorModal"; // Assurez-vous que ce chemin est correct
import Image from 'next/image';
import ceseat from "../../../../public/logo-ceseat.png";

interface User {
    name: string;
    surname: string;
    street: string;
    city: string;
    postal_code: string;
    phone: string;
    mail: string;
    role: string;
}

interface HeaderProps {
    user?: User | null;
    title?: string;
    showMyAccount?: boolean;
    showStats?: boolean;
}

export default function Header(props: HeaderProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

    function openDeleteModal() {
        setIsDeleteModalOpen(true);
    }

    function closeDeleteModal() {
        setIsDeleteModalOpen(false);
    }

    function openSponsorModal() {
        setIsSponsorModalOpen(true);
    }

    function closeSponsorModal() {
        setIsSponsorModalOpen(false);
    }

    return (
        <Navbar className="bg-red">
            <NavbarBrand>
                <Link href={"/main"}>
                    <p className="font-bold text-inherit ml-2 text-large flex items-center gap-2">
                        <Image
                            src={ceseat}
                            width={50}
                            height={50}
                            alt="Logo Ceseat"
                        />
                        CES&apos;Eat
                    </p>
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <p>{props.user?.role || props.title}</p>
            </NavbarContent>
            <NavbarContent justify="end">
                {props.showStats && props.user?.role === 'Restaurateur' &&
                    <NavbarItem className="hidden lg:flex">
                        <Link href="#">Statistiques</Link>
                    </NavbarItem>
                }
                <NavbarItem>
                    {props.showMyAccount &&
                        <Dropdown className="text-black">
                            <DropdownTrigger>
                                <Button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    Mon compte
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu variant="faded" aria-label="Account dropdown menu with description">
                                <DropdownSection title="Actions" showDivider>
                                    <DropdownItem
                                        key="consult"
                                        description="Mes informations"
                                        href="/account"
                                    >
                                        Mon compte
                                    </DropdownItem>
                                        <DropdownItem
                                            key="sponsor"
                                            description="Parrainer un ami"
                                            title="Parrainer un ami"
                                            onClick={openSponsorModal}
                                            className="cursor-pointer text-blue-500 mr-2"
                                        >
                                            Parrainage
                                        </DropdownItem>
                                </DropdownSection>
                                <DropdownSection title="Danger">
                                    <DropdownItem
                                        key="delete"
                                        className="text-danger"
                                        color="danger"
                                        description="Supprimer définitivement mon compte"
                                        onClick={openDeleteModal}
                                    >
                                        Effacer mon compte
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    }
                </NavbarItem>
            </NavbarContent>
            <DeleteUserModal userMail={props.user?.mail} isOpen={isDeleteModalOpen} closeModal={closeDeleteModal} />
            <SponsorModal isOpen={isSponsorModalOpen} closeModal={closeSponsorModal} code="500"/>
        </Navbar>
    );
}
