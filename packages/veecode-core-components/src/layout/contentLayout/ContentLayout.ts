import React from "react";
import { ContentLayoutBody } from "./ContentLayoutBody";
import { ContentLayoutHeader } from "./ContentLayoutHeader";
import { ContentLayoutLabel } from "./ContentLayoutLabel";
import { ContentLayoutRoot } from "./ContentLayoutRoot";
import { ContentLayoutSubtitle } from "./ContentLayoutSubtitle";
import { ContentLayoutTitle } from "./ContentLayoutTitle";

export interface ContentLayoutProps {
    icon: React.ElementType,
    title?: string,
    label?:string,
    subtitle?:string,
    children: React.ReactNode
}

export const ContentLayout = {
    Root : ContentLayoutRoot,
    Header: ContentLayoutHeader,
    Label: ContentLayoutLabel,
    Title: ContentLayoutTitle,
    Subtitle: ContentLayoutSubtitle,
    Body: ContentLayoutBody
} 