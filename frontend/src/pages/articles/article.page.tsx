import React, { ChangeEvent } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { NewspaperIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Content } from "../../layouts";
import { ArticleResponse, ArticlesPaginate } from "../../core/entities";
import {
  DeleteDialog,
  DialogWithImage,
  EmptyBlock,
  ErrorBlock,
  PaginationCustom,
  SpinnerLoader,
} from "../../components";
import { isEmpty, isNil } from "lodash";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteArticle, getAllArticles } from "../../core/api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getTenant, isSuperAdmin, parseDateWith } from "../../utils/common";
import { useAuthContext } from "../../core/context/auth-context";

export default function ArticlePage() {
  const { t, currentUser } = useAuthContext();
  const [query, setQuery] = React.useState<string>("");

  const TABLE_HEAD = [
    t("news.cover"),
    t("news.title"),
    t("news.description"),
    t("news.status"),
    t("news.created"),
    t("news.actions"),
  ];

  const {
    data: articlesData,
    refetch: refreshArticles,
    isPending,
    error,
  } = useQuery<ArticlesPaginate>({
    queryKey: ["all-Articles", query],
    queryFn: () => getAllArticles(query),
  });

  const navigate = useNavigate();

  const [openImage, setOpenImage] = React.useState(false);

  const [openDelete, setOpenDelete] = React.useState(false);

  const [image, setImage] = React.useState<string>("");

  const [article, setArticle] = React.useState<ArticleResponse>();

  const [qSearch, setQSearch] = React.useState<string>("");

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQSearch(e.target.value);
  };

  const handleDelete = React.useCallback((item: ArticleResponse) => {
    setArticle(item);
    setOpenDelete(true);
  }, []);

  const { mutate: handleDeleteArticle, isPending: deleteISpending } =
    useMutation({
      mutationFn: (articleId: string) => {
        return deleteArticle(articleId);
      },
      onSuccess(data) {
        if (!isNil(data.data)) {
          refreshArticles();
          toast(t("news.article_deleted"), { type: "success" });
          setOpenDelete(false);
        } else {
          toast(data.message, { type: "error" });
          setOpenDelete(false);
        }
      },
      onError(error) {},
    });
  const handleConfirmDelete = React.useCallback(async () => {
    handleDeleteArticle(article?.id!);
  }, [article?.id, handleDeleteArticle]);

  const findArticles = React.useMemo(() => {
    if (isEmpty(articlesData?.data)) {
      return articlesData;
    }

    const filteredArticles = articlesData?.data.filter(
      (item) =>
        item.title.toLowerCase().includes(qSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(qSearch.toLowerCase())
    );

    return {
      ...articlesData,
      data: filteredArticles,
    };
  }, [articlesData, qSearch]);

  const handleChangePage = (item: number) => {
    setQuery(`?page=${item}`);
  };

  return (
    <Content>
      <div className="mb-8 flex flex-col gap-12 h-full">
        <Card className="h-full w-full" placeholder="">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none"
            placeholder=""
          >
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray" placeholder="">
                  {t("news.news_list")}
                </Typography>
                <Typography
                  color="gray"
                  className="mt-1 font-normal"
                  placeholder=""
                >
                  {t("news.see_information")}
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  className="flex items-center gap-3 uppercase"
                  size="sm"
                  placeholder=""
                  color="purple"
                  onClick={() => navigate("/dashboard/new-articles")}
                >
                  <NewspaperIcon strokeWidth={2} className="h-4 w-4" />{" "}
                  {t("actions.add_news")}
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
              {/* <Tabs value="all" className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs> */}
              <div className="w-full md:w-72">
                <Input
                  label={t("news.search")}
                  crossOrigin=""
                  onChange={handleQueryChange}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-4" placeholder="">
            {isPending ? (
              <SpinnerLoader size="xl" />
            ) : (
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={head}
                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                          placeholder=""
                        >
                          {head}
                          {index !== TABLE_HEAD.length - 1 && (
                            <ChevronUpDownIcon
                              strokeWidth={2}
                              className="h-4 w-4"
                            />
                          )}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {!error ? (
                    findArticles!.data!.length > 0 ? (
                      findArticles!.data?.map((item, index) => {
                        const isLast = index === findArticles!.data!.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50 ";

                        return (
                          <tr key={index}>
                            <td className={classes}>
                              <div className="flex items-center cursor-pointer gap-3">
                                <Avatar
                                  variant="square"
                                  src={
                                    process.env.REACT_APP_FILE_URL +
                                    `/uploads/${getTenant()}/${
                                      item.coverPicture
                                    }`
                                  }
                                  alt={item.title}
                                  size="xl"
                                  onClick={() => {
                                    setImage(
                                      process.env.REACT_APP_FILE_URL +
                                        `/uploads/${getTenant()}/${
                                          item.coverPicture
                                        }`
                                    );
                                    setOpenImage(true);
                                  }}
                                  placeholder=""
                                />
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex items-center gap-3">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                  placeholder=""
                                >
                                  {item.title.length < 20
                                    ? item.title
                                    : item.title.slice(0, 20) + "..."}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                  placeholder=""
                                >
                                  {item.description.length < 50
                                    ? item.description
                                    : item.description.slice(0, 50) + "..."}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Chip
                                  variant="ghost"
                                  size="sm"
                                  value={item.status ? "online" : "offline"}
                                  color={item.status ? "green" : "blue-gray"}
                                />
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                                placeholder=""
                              >
                                {parseDateWith(item.createdAt)}
                              </Typography>
                            </td>
                            {isSuperAdmin(currentUser?.role!) ? (
                              <td className={classes}>
                                {/* <Tooltip content="Edit News">
                            <IconButton
                              variant="text"
                              onClick={() => handleUpdate(item)}
                              placeholder=""
                            >
                              <PencilIcon className="h-4 w-4" color="green" />
                            </IconButton>
                          </Tooltip> */}
                                <Tooltip content="Delete News">
                                  <IconButton
                                    variant="text"
                                    onClick={() => handleDelete(item)}
                                    placeholder=""
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
                            reload={refreshArticles}
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
              totalPages={findArticles?.totalPages!}
              page={findArticles?.page!}
            />
          </CardBody>
          {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter> */}
        </Card>
      </div>
      <DialogWithImage
        open={openImage}
        handleOpen={() => setOpenImage(!openImage)}
        imageUrl={image}
      />{" "}
      <DeleteDialog
        open={openDelete}
        loading={deleteISpending}
        handleDelete={handleConfirmDelete}
        handleOpen={() => setOpenDelete(!openDelete)}
        title={t("news.delete_item")}
        description={t("news.are_sure")}
      />
      {/*
      <CreateArticleDialog
        open={openUpdate}
        handleOpen={() => setOpenUpdate(!openUpdate)}
        dispatch={handleUpdateResponse}
        action="edit"
        article={article}
      /> */}
    </Content>
  );
}
