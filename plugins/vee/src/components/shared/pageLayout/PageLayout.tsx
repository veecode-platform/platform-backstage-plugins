import React from "react";
import { ContentLayout } from "../contentLayout/ContentLayout";
import { usePageLayoutStyles } from "./styles";
import type { PageLayoutProps } from "./types";
import { Button } from "../button";
import { Wrapper } from "../wrapper/Wrapper";
import { useNavigate } from "react-router-dom";

export const PageLayout : React.FC<PageLayoutProps> = (props) => {
   
    const navigate = useNavigate();
    const {title, subtitle, label, goBack, children} = props;
    const { content , footerContent} = usePageLayoutStyles();

    const handleGoBack = () => navigate(-1)

    return (
            <Wrapper>
              <ContentLayout 
                title={title}
                subtitle={subtitle}
                label={label}
                styleCustom={content}
              >
              {children}
              { goBack && (
                <footer className={footerContent}>
                    <Button variant="primary" onClick={handleGoBack}>
                        Back
                    </Button>
                </footer>
              )}
              </ContentLayout>
            </Wrapper>
    )
}