import React from "react";
import { VeeDashboard } from "../veeDashboard";
import { Route, Routes } from "react-router-dom";
import { SettingsPageRoot } from "../settingsPage";
import { VeeProvider } from "../../context";
import { ScaffolderAIPageRoot } from "../scaffolder-ai";
import { RequirePermission } from "@backstage/plugin-permission-react";
import { 
  veeAccessSettingsPanelPermission, 
  veeGenerateTemplatePermission, 
  veeReadPermission } from "@veecode-platform/backstage-plugin-vee-common";

export const VeeHomepage = () => (
            <VeeProvider>
              <Routes>
                  <Route path="" element={
                     <RequirePermission
                      permission={veeReadPermission}
                      >
                       <VeeDashboard/>
                     </RequirePermission>
                  }/>
                  <Route path="/settings/*" element={
                    <RequirePermission 
                      permission={veeAccessSettingsPanelPermission}>
                       <SettingsPageRoot/>
                    </RequirePermission>
                  }/>
                  <Route path="/scaffolder-ai/*" element={
                    <RequirePermission 
                     permission={veeGenerateTemplatePermission}>
                      <ScaffolderAIPageRoot/>
                    </RequirePermission>
                  }/>
              </Routes>
            </VeeProvider>
    )