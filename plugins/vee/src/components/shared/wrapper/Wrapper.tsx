import React from "react";
import { WrapperProps } from "./types";
import { useWrapperStyles } from "./styles";
import { Content } from "@backstage/core-components";

export const Wrapper : React.FC<WrapperProps> = (props) => {

    const {children} = props;
    const { root } = useWrapperStyles();

    return (
        <Content className={root}>
            {children}
        </Content>
    )
}