import React from "react";
import { Box, Button, Card, Checkbox, Collapse, Divider, Fade, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Modal, Paper, Select, TextField, Tooltip, Typography } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { useModalComponentStyles } from "./styles";
import { ModalComponentProps, InputChangeEvent, ItemsChangeEvent, SetState } from "./types";
import { MdClose, MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import StringInputList from '../StringInputList/StringInputList';
import { useKongServiceManagerContext } from '../../../context';
import { CreateRoute } from "../../../utils/types";
import { convertToHeadersObject } from "../../../utils/helpers/convertoToHeadersObject";
import { RedirectStatusCode } from "../../../utils/enums/KongRouteRedirectStatusCode";
import { Protocols, ProtocolDescriptions } from '../../../utils/enums/KongRouteProtocols';
import DynamicFields from "./DynamicFields";

export const ModalComponent : React.FC<ModalComponentProps> = (props) => {
  const { show, handleCloseModal, route } = props;
  const { field, modalOnBlur,modalContent, modalHeader,closeModal,modalBody, container, titleBar, content } = useModalComponentStyles();
  const { createRoute, editRoute } = useKongServiceManagerContext();
  
  const [showFields, setShowFields] = React.useState(false);
  const [name, setName] = React.useState<string>(route?.name || '');
  const [tags, setTags] = React.useState<{ id: string; value: string }[]>(route?.tags || []);
  const [protocols, setProtocols] = React.useState<string>(route?.protocols || 'http, https');
  const [protocolDescription, setProtocolDescription] = React.useState<string>(ProtocolDescriptions.HTTP_HTTPS);
  const [hosts, setHosts] = React.useState<{ id: string; value: string }[]>(route?.hosts || []);
  const [paths, setPaths] = React.useState<{ id: string; value: string }[]>(route?.paths || []);
  const [snis, setSnis] = React.useState<{ id: string; value: string }[]>(route?.snis || []);
  const [headers, setHeaders] = React.useState<{ id: string; value: string }[]>(route?.headers || []);
  const [sources, setSources] = React.useState<{ id: string; value: string }[]>(route?.sources || []);
  const [destinations, setDestinations] = React.useState<{ id: string; value: string }[]>(route?.destinations || []);
  const [methods, setMethods] = React.useState<string[]>(route?.methods || []);
  const [httpsRedirectStatusCode, setHttpsRedirectStatusCode] = React.useState<number>(route?.https_redirect_status_code || 426);
  const [regexPriority, setRegexPriority] = React.useState<number>(route?.regex_priority || 0);
  const [stripPath, setStripPath] = React.useState<boolean>(route?.strip_path || true);
  const [preserveHost, setPreserveHost] = React.useState<boolean>(route?.preserve_host || false);
  const [requestBuffering, setRequestBuffering] = React.useState<boolean>(route?.request_buffering || true);
  const [responseBuffering, setResponseBuffering] = React.useState<boolean>(route?.response_buffering || true);

  const handleChange = <T,>(event: InputChangeEvent | ItemsChangeEvent, setState: SetState<T>, transformFn?: (value: unknown, checked?: boolean) => T) => {
    if (Array.isArray(event)) {
      setState(event as T);
    } else {
      const { value, checked } = (event as React.ChangeEvent<HTMLInputElement>).target;
      if (transformFn) {
        setState(transformFn(value, checked));
      } else {
        setState(value as T);
      }
    }
  };

  const getProtocolDescription = (protocol: string): string => {
    const normalizedProtocol = protocol.replace(/, /g, "_");
    return ProtocolDescriptions[normalizedProtocol.toUpperCase() as keyof typeof ProtocolDescriptions] || "";
  };

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
      protocols: protocols.split(', '),
      methods,
      hosts: hosts.map(obj => obj.value),
      paths: paths.map(obj => obj.value),
      headers: convertToHeadersObject(headers).headers,
      tags: tags.map(obj => obj.value),
      https_redirect_status_code: httpsRedirectStatusCode,
      regex_priority: regexPriority,
      strip_path: stripPath,
      preserve_host: preserveHost,
      request_buffering: requestBuffering,
      response_buffering: responseBuffering,
      path_handling: "v0"
    }
    if (route.id) {
      await editRoute(route.id, config);
      return;
    }
    await createRoute(config);
  }

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
                      onClick={() => handleCloseModal({})}
                    />
                  </Tooltip>
                </div>
              </Box>
              <div className={content}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant="h6">General Information</Typography>
                    <Typography variant="body2">General information will help you identify and manage this route</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="name"
                      label="Name"
                      variant="filled"
                      className={field}
                      value={name}
                      onChange={(event) => handleChange(event, setName, (value) => value as string)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StringInputList
                      label="Tags"
                      buttonText="Add"
                      onItemsChange={(items) => handleChange(items, setTags)}
                      initialItems={tags}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                    <Typography variant="h6">Route Configuration</Typography>
                    <Typography variant="body2">Route configuration determines how this route will handle incoming requests</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="filled" className={field}>
                      <InputLabel id="protocols-label">Protocols</InputLabel>
                      <Select
                        labelId="protocols-label"
                        id="protocols"
                        value={protocols}
                        label="Protocols"
                        onChange={(event) => {
                          handleChange(event, setProtocols, (value) => {
                            const selectedProtocol = value as string;
                            setProtocolDescription(getProtocolDescription(selectedProtocol));
                            return selectedProtocol;
                          });
                          handleReset();
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
                      <DynamicFields
                        protocolDescription={protocolDescription}
                        hosts={hosts}
                        paths={paths}
                        snis={snis}
                        headers={headers}
                        sources={sources}
                        destinations={destinations}
                        methods={methods}
                        handleChange={handleChange}
                        setHosts={setHosts}
                        setPaths={setPaths}
                        setSnis={setSnis}
                        setHeaders={setHeaders}
                        setSources={setSources}
                        setDestinations={setDestinations}
                        setMethods={setMethods}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
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
                              onChange={(event) => handleChange(event, setHttpsRedirectStatusCode, (value) => value as number)}
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
                            onChange={(event) => handleChange(event, setRegexPriority, (value) => value as number)}
                            variant="filled"
                            className={field}
                          />
                        </Box>
                        <Box sx={{ p: 2 }}>
                          <FormGroup>
                            <FormControlLabel control={
                              <Checkbox
                                checked={!!stripPath}
                                onChange={(event) => handleChange(event, setStripPath, (_, checked) => checked as boolean)}
                                value={stripPath}
                              />
                            } label="Strip Path" />
                            <FormControlLabel control={
                              <Checkbox
                                checked={!!preserveHost}
                                onChange={(event) => handleChange(event, setPreserveHost, (_, checked) => checked as boolean)}
                                value={preserveHost}
                              />
                            } label="Preserve Host" />
                            <FormControlLabel control={
                              <Checkbox
                                checked={!!requestBuffering}
                                onChange={(event) => handleChange(event, setRequestBuffering, (_, checked) => checked as boolean)}
                                value={requestBuffering}
                              />
                            } label="Request buffering" />
                            <FormControlLabel control={
                              <Checkbox
                                checked={!!responseBuffering}
                                onChange={(event) => handleChange(event, setResponseBuffering, (_, checked) => checked as boolean)}
                                value={responseBuffering}
                              />
                            } label="Response buffering" />
                          </FormGroup>
                        </Box>
                      </Collapse>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={2} direction="row-reverse">
                      <Button variant="contained" color="primary" onClick={handleSaveRoute} disabled={isSaveDisabled}>Save</Button>
                      <Button variant="contained" color="secondary" onClick={() => handleCloseModal({})}>Cancel</Button>
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
