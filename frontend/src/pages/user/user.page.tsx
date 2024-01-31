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
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import { Content } from "../../layouts";
import { UpdateResponse, User } from "../../core/entities/user";
import { DeleteDialog, SignUpDialog, SpinnerLoader } from "../../components";
import { isNil } from "lodash";
import { parseDateWith, parseDateWithHour } from "../../utils/common";

export default function UserPage() {
  const [open, setOpen] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openUpadeSignUp, setOpenUpdateSignUp] = React.useState(false);
  const [isFecthUsers, setIsFecthUsers] = React.useState(false);
  const [isDeleteLoading, setDeleteLoading] = React.useState<boolean>(false);

  const [users, setUsers] = React.useState<User[]>([]);
  const [user, setUser] = React.useState<User>();

  const onFecthUsers = async () => {
    setIsFecthUsers(true);

    // const query = new URLSearchParams({
    //   action: USER_ACTIONS.GET_ALL_USER,
    // });
    // //@ts-ignore
    // const response = await web.get(`/api/users`, query);
    // if (response.ok) {
    //   const data = await response.json();
    //   setUsers(data.data as User[]);
    // } else {
    //   console.log(response);
    // }
    setIsFecthUsers(false);
  };

  useEffect(() => {
    onFecthUsers();
  }, []);

  const handleResponse = React.useCallback(
    (user: User) => {
      setUsers([user, ...users]);
    },
    [users]
  );

  const handleUpdateResponse = React.useCallback(
    (user: UpdateResponse) => {
      setUsers((prevUsers) => {
        const index = users.findIndex((item) => item.id === user.id);
        if (index > -1) {
          const newUsers = [...prevUsers];
          newUsers[index] = {
            ...newUsers[index],
            email: user.email,
            username: user.username,
          };
          return newUsers;
        }
        return prevUsers;
      });
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
    setDeleteLoading(true);
    //@ts-ignore
    // const query = new URLSearchParams({
    //   action: USER_ACTIONS.DELETE_USER,
    //   userId: user?.id,
    // });
    // const response = await web.delete(`/api/users?${query}`);
    // if (response.ok) {
    //   const index = users.findIndex((item) => item.id === user?.id);

    //   if (index > -1) {
    //     users.splice(index, 1);
    //   }
    //   setOpen(!open);
    // } else {
    //   const error = await response.json();
    // }
    setDeleteLoading(false);
  }, [open, user?.id, users]);

  return (
    <Content>
      {" "}
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card placeholder={""}>
          <CardHeader
            variant="filled"
            color="blue"
            className="w-full flex flex-row justify-between mb-8 p-6 mx-auto"
            placeholder={""}
          >
            <Typography variant="h6" color="white" placeholder={""}>
              Users Informations {user?.username}
            </Typography>
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
            className="overflow-x-scroll px-0 pt-0 pb-2"
          >
            {isFecthUsers ? (
              <SpinnerLoader size="xl" />
            ) : (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Name", "email", "Last Connected", "created", ""].map(
                      (el) => (
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
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, key) => {
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
                  })}
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>
      </div>
      <DeleteDialog
        open={open}
        loading={isDeleteLoading}
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
