import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { isEmpty, isNil, omit } from "lodash";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

import { AlertNotification, SpinnerLoader } from "../../components";
import { AlertType } from "../../components/alert-notification";
import { LogoIcon, TailwindIcon } from "../../components/icons";
import { LoginRequest } from "../../core/entities";
import { loginUser } from "../../core/api/api";
import { BEARER_TOKEN, LANG, USER_TOKEN } from "../../core/entities/contant";
import { User } from "../../core/entities/user";
import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useAuthContext } from "../../core/context/auth-context";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { t, lang, changeLanguage, signOut } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  const langs = [
    {
      id: "en",
      name: t("auth.english"),
      action: () => changeLanguage("en"),
    },
    {
      id: "fr",
      name: t("auth.french"),
      action: () => changeLanguage("fr"),
    },
  ];

  const [messages, setMessages] = React.useState<{
    message: string | null;
    type: AlertType | null;
    color: any;
  }>();

  const { mutate, isPending } = useMutation({
    mutationFn: (login: LoginRequest) => {
      setOpen(true);

      return loginUser(login);
    },
    onSuccess(data) {
      if (!isNil(data.data)) {
        setMessages({
          message: "Connected you will be redirected....",
          type: "success",
          color: "green",
        });
        const user = data.data.user as User;
        const token = data.data.token as string;
        Cookies.set(BEARER_TOKEN, token, { path: "/" });
        Cookies.set(USER_TOKEN, JSON.stringify(omit(user, "password")), {
          path: "/dashboard",
        });
        window.location.href = "/dashboard";
      } else {
        setMessages({
          message: data.message,
          type: "danger",
          color: "red",
        });
      }
    },
    onError(error) {
      setMessages({
        message: error.message,
        type: "danger",
        color: "red",
      });
    },
  });

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setMessages({ message: null, type: null, color: "" });
      setOpen(false);
      mutate({
        email,
        password,
      });
    },
    [mutate, password, email]
  );

  const message = !isEmpty(messages?.message) ? messages?.message! : "";

  return (
    <main>
      <div
        onClick={() => {
          signOut();
          navigate("/");
        }}
        className="z-50 border border-black p-2 rounded-md hover:bg-gray-700 flex absolute left-10 top-10 group"
      >
        <ArrowLeftIcon className="w-10 h-10 group-hover:text-white cursor-pointer" />
      </div>
      <div className="absolute inset-0 z-0 h-full w-full bg-element bg-cover bg-no-repeat bg-primary-20">
        <div className="container mx-auto p-4">
          <form onSubmit={handleSubmit} className="flex justify-center">
            {!isPending ? (
              <AlertNotification
                open={open}
                handleOpen={() => setOpen(!open)}
                content={message}
                color={messages ? messages!.color : "white"}
                type={messages ? messages?.type! : "info"}
                className="py-2 w-96"
              >
                <></>
              </AlertNotification>
            ) : (
              <></>
            )}
            <Card
              className="absolute bg-transparent top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4 px-4 py-8"
              placeholder={""}
              shadow={false}
            >
              <CardHeader
                className="mb-0 flex flex-col bg-transparent place-items-center relative"
                placeholder={""}
                shadow={false}
              >
                <LockClosedIcon className="h-28 w-28 text-black" />
                <span className="text-primary-600 text-3xl font-semibold">
                  {t("auth.title")}
                </span>
              </CardHeader>
              <CardBody className="flex flex-col gap-4" placeholder={""}>
                <Typography variant="small" color="black" placeholder={""}>
                  {t("auth.email_address")}
                </Typography>
                <Input
                  crossOrigin=""
                  required={true}
                  disabled={isPending}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  label={t("auth.email")}
                  color="black"
                  size="lg"
                  className="bg-white"
                />
                <Typography variant="small" color="black" placeholder={""}>
                  {t("auth.password")}
                </Typography>
                <Input
                  crossOrigin=""
                  type="password"
                  label={t("auth.password")}
                  required={true}
                  color="black"
                  disabled={isPending}
                  onChange={(e) => setPassword(e.target.value)}
                  size="lg"
                  className="bg-white"
                />
              </CardBody>
              <CardFooter className="py-0" placeholder={""}>
                <Button
                  variant="gradient"
                  disabled={isPending}
                  fullWidth
                  color="black"
                  type="submit"
                  placeholder={""}
                >
                  {!isPending ? (
                    t("actions.login")
                  ) : (
                    <SpinnerLoader size="sm" />
                  )}
                </Button>
              </CardFooter>
              <div className="flex flex-row justify-center items-center gap-x-6 my-6">
                {langs.map((item) => {
                  return (
                    <Typography
                      variant="small"
                      color="black"
                      placeholder={""}
                      className={classNames(
                        {
                          "text-black underline underline-offset-4":
                            lang === item.id,
                        },
                        "cursor-pointer hover:text-gray-700"
                      )}
                      onClick={item.action}
                    >
                      {item.name}
                    </Typography>
                  );
                })}
              </div>
              {/* <h1>{t("Welcome to React")}</h1> */}
              <div className="flex flex-col justify-center items-center gap-y-1">
                <LogoIcon className="text-sm w-24 h-4 text-blue-700" />
                <span className="text-xs">Copyright© 2024 Merlin-3D.</span>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </main>
  );
}
