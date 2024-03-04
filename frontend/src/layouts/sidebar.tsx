import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
  PowerIcon,
  UserGroupIcon,
  GlobeEuropeAfricaIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CircleStackIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import { TailwindIcon } from "../components/icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useAuthContext } from "../core/context/auth-context";

export function Sidebar() {
  const { t, signOut } = useAuthContext();
  const location = useLocation();
  const [open, setOpen] = React.useState<number>(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const navigations = {
    one: [
      {
        href: "/dashboard",
        name: t("sidebar.dashboard"),
        icon: <PresentationChartBarIcon color="purple" className="h-5 w-5" />,
        children: [],
      },
    ],
    two: [
      // {
      //   href: "/dashboard/category",
      //   name: "Categories",
      //   icon: <Squares2X2Icon className="h-5 w-5" />,
      //   children: [],
      // },

      {
        href: "#",
        name: t("sidebar.news"),
        icon: <GlobeEuropeAfricaIcon color="purple" className="h-5 w-5" />,
        children: [
          {
            href: "/dashboard/new-articles",
            name: t("sidebar.write_news"),
          },
          {
            href: "/dashboard/articles",
            name: t("sidebar.list_news"),
          },
        ],
      },
      {
        href: "/dashboard/users",
        name: t("sidebar.users"),
        icon: <UserGroupIcon color="purple" className="h-5 w-5" />,
        children: [],
      },
    ],
    tree: [
      // {
      //   href: "#",
      //   name: "Settings",
      //   icon: <Cog6ToothIcon className="h-5 w-5" />,
      //   children: [],
      // },
      {
        href: "/dashboard/logs",
        name: t("sidebar.logs"),
        icon: <CircleStackIcon color="purple" className="h-5 w-5" />,
        children: [],
      },
    ],
  };

  return (
    <Card
      placeholder={""}
      className="h-full w-full max-w-[20rem] rounded-none p-4 shadow-xl shadow-blue-gray-900/5 fixed left-0"
    >
      <div className="mb-2 p-4">
        <a href="/dashboard">
          {/* <TailwindIcon className="text-blue-700 mr-4 cursor-pointer" /> */}
          <h2 className="text-4xl font-semibold text-purple-700 text-center">
            Merlin-3D
          </h2>
        </a>
      </div>
      <List placeholder={""}>
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
        {navigations.two.map((item, i) => {
          return item.children.length > 0 ? (
            <Accordion
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
                  <ListItemPrefix placeholder={""}>{item.icon}</ListItemPrefix>
                  <Typography
                    placeholder={""}
                    color="blue-gray"
                    className="mr-auto font-normal"
                  >
                    {item.name}
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0" placeholder={""}>
                  {item.children?.map((child) => {
                    return (
                      <Link to={child.href}>
                        <ListItem placeholder={""}>
                          <ListItemPrefix placeholder={""}>
                            <ChevronRightIcon
                              strokeWidth={3}
                              className="h-3 w-5"
                            />
                          </ListItemPrefix>
                          {child.name}
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </AccordionBody>
            </Accordion>
          ) : (
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
            <PowerIcon color="purple" className="h-5 w-5" />
          </ListItemPrefix>
          {t("actions.logout")}
        </ListItem>
      </List>
    </Card>
  );
}
