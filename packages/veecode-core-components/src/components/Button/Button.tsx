import { ButtonContained } from "./ButtonContained";
import { ButtonDanger } from "./ButtonDanger";
import { ButtonPrimary } from "./ButtonPrimary";
import { ButtonRoot } from "./ButtonRoot";
import { ButtonSecondary } from "./ButtonSecondary";

export interface ButtonProps {
  label: string,
  icon?: React.ElementType
}

export const Button = {
    Root: ButtonRoot,
    Primary: ButtonPrimary,
    Secondary: ButtonSecondary,
    Contained: ButtonContained,
    Danger: ButtonDanger
}