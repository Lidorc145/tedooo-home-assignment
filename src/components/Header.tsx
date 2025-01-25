import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/react";
import './Header.css';
import userImage from '/src/assets/user.jpg';
import TedoooLogo from '../assets/icon_tedoo.svg?react';
import {HeaderMenu} from './HeaderMenu';
import {FC} from "react";

export const Header:FC = () => {
    return (
        <Navbar>
            <NavbarBrand>
                <a href={'/'}><TedoooLogo width="40" height="40" className="mr-3"/></a>
                <label className="search-label">
                    <input className="header-search-box" type="text" placeholder="Search"/>
                </label>
            </NavbarBrand>
            <NavbarContent justify="end">
                <div className="header-menu-items lg:flex gap-4 h-full ">
                    <HeaderMenu/>
                </div>
                <NavbarItem>
                    <img className="user-image" src={userImage} alt='user image'/>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};
