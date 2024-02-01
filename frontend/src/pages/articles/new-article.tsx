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
import { ArticleResponse } from "../../core/entities";
import { createArticle } from "../../core/api/api";

export default function NewArticlePage() {
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("coverPicture", file!);

    const response = await createArticle(formData);
    try {
      if (response.status === 201) {
        toast("Create successfuly...", { type: "success" });
        // const data = response.data.data as ArticleResponse;
        setFile(null);
        setTitle("");
        setDescription("");
        setContent("");
      } else {
        console.log(response);
        setOpenAlert(true);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setOpenAlert(true);
      setErrorMessage(error as string);
    }

    setLoading(false);
  };

  return (
    <Content>
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col gap-12 h-full w-full"
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
                  Write News
                </Typography>
                <Typography
                  color="gray"
                  className="mb-1 font-normal"
                  placeholder=""
                  
                >
                  Write information about all news
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
            <div className="grid grid-cols-2 gap-x-2 mt-4">
              <div className="flex flex-col gap-y-4">
                <Typography className="-mb-2" variant="h6" placeholder={""}>
                  Title
                </Typography>
                <Input
                  label="Enter Title"
                  required
                  size="lg"
                  //   defaultValue={!isEmpty(article) ? article.title : ""}
                  disabled={_isLoading}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  crossOrigin=""
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <Typography className="-mb-2" variant="h6" placeholder={""}>
                  Description
                </Typography>
                <Input
                  label="Enter Description"
                  required
                  size="lg"
                  //   defaultValue={!isEmpty(article) ? article.description : ""}
                  disabled={_isLoading}
                  onChange={(e) => setDescription(e.target.value)}
                  value={title}
                  crossOrigin=""
                />
              </div>
            </div>

            <Typography className="pb-2 pt-4" variant="h6" placeholder={""}>
              Content
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
            <Button
              variant="text"
              color="blue-gray"
              className="mr-1"
              placeholder={""}
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              //   color={action === "add" ? "green" : "yellow"}
              type="submit"
              placeholder={""}
            >
              {!_isLoading ? "Create" : <SpinnerLoader size="sm" />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Content>
  );
}
