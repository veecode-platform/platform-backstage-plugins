import { ReactNode } from "react";

export interface BoxComponentProps {
    title: string,
    searchBar?: boolean,
    children: ReactNode | React.JSX.Element,
    button?: ReactNode,
    noSelectInstance?: boolean,
    goBack?: boolean
}