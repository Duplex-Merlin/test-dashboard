import { Spinner } from "@material-tailwind/react";
import classNames from "classnames";

type SizeType = "xs" | "sm" | "base" | "lg" | "xl";

interface SpinnerProps {
  size: SizeType;
}

const sizes = {
  xs: ["h-4 w-4"],
  sm: ["h-6 w-6"],
  base: ["h-8 w-8"],
  lg: ["h-10 w-10"],
  xl: ["h-12 w-12"],
};

export function SpinnerLoader({ size }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <Spinner color="purple" className={classNames(sizes[size])} />
    </div>
  );
}