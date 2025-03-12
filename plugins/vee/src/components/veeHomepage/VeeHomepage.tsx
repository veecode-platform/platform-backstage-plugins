import React from "react";
import { VeeDashboard } from "../veeDashboard";
import { Route, Routes } from "react-router-dom";
import { SettingsPageRoot } from "../settingsPage";
import { VeeProvider } from "../../context";
import { ScaffolderAIPageRoot } from "../scaffolder-ai";

export const VeeHomepage = () => (
            <VeeProvider>
              <Routes>
                  <Route path="" element={<VeeDashboard/>}/>
                  <Route path="/settings/*" element={<SettingsPageRoot/>}/>
                  <Route path="/scaffolder-ai/*" element={<ScaffolderAIPageRoot/>}/>
              </Routes>
            </VeeProvider>
    )