import React from 'react';
import {
  Grid, TextField, Button, 
  Stepper, Step, StepLabel,
  StepContent, Typography} from '@material-ui/core';
import { useStepperStyles } from './styles';
import { useVeeContext } from '../../../../context';
import { AddPluginProps } from './types';
import { initialPluginState, PluginReducer, resetPluginState, setPluginDocs, setPluginName } from '../state';

export const AddPlugin : React.FC<AddPluginProps> = (props) => {


  const [step0Error, setStep0Error] = React.useState<boolean>(true)
  const [step1Error, setStep1Error] = React.useState<boolean>(true)
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading ] = React.useState<boolean>(false);
  const [pluginState, pluginDispatch] = React.useReducer(PluginReducer, initialPluginState); 
  const { onCloseModal } = props;
  const steps = ["Add plugin name","Add docs"];
  const { addPlugin } = useVeeContext()
  const { input, root } = useStepperStyles();

  const resetPlugin =  () => pluginDispatch(resetPluginState());

  const handleSubmit = async () => {
    setLoading(true)
    const newPlugin = {
        name: pluginState.name,
        docs: pluginState.docs
      };
    await addPlugin(newPlugin);
    setLoading(false);
    resetPlugin();
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
         label="Plugin Name" 
         value={pluginState.name} 
         className={input}
         required
        onChange={e => {
          pluginDispatch(setPluginName(e.target.value));
        }}
      />
    )
  }

  const Step1Content = () => {
    return (
        <TextField 
         fullWidth variant="outlined" 
         label="Plugin Docs" 
         value={pluginState.docs} 
         className={input}
         required
        onChange={e => {
          pluginDispatch(setPluginDocs(e.target.value));
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
    setStep0Error(pluginState.name === "")
    setStep1Error(pluginState.docs === "")
  }, [pluginState]);

  React.useEffect(()=>{
    resetPlugin();
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
