import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";

import logo from "../assets/app-store.png";

const profileMenuItems = [
 
  { label: "Sign Out" },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);
const {user,logOut}=useAuth()
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="Profile"
            className="border border-gray-900 p-0.5"
            src={user?.photoURL}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              <Typography
              onClick={logOut}
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                Sign Out
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default function TopNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography as="a" href="#" className="mr-4 cursor-pointer flex justify-center items-center gap-2 text-xl py-1.5 font-bold">
         <img className="w-4" src={logo} alt="" /> We <span className="text-primary">Prod</span>
        </Typography>
        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-x-1">
            {user ? (
              <ProfileMenu />
            ) : (
              <>
            <Link to='/login'>
                  <Button variant="text" size="sm" className="hidden lg:inline-block">
                    <span>Log In</span>
                  </Button>
            </Link>
           <Link to='/register'>
                  <Button variant="gradient" color="green" size="sm" className="hidden lg:inline-block">
                    <span>Sign In</span>
                  </Button>
           </Link>
              </>
            )}
          </div>
{!user &&          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton>}
        </div>
      </div>
      <MobileNav open={openNav}>
       
        <div className="flex items-center gap-x-1">
        <Link to='/login'>
            <Button fullWidth variant="text" size="sm">
              <span>Log In</span>
            </Button>
        </Link>
         <Link to='/register'>
            <Button fullWidth variant="gradient" size="sm">
              <span>Sign In</span>
            </Button>
         </Link>
        </div>
      </MobileNav>
    </Navbar>
  );
}
