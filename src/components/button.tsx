import React from "react";
import { cn } from "../utils/cn";

export type ButtonProps = React.PropsWithChildren<
  {
    className?: string;
  } & React.ComponentProps<"button">
>;

export default function Button({ className, ...btn }: ButtonProps) {
  return (
    <button
      className={cn(
        "flex not-first:justify-center gap-3 py-5 px-9 bg-zinc-800 rounded-md \
        hover:bg-zinc-700 active:bg-zinc-600 transition-all cursor-pointer",
        className
      )}
      draggable={false}
      {...btn}
    />
  );
}
