import React from "react";
import { MenuOptionCard, PageLayout } from "../shared";
import  Grid2 from "@mui/material/Grid2";
import { StackIcon } from "../../assets/stack-icon";
import { PluginIcon } from "../../assets/plugin-icon";
import { FixedOptionsIcon } from "../../assets/fixed-options-icon";
import { usePermission } from "@backstage/plugin-permission-react";
import { veeManageFixedOptionsPermission, veeManagePluginsPermission, veeManageStacksPermission } from "@veecode-platform/backstage-plugin-vee-common";

export const SettingsPage = () => {

  const { loading: loadingStacksPermission } = usePermission({
     permission: veeManageStacksPermission
   });
  const { loading: loadingPluginsPermission } = usePermission({
    permission: veeManagePluginsPermission
  });
  const { loading: loadingFixedOptionsPermission } = usePermission({
    permission: veeManageFixedOptionsPermission
  })

    return (
        <PageLayout 
          title="Settings" 
          subtitle="Configure your assistant according to the standard and needs of your squad."
          goBack
          >
           <Grid2 container spacing={2}> 
              {!loadingStacksPermission && (
                <MenuOptionCard
                  icon={StackIcon}
                  title="Manage Stacks"
                  description="List, create, delete or edit a stack in this menu."
                  path="manage-stacks"/>
                )}
              {!loadingPluginsPermission && (
                <MenuOptionCard
                  icon={PluginIcon}
                  title="Manage Plugins"
                  description="List, add, edit or remove the plugins that will be available for your templates"
                  path="manage-plugins"/>
               )}
              {!loadingFixedOptionsPermission &&(
                <MenuOptionCard
                icon={FixedOptionsIcon}
                title="Manage Fixed Options"
                description="List, create, delete or edit fixed options that will appear in your AI assistant according to your needs."
                path="manage-fixed-options"
              />
              )}
            </Grid2>
        </PageLayout>
    )
}