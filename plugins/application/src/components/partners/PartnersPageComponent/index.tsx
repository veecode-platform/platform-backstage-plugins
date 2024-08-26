import React from "react";
import { Route, Routes} from 'react-router-dom';
import { ListComponent } from "../ListComponent";
import { DetailsComponent } from "../DetailsComponent";
import { CreateComponent } from "../CreateComponent";
import { EditComponent} from "../EditComponent"


export const PartnersPageComponent = () => (
    <Routes>
        <Route path="/" element={<ListComponent/>} />     
        <Route path="/partner-details/*" element={<DetailsComponent/>} />
        <Route path="/create-partner" element={<CreateComponent/>}/>
        <Route path="/edit-partner" element={<EditComponent/>}/>
    </Routes>        
  );