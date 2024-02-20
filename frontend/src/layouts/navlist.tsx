import React from "react";
import { Navbar, IconButton, Avatar } from "@material-tailwind/react";
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { BreadcrumbsMenu, SwitchCustom } from "../components";
import { useAuthContext } from "../core/context/auth-context";
import { useLocation } from "react-router-dom";
import { valueAfterSlash } from "../utils/common";

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const [mode, setMode] = React.useState<boolean>(false);
  const location = useLocation();
  const { currentUser } = useAuthContext();

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar
      className="ml-80 max-w-[calc(100vw-320px)] px-6 py-3 z-40 fixed top-0 shadow-none"
      placeholder={""}
      fullWidth={true}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <BreadcrumbsMenu
          name={valueAfterSlash(location.pathname)}
          path={location.pathname}
        />
        <div className="hidden lg:block">
          {/* <div className="flex items-center gap-x-3">
            <SwitchCustom
              isActive={mode}
              onSwitch={() => setMode((old) => !old)}
            />
            {!mode ? (
              <SunIcon className="h-5 w-5 cursor-pointer" />
            ) : (
              <MoonIcon className="h-5 w-5 cursor-pointer" />
            )}
          </div> */}
        </div>
        <div className="flex justify-center items-center gap-4">
          <span>{currentUser?.username}</span>
          <Avatar
            placeholder={""}
            src={"/assets/images/avatar.jpg"}
            alt={"user"}
            size="sm"
          />
        </div>

        {/* <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
          placeholder={""}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton> */}
      </div>
    </Navbar>
  );
}
