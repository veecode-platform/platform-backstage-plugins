import React from "react";
import { Route, Routes} from 'react-router';
import { ApplicationDetailsComponent } from "../ApplicationDetailsComponent";
import { ApplicationListComponent } from "../ApplicationListComponent";
import { EditComponent } from "../EditApplicationComponent";
import { NewApplicationComponent } from "../NewApplicationComponent";

export const HomePageComponent = () => (
    <Routes>
        <Route path="/" element={<ApplicationListComponent/>} />     
        <Route path="/details/*" element={<ApplicationDetailsComponent/>} />
        <Route path="/new-application" element={<NewApplicationComponent/>} />
        <Route path="/edit-application" element={<EditComponent/>}/>
    </Routes>
  );