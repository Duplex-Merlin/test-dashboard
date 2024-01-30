import React, { ChangeEvent } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { isEmpty } from "lodash";
import { AlertNotification, SpinnerLoader } from ".";
// import { web } from "@/core/interceptor/web.interceptor";
import { toast } from "react-toastify";
import { actionsType } from "../core/entities/user";
import { ArticleResponse } from "../core/entities";

interface CreateArticleDialogProps {
  handleOpen: () => void;
  open: boolean;
  action: actionsType;
  article?: ArticleResponse;
  dispatch?: (articleResponse: ArticleResponse) => void;
}

export default function CreateArticleDialog({
  open,
  handleOpen,
  action,
  article,
  dispatch,
}: CreateArticleDialogProps) {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [content, setContent] = React.useState<any>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const [_isLoading, setLoading] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);

  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setOpenAlert(false);
    if (action === "add") {
    //   const query = new URLSearchParams({
    //     action: ARTICLES_ACTIONS.CREATE_ARTICLES,
    //   });

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("coverPicture", file!);

    //   const response = await web.axios(`/api/articles?${query}`, formData);

    //   try {
    //     if (response.status === 200) {
    //       toast("User add", { type: "success" });
    //       const data = response.data.data as ArticleResponse;
    //       dispatch!(data);
    //       handleOpen();
    //     }
    //   } catch (error) {
    //     setErrorMessage(error as string);
    //     setOpenAlert(true);
    //   }
    // } else {
    //   //@ts-ignore
    //   const query = new URLSearchParams({
    //     action: ARTICLES_ACTIONS.UPDATE_ARTICLES,
    //     articleId: article?.id,
    //   });

    //   const formData = new FormData();
      const uTitle = isEmpty(title) ? article?.title : title;
      const uDescription = isEmpty(description)
        ? article?.description
        : description;
      const uContent = isEmpty(content) ? article?.content : content;

      formData.append("title", uTitle as string);
      formData.append("description", uDescription as string);
      formData.append("content", uContent as string);
      if (file) {
        formData.append("coverPicture", file!);
      }

    //   try {
    //     const response = await web.axiospatch(
    //       `/api/articles?${query}`,
    //       formData
    //     );
    //     if (response.status === 200) {
    //       toast("User update", { type: "success" });
    //       const data = response.data.data as ArticleResponse[];
    //       dispatch!(data[0]);
    //       handleOpen();
    //     }
    //   } catch (error) {
    //     setErrorMessage(error as string);
    //     setOpenAlert(true);
    //   }
    }

    setLoading(false);
  };

  const contentText = action === "add" ? "Create" : "Update";

  return (
    <>
      <Dialog open={open} size="md" handler={handleOpen} placeholder={''}>
        <form onSubmit={handleSubmit}>
          <DialogHeader placeholder={''}>
            {action === "add" ? "Add News." : "Update News"}
          </DialogHeader>
          <DialogBody className="flex flex-col gap-4" placeholder={''}>
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
              Cover
            </Typography>
            <Input
              type="file"
              // required={isEmpty(article) ? true : false}
              disabled={_isLoading}
              label="cover"
              size="lg"
              crossOrigin=""
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="grid grid-cols-2 gap-x-2">
              <div className="flex flex-col gap-y-4">
                <Typography className="-mb-2" variant="h6" placeholder={''}>
                  Title
                </Typography>
                <Input
                  label="Enter Title"
                  required
                  size="lg"
                  defaultValue={!isEmpty(article) ? article.title : ""}
                  disabled={_isLoading}
                  onChange={(e) => setTitle(e.target.value)}
                  crossOrigin=""
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <Typography className="-mb-2" variant="h6" placeholder={''}>
                  Description
                </Typography>
                <Input
                  label="Enter Description"
                  required
                  size="lg"
                  defaultValue={!isEmpty(article) ? article.description : ""}
                  disabled={_isLoading}
                  onChange={(e) => setDescription(e.target.value)}
                  crossOrigin=""
                />
              </div>
            </div>

            <Typography className="-mb-2" variant="h6" placeholder={''}>
              Content
            </Typography>
            <Textarea
              className="-mb-2 h-96"
              required
              defaultValue={!isEmpty(article) ? article.content : ""}
              disabled={_isLoading}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Your Content here..."
              rows={20}
            />
          </DialogBody>
          <DialogFooter placeholder={''}>
            <Button
              variant="text"
              color="blue-gray"
              onClick={handleOpen}
              className="mr-1"
              placeholder={''}
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color={action === "add" ? "green" : "yellow"}
              type="submit"
              placeholder={''}
            >
              {!_isLoading ? contentText : <SpinnerLoader size="sm" />}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}