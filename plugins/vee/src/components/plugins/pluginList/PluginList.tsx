import React from "react";
import { PageLayout } from "../../shared"
import { useVeeContext } from "../../../context";
import useAsync from "react-use/esm/useAsync";
import { PluginListProps } from "./listComponent/types";
import { ListComponent } from "./listComponent";
import { useParams } from "react-router-dom";

export const PluginList = () => {

    const { stackId } = useParams();
    const { getStackById } = useVeeContext();
    const { value: allPlugins, loading, error } = useAsync(async()=>{
        if(stackId){
            const stack = await getStackById(stackId);
            if(stack && stack.plugins) return stack.plugins;
            return []
        }
        return []
    },[]); // check error and loading
    const plugins : PluginListProps[] = React.useMemo(()=>{
       if(allPlugins){
        return allPlugins.map(plugin => ({
            id: plugin.id as string,
            icon: null,
            name: plugin.name
        }))
       }
       return []
    },[allPlugins])

    return (
        <PageLayout
          title="Select plugins to add to the template"
          label="Plugins"
          goBack
          createAction={()=>{}}
         >
            {loading && <h1>Loading...</h1>}
            {error && <h1>Error...</h1>}
            <ListComponent data={plugins}/>
        </PageLayout>
    )
}