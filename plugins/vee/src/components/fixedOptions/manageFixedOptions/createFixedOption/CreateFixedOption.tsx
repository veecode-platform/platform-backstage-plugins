import React from 'react';
import {
  Grid, TextField, Button, 
  Stepper, Step, StepLabel,
  StepContent, Typography} from '@material-ui/core';
import { useStepperStyles } from './styles';
import { useVeeContext } from '../../../../context';
import { CreateFixedOptionProps } from './types';
import { FixedOptionReducer, initialFixedOptionState, resetFixedOptionState, setFixedOptionType, setOptions } from '../state/fixedOptionsState';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { BackstageType } from '../types';
import { IncrementedInput } from './incrementedInput';

const filter = createFilterOptions<BackstageType>();

export const CreateFixedOption : React.FC<CreateFixedOptionProps> = ({ onCloseModal }) => {

  const [step0Error, setStep0Error] = React.useState<boolean>(true)
  const [step1Error, setStep1Error] = React.useState<boolean>(true)
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading ] = React.useState<boolean>(false);
  const [ fixedOptionState, fixedOptionDispatch] = React.useReducer(FixedOptionReducer, initialFixedOptionState); 
  const steps = ["Add fixed option type","Add options"];
  const { createFixedOption } = useVeeContext()
  const { input, root } = useStepperStyles();
  const allBackstageTypes: readonly BackstageType[] = [
    {type: 'service'},
    {type: 'website'},
    {type: 'library'},
    {type: 'devops'},
    {type: 'infra'}
    ];  


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
        <Autocomplete
          id="type"
          value={fixedOptionState.type}
          options={allBackstageTypes}
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.type;
          }}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                {option.type}
              </li>
            );
          }}
          freeSolo
          onChange={(_, newValue) => {
            if (typeof newValue === 'string') {
              fixedOptionDispatch(setFixedOptionType(newValue))      
            } else if (newValue && newValue.inputValue) {
              fixedOptionDispatch(setFixedOptionType(newValue.inputValue))
            } else {
              fixedOptionDispatch(setFixedOptionType(newValue?.type as string))
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
    
            const { inputValue } = params;
            const isExisting = options.some((option) => inputValue === option.type);
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                type: `Add "${inputValue}"`,
              });
            }
    
            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Type"
              required
              placeholder="Set type"
              className={input}
            />
            )}
       />
      );
    };

    const Step1Content = () => {
    return (
        <IncrementedInput/>
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
