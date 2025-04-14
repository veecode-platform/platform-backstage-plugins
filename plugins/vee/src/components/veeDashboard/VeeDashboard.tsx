import React from "react";
import { PageLayout, MenuOptionCard } from "../shared";
import  Grid2 from "@mui/material/Grid2";
import { ScaffolderAIIcon } from "../../assets/scaffolder-ai-icon";
import { VeeSettingsIcon } from "../../assets/vee-settings-icon";
import { usePermission } from "@backstage/plugin-permission-react";
import { veeAccessSettingsPanelPermission, veeGenerateTemplatePermission } from "@veecode-platform/backstage-plugin-vee-common";

export const VeeDashboard = () => {
  
  const {loading: loadingPermission} = usePermission({
    permission: veeAccessSettingsPanelPermission
  })
  const { loading: loadingScaffolderAIPermission } = usePermission({
    permission: veeGenerateTemplatePermission
  })

  return(
    <PageLayout
    title="Use AI to give development superpowers and faster delivery."
    subtitle="Ensure a smoother and simpler workflow by selecting one of the options below"
    >
    <Grid2 container spacing={2}>
      {!loadingScaffolderAIPermission && 
        (<MenuOptionCard
          icon={ScaffolderAIIcon}
          title="Scaffolder AI"
          description="Create Templates with the help of AI and make this process simpler and more efficient with just a few steps."
          path="scaffolder-ai"
        />)}
      {!loadingPermission && (
        <MenuOptionCard
        icon={VeeSettingsIcon}
        title="Settings"
        description="Create your stacks with defined technologies, basic templates and plugins."
        path="settings"
      />
      )}
    </Grid2>
  </PageLayout>
);
}