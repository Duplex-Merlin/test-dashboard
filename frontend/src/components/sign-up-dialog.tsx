import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { AlertNotification, SpinnerLoader, SelectedMenu } from ".";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { isEmpty, isNil } from "lodash";
import {
  UpdateRequest,
  User,
  UserRequest,
  UserRole,
  UserUpdateRequest,
  actionsType,
} from "../core/entities/user";
import { IOptions } from "./selected-menu";
import { useMutation } from "@tanstack/react-query";
import { createUser, updateUser } from "../core/api/api";

const roles: IOptions[] = [
  { value: UserRole.SuperAdmin, label: "Super Admin" },
  { value: UserRole.Admin, label: "Admin" },
];

interface SignUpDialogProps {
  handleOpen: () => void;
  open: boolean;
  title: string;
  description: string;
  action: actionsType;
  user?: User;
  dispatch?: (user: User | UpdateRequest | any) => void;
}

export function SignUpDialog({
  open,
  title,
  description,
  action,
  user,
  handleOpen,
  dispatch,
}: SignUpDialogProps) {
  const [username, setUserName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);

  const { mutate: createUserMutate, isPending: createUserIsPending } =
    useMutation({
      mutationFn: (userRequest: UserRequest) => {
        return createUser(userRequest);
      },
      onSuccess(data) {
        if (!isNil(data.data)) {
          toast("User add", { type: "success" });
          const user = data.data as User;
          dispatch!(user);
          handleOpen();
        } else {
          setErrorMessage(data.message);
          setOpenAlert(true);
        }
      },
      onError(error) {},
    });

  const { mutate: updateUserMutate, isPending: updateUserIsPending } =
    useMutation({
      mutationFn: (userUpdate: UserUpdateRequest) => {
        return updateUser(userUpdate.userId, userUpdate.userRequest);
      },
      onSuccess(data) {
        if (!isNil(data.data)) {
          toast("User update", { type: "success" });
          const user = data.data as User;
          dispatch!(user);
          handleOpen();
        } else {
          setErrorMessage(data.message);
          setOpenAlert(true);
        }
      },
      onError(error) {},
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setOpenAlert(false);
    if (action === "add") {
      createUserMutate({
        username: username,
        email: email,
        role: role,
        password: password,
      });
    } else {
      updateUserMutate({
        userId: user!.id,
        userRequest: {
          username: isEmpty(username) ? user!.username : username,
          email: isEmpty(email) ? user!.email : email,
          role,
        },
      });
    }
  };

  const content = action === "add" ? "Create" : "Update";

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none relative"
        placeholder={""}
      >
        <div className="flex items-center gap-2 bg-gray-500 rounded-lg absolute right-0 -top-4 z-50">
          <IconButton
            variant="text"
            size="sm"
            onClick={handleOpen}
            placeholder={""}
          >
            <XMarkIcon color="white" className="h-6" />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto w-full max-w-[24rem]" placeholder={""}>
            <CardBody className="flex flex-col gap-4" placeholder={""}>
              <Typography variant="h4" color="blue-gray" placeholder={""}>
                {title}
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
                placeholder={""}
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
              <Typography className="-mb-2" variant="h6" placeholder={""}>
                Your Name
              </Typography>
              <Input
                label="Name"
                size="lg"
                required
                type="text"
                defaultValue={!isEmpty(user) ? user.username : ""}
                disabled={createUserIsPending}
                onChange={(e) => setUserName(e.target.value)}
                crossOrigin=""
              />
              <Typography className="-mb-2" variant="h6" placeholder={""}>
                Your Email
              </Typography>
              <Input
                label="Email"
                size="lg"
                type="email"
                required
                defaultValue={!isEmpty(user) ? user.email : ""}
                disabled={createUserIsPending}
                onChange={(e) => setEmail(e.target.value)}
                crossOrigin=""
              />
              <Typography className="-mb-2" variant="h6" placeholder={""}>
                Role
              </Typography>
              <SelectedMenu options={roles} value={(item) => setRole(item)} />
              {action === "add" && (
                <>
                  <Typography className="-mb-2" variant="h6" placeholder={""}>
                    Your Password
                  </Typography>
                  <Input
                    label="Password"
                    size="lg"
                    required
                    disabled={createUserIsPending}
                    onChange={(e) => setPassword(e.target.value)}
                    crossOrigin=""
                  />
                </>
              )}
            </CardBody>
            <CardFooter className="pt-0" placeholder={""}>
              <Button
                variant="gradient"
                color={action === "add" ? "green" : "yellow"}
                fullWidth
                type="submit"
                placeholder={""}
              >
                {!createUserIsPending ? content : <SpinnerLoader size="sm" />}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}
