import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Content } from "../../layouts";
import React from "react";
import statisticsCardsData from "../../utils/mocks";
import { StatisticsCard, StatisticsChart } from "../../components";
import { ClockIcon } from "@heroicons/react/24/solid";
import statisticsChartsData from "../../utils/statistics-charts-data";
import { useQuery } from "@tanstack/react-query";
import { getDayStats, getMonthStats, getStats } from "../../core/api/api";
import { isNil } from "lodash";
//@ts-ignore
import Plot from "react-plotly.js";
import { StatsDay, StatsMonth } from "../../core/entities/stats";
import { useAuthContext } from "../../core/context/auth-context";

export default function HomePage() {
  // const { t } = useTranslation();
  const { t } = useAuthContext();
  const { data: statsData } = useQuery<any[]>({
    queryKey: ["stats-admin"],
    queryFn: getStats,
  });

  const { data: dayStats } = useQuery<StatsDay[]>({
    queryKey: ["day-stats"],
    queryFn: getDayStats,
  });

  const { data: monthStats } = useQuery<StatsMonth[]>({
    queryKey: ["month-stats"],
    queryFn: getMonthStats,
  });
  
  return (
    <Content>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }, i) => (
          <StatisticsCard
            key={title}
            {...rest}
            value={!isNil(statsData) ? statsData![i] : "0"}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            // footer={
            //   <Typography
            //     placeholder={""}
            //     className="font-normal text-blue-gray-600"
            //   >
            //     <strong className={footer.color}>{footer.value}</strong>
            //     &nbsp;{footer.label}
            //   </Typography>
            // }
          />
        ))}
      </div>
      <h1>{t("Welcome to React")}</h1>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2">
        <Card
          placeholder={""}
          className="border border-blue-gray-100 shadow-sm"
        >
          <CardHeader
            placeholder={""}
            variant="gradient"
            color={"white"}
            floated={false}
            shadow={false}
          >
            <div className="flex justify-center w-full">
              <Plot
                data={[
                  {
                    histfunc: "sum",
                    y: dayStats?.map((item) => item.count),
                    x: dayStats?.map((item) => item.day),
                    type: "histogram",
                    name: "sum",
                  },
                ]}
              />
            </div>
          </CardHeader>
          <CardBody placeholder={""} className="px-6 pt-0">
            <Typography placeholder={""} variant="h6" color="blue-gray">
              Website view Per Day
            </Typography>
            <Typography
              placeholder={""}
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Last Campaign Performance
            </Typography>
          </CardBody>
        </Card>
        <Card
          placeholder={""}
          className="border border-blue-gray-100 shadow-sm"
        >
          <CardHeader
            placeholder={""}
            variant="gradient"
            color={"white"}
            floated={false}
            shadow={false}
          >
            <div className="flex justify-center w-full">
              <Plot
                data={[
                  {
                    histfunc: "sum",
                    y: monthStats?.map((item) => item.count),
                    x: monthStats?.map((item) => item.month),
                    type: "scatter",
                    name: "sum",
                  },
                ]}
              />
            </div>
          </CardHeader>
          <CardBody placeholder={""} className="px-6 pt-0">
            <Typography placeholder={""} variant="h6" color="blue-gray">
              Website View Per Month
            </Typography>
            <Typography
              placeholder={""}
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              Last Campaign Performance
            </Typography>
          </CardBody>
        </Card>
      </div>
    </Content>
  );
}
