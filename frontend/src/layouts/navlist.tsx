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
import i18n from "../i18n";
import classNames from "classnames";

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState<boolean>(false);

  const [mode, setMode] = React.useState<boolean>(false);
  const location = useLocation();
  const { t, lang, currentUser, changeLanguage } = useAuthContext();

  const langs = [
    {
      id: "en",
      flag: "https://img.icons8.com/?size=512&id=t3NE3BsOAQwq&format=png",
      name: "En",
      action: () => changeLanguage("en"),
    },
    {
      id: "fr",
      flag: "https://img.icons8.com/color/48/france.png?size=512",
      name: "Fr",
      action: () => changeLanguage("fr"),
    },
  ];

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
          label={t("sidebar.dashboard")}
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
          <div className="flex flex-row justify-center select-none">
            <div className="flex flex-row items-center right-1 ">
              {langs.map((item) => {
                return (
                  <button
                    onClick={item.action}
                    className={classNames(
                      { "bg-purple-600 text-white": item.id === lang },
                      "p-2 flex flex-row items-center border border-gray-300 text-sm font-medium text-gray-700 focus:outline-none"
                    )}
                  >
                    <span className="ml-1">
                      <img src={item.flag} className="w-5 h-5" />
                    </span>
                    <span className="text-md"> {item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
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
