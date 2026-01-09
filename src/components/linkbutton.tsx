import { useNavigate } from "react-router";
import Button, { ButtonProps } from "./button";

export type LinkButtonProps = {
  href: string;
} & Omit<ButtonProps, "onClick">;

export default function LinkButton({ href, ...props }: LinkButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      {...props}
      onClick={() => navigate(href, { viewTransition: true })}
    />
  );
}
