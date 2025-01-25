import iconHome from "../assets/icon_home.svg?react";
import iconMessaging from "../assets/icon_messaging.svg?react";
import iconNotifications from "../assets/icon_notifications.svg?react";
import { Link, NavbarItem } from "@heroui/react";
import {MenuItem} from "../types/common.tsx";
import {FC} from "react";

const menu: MenuItem[] = [
    { title: "Home", icon: iconHome, link: "1", isSelected: true },
    { title: "Messaging", icon: iconMessaging, link: "1" },
    { title: "Notifications", icon: iconNotifications, link: "1" },
];

export const HeaderMenu:FC = () => (
    <>
        {menu.map((item: MenuItem, key: number) => (
            <NavbarItem key={key}>
                <Link
                    className={item.isSelected ? "selected" : ""}
                    color="foreground"
                    href={item.link}
                >
                    <item.icon className="mr-3 mb-1" width="16"/>
                    {item.title}
                </Link>
            </NavbarItem>
        ))}
    </>
);
