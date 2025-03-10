import React from "react";
import { IStack } from "@veecode-platform/backstage-plugin-vee-common";
import { PageLayout, TableComponent } from "../../../shared";

const rows : IStack[]= [
    { id: "000", name: "Java", source: "http://xptop.com.br" },
    { id: "001", name: "AWS EC2", source: "http://xptop.com.br" },
    { id: "002", name: "Express", source: "http://xptop.com.br" },
    { id: "003", name: "NextJs", source: "http://xptop.com.br" },
  ];
  

export const ManageStacks = () => {
    return (
        <PageLayout
         label="Manage Stacks"
         title="List, create, edite or delete Stacks"
         goBack
         >
          <TableComponent 
             title="Stacks" 
             data={rows as IStack[]}
             actions
             onEdit={()=>{}}
             onDelete={()=>{}}
             />
        </PageLayout>
    )
}