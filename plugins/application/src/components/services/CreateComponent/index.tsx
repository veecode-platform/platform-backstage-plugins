import React, { useEffect, useState } from 'react';
import {
  Grid, TextField, Button, IconButton,
  Tooltip, Checkbox, FormControlLabel, Dialog,
  DialogActions, DialogContent, DialogContentText,
  DialogTitle, /*InputAdornment,*/ Stepper, Step, StepLabel,
  StepContent, Typography, Divider
} from '@material-ui/core';

import { /* Link as RouterLink,*/ useNavigate } from 'react-router-dom';
import {
  InfoCard,
  Header,
  Page,
  Content,
  // ContentHeader,
} from '@backstage/core-components';
import { FetchKongServices } from '../utils/kongUtils';
import { securityItems, rateLimitingTypeItems, rateLimitingLimitByItems } from '../utils/common';
import { Select } from '../../shared';
import Help from '@material-ui/icons/HelpOutline';
import { createAxiosInstance } from '../../../api/Api';
import { useApi, alertApiRef, configApiRef, identityApiRef } from '@backstage/core-plugin-api';
import { makeStyles } from '@material-ui/core/styles';

const inputStyles = makeStyles({
  input: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  },
});

export const CreateComponent = () => {
  const inputClasses = inputStyles();
  const alert = useApi(alertApiRef)
  const config = useApi(configApiRef)
  const identity = useApi(identityApiRef)
  const axiosInstance = createAxiosInstance({ config, alert, identity })
  const navigate = useNavigate();
  const [service, setService] = useState<any>({
    name: '',
    kongServiceName: '',
    active: true,
    description: '',
    kongServiceId: '',
    securityType: '',
    rateLimiting: 0,
    rateLimitingType: "minute",
    rateLimitingLimitBy: "consumer"
  });
  const [loading, setLoading] = useState(false);
  const [applySecurity, setApplySecurity] = useState<boolean>(false)
  const [applyRateLimit, setApplyRateLimit] = useState<boolean>(false)
  const [showDialog, setShowDialog] = useState<boolean>(false)

  const [step0Error, setStep0Error] = useState<boolean>(true)
  const [step1Error, setStep1Error] = useState<boolean>(true)
  const [step2Error, setStep2Error] = useState<boolean>(false)
  const [step3Error, setStep3Error] = useState<boolean>(false)

  const kongReadOnlyMode = config.getBoolean("platform.apiManagement.readOnlyMode")

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    const rateLimitCheck = kongReadOnlyMode ? false : applyRateLimit ? service.rateLimiting === 0 : false
    setStep2Error(rateLimitCheck)
  }, [applyRateLimit, service.rateLimiting])

  useEffect(() => {
    const securityTypeCheck = kongReadOnlyMode ? false : applySecurity ? service.securityType === "" : false
    setStep3Error(securityTypeCheck)
  }, [applySecurity, service.securityType])

  useEffect(() => {
    setStep0Error(service.kongServiceId === "")
    setStep1Error(service.name.length === 0 || service.description.length === 0 || service.active === "")
  }, [service])

  const handleSubmit = async () => {
    setLoading(true)
    const servicePost = {
      service: {
        name: service.name,
        kongServiceName: service.kongServiceName,
        active: service.active,
        description: service.description,
        kongServiceId: service.kongServiceId,
        rateLimiting: {
          value: applyRateLimit ? service.rateLimiting : "0",
          type: service.rateLimitingType,
          limitBy: service.rateLimitingLimitBy
        },
        securityType: applySecurity ? service.securityType : "none"
      },
    };
    const response = await axiosInstance.post("/services", JSON.stringify(servicePost))
    if (response) navigate('/services');
    setLoading(false)
  };

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Select kong service", "Info", "Rate limiting", "Auth"]

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
      case 2:
        return step2Error
      case 3:
        return step3Error
      default:
        return false;
    }

  }

  const Step0Content = () => {
    return (
      <FetchKongServices valueName={service} setValue={setService} selected={service.kongServiceName ? { name: service.kongServiceName, id: service.kongServiceId } : null} />
    )
  }
  const Step1Content = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TextField fullWidth variant="outlined" label="Service Name" value={service.name} required
            onChange={e => {
              setService({ ...service, name: e.target.value });
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <Select placeholder="Status" label="Service Status" selected={service.active ? "true" : "false"} items={[{ label: 'active', value: 'true' }, { label: 'inactive', value: 'false' }]}
            onChange={e => {
              setService({ ...service, active: e === "true" ? true : false });
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" label="Description" multiline value={service.description} minRows={3} required
            onChange={e => {
              setService({ ...service, description: e.target.value });
            }}
          />
        </Grid>
      </Grid>
    )
  }

  const Step2Content = () => {
    return (
      <Grid container direction='column' spacing={1}>
        <FormControlLabel
          value={applyRateLimit}
          label="Apply rate limit?"
          labelPlacement='end'
          control={<Checkbox checked={applyRateLimit} size='small' onChange={() => { setApplyRateLimit(!applyRateLimit) }} />}
        />
        <TextField
          type='number'
          fullWidth
          variant="outlined"
          label="Rate limiting value"
          className={inputClasses.input}
          inputProps={{ min: 0 }}
          InputProps={{
            // endAdornment: <InputAdornment position="end">/min</InputAdornment>,
            endAdornment:
              <>
                <Select noBorder label={"Rate limiting type"} selected={service.rateLimitingType} items={rateLimitingTypeItems} disabled={kongReadOnlyMode || !applyRateLimit}
                  onChange={e => {
                    setService({ ...service, rateLimitingType: e });
                  }}
                />
                <Select noBorder label={"Rate limiting limit by"} selected={service.rateLimitingLimitBy} items={rateLimitingLimitByItems} disabled={kongReadOnlyMode || !applyRateLimit}
                  onChange={e => {
                    setService({ ...service, rateLimitingLimitBy: e });
                  }} />
              </>
          }}
          value={service.rateLimiting}
          disabled={kongReadOnlyMode || !applyRateLimit}
          onChange={e => {
            setService({ ...service, rateLimiting: e.target.value });
          }}
        />
      </Grid>
    )
  }

  const Step3Content = () => {
    return (
      <>
        <FormControlLabel
          value={applySecurity}
          label="Apply security plugins?"
          labelPlacement='end'
          control={<Checkbox checked={applySecurity} size='small' onChange={() => { setApplySecurity(!applySecurity) }} />}
        />
        <Select
          onChange={e => {
            setService({ ...service, securityType: e });
          }}
          selected={service.securityType}
          placeholder="Select the Security Type"
          label="Security Type"
          items={securityItems}
          disabled={kongReadOnlyMode || !applySecurity}
        />
      </>
    )
  }

  const StepsContent = [
    Step0Content,
    Step1Content,
    Step2Content,
    Step3Content
  ]

  return (
    <Page themeId="plugin">
      <Header title="New Service" subtitle="Create a new Service" />
      <Content>
        <InfoCard variant='fullHeight'>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Import your service from kong </Typography>
              <Divider/>
              <Stepper activeStep={activeStep} orientation='vertical'>
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
                            onClick={activeStep === steps.length - 1 ? kongReadOnlyMode ? handleOpenDialog : handleSubmit : handleNext}
                            disabled={loading || handleNextStep(activeStep)}>
                            {activeStep === steps.length - 1 ? loading ? "loading..." : "Create" : 'Next'}
                          </Button>
                        </Grid>
                        <ConfirmDialog show={showDialog} handleClose={handleCloseDialog} handleSubmit={handleSubmit} />
                      </Grid>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            {kongReadOnlyMode &&
              <Grid item xs={12} md={12} lg={12}
                style={{
                  display: "flex",
                  justifyContent: 'flex-start',
                }}>
                <Tooltip title="Kong read only mode ativado" placement="bottom">
                  <IconButton>
                    <Help />
                  </IconButton>
                </Tooltip>
              </Grid>
            }
          </Grid>
        </InfoCard>
      </Content>
    </Page>
  )
};


type dialogProps = {
  show: boolean;
  handleClose: any;
  handleSubmit: any;
}

const ConfirmDialog = ({ show, handleClose, handleSubmit }: dialogProps) => {
  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Create a service without a consumer group?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Make sure you have created a Kong consumer group by the name of your service + "-group".`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
