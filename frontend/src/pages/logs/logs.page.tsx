import React from "react";
import { Content } from "../../layouts";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { getAllLogs } from "../../core/api/api";
import { PaginationCustom, SpinnerLoader } from "../../components";
import classNames from "classnames";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";

export default function LogsPage() {
  const [query, setQuery] = React.useState<string>("");

  const {
    data: logsData,
    isLoading: isLoadingLogs,
  } = useQuery<any>({
    queryKey: ["all-logs", query],
    queryFn: () => getAllLogs(query),
  });

  const handleChangePage = (item: number) => {
    setQuery(`?page=${item}`);
  };

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
            <div className="mb-4 flex items-center w-full justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray" placeholder="">
                  Logs Informations
                </Typography>
                <Typography
                  color="gray"
                  className="mb-1 font-normal"
                  placeholder=""
                >
                  All logs list
                </Typography>
              </div>
              <Button
                placeholder={""}
                className="flex items-center gap-2"
                color="green"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardBody placeholder={""} className="px-0 pt-0 pb-2">
            {isLoadingLogs ? (
              <SpinnerLoader size="xl" />
            ) : (
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Level", "message", "created"].map((el) => (
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
                  {logsData.logs ? (
                    logsData!.logs.map((item: any, key: any) => {
                      const className = `py-3 px-5 `;
                      const level =
                        item.level === "info"
                          ? "bg-blue-500"
                          : item.level === "error"
                          ? "bg-red-500"
                          : "bg-yellow-500";
                      return (
                        <tr key={key}>
                          <td className={className}>
                            <div
                              className={classNames(
                                level,
                                "rounded-full mx-auto flex justify-center text-white w-1/2"
                              )}
                            >
                              <span>{item.level}</span>
                            </div>
                          </td>
                          <td className={className}>{item.message}</td>
                          <td className={className}>{item.timestamp}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className={`py-3 px-5 `}>Erro to fetch logs</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
            <PaginationCustom
              prevPage={(index) => handleChangePage(index - 1)}
              nextPage={(index) => handleChangePage(index + 1)}
              changePage={handleChangePage}
              totalPages={logsData?.totalPages!}
              page={logsData?.page!}
            />
          </CardBody>
        </Card>
      </div>
    </Content>
  );
}
