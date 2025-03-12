import { StackList } from "../stacks";
import { PluginList } from "../plugins";
import React from "react";
import { Route, Routes } from "react-router-dom";


export const ScaffolderAIPageRoot = () => {
    return (
        <Routes>
            <Route path="" element={<StackList/>}/>
            <Route path="/:stackId" element={<PluginList/>}/>
            <Route path="output" element={<h1>Output</h1>}/>
        </Routes>
    )
}