import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Content } from "../../layouts";
import { UpdateRequest, User, UserRole } from "../../core/entities/user";
import { DeleteDialog, SignUpDialog, SpinnerLoader } from "../../components";
import { isNil } from "lodash";
import { parseDateWith, parseDateWithHour } from "../../utils/common";
import { deleteUser, getAllUsers } from "../../core/api/api";
import { toast } from "react-toastify";

export default function UserPage() {
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    refetch: refreshUsers,
  } = useQuery<User[]>({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
  });

  const { mutate: handleDeleteUser, isPending: deleteISpending } = useMutation({
    mutationFn: (userId: string) => {
      return deleteUser(userId);
    },
    onSuccess(data) {
      if (!isNil(data.data)) {
        refreshUsers();
        toast("User deleted", { type: "success" });
        setOpen(!open);
      } else {
        toast(data.message, { type: "error" });
        setOpen(!open);
      }
    },
    onError(error) {},
  });
  const [open, setOpen] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openUpadeSignUp, setOpenUpdateSignUp] = React.useState(false);

  const [users, setUsers] = React.useState<User[]>([]);
  const [user, setUser] = React.useState<User>();

  const handleResponse = React.useCallback(() => {
    refreshUsers();
  }, [users]);

  const handleUpdateResponse = React.useCallback(
    (user: UpdateRequest) => {
      refreshUsers();
      // setUsers((prevUsers) => {
      //   const index = users.findIndex((item) => item.id === user.id);
      //   if (index > -1) {
      //     const newUsers = [...prevUsers];
      //     newUsers[index] = {
      //       ...newUsers[index],
      //       email: user.email,
      //       username: user.username,
      //     };
      //     return newUsers;
      //   }
      //   return prevUsers;
      // });
    },
    [users]
  );

  const handleDelete = React.useCallback((user: User) => {
    setUser(user);
    setOpen(true);
  }, []);

  const handleUpdate = React.useCallback((item: User) => {
    setUser(item);
    setOpenUpdateSignUp(true);
  }, []);

  const handleConfirmDelete = React.useCallback(async () => {
    handleDeleteUser(user!.id);
  }, [open, user?.id, users]);

  return (
    <Content>
      {" "}
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card placeholder={""}>
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none flex justify-between"
            placeholder=""
          >
            <div className="mb-4 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray" placeholder="">
                  Users Informations
                </Typography>
                <Typography
                  color="gray"
                  className="mb-1 font-normal"
                  placeholder=""
                >
                  All users list
                </Typography>
              </div>
            </div>
            <div>
              <Button
                onClick={() => setOpenSignUp(true)}
                className="flex items-center gap-3"
                size="sm"
                placeholder={""}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add user
              </Button>
            </div>
          </CardHeader>
          <CardBody
            placeholder={""}
            className="px-0 pt-0 pb-2"
          >
            {isLoadingUsers ? (
              <SpinnerLoader size="xl" />
            ) : (
              
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[
                      "Name",
                      "email",
                      "role",
                      "Last Connected",
                      "created",
                      "",
                    ].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          placeholder={""}
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {usersData!.length > 0 ? (
                    usersData!.map((item, key) => {
                      const className = `py-3 px-5 `;
                      return (
                        <tr key={key}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <Avatar
                                placeholder={""}
                                src={"/assets/images/avatar.jpg"}
                                alt={item.username}
                                size="sm"
                              />
                              <div>
                                <Typography
                                  placeholder={""}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {item.username}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography
                              placeholder={""}
                              className="text-xs font-normal text-blue-gray-500"
                            >
                              {item.email}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              placeholder={""}
                              className="text-xs font-normal text-blue-gray-500"
                            >
                              {item.role === UserRole.SuperAdmin
                                ? "Super Admin"
                                : "Admin"}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              placeholder={""}
                              className="text-xs font-semibold text-blue-gray-600"
                            >
                              {isNil(item.lastLogin)
                                ? "..."
                                : parseDateWithHour(item.lastLogin)}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Typography
                              placeholder={""}
                              className="text-xs font-semibold text-blue-gray-600"
                            >
                              {parseDateWith(item.createdAt)}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Tooltip content="Edit User">
                              <IconButton
                                variant="text"
                                onClick={() => handleUpdate(item)}
                                placeholder={""}
                              >
                                <PencilIcon className="h-4 w-4" color="green" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Delete User">
                              <IconButton
                                variant="text"
                                onClick={() => handleDelete(item)}
                                placeholder={""}
                              >
                                <TrashIcon className="h-4 w-4" color="red" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className={`py-3 px-5 `}>No data found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>
      </div>
      <DeleteDialog
        open={open}
        loading={deleteISpending}
        handleOpen={() => setOpen(!open)}
        handleDelete={() => handleConfirmDelete()}
        title="Remove this User"
        description="Are you sure you want to delete this user?"
      />
      <SignUpDialog
        open={openSignUp}
        handleOpen={() => setOpenSignUp(!openSignUp)}
        dispatch={handleResponse}
        title="Create new user"
        description="Enter your login email and password."
        action="add"
      />
      <SignUpDialog
        open={openUpadeSignUp}
        handleOpen={() => setOpenUpdateSignUp(!openUpadeSignUp)}
        dispatch={handleUpdateResponse}
        user={user}
        title="Update this user"
        description="Update your name and email."
        action="edit"
      />
    </Content>
  );
}
