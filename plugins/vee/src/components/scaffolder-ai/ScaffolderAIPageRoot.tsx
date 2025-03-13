import React from "react";
import { Route, Routes } from "react-router-dom";
import { StackList } from "../stacks";
import { GenerateTemplate } from "../generateTemplate";


export const ScaffolderAIPageRoot = () => {
    return (
        <Routes>
            <Route path="" element={<StackList/>}/>
            <Route path="/:stackId" element={<GenerateTemplate/>}/>
            <Route path="output" element={<h1>Output</h1>}/>
        </Routes>
    )
}