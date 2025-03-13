import React from 'react';
import {
  Grid, TextField, Button, 
  Stepper, Step, StepLabel,
  StepContent, Typography} from '@material-ui/core';
import { useStepperComponentStyles } from './styles';
// import { useVeeContext } from '../../context';
import { StepperComponentProps } from './types';
import { InstructionsProps } from '../../../utils/types';

export const StepperComponent : React.FC<StepperComponentProps> = (props) => {
  
  const [step0Error, setStep0Error] = React.useState<boolean>(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading ] = React.useState<boolean>(false);
  const { onCloseModal, instructions, onSaveInstructions, resetInstructions } = props;
  const steps = ["Add Template name", "Add additional informations"];
 //  const { createTemplate } = useVeeContext()
  const { input, root, textareaStyles } = useStepperComponentStyles();

  const handleSubmit = async () => {
    if(instructions){
       setLoading(true)
       // await addPlugin(newPlugin);
       setLoading(false);
       resetInstructions();
       onCloseModal();
    }
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

  const Step0Content = () => {
    return (
        <TextField 
         fullWidth variant="outlined" 
         label="Template Name" 
         value={instructions ? instructions.templateName : ''} 
         className={input}
         required
         onChange={e => {
          onSaveInstructions({ ...instructions as InstructionsProps, templateName: e.target.value });
         }}
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
         value={instructions ? instructions.additionalInfo : ''} 
         onChange={e => {
           onSaveInstructions({ ...instructions as InstructionsProps, additionalInfo: e.target.value });
         }}
        />
    )
  }

  const getButtonText = () => {
    if (activeStep === steps.length - 1) {
      return loading ? "loading..." : "Create";
    }
    return "Next";
  };

  const StepsContent = [ Step0Content, Step1Content ];

  React.useEffect(() => {
    if(instructions){
        setStep0Error(instructions.templateName === "")
    }
  }, [instructions]);

  React.useEffect(()=>{
    resetInstructions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return ( 
         <Stepper activeStep={activeStep} orientation='vertical' className={root}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel><Typography variant="h6">{label}</Typography></StepLabel>
                    <StepContent>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {StepsContent[activeStep]()}
                        </Grid>

                        <Grid item xs={12}>
                          <Button disabled={activeStep === 0} onClick={handleBack}>
                            Back
                          </Button>
                          <Button variant="contained" color="primary"
                            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                            disabled={loading || handleNextStep(activeStep)}>
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
