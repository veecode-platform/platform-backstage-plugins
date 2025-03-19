import React from 'react';
import {
  Grid, TextField, Button, 
  Stepper, Step, StepLabel,
  StepContent, Typography} from '@material-ui/core';
import { useStepperStyles } from './styles';
import { useVeeContext } from '../../../../context';
import { CreateFixedOptionProps } from './types';
import { FixedOptionReducer, initialFixedOptionState, resetFixedOptionState, setFixedOptionType, setOptions } from '../state';


export const CreateFixedOption : React.FC<CreateFixedOptionProps> = (props) => {

  const [step0Error, setStep0Error] = React.useState<boolean>(true)
  const [step1Error, setStep1Error] = React.useState<boolean>(true)
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading ] = React.useState<boolean>(false);
  const [ fixedOptionState, fixedOptionDispatch] = React.useReducer(FixedOptionReducer, initialFixedOptionState); 
  const { onCloseModal } = props;
  const steps = ["Add fixed option type","Add options"];
  const { createFixedOption } = useVeeContext()
  const { input, root } = useStepperStyles();

  const resetFixedOption =  () => fixedOptionDispatch(resetFixedOptionState());

  const handleSubmit = async () => {
    setLoading(true)
    // const annotationsMap = pluginState.annotations.map(annotationString => { return { annotation: annotationString} })
    const newFixedOption = {
        type: fixedOptionState.type,
        options: [] // TODO
      };
    await createFixedOption(newFixedOption);
    setLoading(false);
    resetFixedOption();
    onCloseModal();
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
      case 1:
        return step1Error
      default:
        return false;
    }

  }

  const Step0Content = () => {
    return (
        <TextField 
         fullWidth variant="outlined" 
         label="Fixed option type" 
         value={fixedOptionState.type} 
         className={input}
         required
        onChange={e => {
          fixedOptionDispatch(setFixedOptionType(e.target.value));
        }}
      />
    )
  }

  const Step1Content = () => {
    return (
        <TextField 
         fullWidth variant="outlined" 
         label="Set options" 
         value={fixedOptionState.options} 
         className={input}
         required
        onChange={e => {
          fixedOptionDispatch(setOptions([{label: e.target.value, prompt: "test"}]));  // TODO
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
    setStep0Error(fixedOptionState.type === "")
    setStep1Error(fixedOptionState.options!.length === 0)
  }, [fixedOptionState]);

  React.useEffect(()=>{
    resetFixedOption();
  },[])

  return ( <Stepper activeStep={activeStep} orientation='vertical' className={root}>
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
