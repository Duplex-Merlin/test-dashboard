import React, { ChangeEvent } from "react";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import {
    NewspaperIcon,
    PencilIcon,
    TrashIcon,
    UserPlusIcon,
  } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
import { Content } from "../../layouts";
import { ArticleResponse } from "../../core/entities";
import { CreateArticleDialog, DeleteDialog, DialogWithImage, SpinnerLoader } from "../../components";
import { isEmpty } from "lodash";

const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Online",
      value: "online",
    },
    {
      label: "Offline",
      value: "offline",
    },
  ];
  
  const TABLE_HEAD = ["Cover", "Title", "Description", "Status", "Created", ""];

export default function ArticlePage(){
    const [openImage, setOpenImage] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [image, setImage] = React.useState<string>("");
    const [isDeleteLoading, setDeleteLoading] = React.useState<boolean>(false);

    const [articles, setArticles] = React.useState<ArticleResponse[]>([]);
    const [article, setArticle] = React.useState<ArticleResponse>();
  
    const [isFecthArticles, setIsFecthArticles] = React.useState(false);
    const [qSearch, setQSearch] = React.useState<string>("");

    
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQSearch(e.target.value);
  };

  const fecthArticles = React.useCallback(async () => {
    setIsFecthArticles(true);

    // const query = new URLSearchParams({
    //   action: ARTICLES_ACTIONS.GET_ALL_ARTICLES,
    // });
    // //@ts-ignore
    // const response = await web.get(`/api/articles`, query);
    // if (response.ok) {
    //   const data = await response.json();
    //   setArticles(data.data as ArticleResponse[]);
    // } else {
    //   console.log(response);
    // }
    setIsFecthArticles(false);
  }, []);

  React.useEffect(() => {
    fecthArticles();
  }, []);

  const handleDelete = React.useCallback((item: ArticleResponse) => {
    setArticle(item);
    setOpenDelete(true);
  }, []);

  const handleUpdate = React.useCallback((item: ArticleResponse) => {
    setArticle(item);
    setOpenUpdate(true);
  }, []);

  const handleConfirmDelete = React.useCallback(async () => {
    setDeleteLoading(true);
    //@ts-ignore
    // const query = new URLSearchParams({
    //   action: ARTICLES_ACTIONS.DELETE_ARTICLES,
    //   articleId: article?.id,
    // });
    // const response = await web.delete(`/api/articles?${query}`);
    // if (response.ok) {
    //   const index = articles.findIndex((item) => item.id === article?.id);

    //   if (index > -1) {
    //     articles.splice(index, 1);
    //   }
    //   setOpenDelete(false);
    // } else {
    //   const error = await response.json();
    // }
    setDeleteLoading(false);
  }, [article?.id, articles]);

  const handleResponse = React.useCallback(
    (item: ArticleResponse) => {
      setArticles([item, ...articles]);
    },
    [articles]
  );


  const handleUpdateResponse = React.useCallback(
    (art: ArticleResponse) => {
      setArticles((prevUsers) => {
        const index = articles.findIndex((item) => item.id === art.id);
        if (index > -1) {
          const newArticles = [...prevUsers];
          newArticles[index] = {
            ...newArticles[index],
            title: art.title,
            description: art.description,
            content: art.content,
            coverPicture: art.coverPicture,
          };
          return newArticles;
        }
        return prevUsers;
      });
    },
    [articles]
  );

  const findArticles = React.useMemo(() => {
    if (isEmpty(qSearch)) {
      return articles;
    }
    return articles.filter(
      (item) =>
        item.title.includes(qSearch) || item.description.includes(qSearch)
    );
  }, [articles, qSearch]);


    return  <Content>
      <div className="mb-8 flex flex-col gap-12">
        <Card className="h-full w-full" placeholder=''>
          <CardHeader floated={false} shadow={false} className="rounded-none" placeholder=''>
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray" placeholder=''>
                  News List
                </Typography>
                <Typography color="gray" className="mt-1 font-normal"  placeholder=''>
                  See information about all news
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {/* <Button variant="outlined" size="sm">
                  view all
                </Button> */}
                <Button
                  className="flex items-center gap-3"
                  onClick={() => setOpenCreate(true)}
                  size="sm" placeholder=''
                >
                  <NewspaperIcon strokeWidth={2} className="h-4 w-4" /> Add news
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
                  label="Search"
                  crossOrigin=""
                  onChange={handleQueryChange}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0" placeholder=''>
            {isFecthArticles ? (
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
                          placeholder=''
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
                  {findArticles.map((item, index) => {
                    const isLast = index === articles.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <div className="flex items-center cursor-pointer gap-3">
                            <Avatar
                              variant="square"
                              src={`http://localhost:8001/uploads/${item.coverPicture}`}
                              alt={item.title}
                              size="xl"
                              onClick={() => {
                                setImage(
                                  `http://localhost:8001/uploads/${item.coverPicture}`
                                );
                                setOpenImage(true);
                              }}
                              placeholder=''
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              placeholder=''
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
                              placeholder=''
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
                            placeholder=''
                          >
                            {item.status}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit News">
                            <IconButton
                              variant="text"
                              onClick={() => handleUpdate(item)}
                              placeholder=''
                            >
                              <PencilIcon className="h-4 w-4" color="green" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete News">
                            <IconButton
                              variant="text"
                              onClick={() => handleDelete(item)}
                              placeholder=''
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
      />
      <DeleteDialog
        open={openDelete}
        loading={isDeleteLoading}
        handleDelete={handleConfirmDelete}
        handleOpen={() => setOpenDelete(!openDelete)}
        title="Delete this item"
        description="Are you sure you want to delete this item?"
      />
      <CreateArticleDialog
        open={openCreate}
        handleOpen={() => setOpenCreate(!openCreate)}
        dispatch={handleResponse}
        action="add"
      />
      <CreateArticleDialog
        open={openUpdate}
        handleOpen={() => setOpenUpdate(!openUpdate)}
        dispatch={handleUpdateResponse}
        action="edit"
        article={article}
      />
    </Content>
}