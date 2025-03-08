import React from "react";
import { PageLayout, TableComponent } from "../../../shared";
import { ManagePluginsRow } from "./types";

const rows : ManagePluginsRow[]= [
    { id: "000", name: "Github workflows", annotations: ['github-workflows/card'] },
    { id: "001", name: "Gitlab Pipelines", annotations: ['gitlab-pipelines/card'] },
    { id: "002", name: "Kubernetes", annotations: ['backstage/clusterName'] },
    { id: "003", name: "Analyzer GPT", annotations: ['backstage/clusterName'] },
    { id: "002", name: "Kubernetes", annotations: ['backstage/clusterName'] },
    { id: "003", name: "Analyzer GPT", annotations: ['backstage/clusterName'] },
    { id: "002", name: "Kubernetes", annotations: ['backstage/clusterName'] },
    { id: "003", name: "Analyzer GPT", annotations: ['backstage/clusterName'] },
  ];
  

export const ManagePlugins = () => {
    return (
        <PageLayout
         label="Manage Plugins"
         title="List, add, edite or delete plugins"
         goBack
         >
          <TableComponent 
             title="Plugins" 
             data={rows as ManagePluginsRow[]}
             noId
             actions
             onEdit={()=>{}}
             onDelete={()=>{}}
             />
        </PageLayout>
    )
}