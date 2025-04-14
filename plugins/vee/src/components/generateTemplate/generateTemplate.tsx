import React from 'react';
import { PluginListProps } from '../../utils/types';
import { StepperComponent } from './stepperComponent';
import { useParams } from 'react-router-dom';
import { useVeeContext } from '../../context';
import useAsync from 'react-use/esm/useAsync';
import { PluginList } from '../plugins';
import { FeedbackComponent, ModalComponent, PageLayout } from '../shared';
import { GenerateTemplateWrapperProps } from './types';
import { setStackInfo } from '../../context/state';
import { CodeSnippet, Progress, WarningPanel } from '@backstage/core-components';

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
              if(stack && stack.plugins) {
                instructionsDispatch(setStackInfo({id: stack.id as string, name: stack.name, source: stack.source}))
                return stack.plugins
              }
              return []
          }
          return []
      },[]); 

  const plugins : PluginListProps[] = React.useMemo(()=>{
         if(allPlugins){
          return allPlugins.map(plugin => ({
              id: plugin.id as string,
              icon: null,
              name: plugin.name,
              docs: plugin.docs
          }))
         }
         return []
      },[allPlugins]);

  const handleClose = () => setShowModal(!showModal);
  const handleSubmitInstructions = () => setShowModal(true);

  if(loading) return (    
   <GenerateTemplateWrapper 
     createAction={handleSubmitInstructions}>
     <WarningPanel title={error?.name} message={error?.message}>
       <CodeSnippet language='txt' text={error?.cause as string}/>
     </WarningPanel>
   </GenerateTemplateWrapper>);

if(error) return (   
  <GenerateTemplateWrapper 
    createAction={handleSubmitInstructions}>
     <Progress/>
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
          processing={templateProcessing}
          onProcessing={setTemplateProcessing}
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
