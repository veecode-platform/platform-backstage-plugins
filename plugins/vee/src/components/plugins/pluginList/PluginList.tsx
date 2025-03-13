import React from "react";
import { ModalComponent, PageLayout } from "../../shared"
import { useVeeContext } from "../../../context";
import useAsync from "react-use/esm/useAsync";
import { PluginListProps } from "./listComponent/types";
import { ListComponent } from "./listComponent";
import { useParams } from "react-router-dom";
import { GenerateTemplate } from "../../generateTemplate";
import { InstructionsProps } from "../../../utils/types";

export const PluginList = () => {

    const { stackId } = useParams();
    const [ instructions, setInstructions ] = React.useState<InstructionsProps|null>(null);
    const [ showModal, setShowModal] = React.useState<boolean>(false);
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
    },[allPlugins]);

    const handleClose = () => setShowModal(!showModal);

    const handleSubmitInstructions = () => {
        setShowModal(true);
    }

    const resetInstructionsState = () => setInstructions(null);


    React.useEffect(()=>{
        if(stackId){
            setInstructions({...instructions as InstructionsProps, stackId: stackId})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stackId])

    return (
        <>
        <PageLayout
          title="Select plugins to add to the template"
          label="Plugins"
          goBack
          createAction={handleSubmitInstructions}
         >
          {loading && <h1>Loading...</h1>}
          {error && <h1>Error...</h1>}
        <ListComponent 
         data={plugins}
         instructions={instructions}
         onSaveInstructions={setInstructions}
         />
        </PageLayout>
         <ModalComponent 
           title="Template information"
           open={showModal} 
           handleClose={handleClose} 
           >
          <GenerateTemplate
           onCloseModal={handleClose}
           instructions={instructions}
           onSaveInstructions={setInstructions}
           resetInstructions={resetInstructionsState}
          />
         </ModalComponent>        
        </>
    )
}