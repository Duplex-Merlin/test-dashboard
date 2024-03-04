import React, { ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import MDEditor from "@uiw/react-md-editor";
import { Content } from "../../layouts";
import { AlertNotification, SpinnerLoader } from "../../components";
import { toast } from "react-toastify";
import { createArticle } from "../../core/api/api";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../core/context/auth-context";

export default function NewArticlePage() {
  const { t } = useAuthContext();
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [content, setContent] = React.useState<any>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const [openAlert, setOpenAlert] = React.useState<boolean>(false);

  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const { mutate: createArticleMutate, isPending } = useMutation({
    mutationFn: (articleRequest: FormData) => {
      return createArticle(articleRequest);
    },
    onSuccess(data) {
      try {
        if (data.status === 201) {
          toast(t("news.create_success"), { type: "success" });
          setFile(null);
          setTitle("");
          setDescription("");
          setContent("");
        } else {
          setOpenAlert(true);
          console.log(data);

          setErrorMessage(data.data.message);
        }
      } catch (error) {
        setOpenAlert(true);
        setErrorMessage(error as string);
      }
    },
    onError(error) {
      setOpenAlert(true);
      setErrorMessage(error.message as string);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("coverPicture", file!);
    createArticleMutate(formData);
    // const response = await createArticle(formData);
    // try {
    //   if (response.status === 201) {
    //     toast("Create successfuly...", { type: "success" });
    //     // const data = response.data.data as ArticleResponse;
    //     setFile(null);
    //     setTitle("");
    //     setDescription("");
    //     setContent("");
    //   } else {
    //     console.log(response);
    //     setOpenAlert(true);
    //     setErrorMessage(response.data.message);
    //   }
    // } catch (error) {
    //   setOpenAlert(true);
    //   setErrorMessage(error as string);
    // }

    // setLoading(false);
  };

  return (
    <Content>
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col gap-12 w-full"
      >
        <Card className="h-full w-full" placeholder="">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none"
            placeholder=""
          >
            <div className="mb-4 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray" placeholder="">
                  {t("news.write_news")}
                </Typography>
                <Typography
                  color="gray"
                  className="mb-1 font-normal"
                  placeholder=""
                >
                  {t("news.write_info")}
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-0 mx-6" placeholder="">
            <AlertNotification
              open={openAlert}
              handleOpen={() => setOpenAlert(!openAlert)}
              content={errorMessage}
              color={"red"}
              type={"danger"}
            >
              {" "}
            </AlertNotification>
            <Typography className="pb-2" variant="h6" placeholder={""}>
              {t("news.cover")}
            </Typography>
            <Input
              type="file"
              // required={isEmpty(article) ? true : false}
              disabled={isPending}
              label={t("news.cover")}
              size="lg"
              crossOrigin=""
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="grid grid-cols-2 gap-x-2 mt-4">
              <div className="flex flex-col gap-y-4">
                <Typography className="-mb-2" variant="h6" placeholder={""}>
                  {t("news.title")}
                </Typography>
                <Input
                  label={t("news.enter_title")}
                  required
                  size="lg"
                  //   defaultValue={!isEmpty(article) ? article.title : ""}
                  disabled={isPending}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  crossOrigin=""
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <Typography className="-mb-2" variant="h6" placeholder={""}>
                  {t("news.description")}
                </Typography>
                <Input
                  label={t("news.enter_description")}
                  required
                  size="lg"
                  //   defaultValue={!isEmpty(article) ? article.description : ""}
                  disabled={isPending}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  crossOrigin=""
                />
              </div>
            </div>

            <Typography className="pb-2 pt-4" variant="h6" placeholder={""}>
              {t("news.content")}
            </Typography>
            {/* <Textarea
              className="-mb-2 h-96"
              required
              //   defaultValue={!isEmpty(article) ? article.content : ""}
              disabled={_isLoading}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Your Content here..."
              rows={20}
            /> */}

            <MDEditor
              data-color-mode="light"
              value={content}
              onChange={setContent}
            />
          </CardBody>
          <CardFooter placeholder={""} className="flex justify-end">
            {/* <Button
              variant="text"
              color="blue-gray"
              className="mr-1"
              placeholder={""}
            >
              <span>Reset</span>
            </Button> */}
            <Button
              variant="gradient"
              color="green"
              //   color={action === "add" ? "green" : "yellow"}
              type="submit"
              placeholder={""}
            >
              {!isPending ? t("actions.create") : <SpinnerLoader size="sm" />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Content>
  );
}
