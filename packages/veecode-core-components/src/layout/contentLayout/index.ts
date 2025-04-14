import React from "react";
import { ContentLayoutBody, ContentLayoutBodyProps } from "./ContentLayoutBody";
import { ContentLayoutHeader, ContentLayoutHeaderProps } from "./ContentLayoutHeader";
import { ContentLayoutLabel, ContentLayoutLabelProps } from "./ContentLayoutLabel";
import { ContentLayoutRoot, ContentLayoutRootProps } from "./ContentLayoutRoot";
import { ContentLayoutSubtitle, ContentLayoutSubtitleProps } from "./ContentLayoutSubtitle";
import { ContentLayoutTitle, ContentLayoutTitleProps } from "./ContentLayoutTitle";

export interface ContentLayoutProps {
    Root: React.FC<ContentLayoutRootProps>,
    Header: React.FC<ContentLayoutHeaderProps>,
    Label: React.FC<ContentLayoutLabelProps>,
    Title: React.FC<ContentLayoutTitleProps>,
    Subtitle: React.FC<ContentLayoutSubtitleProps>,
    Body: React.FC<ContentLayoutBodyProps>
}

export const ContentLayout : ContentLayoutProps = {
    Root : ContentLayoutRoot,
    Header: ContentLayoutHeader,
    Label: ContentLayoutLabel,
    Title: ContentLayoutTitle,
    Subtitle: ContentLayoutSubtitle,
    Body: ContentLayoutBody
} 