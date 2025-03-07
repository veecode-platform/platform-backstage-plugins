import React from "react";
import { PageLayout } from "../shared";
import { options } from "./options";
import { MenuOptionCard } from "../shared";

export const VeeDashboard = () => (
  <PageLayout
    title="Use AI to give development superpowers and faster delivery."
    subtitle="Ensure a smoother and simpler workflow by selecting one of the options below"
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
  </PageLayout>
);