import { PlayIcon } from "lucide-react";
import { JSX } from "react";
import LinkButton from "../components/linkbutton";

interface NavButton {
  text: string;
  icon: JSX.Element;
  href: string;
}

const navButtons = [
  {
    text: "Играть",
    icon: <PlayIcon />,
    href: "/modules",
  },
] satisfies NavButton[];

export default function Home() {
  return (
    <div className="container flex h-80 my-auto flex-col justify-between">
      <h1 className="mx-auto text-7xl">CodeQuest</h1>
      <nav className="flex flex-col gap-3 mx-auto">
        {navButtons.map((btn) => (
          <LinkButton href={btn.href}>
            {btn.icon} {btn.text}
          </LinkButton>
        ))}
      </nav>
    </div>
  );
}
