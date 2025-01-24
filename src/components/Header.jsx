import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/react";
import './Header.css';
import userImage from '../assets/user.jpg';
import TedoooLogo from '../assets/icon_tedoo.svg?react';
import {HeaderMenu} from './HeaderMenu';

export const Header = () => {
    return (
        <Navbar>
            <NavbarBrand>
                <a href={'/'}><TedoooLogo width="40" height="40" className="mr-3" alt='Tedooo Logo'/></a>
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
