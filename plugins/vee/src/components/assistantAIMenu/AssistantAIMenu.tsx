import React from "react";
import { SidebarItem } from "@backstage/core-components";
import { AssistantAIMenuIcon } from "../../assets/assistant-ai-menu-icon";
import { usePermission } from "@backstage/plugin-permission-react";
import { veeReadPermission } from "@veecode-platform/backstage-plugin-vee-common";

export const AssistantAIMenu = () => {

    const {loading: loadingPermission } = usePermission({
        permission: veeReadPermission
    });

    return (
       <>
        {!loadingPermission && (
            <SidebarItem 
              icon={AssistantAIMenuIcon} 
              to="vee" 
              text="Vee AI" />
        )}
       </>
    )
}
