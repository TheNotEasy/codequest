import { PlayIcon } from "lucide-react";
import React, { JSX } from "react";
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

const Home = React.memo(() => {
  return (
    <div className="container flex h-80 my-auto flex-col justify-between">
      <h1 className="mx-auto text-7xl">CodeQuest</h1>
      <nav className="flex flex-col gap-3 mx-auto">
        {navButtons.map((btn) => (
          <LinkButton href={btn.href} key={btn.href}>
            {btn.icon} {btn.text}
          </LinkButton>
        ))}
      </nav>
    </div>
  );
});

export default Home;
