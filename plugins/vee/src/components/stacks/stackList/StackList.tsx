import React from "react";
import { CardComponent, PageLayout } from "../../shared"
import useAsync from "react-use/esm/useAsync";
import { useVeeContext } from "../../../context";
import  Grid2 from "@mui/material/Grid2";
import { StackCardProps } from "./types";

export const StackList = () => {

    const { listAllStacks } = useVeeContext();
    const { value: allStacks, loading, error } = useAsync(listAllStacks,[]); // check error and loading

    const stacks : StackCardProps[] = React.useMemo(()=>{
        if (allStacks){
            return allStacks!.map(stack => ({
                id: stack.id as string,
                icon: stack.icon,
                name: stack.name,
                source: stack.source,
                plugins: stack.plugins ? stack.plugins.flatMap(plugin => plugin.name) : []
            }))
        }
        return []
    },[allStacks])

    return (
        <PageLayout
          title="Select the stack that will be used to create the new template"
          label="Template Stack"
          goBack
         >
          {loading && <h1>Loading...</h1>}
          {error && <h1>Error...</h1>}
          <Grid2 container spacing={2}>
           { stacks ? 
               stacks.map( 
                 stack => ( 
                   <CardComponent 
                     key={stack.id}
                     variant="stack"
                     id={stack.id}
                     title={stack.name}
                     subtitle={stack.source}
                     items={stack.plugins}
                     path={stack.id}
                     />)) 
                    : <h1>Nada pra mostrar...</h1>}
          </Grid2>
        </PageLayout>
    )
}