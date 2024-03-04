import {
  ArrowPathIcon,
  ClipboardDocumentIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

interface ErrorBlockProps {
  message: string;
  reload: () => void;
}

export default function ErrorBlock({ message, reload }: ErrorBlockProps) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 ">
        <div className="flex flex-col justify-center items-center mx-auto max-w-screen-sm text-center">
          <XCircleIcon className="h-44 w-44 text-red-600" />
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            OOppss..
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {message}
          </p>
          <ArrowPathIcon
            className="h-6 w-6 hover:text-purple-500 cursor-pointer"
            onClick={reload}
          />
        </div>
      </div>
    </section>
  );
}
