import React from "react";
import { VeeDashboard } from "../veeDashboard";
import { Route, Routes } from "react-router-dom";
import { SettingsPageRoot } from "../settingsPage";
import { VeeProvider } from "../../context";

export const VeeHomepage = () => (
            <VeeProvider>
              <Routes>
                  <Route path="" element={<VeeDashboard/>}/>
                  <Route path="/settings/*" element={<SettingsPageRoot/>}/>
                  <Route path="/scaffolder-ai" element={<h1>Scaffolder-ai</h1>}/>
              </Routes>
            </VeeProvider>
    )