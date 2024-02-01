import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({ color, icon, title, value, footer }: any) {
  return (
    <Card placeholder={""} className="border border-blue-gray-100 shadow-sm">
      <CardHeader
        variant="gradient"
        color={color}
        floated={false}
        shadow={false}
        className="absolute grid h-12 w-12 place-items-center"
        placeholder={""}
      >
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right" placeholder={""}>
        <Typography
          variant="small"
          className="font-normal text-blue-gray-600"
          placeholder={""}
        >
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray" placeholder={""}>
          {value}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter
          className="border-t border-blue-gray-50 p-4"
          placeholder={""}
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

export default StatisticsCard;