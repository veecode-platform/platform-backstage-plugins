import React from "react";
import { MenuOptionCard, PageLayout } from "../shared";
import { settingsOptions } from "./settings";
import { useNavigate } from "react-router-dom";

export const SettingsPage = () => {

    const navigate = useNavigate();
    const handleBack =  () => navigate(-1)

    return (
        <PageLayout 
          label="Settings" 
          subtitle="configure your assistant according to the standard and needs of your squad."
          handleBack={handleBack}
          >
            {settingsOptions.map( option => (
                <MenuOptionCard
                  key={option.id}
                  icon={option.icon}
                  title={option.title}
                  tooltip={option.tooltip}
                  path={option.path}
                 />
            ))}
        </PageLayout>
    )
}