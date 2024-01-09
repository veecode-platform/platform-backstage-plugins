import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Checkbox, FormControlLabel, Stepper, Step, StepLabel, StepContent, Typography, Divider, Tooltip, IconButton, } from '@material-ui/core';
import Help from '@material-ui/icons/HelpOutline';
import { useLocation, useNavigate } from 'react-router-dom';
import useAsync from 'react-use/lib/useAsync';
import Alert from '@material-ui/lab/Alert';
import { Progress } from '@backstage/core-components';
import {
  InfoCard,
  Header,
  Page,
  Content,
} from '@backstage/core-components';
import { IService } from '../utils/interfaces';
import { Select } from '../../shared';
import { securityItems, rateLimitingTypeItems, rateLimitingLimitByItems } from '../utils/common';
import { createAxiosInstance } from '../../../api/Api';
import { useApi, alertApiRef, configApiRef, identityApiRef } from '@backstage/core-plugin-api';
import { FetchKongServices } from '../utils/kongUtils';
import { makeStyles } from '@material-ui/core/styles';

type ServiceProps = {
  serviceData: any | undefined;
  axiosInstance: any;
};

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

const EditPageComponent = ({ serviceData, axiosInstance }: ServiceProps) => {
  const navigate = useNavigate();
  const inputClasses = inputStyles();

  const [loading, setLoading] = useState<boolean>(false)
  const [step0Error, setStep0Error] = useState<boolean>(true)
  const [step1Error, setStep1Error] = useState<boolean>(true)
  const [step2Error, setStep2Error] = useState<boolean>(false)
  const [step3Error, setStep3Error] = useState<boolean>(false)

  const [service, setService] = useState<any>({
    id: serviceData?.id,
    name: serviceData?.name ?? '...',
    active: serviceData?.active,
    description: serviceData?.description ?? '...',
    partnersId: serviceData?.partnersId ?? [],
    rateLimiting: serviceData?.rateLimiting ?? 0,
    kongServiceName: serviceData?.kongServiceName ?? '...',
    kongServiceId: serviceData?.kongServiceId ?? '...',
    securityType: serviceData?.securityType === "none" ? "" : serviceData?.securityType,
    rateLimitingType: serviceData?.rateLimitingType === "" ? "minute" : serviceData?.rateLimitingType,
    rateLimitingLimitBy: serviceData?.rateLimitingBy === "" ? "consumer" : serviceData?.rateLimitingBy
  });
  const [applySecurity, setApplySecurity] = useState<boolean>(service.securityType !== "")
  const [applyRateLimit, setApplyRateLimit] = useState<boolean>(service.rateLimiting !== 0)

  useEffect(() => {
    const rateLimitCheck = applyRateLimit ? service.rateLimiting === 0 : false
    setStep2Error(rateLimitCheck)
  }, [applyRateLimit, service.rateLimiting])

  useEffect(() => {
    const securityTypeCheck = applySecurity ? service.securityType === "" : false
    setStep3Error(securityTypeCheck)
  }, [applySecurity, service.securityType])

  useEffect(() => {
    setStep0Error(service.kongServiceId === "")
    setStep1Error(service.name.length === 0 || service.description.length === 0 || service.active === "")
  }, [service])

  const handleSubmit = async () => {
    setLoading(true)
    const data = {
      name: service.name,
      active: service.active,
      description: service.description,
      rateLimiting: {
        value: applyRateLimit ? service.rateLimiting : "0",
        type: service.rateLimitingType,
        limitBy: service.rateLimitingLimitBy
      },
      securityType: applySecurity ? service.securityType : "none"
    }

    const payload = {
      service: { ...data }
    }

    const response = await axiosInstance.patch(`/services/${service?.id}`, JSON.stringify(payload))
    if (response) navigate('/services');
    setLoading(false)
  };

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Kong service", "Info", "Rate limiting", "Auth"]

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
      <>
        <FetchKongServices disabled={true} valueName={service} setValue={setService} selected={{ name: service.kongServiceName, id: service.kongServiceId }} />
        <Tooltip title="if you wish to modify this selection, please delete this service and create another" placement="right">
          <IconButton>
            <Help />
          </IconButton>
        </Tooltip>
      </>

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
            endAdornment:
              <>
                <Select noBorder label={"Rate limiting type"} selected={service.rateLimitingType} items={rateLimitingTypeItems} disabled={!applyRateLimit}
                  onChange={e => {
                    setService({ ...service, rateLimitingType: e });
                  }}
                />
                <Select noBorder label={"Rate limiting limit by"} selected={service.rateLimitingLimitBy} items={rateLimitingLimitByItems} disabled={!applyRateLimit}
                  onChange={e => {
                    setService({ ...service, rateLimitingLimitBy: e });
                  }} />
              </>
          }}
          value={service.rateLimiting}
          disabled={!applyRateLimit}
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
          disabled={!applySecurity}
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
      <Header title="New Service" subtitle="Update your service" />
      <Content>
        <InfoCard variant='fullHeight'>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Edit your service </Typography>
              <Divider />
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
                            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                            disabled={loading || handleNextStep(activeStep)}>
                            {activeStep === steps.length - 1 ? loading ? "loading..." : "Save" : 'Next'}
                          </Button>
                        </Grid>
                      </Grid>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Grid>
          </Grid>
        </InfoCard>
      </Content>
    </Page>
  )

};

export const EditComponent = () => {
  const location = useLocation();
  const id = location.search.split('?id=')[1];
  const alert = useApi(alertApiRef)
  const config = useApi(configApiRef)
  const identity = useApi(identityApiRef)
  const axiosInstance = createAxiosInstance({ config, alert, identity })

  const { value, loading, error } = useAsync(async (): Promise<IService> => {
    const { data } = await axiosInstance.get(`/services/${id}`)
    console.log(data.service)
    return data.service;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return <EditPageComponent serviceData={value} axiosInstance={axiosInstance} />;
};
