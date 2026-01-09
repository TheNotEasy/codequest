import { ArrowRightIcon } from "lucide-react";
import LinkButton from "./linkbutton";

export type ModuleProps = {
  id: string;
  text: string;
  progress: number;
};

export default function Module({ text, progress, id }: ModuleProps) {
  return (
    <li className="flex flex-col w-full p-6 gap-5 min-h-40 border-6 rounded-3xl border-zinc-800">
      <div className="flex justify-between">
        <h2 className="text-lg">{text}</h2>
        <p className="text-zinc-400">Прогресс: {progress}%</p>
      </div>
      <LinkButton href={`/gameplay/${id}`}>
        Открыть <ArrowRightIcon />
      </LinkButton>
    </li>
  );
}
