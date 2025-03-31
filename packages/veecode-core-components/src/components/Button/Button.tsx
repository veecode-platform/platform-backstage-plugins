import { ButtonContained, ButtonContainedProps } from "./ButtonContained";
import { ButtonDanger, ButtonDangerProps } from "./ButtonDanger";
import { ButtonPrimary, ButtonPrimaryProps } from "./ButtonPrimary";
import { ButtonRoot, ButtonRootProps } from "./ButtonRoot";
import { ButtonSecondary, ButtonSecondaryProps } from "./ButtonSecondary";

export interface ButtonProps {
    Root: React.ForwardRefExoticComponent<ButtonRootProps & React.RefAttributes<HTMLButtonElement>>,
    Primary: React.ForwardRefExoticComponent<ButtonPrimaryProps & React.RefAttributes<HTMLButtonElement>>,
    Secondary: React.ForwardRefExoticComponent<ButtonSecondaryProps & React.RefAttributes<HTMLButtonElement>>,
    Contained: React.ForwardRefExoticComponent<ButtonContainedProps & React.RefAttributes<HTMLButtonElement>>,
    Danger: React.ForwardRefExoticComponent<ButtonDangerProps & React.RefAttributes<HTMLButtonElement>>
};

export const Button : ButtonProps = {
    Root: ButtonRoot,
    Primary: ButtonPrimary,
    Secondary: ButtonSecondary,
    Contained: ButtonContained,
    Danger: ButtonDanger
}