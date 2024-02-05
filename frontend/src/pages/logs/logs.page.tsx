import { useQuery } from "@tanstack/react-query";
import { Content } from "../../layouts";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Badge,
  Button,
} from "@material-tailwind/react";
import { getAllLogs } from "../../core/api/api";
import { SpinnerLoader } from "../../components";
import classNames from "classnames";

export default function LogsPage() {
  const {
    data: logsData,
    isLoading: isLoadingLogs,
    error,
  } = useQuery<any[]>({
    queryKey: ["all-logs"],
    queryFn: getAllLogs,
  });

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
            </div>
          </CardHeader>
          <CardBody
            placeholder={""}
            className="overflow-x-scroll px-0 pt-0 pb-2"
          >
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
                  {logsData ? (
                    logsData!.map((item, key) => {
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
          </CardBody>
        </Card>
      </div>
    </Content>
  );
}
