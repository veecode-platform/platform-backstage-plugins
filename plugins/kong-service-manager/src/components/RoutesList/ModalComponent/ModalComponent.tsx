/* eslint-disable no-console */
import React from "react";
import { Box, Button, Card, Checkbox, Collapse, Divider, Fade, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Modal, Paper, Select, TextField, Tooltip, Typography } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { useModalComponentStyles } from "./styles";
import { ModalComponentProps, InputChangeEvent, ItemsChangeEvent, SetState } from "./types";
import { MdClose, MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import StringInputList from '../StringInputList/StringInputList';
import { useKongServiceManagerContext } from '../../../context';
import { convertToHeadersObject } from "../../../utils/helpers/convertoToHeadersObject";
import { RedirectStatusCode } from "../../../utils/enums/KongRouteRedirectStatusCode";
import { Protocols, ProtocolDescriptions } from '../../../utils/enums/KongRouteProtocols';
import DynamicFields from "./DynamicFields";
import { convertToArrayOfObjects, convertToObjArray } from "../../../utils/helpers/convertToArrayOfObjects";
import { prepareDestinations, prepareSources } from "../../../utils/helpers/preparePayload";
import { CreateRoute } from "@veecode-platform/backstage-plugin-kong-service-manager-common";

export const ModalComponent : React.FC<ModalComponentProps> = (props) => {

  const [showFields, setShowFields] = React.useState(false);
  const [name, setName] = React.useState<string>('');
  const [tags, setTags] = React.useState<{ id: string; value: string }[]>([]);
  const [protocols, setProtocols] = React.useState<string>('http,https');
  const [protocolDescription, setProtocolDescription] = React.useState<string>(ProtocolDescriptions.HTTP_HTTPS);
  const [hosts, setHosts] = React.useState<{ id: string; value: string }[]>([]);
  const [paths, setPaths] = React.useState<{ id: string; value: string }[]>([]);
  const [snis, setSnis] = React.useState<{ id: string; value: string }[]>([]);
  const [headers, setHeaders] = React.useState<{ id: string; value: string }[]>([]);
  const [sources, setSources] = React.useState<{ id: string; value: string }[]>([]);
  const [destinations, setDestinations] = React.useState<{ id: string; value: string }[]>([]);
  const [methods, setMethods] = React.useState<string[]>([]);
  const [httpsRedirectStatusCode, setHttpsRedirectStatusCode] = React.useState<number>(426);
  const [regexPriority, setRegexPriority] = React.useState<number>(0);
  const [stripPath, setStripPath] = React.useState<boolean>(true);
  const [preserveHost, setPreserveHost] = React.useState<boolean>(false);
  const [requestBuffering, setRequestBuffering] = React.useState<boolean>(true);
  const [responseBuffering, setResponseBuffering] = React.useState<boolean>(true);
  const { show, handleCloseModal, route, refreshList } = props;
  const { fieldContent, modalOnBlur,modalContent, modalHeader,closeModal,modalBody, container, titleBar, content } = useModalComponentStyles();
  const { createRoute, editRoute, getRoute } = useKongServiceManagerContext();

  
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
    const normalizedProtocol = protocol.replace(/,/g, "_");
    return ProtocolDescriptions[normalizedProtocol.toUpperCase() as keyof typeof ProtocolDescriptions] || "";
  };

  const isSaveDisabled = React.useMemo(() => {
    return !(
      name !== '' &&
      (hosts.length > 0 ||
      paths.length > 0 ||
      snis.length > 0 ||
      headers.length > 0 ||
      sources.length > 0 ||
      destinations.length > 0)
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hosts, paths, snis, headers, sources, destinations, methods]);

  const handleSaveRoute = async ()=> {
    const fields = protocolDescription.split(', ');
    const data = fields.reduce((acc, field) => {
      switch (field.toLowerCase()) {
        case 'hosts':
          acc.hosts = hosts.map(obj => obj.value);
          break;
        case 'paths':
          acc.paths = paths.map(obj => obj.value);
          break;
        case 'snis':
          acc.snis = snis.map(obj => obj.value);
          break;
        case 'headers':
          acc.headers = convertToHeadersObject(headers);
          break;
        case 'sources':
          acc.sources = prepareSources(sources);
          break;
        case 'destinations':
          acc.destinations = prepareDestinations(destinations);
          break;
        case 'methods':
          acc.methods = methods;
          break;
        default:
          break;
      }
      return acc;
    }, {} as { [key: string]: any });

    const config: CreateRoute = {
      name: name.replaceAll(' ', '_'),
      protocols: protocols.split(','),
      tags: tags.map(obj => obj.value),
      https_redirect_status_code: httpsRedirectStatusCode,
      regex_priority: regexPriority,
      strip_path: stripPath,
      preserve_host: preserveHost,
      request_buffering: requestBuffering,
      response_buffering: responseBuffering,
      path_handling: "v0",
      ...data
    }

    try {
      if (route.id) {
        await editRoute(route.id, config);
        refreshList();
        handleCloseModal({});
        return;
      }

      const createResult = await createRoute(config);
      if (createResult) {
        refreshList();
        handleCloseModal({});
      }
    } catch (error) {
      console.error('Error saving route:', error);
    }
  }

  const handleTextClick = () => {
    setShowFields(!showFields);
  };


  React.useEffect(() => {
    if (show && route.id) {
        const fetchData = async () => {
            const response = await getRoute(route.id);
            setName(response?.name || '');
            setTags(convertToArrayOfObjects(response?.tags));
            setProtocols(response?.protocols.toString() || '');
            setHosts(convertToArrayOfObjects(response?.hosts));
            setPaths(convertToArrayOfObjects(response?.paths));
            setSnis(convertToArrayOfObjects(response?.snis));
            setHeaders(convertToObjArray(response?.headers));
            setSources(convertToObjArray(response?.sources));
            setDestinations(convertToObjArray(response?.destinations));
            setMethods(response?.methods || []);
            setHttpsRedirectStatusCode(response?.https_redirect_status_code || 0);
            setRegexPriority(response?.regex_priority || 0);
            setStripPath(response?.strip_path || true);
            setPreserveHost(response?.preserve_host || false);
            setRequestBuffering(response?.request_buffering || true);
            setResponseBuffering(response?.response_buffering || true);
        };
        fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <Modal
      open={show}
      onClose={() => handleCloseModal({})}
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
                      className={fieldContent}
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
                    <FormControl variant="filled" className={fieldContent}>
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
                          <FormControl variant="filled" className={fieldContent}>
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
                            className={fieldContent}
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
