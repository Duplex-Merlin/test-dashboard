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
import { isEmpty } from "lodash";
import { AlertNotification, SpinnerLoader } from "../../components";
import { AlertType } from "../../components/alert-notification";
import { TailwindIcon } from "../../components/icons";

export default function AuthPage() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  const [messages, setMessages] = React.useState<{
    message: string | null;
    type: AlertType | null;
    color: any;
  }>();

  const [_isLoading, setLoading] = React.useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessages({ message: null, type: null, color: "" });
    setLoading(true);
    setOpen(false);
    // const query = new URLSearchParams({
    //   action: AUTH_ACTIONS.LOGIN_ACTION,
    // });

    // const response = await web.post(
    //   `/api/auth?${query}`,
    //   JSON.stringify({
    //     email,
    //     password,
    //   })
    // );
    // setOpen(true);

    // if (response.ok) {
    //   setMessages({
    //     message: "Connected you will be redirected....",
    //     type: "success",
    //     color: "green",
    //   });
    //   // router.("/admin/dashboard")
    //   window.location.href = "/admin/dashboard/home";
    // } else {
    //   const error = await response.json();
    //   setMessages({
    //     message: error.message,
    //     type: "danger",
    //     color: "red",
    //   });
    // }
    // setLoading(false);
  };

  const message = !isEmpty(messages?.message) ? messages?.message! : "";

  return (
    <>
      <div className="absolute inset-0 z-0 h-full w-full bg-element bg-cover bg-no-repeat bg-primary-20">
        <div className="container mx-auto p-4">
          <form onSubmit={handleSubmit}>
            <Card
              className="absolute  top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4"
              placeholder={""}
              shadow={false}
            >
              <CardHeader
                className="mb-4 grid h-28 place-items-center"
                placeholder={""}
                shadow={false}
              >
                <TailwindIcon className="text-blue-700"/>
              </CardHeader>
              <CardBody className="flex flex-col gap-4" placeholder={""}>
                <AlertNotification
                  open={open}
                  handleOpen={() => setOpen(!open)}
                  content={message}
                  color={messages ? messages!.color : "white"}
                  type={messages ? messages?.type! : "info"}
                >
                  {" "}
                </AlertNotification>
                <Typography variant="small" color="black" placeholder={""}>
                  Adresse email
                </Typography>
                <Input
                  crossOrigin=""
                  required={true}
                  disabled={_isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  label="Email"
                  size="lg"
                />
                <Typography variant="small" color="black" placeholder={""}>
                  Mot de passe
                </Typography>
                <Input
                  crossOrigin=""
                  type="password"
                  label="Password"
                  required={true}
                  disabled={_isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  size="lg"
                />
              </CardBody>
              <CardFooter className="pt-0" placeholder={""}>
                <Button
                  variant="gradient"
                  disabled={_isLoading}
                  fullWidth
                  type="submit"
                  placeholder={""}
                >
                  {!_isLoading ? "Connexion" : <SpinnerLoader size="sm" />}
                </Button>
              </CardFooter>
              <div className="flex flex-row justify-center items-center gap-x-6 my-12">
                <Typography
                  variant="small"
                  color="black"
                  placeholder={""}
                  className="cursor-pointer"
                >
                  Français
                </Typography>
                <Typography
                  variant="small"
                  color="black"
                  placeholder={""}
                  className="cursor-pointer"
                >
                  Anglais
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-center gap-y-1">
                <TailwindIcon className="text-sm w-24 text-blue-700" />
                <span className="text-xs">Copyright© 2024 Merlin-3D.</span>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
}
