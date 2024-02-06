import React from "react";
import { Route, Routes} from 'react-router';
import { ListComponent } from "../ListComponent";
import { DetailsComponent } from "../DetailsComponent";
import { CreateComponent } from "../CreateComponent";
import { EditComponent } from "../EditComponent";

export const ServicesPageComponent = () => (
    <Routes>
        <Route path="/" element={<ListComponent/>} />     
        <Route path="/service-details/*" element={<DetailsComponent/>} />
        <Route path="/create-service" element={<CreateComponent/>}/>
        <Route path="/edit-service" element={<EditComponent/>}/>
    </Routes>        
  );