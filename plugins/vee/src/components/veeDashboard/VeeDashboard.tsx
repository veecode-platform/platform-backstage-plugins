import React from "react";
import { Content } from "@backstage/core-components";
import { ContentLayout } from "../shared";
import { useVeeDashboardStyles } from "./styles";
import { options } from "./options";
import { MenuOptionCard } from "./menuOptionCard";

export const VeeDashboard = () => {

    const { wrapper, content } = useVeeDashboardStyles();

    return (
        <Content className={wrapper}>
            <ContentLayout 
              title="Use AI to give development superpowers and faster delivery."
              subtitle="Ensure a smoother and simpler workflow by selecting one of the options below"
              styleCustom={content}
              >
              {options.map(option => (
                <MenuOptionCard 
                  key={option.id} 
                  icon={option.icon} 
                  title={option.title} 
                  description={option.description}
                  path={option.path}
                  />
              ))}
            </ContentLayout>
        </Content>
    )
}