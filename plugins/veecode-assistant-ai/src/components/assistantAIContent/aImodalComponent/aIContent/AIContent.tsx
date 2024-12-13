import React from "react";
import type { AIContentProps } from "./types";
import { ContentLayout } from "../../../shared";
import { Route, Routes } from 'react-router-dom';
import { AIOptions } from "./aiOptions";
import { AIChat } from "./aiChat";

export const AIContent : React.FC<AIContentProps> = (/* props*/) => {

    // const { engine, location, repoName } = props; 

    return (
        <ContentLayout
         title="Analyzer Source"
         >
          <Routes>
            <Route path="ai-options" element={<AIOptions/>}/>
            <Route path="ai-chat" element={<AIChat/>}/>
          </Routes>
        </ContentLayout>
    )
}