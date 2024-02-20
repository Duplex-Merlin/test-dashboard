import { Alert, AlertProps, Button } from "@material-tailwind/react";
import classNames from "classnames";

export type AlertType = "info" | "success" | "danger";

interface AlertNotificationProps extends AlertProps {
  content: string;
  type: AlertType;
  open: boolean;
  className?: string;
  handleOpen: () => void;
}

const AlertIcons = {
  info: (
    <svg
      className="flex-shrink-0 inline w-4 h-4 mr-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
  ),
  success: (
    <svg
      className="flex-shrink-0 inline w-4 h-4 mr-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
  ),
  danger: (
    <svg
      className="flex-shrink-0 inline w-4 h-4 mr-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
  ),
};

export default function AlertNotification({
  type,
  content,
  color,
  className,
  open,
  handleOpen,
}: AlertNotificationProps) {
  return (
    <Alert
      variant="gradient"
      open={open}
      icon={AlertIcons[type]}
      color={color}
      className={classNames(className)}
      action={
        <Button
          variant="text"
          color="white"
          size="sm"
          className="!absolute top-0 bottom-0 right-3"
          onClick={handleOpen}
          placeholder={""}
        >
          Close
        </Button>
      }
    >
      <span className="text-xs"> {content}</span>
    </Alert>
  );
}
