import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ClipboardDocumentIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import React, { ChangeEvent } from "react";
import { Content } from "../../layouts";
import {
  UpdateRequest,
  User,
  UserPaginate,
  UserRole,
} from "../../core/entities/user";
import {
  DeleteDialog,
  EmptyBlock,
  ErrorBlock,
  PaginationCustom,
  SignUpDialog,
  SpinnerLoader,
  UpdatePasswordDialog,
} from "../../components";
import { isEmpty, isNil } from "lodash";
import {
  isSuperAdmin,
  parseDateWith,
  parseDateWithHour,
} from "../../utils/common";
import { deleteUser, getAllUsers } from "../../core/api/api";
import { toast } from "react-toastify";
import { useAuthContext } from "../../core/context/auth-context";

export default function UserPage() {
  const { t, currentUser } = useAuthContext();
  const [query, setQuery] = React.useState<string>("");

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    refetch: refreshUsers,
    error,
  } = useQuery<UserPaginate>({
    queryKey: ["all-users", query],
    queryFn: () => getAllUsers(query),
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
  const [openUpadePassword, setOpenUpdatePassword] = React.useState(false);
  const [qSearch, setQSearch] = React.useState<string>("");

  const [user, setUser] = React.useState<User>();

  const handleResponse = React.useCallback(() => {
    refreshUsers();
  }, [refreshUsers]);

  const handleUpdateResponse = React.useCallback(
    (user: UpdateRequest) => {
      refreshUsers();
    },
    [refreshUsers]
  );

  const handleDelete = React.useCallback((user: User) => {
    setUser(user);
    setOpen(true);
  }, []);

  const handleUpdate = React.useCallback((item: User) => {
    setUser(item);
    setOpenUpdateSignUp(true);
  }, []);

  const handleUpdatePassword = React.useCallback((item: User) => {
    setUser(item);
    setOpenUpdatePassword(true);
  }, []);

  const handleConfirmDelete = React.useCallback(async () => {
    handleDeleteUser(user!.id);
  }, [handleDeleteUser, user]);

  const handleChangePage = (item: number) => {
    setQuery(`?page=${item}`);
  };
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQSearch(e.target.value);
  };
  const findUsers = React.useMemo(() => {
    if (isEmpty(usersData?.data)) {
      return usersData;
    }

    const filteredUsers = usersData?.data.filter(
      (item) =>
        item.username.toLowerCase().includes(qSearch.toLowerCase()) ||
        item.email.toLowerCase().includes(qSearch.toLowerCase())
    );

    return {
      ...usersData,
      data: filteredUsers,
    };
  }, [usersData, qSearch]);

  return (
    <Content>
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
                  {t("users.user_info")}
                </Typography>
                <Typography
                  color="gray"
                  className="mb-1 font-normal"
                  placeholder=""
                >
                  {t("users.all_user")}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col justify-end items-end gap-4">
              {isSuperAdmin(currentUser?.role!) ? (
                <div>
                  <Button
                    onClick={() => setOpenSignUp(true)}
                    className="flex items-center gap-3 uppercase"
                    size="sm"
                    color="black"
                    placeholder={""}
                  >
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" />{" "}
                    {t("users.add_user")}
                  </Button>
                </div>
              ) : (
                <></>
              )}
              <div className="w-full md:w-72">
                <Input
                  label={t("users.search")}
                  crossOrigin=""
                  onChange={handleQueryChange}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody placeholder={""} className="px-0 pt-0 pb-2">
            {isLoadingUsers ? (
              <SpinnerLoader size="xl" />
            ) : (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[
                      t("users.name"),
                      t("users.email"),
                      t("users.role"),
                      t("users.last_connect"),
                      t("users.created"),
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
                  {!error ? (
                    findUsers!.data!.length > 0 ? (
                      findUsers!.data?.map((item, key) => {
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
                            {isSuperAdmin(currentUser?.role!) ? (
                              <td className={className}>
                                <Tooltip content="Update Password">
                                  <IconButton
                                    variant="text"
                                    onClick={() => handleUpdatePassword(item)}
                                    placeholder={""}
                                  >
                                    <LockClosedIcon
                                      className="h-4 w-4"
                                      color="black"
                                    />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip content="Edit User">
                                  <IconButton
                                    variant="text"
                                    onClick={() => handleUpdate(item)}
                                    placeholder={""}
                                  >
                                    <PencilIcon
                                      className="h-4 w-4"
                                      color="green"
                                    />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip content="Delete User">
                                  <IconButton
                                    variant="text"
                                    onClick={() => handleDelete(item)}
                                    placeholder={""}
                                  >
                                    <TrashIcon
                                      className="h-4 w-4"
                                      color="red"
                                    />
                                  </IconButton>
                                </Tooltip>
                              </td>
                            ) : (
                              <></>
                            )}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          <EmptyBlock />
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan={6}>
                        <div>
                          <ErrorBlock
                            message={error.message}
                            reload={refreshUsers}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
            <PaginationCustom
              prevPage={(index) => handleChangePage(index - 1)}
              nextPage={(index) => handleChangePage(index + 1)}
              changePage={handleChangePage}
              totalPages={findUsers?.totalPages!}
              page={findUsers?.page!}
            />
          </CardBody>
        </Card>
      </div>
      <DeleteDialog
        open={open}
        loading={deleteISpending}
        handleOpen={() => setOpen(!open)}
        handleDelete={() => handleConfirmDelete()}
        title={t("users.remove_user")}
        description={t("users.are_your_sure")}
      />
      <SignUpDialog
        open={openSignUp}
        handleOpen={() => setOpenSignUp(!openSignUp)}
        dispatch={handleResponse}
        title={t("users.create_user")}
        description={t("users.login_email")}
        action="add"
      />
      <SignUpDialog
        open={openUpadeSignUp}
        handleOpen={() => setOpenUpdateSignUp(!openUpadeSignUp)}
        dispatch={handleUpdateResponse}
        user={user}
        title={t("users.update_user")}
        description={t("users.update_info")}
        action="edit"
      />
      {!isNil(user) ? (
        <UpdatePasswordDialog
          userId={user.id}
          open={openUpadePassword}
          handleOpen={() => setOpenUpdatePassword(!openUpadePassword)}
        />
      ) : (
        <></>
      )}
    </Content>
  );
}
