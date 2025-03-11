import React from 'react';
import {
  Grid, TextField, Button, 
  Stepper, Step, StepLabel,
  StepContent, Typography} from '@material-ui/core';
import { useStepperStyles } from './styles';
import  Autocomplete  from '@mui/material/Autocomplete';
import { useVeeContext } from '../../../../context';
import { PluginStateType, UpdatePluginProps } from './types';

export const UpdatePlugin : React.FC<UpdatePluginProps> = (props) => {

  const [plugin, setPlugin] = React.useState<PluginStateType>({pluginId: '',name: '', annotations: []}); 
  const [step0Error, setStep0Error] = React.useState<boolean>(true)
  const [step1Error, setStep1Error] = React.useState<boolean>(true)
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading ] = React.useState<boolean>(false);
  const steps = ["Edit plugin name", "Edit annotations"];
  const { pluginSelectedState, updatePlugin } = useVeeContext();
  const { onCloseModal } = props;
  const { input, root } = useStepperStyles();

  const handleSubmit = async () => {
    setLoading(true)
    const annotationsMap = plugin.annotations.map(annotationString => { return { annotation: annotationString} })
    const newPlugin = {
        name: plugin.name,
        annotations: annotationsMap
      };
    await updatePlugin(plugin.pluginId,newPlugin);
    setLoading(false)
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
         value={plugin.name} 
         className={input}
         required
        onChange={e => {
          setPlugin({ ...plugin, name: e.target.value });
        }}
      />
    )
  }
  const Step1Content = () => {
    return (
      <Autocomplete
        multiple
        freeSolo
        options={[]} 
        value={plugin.annotations}
        onChange={(_, newValue) => {
          setPlugin({ ...plugin, annotations: newValue });
        }}
        renderInput={(params) => (
          <TextField 
            {...params} 
            fullWidth 
            variant="outlined" 
            label="Annotations" 
            required 
          />
        )}
      />
    );
  };

  const getButtonText = () => {
    if (activeStep === steps.length - 1) {
      return loading ? "loading..." : "Save Changes";
    }
    return "Next";
  };


  const StepsContent = [ Step0Content, Step1Content ]

  React.useEffect(() => {
    setStep0Error(plugin.name === "")
    setStep1Error(plugin.annotations.length === 0)
  }, [plugin])

  React.useEffect(()=>{
     if(pluginSelectedState) setPlugin({pluginId: pluginSelectedState.id as string, name: pluginSelectedState.name, annotations: pluginSelectedState.annotations.flatMap(item => JSON.parse(item.annotation).annotation)})
  },[pluginSelectedState])

  return ( <Stepper activeStep={activeStep} orientation='vertical' className={root}>
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
