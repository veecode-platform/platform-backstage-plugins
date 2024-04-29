import React, {useState } from 'react';
import { UploadFilePickerProps } from "./schema";
import { Avatar, Box, Divider, FormControl, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import { useDropzone } from 'react-dropzone';
import { useStyles } from './styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { InfoBox } from '../shared';
import { convertToFile } from './utils';


export const UploadFilePicker = (props:UploadFilePickerProps) => {
  const {  onChange, formData, required, rawErrors, schema } = props;
    const [fileUploaded,setFileUploaded] = useState<File[]>(formData ? [convertToFile(formData)] : [])
    const {uploadWrapper, uploadElement,textUploadElement, uploadedFileWrapper, thumb,iconUpload, removeThumb} = useStyles();

   const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as string;
        onChange(base64Data)
      }
      reader.readAsDataURL(file);
      setFileUploaded([file])  
    }
  };


   const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept:{
    'application/json': ['.json'], 
    'application/x-yaml': ['.yaml', '.yml'] 
   }});


   const handleRemoveItem = (f: File) => {
    const updateFiles = acceptedFiles.filter(fileItem => fileItem.name !== f.name);
    setFileUploaded(updateFiles)
    onChange(undefined)
  };


    return (
      <>
        <Box my={1}>
          <Typography variant="h5">
            {schema.title ?? 'Upload a File'}
          </Typography>
          <Divider />
        </Box>
        <Box my={2}>
          <Typography variant="body1">
            {schema.description ?? 'Drag and drop or click anywhere below and add the file that will be used in the template.'}
          </Typography>
        </Box>

        <FormControl 
          className={uploadWrapper}
          margin="normal"
          required={required}
          error={rawErrors?.length > 0}
          >
        {!formData ?
          (
            <div {...getRootProps({ className: `${uploadElement} dropzone` })}>
              <input {...getInputProps()} />
              <CloudUploadIcon className={iconUpload} />  
                <div className={textUploadElement}>
                  {isDragActive
                    ? <Typography variant="h6">Drop the file here</Typography>
                    : <Typography variant="h6">Drag and drop a file or <strong>search</strong></Typography>  }
                  <Typography variant="subtitle2">the file must be YAML or JSON</Typography>
                </div>   
            </div>
          )
           : (
              <div className={uploadedFileWrapper}>
                  <InfoBox message="✅ Uploaded File"/>
                  <List className={thumb}>
                      {fileUploaded.map(file => (
                          <ListItem key={file.name}>
                            <ListItemAvatar>
                              <Avatar>
                                <InsertDriveFileIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={file.name}
                              secondary={`${file.size} bytes`}
                            />
                            <ListItemSecondaryAction className={removeThumb} onClick={()=>handleRemoveItem(file)}>
                              <RemoveIcon />
                            </ListItemSecondaryAction>
                          </ListItem>
                      ))}
                  </List>
              </div>
            )}
        </FormControl>
      </>
    );

}