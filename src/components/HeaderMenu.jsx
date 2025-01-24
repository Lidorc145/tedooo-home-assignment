import iconHome from "../assets/icon_home.svg";
import iconMessaging from "../assets/icon_messaging.svg";
import iconNotifications from "../assets/icon_notifications.svg";
import {Link, NavbarItem} from "@heroui/react";

const menu = [
    {title: 'Home', icon: iconHome, link: '', isSelected: true},
    {title: 'Messaging', icon: iconMessaging, link: ''},
    {title: 'Notifications', icon: iconNotifications, link: ''}
];

// Component for menu items
export const HeaderMenu = () => (
    <>
        {menu.map((item, key) => (
            <NavbarItem key={key}>
                <Link
                    className={item.isSelected ? 'selected' : ''}
                    color="foreground"
                    href={item.link}
                >
                    <img width="16" src={item.icon} className="mr-3 mb-1" alt={item.title}/>
                    {item.title}
                </Link>
            </NavbarItem>
        ))}
    </>
);