import React from "react";
import { MenuOptionCard, PageLayout } from "../shared";
import { settingsOptions } from "./settings";

export const SettingsPage = () => {

    return (
        <PageLayout 
          label="Settings" 
          subtitle="Configure your assistant according to the standard and needs of your squad."
          goBack
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