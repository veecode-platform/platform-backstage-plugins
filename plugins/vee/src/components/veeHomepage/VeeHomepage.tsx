import { SettingsPage } from "../settingsPage";
import { VeeDashboard } from "../veeDashboard";
import React from "react";
import { Route, Routes } from "react-router-dom";

export const VeeHomepage = () => (
        <Routes>
            <Route path="" element={<VeeDashboard/>}/>
            <Route path="/settings" element={<SettingsPage/>}/>
            <Route path="/scaffolder-ai" element={<h1>Scaffolder-ai</h1>}/>
        </Routes>
    )