import { OptionCardContent } from "./OptionCardContent";
import { OptionCardDescription } from "./OptionCardDescription";
import { OptionCardIcon } from "./OptionCardIcon";
import { OptionCardRoot } from "./OptionCardRoot";
import { OptionCardSubtitle } from "./OptionCardSubtitle";
import { OptionCardTags } from "./OptionCardTags";
import { OptionCardTitle } from "./OptionCardTitle";

export interface OptionCardProps {
    path: string;
    icon: React.ElementType;
    title: string;
    subtitle?: string;
    description?: string;
    tags?: string[]
};

export const OptionCard = {
  Root: OptionCardRoot,
  Content: OptionCardContent,
  Icon: OptionCardIcon,
  title: OptionCardTitle,
  subtitle: OptionCardSubtitle,
  description: OptionCardDescription,
  tags: OptionCardTags
}