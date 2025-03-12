import React from "react";
import { MenuOptionCard, PageLayout } from "../shared";
import { settingsOptions } from "./settings";
import  Grid2 from "@mui/material/Grid2";

export const SettingsPage = () => {

    return (
        <PageLayout 
          title="Settings" 
          subtitle="Configure your assistant according to the standard and needs of your squad."
          goBack
          >
           <Grid2 container spacing={2}> 
              {settingsOptions.map( option => (
                  <MenuOptionCard
                    key={option.id}
                    icon={option.icon}
                    title={option.title}
                    description={option.tooltip}
                    path={option.path}
                  />
              ))}
            </Grid2>
        </PageLayout>
    )
}