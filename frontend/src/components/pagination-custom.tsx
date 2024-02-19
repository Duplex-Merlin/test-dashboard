import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PaginationCustomProps {
  page: number;
  totalPages: number;
  prevPage: (param: number) => void;
  changePage: (param: number) => void;
  nextPage: (param: number) => void;
}

export function PaginationCustom({
  page,
  totalPages,
  prevPage,
  changePage,
  nextPage,
}: PaginationCustomProps) {
  const [active, setActive] = React.useState<number>(1);

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => {
        setActive(index);
        changePage(index);
      },
    } as any);

  const next = () => {
    if (active === 5) return;
    setActive(active + 1);
    nextPage(active);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    prevPage(active);
  };

  return (
    <div className="flex items-center justify-end gap-4 mt-4">
      <Button
        placeholder={""}
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === page}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (item) => {
            return <IconButton {...getItemProps(item)}>{item}</IconButton>;
          }
        )}
      </div>
      <Button
        placeholder={""}
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === 1}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
