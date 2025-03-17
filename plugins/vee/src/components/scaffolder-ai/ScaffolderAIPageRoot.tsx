import React from "react";
import { Route, Routes } from "react-router-dom";
import { StackList } from "../stacks";
import { GenerateTemplate } from "../generateTemplate";
import { TemplateOutput } from "../templateOutput";


export const ScaffolderAIPageRoot = () => {
    return (
        <Routes>
            <Route path="" element={<StackList/>}/>
            <Route path="/:stackId" element={<GenerateTemplate/>}/>
            <Route path="output" element={<TemplateOutput/>}/>
        </Routes>
    )
}