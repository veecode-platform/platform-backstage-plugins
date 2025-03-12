import React from "react";
import { PageLayout } from "../shared";
import { options } from "./options";
import { MenuOptionCard } from "../shared";
import  Grid2 from "@mui/material/Grid2";

export const VeeDashboard = () => (
  <PageLayout
    title="Use AI to give development superpowers and faster delivery."
    subtitle="Ensure a smoother and simpler workflow by selecting one of the options below"
  >
   <Grid2 container spacing={2}>
    {options.map(option => (
      <MenuOptionCard
        key={option.id}
        icon={option.icon}
        title={option.title}
        description={option.description}
        path={option.path}
      />
    ))}
    </Grid2>
  </PageLayout>
);