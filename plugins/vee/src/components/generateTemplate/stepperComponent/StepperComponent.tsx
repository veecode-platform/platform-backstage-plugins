import React from 'react';
import {
  Grid, TextField, Button, 
  Stepper, Step, StepLabel,
  StepContent, Typography} from '@material-ui/core';
import { useStepperComponentStyles } from './styles';
import { useVeeContext } from '../../../context';
import { StepperComponentProps } from './types';
import { resetInstructions, setAdditionalInfo, setTemplateName } from '../../../context/state';
import { useNavigate } from 'react-router-dom';


export const StepperComponent : React.FC<StepperComponentProps> = (props) => {
  
  const [step0Error, setStep0Error] = React.useState<boolean>(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const { onCloseModal, processing, onProcessing } = props;
  const steps = ["Add Template name", "Add additional informations"];
  const { instructionsState, instructionsDispatch , getTemplateFilesAndCreateVectorStore,templateChat} = useVeeContext()
  const { input, root, textareaStyles } = useStepperComponentStyles();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    onProcessing(true);
    setTimeout(()=>{onProcessing(false);},2000);
    onCloseModal();
    navigate("/vee/scaffolder-ai/output")
    // if(instructionsState){
    //    onProcessing(true);
    //    // TODO -- melhorar o prompt e incluir as docs dos plugins na tabela do backend e na interface do pluginListProps
    //    const prompt = `
    //     The template ${instructionsState.templateName} used the 
    //     ${instructionsState.stackInfo.name}, that source url:
    //     ${instructionsState.stackInfo.source}
    //     ${instructionsState.plugins ? `and used instructionsState.plugins` : ''}
    //     ,
    //      more information about: 
    //     ${instructionsState.additionalInfo}
    //    `
    //    const response = await getTemplateFilesAndCreateVectorStore(instructionsState.stackInfo.source, instructionsState.templateName); 
    //   if(response){
    //     await templateChat(instructionsState.templateName, prompt);
    //     instructionsDispatch(resetInstructions());
    //     onProcessing(false);
    //     onCloseModal();
    //     navigate("/vee/scaffolder-ai/output")
    //   }
  
    // }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextStep = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return step0Error
      default:
        return false;
    }

  }

  const handleAddTemplateName = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    instructionsDispatch(setTemplateName(e.target.value))
  }

  const handleAddAdditionalInfo = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    instructionsDispatch(setAdditionalInfo(e.target.value))
  }

  const Step0Content = () => {
    return (
        <TextField 
         fullWidth variant="outlined" 
         label="Template Name" 
         value={instructionsState ? instructionsState.templateName : ''} 
         className={input}
         required
         onChange={handleAddTemplateName}
      />
    )
  }
  const Step1Content = () => {
    return (
        <TextField 
        multiline
        minRows={15}
        variant="outlined"
        style={{ resize: 'none' }}
        className={textareaStyles} 
         placeholder="Additional informations" 
         value={instructionsState ? instructionsState.additionalInfo : ''} 
         onChange={handleAddAdditionalInfo}
        />
    )
  }

  const getButtonText = () => {
    if (activeStep === steps.length - 1) {
      return processing ? "loading..." : "Create";
    }
    return "Next";
  };

  const StepsContent = [ Step0Content, Step1Content ];

  React.useEffect(() => {
    if(instructionsState){
        setStep0Error(instructionsState.templateName === "")
    }
  }, [instructionsState]);

  return ( 
         <Stepper activeStep={activeStep} orientation='vertical' className={root}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel><Typography variant="h6">{label}</Typography></StepLabel>
                    <StepContent>
                      <Grid container spacing={2}>
                        <Grid item md={8} xs={12}>
                          {StepsContent[activeStep]()}
                        </Grid>

                        <Grid item md={8} xs={12}>
                          <Button disabled={activeStep === 0} onClick={handleBack}>
                            Back
                          </Button>
                          <Button variant="contained" color="primary"
                            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                            disabled={processing || handleNextStep(activeStep)}>
                            {getButtonText()}
                          </Button>
                        </Grid>
                      </Grid>
                    </StepContent>
                  </Step>
                ))}
          </Stepper>
  )
};
