import React from "react"
import { PageLayoutRoot, PageLayoutRootProps } from "./PageLayoutRoot"
import { PageLayoutHeader, PageLayoutHeaderProps } from "./PageLayoutHeader"
import { PageLayoutLabel, PageLayoutLabelProps } from "./PageLayoutLabel";
import { PageLayoutTitle, PageLayoutTitleProps } from "./PageLayoutTitle";
import { PageLayoutSubtitle, PageLayoutSubtitleProps } from "./PageLayoutSubtitle";
import { PageLayoutBody, PageLayoutBodyProps } from "./PageLayoutBody";
import { PageLayoutActions, PageLayoutActionsProps } from "./PageLayoutActions";
import { PageLayoutAction, PageLayoutActionrops } from "./PageLayoutAction";

interface PageLayoutProps {
    Root: React.FC<PageLayoutRootProps>;
    Header: React.FC<PageLayoutHeaderProps>;
    Label: React.FC<PageLayoutLabelProps>;
    Title: React.FC<PageLayoutTitleProps>;
    Subtitle: React.FC<PageLayoutSubtitleProps>;
    Body: React.FC<PageLayoutBodyProps>;
    Actions: React.FC<PageLayoutActionsProps>;
    Action: React.FC<PageLayoutActionrops>
}

export const PageLayout : PageLayoutProps = {
    Root: PageLayoutRoot,
    Header: PageLayoutHeader,
    Label: PageLayoutLabel,
    Title: PageLayoutTitle,
    Subtitle: PageLayoutSubtitle,
    Body: PageLayoutBody,
    Actions: PageLayoutActions,
    Action: PageLayoutAction
}