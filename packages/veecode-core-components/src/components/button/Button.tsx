import React from "react";
import { ButtonContained } from "./ButtonContained";
import { ButtonDanger } from "./ButtonDanger";
import { ButtonPrimary } from "./ButtonPrimary";
import { ButtonRoot } from "./ButtonRoot";
import { ButtonSecondary } from "./ButtonSecondary";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
}

export const Button = {
    Root: ButtonRoot,
    Primary: ButtonPrimary,
    Secondary: ButtonSecondary,
    Contained: ButtonContained,
    Danger: ButtonDanger
}