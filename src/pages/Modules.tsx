import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import Module from "../components/module";

export default function Modules() {
  return (
    <div className="container flex flex-col py-10 gap-15 items-center">
      <h1 className="text-4xl">Модули</h1>
      <ul className="flex flex-col gap-3 w-full flex-1">
        <Module id="python" text="Введение в Python" progress={12.3} />
      </ul>
      <Link to="/" className="flex gap-2" viewTransition>
        <ArrowLeftIcon /> Назад
      </Link>
    </div>
  );
}
