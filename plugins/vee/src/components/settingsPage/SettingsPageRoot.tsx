import React from "react";
import { Route, Routes } from "react-router-dom";
import { SettingsPage } from "./SettingsPage";
import { ManageStacks } from "../stacks";
import { ManagePlugins } from "../plugins";
import { ManageFixedOptions } from "../fixedOptions";


export const SettingsPageRoot = () => {
    return (
        <Routes>
            <Route path="" element={<SettingsPage/>}/>
            <Route path="manage-stacks" element={<ManageStacks/>}/>
            <Route path="manage-plugins" element={<ManagePlugins/>}/>
            <Route path="manage-fixed-options" element={<ManageFixedOptions/>}/>
        </Routes>
    )
}