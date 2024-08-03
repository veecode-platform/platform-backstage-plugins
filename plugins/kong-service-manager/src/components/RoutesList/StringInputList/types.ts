export interface StringInputListProps {
    label: string;
    buttonText: string;
    onItemsChange?: (items: { id: string; value: string }[]) => void;
    initialItems?: { id: string; value: string }[];
    twoFields?: boolean;
  }