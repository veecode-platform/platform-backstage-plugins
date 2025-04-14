import React from "react";
import { CardComponent, EmptyStateComponent, PageLayout } from "../../shared"
import useAsync from "react-use/esm/useAsync";
import { useVeeContext } from "../../../context";
import  Grid2 from "@mui/material/Grid2";
import { StackCardProps } from "./types";
import { CodeSnippet, Progress, WarningPanel } from "@backstage/core-components";


const StackListWrapper = ({children}:{children: React.ReactNode}) => {

    return (
        <PageLayout
          title="Select the stack that will be used to create the new template"
          label="Template Stack"
          goBack
         >
          {children}
        </PageLayout>
    )
}

export const StackList = ()=> {

    const { listAllStacks } = useVeeContext();
    const { value: allStacks, loading, error } = useAsync(listAllStacks,[]);

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
    },[allStacks]);

    if (error) return (
        <StackListWrapper>
          <WarningPanel severity="error" title={error.name}>
            <CodeSnippet language="text" text={error.toString()} />
          </WarningPanel>
        </StackListWrapper>
        );

      if(loading) return (
          <StackListWrapper>
            <Progress/>
          </StackListWrapper>
      )
    
      if (!stacks || stacks.length === 0)
        return (
          <StackListWrapper>
            <EmptyStateComponent 
              title="No data" 
              message="No data to be rendered..."
               />
          </StackListWrapper>
        );

    return (
      <StackListWrapper>
        <Grid2 container spacing={2}>
          {stacks.map(stack => (
            <CardComponent
              key={stack.id}
              variant="stack"
              id={stack.id}
              title={stack.name}
              subtitle={stack.source}
              items={stack.plugins}
              path={stack.id}
            />
          ))}
        </Grid2>
      </StackListWrapper>
    );
}