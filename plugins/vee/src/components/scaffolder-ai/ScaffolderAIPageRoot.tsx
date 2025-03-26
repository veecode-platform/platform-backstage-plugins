import React from "react";
import { Route, Routes } from "react-router-dom";
import { StackList } from "../stacks";
import { GenerateTemplate } from "../generateTemplate";
import { TemplateOutput } from "../templateOutput";
import { RequirePermission } from "@backstage/plugin-permission-react";
import { 
    veeGenerateTemplatePermission, 
    veeManageStacksPermission 
} from "@veecode-platform/backstage-plugin-vee-common";


export const ScaffolderAIPageRoot = () => {
    return (
        <Routes>
            <Route path="" element={
                <RequirePermission 
                  permission={veeManageStacksPermission}>
                    <StackList/>
                </RequirePermission>
            }/>
            <Route path="/:stackId" element={
                <RequirePermission
                  permission={veeGenerateTemplatePermission}>
                    <GenerateTemplate/>
                </RequirePermission>
            }/>
            <Route path="output" element={
                <RequirePermission
                permission={veeGenerateTemplatePermission}>
                  <TemplateOutput/>
              </RequirePermission>
            }/>
        </Routes>
    )
}