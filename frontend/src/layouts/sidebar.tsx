import React from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  UserGroupIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { TailwindIcon } from "../components/icons";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useAuthContext } from "../core/context/auth-context";

const navigations = {
  one: [
    {
      href: "/dashboard",
      name: "Dashboard",
      icon: <PresentationChartBarIcon className="h-5 w-5" />,
    },
  ],
  two: [
    {
      href: "/dashboard/category",
      name: "Categories",
      icon: <Squares2X2Icon className="h-5 w-5" />,
    },
    {
      href: "/dashboard/users",
      name: "Users",
      icon: <UserGroupIcon className="h-5 w-5" />,
    },
  ],
  tree: [
    {
      href: "#",
      name: "Profile",
      icon: <UserCircleIcon className="h-5 w-5" />,
    },
    {
      href: "#",
      name: "Settings",
      icon: <Cog6ToothIcon className="h-5 w-5" />,
    },
  ],
};

export function Sidebar() {
  const { signOut } = useAuthContext();
  const location = useLocation();
  // const [open, setOpen] = React.useState<number>(0);

  // const handleOpen = (value: number) => {
  //   setOpen(open === value ? 0 : value);
  // };

  return (
    <Card
      placeholder={""}
      className="h-full w-full max-w-[20rem] rounded-none p-4 shadow-xl shadow-blue-gray-900/5 fixed left-0"
    >
      <div className="mb-2 p-4">
        <a href="/dashboard">
          <TailwindIcon className="text-blue-700 mr-4 cursor-pointer" />
        </a>
      </div>
      <List placeholder={""}>
        {/*  <Accordion
          open={open === 1}
          placeholder={""}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
         <ListItem placeholder={""} className="p-0" selected={open === 1}>
            <AccordionHeader
              placeholder={""}
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix placeholder={""}>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography
                placeholder={""}
                color="blue-gray"
                className="mr-auto font-normal"
              >
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem> 
          <AccordionBody className="py-1">
            <List className="p-0" placeholder={""}>
              <ListItem placeholder={""}>
                <ListItemPrefix placeholder={""}>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem placeholder={""}>
                <ListItemPrefix placeholder={""}>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem placeholder={""}>
                <ListItemPrefix placeholder={""}>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>*/}
        {/* <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
          placeholder={""}
        >
          <ListItem className="p-0" selected={open === 2} placeholder={""}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
              placeholder={""}
            >
              <ListItemPrefix placeholder={""}>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-normal"
                placeholder={""}
              >
                E-Commerce
              </Typography>
            </AccordionHeader>
          </ListItem>
        </Accordion> */}
        {navigations.one.map((item) => {
          return (
            <NavLink to={item.href}>
              <ListItem
                placeholder={""}
                key={item.name}
                className={classNames(
                  location.pathname === item.href && "bg-blue-gray-50"
                )}
              >
                <ListItemPrefix placeholder={""}>{item.icon}</ListItemPrefix>
                {item.name}
              </ListItem>
            </NavLink>
          );
        })}

        <hr className="my-2 border-blue-gray-50" />
        {navigations.two.map((item) => {
          return (
            <NavLink to={item.href}>
              <ListItem
                placeholder={""}
                key={item.name}
                className={classNames(
                  location.pathname === item.href && "bg-blue-gray-50"
                )}
              >
                <ListItemPrefix placeholder={""}>{item.icon}</ListItemPrefix>
                {item.name}
              </ListItem>
            </NavLink>
          );
        })}

        <hr className="my-2 border-blue-gray-50" />
        {navigations.tree.map((item) => {
          return (
            <NavLink to={item.href}>
              <ListItem
                placeholder={""}
                key={item.name}
                className={classNames(
                  location.pathname === item.href && "bg-blue-gray-50"
                )}
              >
                <ListItemPrefix placeholder={""}>{item.icon}</ListItemPrefix>
                {item.name}
              </ListItem>
            </NavLink>
          );
        })}

        <hr className="my-2 border-blue-gray-50" />
        <ListItem placeholder={""} onClick={() => signOut()}>
          <ListItemPrefix placeholder={""}>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
