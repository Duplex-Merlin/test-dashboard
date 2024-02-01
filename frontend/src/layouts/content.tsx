import { PropsWithChildren } from "react";
import { NavbarSimple } from "./navlist";
import { Sidebar } from "./sidebar";

export default function Content({ children }: PropsWithChildren) {
  return (
    <>
      <NavbarSimple />
      <Sidebar />
      <main className=" h-screen ml-80 pt-16 max-w-[calc(100vw-320px)]">
        <div className="bg-blue-gray-50 h-full p-6">{children}</div>
      </main>
    </>
  );
}
