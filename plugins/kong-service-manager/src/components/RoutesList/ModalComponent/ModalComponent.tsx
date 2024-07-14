import React from "react";
import { Box, Button, Card, Checkbox, Collapse, Divider, Fade, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Modal, Paper, Select, TextField, Tooltip, Typography } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { useModalComponentStyles } from "./styles";
import { ModalComponentProps } from "./types";
import { MdClose, MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { Protocols, ProtocolDescriptions } from '../../../utils/enums/KongRouteProtocols';
import StringInputList from '../StringInputList/StringInputList';
import { Methods } from "../../../utils/enums/KongRouteMethods";
import { useKongServiceManagerContext } from '../../../context';
import { CreateRoute } from "../../../utils/types";

export const ModalComponent : React.FC<ModalComponentProps> = (props) => {
  const { show, handleCloseModal } = props;
  const RedirectStatusCode = ['426', '301', '302','307', '308'];
  const { field, modalOnBlur,modalContent, modalHeader,closeModal,modalBody, container, titleBar, content } = useModalComponentStyles();
  const { createRoute } = useKongServiceManagerContext();
  
  const [name, setName] = React.useState<string>();
  const [tags, setTags] = React.useState<{ id: string; value: string }[]>([]);
  const [protocols, setProtocols] = React.useState<String>('HTTP, HTTPS');
  const [protocolDescription, setProtocolDescription] = React.useState<string>(ProtocolDescriptions.HTTP_HTTPS);
  const [hosts, setHosts] = React.useState<{ id: string; value: string }[]>([]);
  const [paths, setPaths] = React.useState<{ id: string; value: string }[]>([]);
  const [snis, setSnis] = React.useState<{ id: string; value: string }[]>([]);
  const [headers, setHeaders] = React.useState<{ id: string; value: string }[]>([]);
  const [sources, setSources] = React.useState<{ id: string; value: string }[]>([]);
  const [destinations, setDestinations] = React.useState<{ id: string; value: string }[]>([]);
  const [methods, setMethods] = React.useState<string[]>([]);
  const [httpsRedirectStatusCode, setHttpsRedirectStatusCode] = React.useState<String>('426');
  const [regexPriority, setRegexPriority] = React.useState<String>('0');
  const [stripPath, setStripPath] = React.useState<Boolean>(true);
  const [preserveHost, setpreserveHost] = React.useState<Boolean>(false);
  const [requestBuffering, setRequestBuffering] = React.useState<Boolean>(true);
  const [responseBuffering, setResponseBuffering] = React.useState<Boolean>(true);

  const handleChangeProtocol = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedProtocol = event.target.value as string;
    setProtocols(selectedProtocol);
    setProtocolDescription(getProtocolDescription(selectedProtocol));
  };

  const getProtocolDescription = (protocol: string): string => {
    const normalizedProtocol = protocol.replace(/, /g, "_");
    return ProtocolDescriptions[normalizedProtocol as keyof typeof ProtocolDescriptions] || "";
  };

  const handleHttpsRedirectStatusCodeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setHttpsRedirectStatusCode(event.target.value as string);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleTagsChange = (items: { id: string; value: string }[]) => {
    setTags(items);
  };
  const handleHostChange = (items: { id: string; value: string }[]) => {
    setHosts(items);
  };
  const handlePathsChange = (items: { id: string; value: string }[]) => {
    setPaths(items);
  };
  const handleSnisChange = (items: { id: string; value: string }[]) => {
    setSnis(items);
  };
  const handleHeadersChange = (items: { id: string; value: string }[]) => {
    setHeaders(items);
  };
  const handleSourcesChange = (items: { id: string; value: string }[]) => {
    setSources(items);
  };
  const handleDestinationsChange = (items: { id: string; value: string }[]) => {
    setDestinations(items);
  };
  const handleRegexPriority = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegexPriority(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setMethods((prevMethods) =>
      checked ? [...prevMethods, value] : prevMethods.filter((method) => method !== value)
    );
  };

  const handleStripPathCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value){
      setStripPath(event.target.checked);
    }
  };

  const handlePreserveHostCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value){
      setpreserveHost(event.target.checked);
    }
  };

  const handleRequestBufferingCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value){
      setRequestBuffering(event.target.checked);
    }
  };

  const handleResponseBufferingCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value){
      setResponseBuffering(event.target.checked);
    }
  };

  const renderDynamicFields = React.useMemo(() => {
    const fields = protocolDescription.split(', ');

    return fields.map((field, index) => {
      switch (field.toLowerCase()) {
        case 'hosts':
          return (
            <Box key={index} sx={{ p: 2 }}>
              <StringInputList
                label="Hosts"
                buttonText="Add"
                onItemsChange={handleHostChange}
                initialItems={hosts}
              />
            </Box>
          );
        case 'paths':
          return (
            <Box key={index} sx={{ p: 2 }}>
              <StringInputList
                label="Paths"
                buttonText="Add"
                onItemsChange={handlePathsChange}
                initialItems={paths}
              />
            </Box>
          );
        case 'snis':
          return (
            <Box key={index} sx={{ p: 2 }}>
              <StringInputList
                label="SNIs"
                buttonText="Add"
                onItemsChange={handleSnisChange}
                initialItems={snis}
              />
            </Box>
          );
        case 'headers':
          return (
            <Box key={index} sx={{ p: 2 }}>
              <StringInputList
                label="Headers"
                buttonText="Add"
                onItemsChange={handleHeadersChange}
                initialItems={headers}
                twoFields={true}
              />
            </Box>
          );
        case 'sources':
          return (
            <Box key={index} sx={{ p: 2 }}>
              <StringInputList
                label="Sources"
                buttonText="Add"
                onItemsChange={handleSourcesChange}
                initialItems={sources}
                twoFields={true}
              />
            </Box>
          );
        case 'destinations':
          return (
            <Box key={index} sx={{ p: 2 }}>
              <StringInputList
                label="Destinations"
                buttonText="Add"
                onItemsChange={handleDestinationsChange}
                initialItems={destinations}
                twoFields={true}
              />
            </Box>
          );
        case 'methods':
          return (
            <Box sx={{ p: 2 }}>
              {Object.values(Methods).map((method) => (
                <FormControlLabel
                  key={method}
                  control={
                    <Checkbox
                      checked={methods.includes(method)}
                      onChange={handleCheckboxChange}
                      value={method}
                    />
                  }
                  label={method}
                />
              ))}
            </Box>
          );
        default:
          return null;
      }
    });
  }, [protocolDescription, hosts, paths, snis, headers, sources, destinations, methods]);

  const handleReset = () => {
    setHosts([]);
    setPaths([]);
    setSnis([]);
    setHeaders([]);
    setSources([]);
    setDestinations([]);
    setMethods([]);
  };

  const isSaveDisabled = React.useMemo(() => {
    return !(
      name != '' &&
      (hosts.length > 0 ||
      paths.length > 0 ||
      snis.length > 0 ||
      headers.length > 0 ||
      sources.length > 0 ||
      destinations.length > 0 ||
      methods.length > 0)
    );
  }, [hosts, paths, snis, headers, sources, destinations, methods]);

  const handleSaveRoute = async ()=> {
    const config: CreateRoute = {
      name,
      protocols,
      methods,
      hosts,
      paths,
      headers,
      tags,
      // snis,
      // sources,
      // destinations,
      https_redirect_status_code: httpsRedirectStatusCode,
      regex_priority: regexPriority,
      strip_path: stripPath,
      preserve_host: preserveHost,
      request_buffering: requestBuffering,
      response_buffering: responseBuffering,
    }
    console.log(config);
    await createRoute(config);
  }

  const [showFields, setShowFields] = React.useState(false);

  const handleTextClick = () => {
    setShowFields(!showFields);
  };

  return (
    <Modal
      open={show}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-job-details"
      aria-describedby="modal-modal-jobs-details-and-steps"
      className={modalOnBlur}
      closeAfterTransition
    >
      <Fade in={show}>  
        <Box className={modalContent}>
          <div className={modalBody}>
            <Paper className={container}>
              <Box className={titleBar}>
                <Typography variant="h6">Route</Typography>
                <div className={modalHeader}>
                  <Tooltip title="Close">
                    <MdClose 
                      size={32}
                      className={closeModal}
                      onClick={handleCloseModal}
                    />
                  </Tooltip>
                </div>
              </Box>
              <div className={content}>
                <Grid container spacing={4}>

                  <Grid item xs={4}>
                    <Typography variant="h6">General Information</Typography>
                    <Typography variant="body2">General information will help you identify and manage this route</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <TextField id="name" label="Name" variant="filled" className={field} value={name} onChange={handleNameChange}/>
                      </Grid>
                      <Grid item xs={12}>
                        <StringInputList
                          label="Tags"
                          buttonText="Add"
                          onItemsChange={handleTagsChange}
                          initialItems={tags}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="h6">Route Configuration</Typography>
                    <Typography variant="body2">Route configuration determines how this route will handle incoming requests</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <FormControl variant="filled" className={field}>
                          <InputLabel id="protocols-label">Protocols</InputLabel>
                          <Select
                            labelId="protocols-label"
                            id="protocols"
                            value={protocols}
                            label="Protocols"
                            onChange={(event) => {
                              handleChangeProtocol(event);
                              handleReset() 
                            }}
                          >
                            {Object.values(Protocols).map((protocol) => (
                              <MenuItem key={protocol} value={protocol}>{protocol}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Card variant="outlined">
                          <Box sx={{ p: 2 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography gutterBottom variant="h6" component="div">
                                { protocols } Routing Rules
                              </Typography>
                            </Stack>
                            <Typography color="textSecondary" variant="body2">
                              For { protocols }, at least one of { protocolDescription } must be set.
                            </Typography>
                          </Box>
                          <Divider />
                          { renderDynamicFields }

                          <Box sx={{ p: 2 }}>
                            <Typography variant="subtitle1" onClick={handleTextClick} style={{ cursor: "pointer", display: "flex", alignItems: "center"}}>
                              View Advanced Fields
                              {showFields ? <MdArrowDropUp /> : <MdArrowDropDown />}
                            </Typography>
                            <Collapse in={showFields}>
                              <Box sx={{ p: 2 }}>
                                <FormControl variant="filled" className={field}>
                                  <InputLabel id="https-redirect-label">HTTPS Redirect Status Code</InputLabel>
                                  <Select
                                    labelId="https-redirect-label"
                                    id="httpsRedirectStatusCode"
                                    value={httpsRedirectStatusCode}
                                    label="HTTPS Redirect Status Code"
                                    onChange={handleHttpsRedirectStatusCodeChange}
                                  >
                                    {Object.values(RedirectStatusCode).map((redirectStatusCode) => (
                                      <MenuItem key={redirectStatusCode} value={redirectStatusCode}>{redirectStatusCode}</MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Box>
                              <Box sx={{ p: 2 }}>
                                <TextField
                                  id="regexPriority"
                                  label="Regex Priority"
                                  value={regexPriority}
                                  type="number"
                                  onChange={handleRegexPriority}
                                  variant="filled"
                                  className={field}
                                />
                              </Box>
                              <Box sx={{ p: 2 }}>
                                <FormGroup>
                                  <FormControlLabel control={
                                    <Checkbox
                                      checked={!!stripPath}
                                      onChange={handleStripPathCheckbox}
                                      value={stripPath}
                                    />
                                  } label="Strip Path" />
                                  <FormControlLabel control={
                                    <Checkbox
                                      checked={!!preserveHost}
                                      onChange={handlePreserveHostCheckbox}
                                      value={preserveHost}
                                    />
                                  } label="Preserve Host" />
                                  <FormControlLabel control={
                                    <Checkbox
                                      checked={!!requestBuffering}
                                      onChange={handleRequestBufferingCheckbox}
                                      value={requestBuffering}
                                    />
                                  } label="Request buffering" />
                                  <FormControlLabel control={
                                    <Checkbox
                                      checked={!!responseBuffering}
                                      onChange={handleResponseBufferingCheckbox}
                                      value={responseBuffering}
                                    />
                                  } label="Response buffering" />
                                </FormGroup>
                              </Box>
                            </Collapse>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={2} direction="row-reverse">
                      <Button variant="contained" color="primary" onClick={handleSaveRoute} disabled={isSaveDisabled}>Save</Button>
                      <Button variant="contained" color="secondary" onClick={handleCloseModal}>Cancel</Button>
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}
