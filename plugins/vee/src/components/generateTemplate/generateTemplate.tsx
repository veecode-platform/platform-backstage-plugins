import React from 'react';
// import { useVeeContext } from '../../context';
import { InstructionsProps } from '../../utils/types';
import { StepperComponent } from './stepperComponent';
import { useParams } from 'react-router-dom';
import { useVeeContext } from '../../context';
import useAsync from 'react-use/esm/useAsync';
import { PluginList } from '../plugins';
import type { PluginListProps } from "../plugins/pluginList/types"
import { ModalComponent, PageLayout } from '../shared';

export const GenerateTemplate = () => {

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
  
  const handleSubmitInstructions = () => setShowModal(true);
  
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
        title="Select plugins & generate a template with AI"
        label="Generate a template"
        goBack
        createAction={handleSubmitInstructions}
      >
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error...</h1>}
        <PluginList
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
        <StepperComponent
          onCloseModal={handleClose}
          instructions={instructions}
          onSaveInstructions={setInstructions}
          resetInstructions={resetInstructionsState}
        />
      </ModalComponent>
    </>
  );
};
