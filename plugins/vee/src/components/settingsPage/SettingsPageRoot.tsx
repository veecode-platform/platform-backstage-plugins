import React from "react";
import { Route, Routes } from "react-router-dom";
import { SettingsPage } from "./SettingsPage";
import { ManageStacks } from "../stacks";
import { ManagePlugins } from "../plugins";
import { ManageFixedOptions } from "../fixedOptions";
import { RequirePermission } from "@backstage/plugin-permission-react";
import { veeAccessSettingsPanelPermission, veeManageFixedOptionsPermission, veeManagePluginsPermission, veeManageStacksPermission } from "@veecode-platform/backstage-plugin-vee-common";


export const SettingsPageRoot = () => {
    return (
        <Routes>
            <Route path="" element={
                <RequirePermission 
                   permission={veeAccessSettingsPanelPermission}>
                    <SettingsPage/>
                </RequirePermission>
            }/>
            <Route path="manage-stacks" element={
                <RequirePermission 
                  permission={veeManageStacksPermission}>
                    <ManageStacks/>
                </RequirePermission>
            }/>
            <Route path="manage-plugins" element={
                <RequirePermission
                 permission={veeManagePluginsPermission}
                 >
                    <ManagePlugins/>
                </RequirePermission>
            }/>
            <Route path="manage-fixed-options" element={
                <RequirePermission 
                  permission={veeManageFixedOptionsPermission}>
                    <ManageFixedOptions/>
                </RequirePermission>
            }/>
        </Routes>
    )
}