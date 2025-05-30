import React from 'react';
import { Grid, TextField, Button, Stepper, Step, StepLabel, StepContent, Typography, Chip} from '@material-ui/core';
import { useStepperStyles } from './styles';
import  Autocomplete  from '@mui/material/Autocomplete';
import { useVeeContext } from '../../../../context';
import type { UpdateStackProps } from './types';
import type { IPlugin, IStack } from '@veecode-platform/backstage-plugin-vee-common';
import { addStackState, initialStackState, resetStackState, setStackName, setStackPlugins, setStackSource, StackReducer } from '../state';


export const UpdateStack : React.FC<UpdateStackProps> = (props) => {

  const [ stackState, stackDispatch ] = React.useReducer(StackReducer, initialStackState);
  const [step0Error, setStep0Error] = React.useState<boolean>(true)
  const [step1Error, setStep1Error] = React.useState<boolean>(true)
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading ] = React.useState<boolean>(false);
  const { onCloseModal } = props;
  const steps = ["Add stack name", "Add source", "Add Plugins"];
  const { updateStack, stackSelectedState, listAllPlugins, allPluginsState } = useVeeContext()
  const { input, root } = useStepperStyles();
  const pluginsOptions = allPluginsState ? allPluginsState.flatMap(plugin => plugin.name) : [];

  const checkPluginDetails = (pluginName:string) => {
    const pluginFiltered = allPluginsState.find(plugin => plugin.name === pluginName) as IPlugin;
    return pluginFiltered ?? null
  }

  const handleSubmit = async () => {
    if(stackState){
      setLoading(true)
      const stackUpdated = {
        name: stackState.name,
        source: stackState.source
      } as IStack;
      if(stackState.plugins) stackUpdated.plugins = stackState.plugins; 
      await updateStack(stackState.id!,stackUpdated);
      setLoading(false);
      stackDispatch(resetStackState());
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
      case 1:
        return step1Error
      default:
        return false;
    }

  }

  const StackNameStepContent = () => {
    return (
        <TextField 
         fullWidth variant="outlined" 
         label="Stack Name" 
         value={ stackState ? stackState.name : ''} 
         className={input}
         required
         onChange={e => {
          stackDispatch(setStackName(e.target.value));
        }}
      />
    )
  }

  const StackSourceStepContent = () => {
    return (
        <TextField 
         fullWidth variant="outlined" 
         label="Stack Source" 
         value={stackState ? stackState.source : ''} 
         className={input}
         required
         onChange={e => {
          stackDispatch(setStackSource(e.target.value));
        }}
      />
    )
  }

  const StackPluginsStepContent = () => {
    return (
      <Autocomplete
        multiple
        id="plugins"
        options={pluginsOptions}
        defaultValue={
          stackState && stackState.plugins
            ? stackState.plugins.flatMap(plugin => plugin.name)
            : []
        }
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip 
                variant="default" 
                label={option} 
                key={key} 
                {...tagProps}
                 />
            );
          })
        }
        onChange={(_, newValue) => {
          const pluginList: IPlugin[] = [];
          newValue.map(value => {
            const plugin = checkPluginDetails(value);
            if (plugin) pluginList.push(plugin);
          });
          stackDispatch(setStackPlugins(pluginList));
        }}
        renderInput={params => (
          <TextField 
            {...params} 
            variant="outlined" 
            label="Plugin"
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

  const StepsContent = [ StackNameStepContent, StackSourceStepContent, StackPluginsStepContent ];

  React.useEffect(() => {
    if(stackState){
      setStep0Error(stackState.name === "")
      setStep1Error(stackState.source === "")
    }
  }, [stackState]);

  React.useEffect(()=>{
    listAllPlugins();
    stackDispatch(resetStackState());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  React.useEffect(()=>{
    if(stackSelectedState){
      stackDispatch(addStackState(stackSelectedState))
    }
  },
[stackSelectedState])

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
