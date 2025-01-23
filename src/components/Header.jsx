import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@heroui/react";
import './Header.css';
import userImage from '../assets/user.jpg';
import TedoooLogo from '../assets/icon_tedoo.svg';
import iconHome from '../assets/icon_home.svg';
import iconMessaging from '../assets/icon_messaging.svg';
import iconNotifications from '../assets/icon_notifications.svg';

const menu = [
    { title: 'Home', icon: iconHome, link: '', isSelected: true },
    { title: 'Messaging', icon: iconMessaging, link: '' },
    { title: 'Notifications', icon: iconNotifications, link: '' }
];

// Component for menu items
const MenuItems = ({ menu }) => (
    <>
        {menu.map((item, key) => (
            <NavbarItem key={key}>
                <Link
                    className={item.isSelected ? 'selected' : ''}
                    color="foreground"
                    href={item.link}
                >
                    <img width="16" src={item.icon} className="mr-2"  alt={item.title}/>
                    {item.title}
                </Link>
            </NavbarItem>
        ))}
    </>
);

export const Header = () => {
    return (
        <Navbar>
            <NavbarBrand>
                <img src={TedoooLogo} width="40" height="40" className="mr-3" />

                <label className="search-label">
                    <input
                        className="header-search-box"
                        type="text"
                        placeholder="Search"
                    />
                </label>
            </NavbarBrand>
            <NavbarContent justify="end">
                <div className="header-menu-items lg:flex gap-4 h-full ">
                    <MenuItems menu={menu}/>
                </div>
                <NavbarItem>
                <img className="user-image" src={userImage} />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};
