import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";

export const AcmeLogo = () => {
    return (
        <svg className="mx-2" width="40" height="40" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="79" height="79" rx="7.9" fill="url(#paint0_linear_2_726)"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M63.2 49.2073C63.1906 49.1551 63.1906 49.1015 63.2 49.0493L63.0882 46.1262C63.0784 46.0626 63.0784 45.9979 63.0882 45.9343C62.8082 42.4039 61.3999 39.061 59.0754 36.4087C58.7027 35.9709 58.2886 35.5802 57.8754 35.1903L57.8753 35.1903L57.8753 35.1902C57.6812 35.0071 57.4874 34.8242 57.2981 34.6367L57.0298 34.3884L57.3987 34.2078C59.7958 33.0804 61.5299 30.8824 62.0822 28.2713C62.7271 25.4768 61.8794 22.5453 59.8467 20.5402C58.4078 19.0301 56.4887 18.0792 54.4254 17.854L53.7212 17.775H52.9611H52.7376C51.4618 17.8501 50.2197 18.2167 49.1048 18.8472C44.9656 20.9544 43.276 26.0319 45.3155 30.2351C45.328 30.2645 45.3389 30.2923 45.3506 30.3221C45.3703 30.3723 45.3922 30.428 45.4273 30.5059C43.8046 30.5674 42.1983 30.8561 40.6543 31.3637C39.098 31.8793 37.6226 32.6166 36.2726 33.5532V33.2937C36.1622 31.5253 35.6782 29.8012 34.853 28.2374C32.1307 23.1997 26.5594 20.4412 20.9478 21.3528C18.0538 21.7672 15.3812 23.1502 13.3581 25.2804C11.3678 27.3585 10.1581 30.0728 9.93768 32.9551C9.68494 35.4369 10.2004 37.9368 11.4132 40.1106C14.8987 46.2979 22.5014 48.7519 28.8953 45.7537L29.1412 45.6634C29.1398 45.6897 29.1398 45.7161 29.1412 45.7424V46.1262C28.8703 49.2743 29.4864 52.4356 30.9185 55.2455C34.4119 62.0544 41.9274 65.7292 49.3842 64.2745C54.172 63.4195 58.3565 60.5081 60.8527 56.2951C62.1949 54.1606 63.0006 51.7276 63.2 49.2073ZM32.4593 51.1713C32.1329 49.9883 31.9711 48.7652 31.9786 47.5371C32.0074 41.5284 35.817 36.203 41.4574 34.287C43.4146 33.6144 45.4933 33.3795 47.5493 33.5986C53.3479 34.1809 58.1784 38.3383 59.6661 44.0271C60.9623 48.7387 59.6176 53.7892 56.1563 57.2095C54.0829 59.4343 51.3254 60.8861 48.3318 61.3289C41.2523 62.5121 34.4213 58.1406 32.4593 51.1713ZM23.0384 23.0006H22.0771C21.8536 23.0006 21.6189 23.0006 21.3953 23.0683C18.8198 23.419 16.4349 24.631 14.6215 26.5107C11.095 30.0533 10.4945 35.6002 13.1796 39.8285C15.2281 43.1789 18.8482 45.2199 22.7478 45.2233C25.1006 45.3295 27.426 44.6774 29.3874 43.3611C32.4372 41.4722 34.3595 38.178 34.5181 34.5691C34.6569 32.4477 34.133 30.3358 33.0202 28.5309C30.9116 25.0237 27.1122 22.9163 23.0496 23.0006H23.0384ZM59.7223 23.3617C60.29 24.4512 60.5528 25.6765 60.4824 26.9056H60.4936C60.336 29.2883 58.9472 31.411 56.8384 32.4923C55.956 32.9941 54.9755 33.2946 53.9657 33.3726C53.4637 33.3968 52.9607 33.3589 52.4679 33.2597C51.1916 33.0838 49.9762 32.5999 48.9245 31.849C46.2273 29.8857 45.4109 26.1957 47.0243 23.2601C48.3293 20.9499 50.7689 19.5322 53.4028 19.5533C56.0367 19.5743 58.4537 21.0309 59.7223 23.3617Z"
                  fill="white"/>
            <defs>
                <linearGradient id="paint0_linear_2_726" x1="26.2677" y1="26.1768" x2="101.337" y2="82.7682"
                                gradientUnits="userSpaceOnUse">
                    <stop stop-color="#6DC5A8"/>
                    <stop offset="1" stop-color="#2CA487"/>
                </linearGradient>
            </defs>
        </svg>
    );
};

export const NavBarr = () => {
    return (
        <Navbar>

            <NavbarBrand>
                <AcmeLogo/>
                <p><input className="header-search-box" type='text' placeholder="Search"/></p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current="page" href="#">
                        Messaging
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Notifications
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}