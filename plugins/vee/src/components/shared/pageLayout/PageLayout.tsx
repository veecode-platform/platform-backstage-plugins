import { Content } from "@backstage/core-components";
import React from "react";
import { ContentLayout } from "../contentLayout/ContentLayout";
import { usePageLayoutStyles } from "./styles";
import type { PageLayoutProps } from "./types";
import { Button } from "../button";

export const PageLayout : React.FC<PageLayoutProps> = (props) => {
   
    const {title, subtitle, label, handleBack, children} = props;
    const { wrapper, content , footerContent} = usePageLayoutStyles();

    return (
        <Content className={wrapper}>
            <ContentLayout 
              title={title}
              subtitle={subtitle}
              label={label}
              styleCustom={content}
              >
              {children}
              { !!handleBack && (
                <footer className={footerContent}>
                    <Button variant="primary" onClick={handleBack}>
                        Back
                    </Button>
                </footer>
              )}
              </ContentLayout>
        </Content>
    )
}