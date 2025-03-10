import React from "react";
import { ContentLayout } from "../contentLayout/ContentLayout";
import { usePageLayoutStyles } from "./styles";
import type { PageLayoutProps } from "./types";
import { Button } from "../button";
import { Wrapper } from "../wrapper/Wrapper";
import { useNavigate } from "react-router-dom";
import { Grid } from "@material-ui/core";

export const PageLayout : React.FC<PageLayoutProps> = (props) => {
   
    const navigate = useNavigate();
    const {title, subtitle, label, createAction, goBack, children} = props;
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
                   <Grid container alignItems="center" justifyContent="flex-end" style={{ gap: '1rem'}}>
                       {
                         createAction && ( 
                          <Button variant="primary" onClick={createAction}>
                              Create
                          </Button>)
                       }
                        {
                          goBack && (
                           <Button variant="primary" onClick={handleGoBack}>
                            Back
                           </Button>
                          )
                        }
                   </Grid>
                </footer>
              )}
              </ContentLayout>
            </Wrapper>
    )
}