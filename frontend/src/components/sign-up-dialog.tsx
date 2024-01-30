import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  IconButton,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { AlertNotification, SpinnerLoader } from ".";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { isEmpty } from "lodash";
import { UpdateResponse, User, actionsType } from "../core/entities/user";

interface SignUpDialogProps {
  handleOpen: () => void;
  open: boolean;
  title: string;
  description: string;
  action: actionsType;
  user?: User;
  dispatch?: (user: User | UpdateResponse | any) => void;
}

export function SignUpDialog({
  open,
  title,
  description,
  action,
  user,
  dispatch,
  handleOpen,
}: SignUpDialogProps) {
  const [username, setUserName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);

  const [_isLoading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setOpenAlert(false);
    if (action === "add") {
    //   const query = new URLSearchParams({
    //     action: USER_ACTIONS.CREATE_USER,
    //   });

    //   const response = await web.post(
    //     `/api/users?${query}`,
    //     JSON.stringify({
    //       username,
    //       email,
    //       password,
    //     })
    //   );

    //   if (response.ok) {
    //     toast("User add", { type: "success" });
    //     const data = (await response.json()).data as User;
    //     dispatch!(data);
    //     handleOpen();
    //   } else {
    //     const error = await response.json();
    //     setErrorMessage(error.message);
    //     setOpenAlert(true);
    //   }
    } else {
      //@ts-ignore
    //   const query = new URLSearchParams({
    //     action: USER_ACTIONS.UPDATE_USER,
    //     userId: user?.id,
    //   });

      const data = {
        username: isEmpty(username) ? user?.username : username,
        email: isEmpty(email) ? user?.email : email,
      };

    //   const response = await web.patch(
    //     `/api/users?${query}`,
    //     JSON.stringify(data)
    //   );

    //   if (response.ok) {
    //     toast("User update", { type: "success" });
    //     const data = (await response.json()).data as UpdateResponse;
    //     dispatch!(data);
    //     handleOpen();
    //   } else {
    //     const error = await response.json();
    //     setErrorMessage(error.message);
    //     setOpenAlert(true);
    //   }
    }

    setLoading(false);
  };

  const content = action === "add" ? "Create" : "Update";

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none relative"
        placeholder={''}
      >
        <div className="flex items-center gap-2 bg-gray-500 rounded-lg absolute right-0 -top-4 z-50">
          <IconButton variant="text" size="sm" onClick={handleOpen} placeholder={''}>
            <XMarkIcon color="purple" className="h-6" />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto w-full max-w-[24rem]" placeholder={''}>
            <CardBody className="flex flex-col gap-4" placeholder={''}>
              <Typography variant="h4" color="blue-gray" placeholder={''}>
                {title}
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
                placeholder={''}
              >
                {description}
              </Typography>
              <AlertNotification
                open={openAlert}
                handleOpen={() => setOpenAlert(!openAlert)}
                content={errorMessage}
                color={"red"}
                type={"danger"}
              >
                {" "}
              </AlertNotification>
              <Typography className="-mb-2" variant="h6" placeholder={''}>
                Your Name
              </Typography>
              <Input
                label="Name"
                size="lg"
                required
                type="text"
                defaultValue={!isEmpty(user) ? user.username : ""}
                disabled={_isLoading}
                onChange={(e) => setUserName(e.target.value)}
                crossOrigin=""
              />
              <Typography className="-mb-2" variant="h6" placeholder={''}>
                Your Email
              </Typography>
              <Input
                label="Email"
                size="lg"
                type="email"
                required
                defaultValue={!isEmpty(user) ? user.email : ""}
                disabled={_isLoading}
                onChange={(e) => setEmail(e.target.value)}
                crossOrigin=""
              />
              {action === "add" && (
                <>
                  <Typography className="-mb-2" variant="h6" placeholder={''}>
                    Your Password
                  </Typography>
                  <Input
                    label="Password"
                    size="lg"
                    required
                    disabled={_isLoading}
                    onChange={(e) => setPassword(e.target.value)}
                    crossOrigin=""
                  />
                </>
              )}
            </CardBody>
            <CardFooter className="pt-0" placeholder={''}>
              <Button
                variant="gradient"
                color={action === "add" ? "green" : "yellow"}
                fullWidth
                type="submit"
                placeholder={''}
              >
                {!_isLoading ? content : <SpinnerLoader size="sm" />}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}