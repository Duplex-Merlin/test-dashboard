import React from "react";
import { LogoIcon, TailwindIcon } from "../../components/icons";
import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { findHosName } from "../../core/api/api";
import { isNil } from "lodash";
import Cookies from "js-cookie";
import { BEARER_TOKEN, HOSTNAME, TENANT_ID } from "../../core/entities/contant";
import { SpinnerLoader } from "../../components";

export default function StartPage() {
  const [hostName, setHostName] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { hostname: string }) => {
      return findHosName(data);
    },
    onSuccess(data) {
      if (!isNil(data.data)) {
        const tenant = data.data.tenantId as string;
        const hosname = data.data.hosname as string;

        Cookies.set(TENANT_ID, tenant, { path: "/" });
        Cookies.set(HOSTNAME, hosname, { path: "/" });

        window.location.href = "/login";
        //   process.env.REACT_APP_PROTOCOLE +
        //   `${hostName}.` +
        //   process.env.REACT_APP_DOMAIN +
        //   "/login";
        //   const newWindow = window.open(
        //   process.env.REACT_APP_PROTOCOLE +
        //     `${hostName}.` +
        //     process.env.REACT_APP_DOMAIN +
        //     "/login",
        // );
      } else {
        setMessage(data.message);
      }
    },
    onError(error) {
      setMessage(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    mutate({
      hostname: hostName,
    });
  };

  return (
    <>
      <div className="relative flex flex-row-reverse min-h-full flex-1">
        <a
          href="/"
          className="flex absolute right-4 top-0 font-normal text-primary-35 hover:text-primary-35"
        >
          <LogoIcon className="w-20 h-20 mr-2 text-blue-700" />
        </a>
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex flex-col gap-y-4">
              <h2 className="mt-8 text-4xl font-normal leading-9 tracking-tight text-gray-900">
                What's the name of your company ?
              </h2>
              <span className="text-sm text-gray-600">
                This will be the name of your administration console.
              </span>
            </div>

            <div className="mt-4">
              <div>
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="relative">
                    <div className="mt-2 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        required={true}
                        disabled={isPending}
                        className="block w-full min-w-0 flex-1 px-3 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black focus:outline-none sm:text-sm sm:leading-6"
                        placeholder="companyname"
                        onChange={(e) => setHostName(e.target.value)}
                      />
                      <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                        .merlindeffo.com
                      </span>
                    </div>
                    {message ? (
                      <span className="absolute text-sm text-red-300">
                        {message}{" "}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="w-40">
                    <Button
                      variant="gradient"
                      disabled={isPending}
                      fullWidth
                      color="black"
                      type="submit"
                      placeholder={""}
                      size="md"
                      className="rounded-none"
                    >
                      <span>
                        {isPending ? <SpinnerLoader size="sm" /> : "Next"}{" "}
                      </span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 bg-black flex-1 lg:block">
          <div className="absolute z-50 h-full w-full  bg-element-2 bg-cover flex justify-center items-center">
            <div className="flex flex-col w-[800px] gap-y-4">
              <h1 className={` text-white text-6xl`}>Welcome</h1>
              <div className="bg-black">
                <span className="text-white opacity-70 ">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
