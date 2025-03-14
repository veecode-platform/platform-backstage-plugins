import React from 'react';
// import { useVeeContext } from '../../context';
import { PluginListProps } from '../../utils/types';
import { StepperComponent } from './stepperComponent';
import { useParams } from 'react-router-dom';
import { useVeeContext } from '../../context';
import useAsync from 'react-use/esm/useAsync';
import { PluginList } from '../plugins';
import { FeedbackComponent, ModalComponent, PageLayout } from '../shared';
import { GenerateTemplateWrapperProps } from './types';
import { setStackId } from '../../context/state';

const GenerateTemplateWrapper : React.FC<GenerateTemplateWrapperProps> = (props) => {
  const { children, createAction = () => {}} = props;
  return (
    <PageLayout
        title="Select plugins & generate a template with AI"
        label="Generate a template"
        goBack
        createAction={createAction}
      >
        {children}
      </PageLayout>
  )
}

export const GenerateTemplate = () => {

  const { stackId } = useParams();
  const [ showModal, setShowModal] = React.useState<boolean>(false);
  const [ templateProcessing, setTemplateProcessing ] = React.useState<boolean>(false);
  const { getStackById, instructionsDispatch } = useVeeContext();

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
  
  React.useEffect(()=>{
      if(stackId){
        instructionsDispatch(setStackId(stackId))
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stackId])


  if(loading) return (    // TODO 
   <GenerateTemplateWrapper 
     createAction={handleSubmitInstructions}>
      <h1>Loading...</h1>
   </GenerateTemplateWrapper>);

if(error) return (   // TODO 
  <GenerateTemplateWrapper 
    createAction={handleSubmitInstructions}>
     <h1>Error...</h1>
  </GenerateTemplateWrapper>);


  return (
    <>
      <GenerateTemplateWrapper 
       createAction={handleSubmitInstructions}>
        <PluginList
          data={plugins}
        />
      </GenerateTemplateWrapper>

      <ModalComponent
        title="Template information"
        open={showModal}
        handleClose={handleClose}
      >
        <StepperComponent
          onCloseModal={handleClose}
          onTemplateProcessing={setTemplateProcessing}
        />
      </ModalComponent>

     <FeedbackComponent 
      open={templateProcessing} 
      variant="loading" 
      message="Generate a new template"
      />        
    </>
  );
};
