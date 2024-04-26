import React from 'react';
import { UploadFilePickerProps } from "./schema";
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import { useDropzone } from 'react-dropzone';
import { useStyles } from './styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { InfoBox } from '../shared';


export const UploadFilePicker = (props:UploadFilePickerProps) => {
    const { /* onChange, rawErrors, required, formData */ schema } = props;

   const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // const thumbnailURL = await readThumbnailURL(file);


      // eslint-disable-next-line no-console
      console.log(file)
      // onChange(file)
     // setThumbnails([thumbnailURL]);
    }
  };

   const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
   const {uploadWrapper, uploadElement,textUploadElement, uploadedFileWrapper, thumb,iconUpload, removeThumb} = useStyles();


//   const handleRemoveThumbnail = (thumbnailURL: string) => {
//     setThumbnails((prevThumbnails) =>
//       prevThumbnails.filter((url) => url !== thumbnailURL)
//     );
//   };

//   const readThumbnailURL = (file: File): Promise<string> => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const thumbnailURL = event.target?.result as string;
//         resolve(thumbnailURL);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

    // eslint-disable-next-line no-console
    console.log(props.schema.title)

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

        <div className={uploadWrapper}>
        {acceptedFiles.length === 0 ?
          (
            <div {...getRootProps({ className: `${uploadElement} dropzone` })}>
              <input {...getInputProps()} accept=".yaml, .yml, .json"/>
              <CloudUploadIcon className={iconUpload} />
              {acceptedFiles.length === 0 && (
                <div className={textUploadElement}>
                  {isDragActive
                    ? <Typography variant="h6">Drop the file here</Typography>
                    : <Typography variant="h6">Drag and drop a file or <strong>search</strong></Typography>  }
                  <Typography variant="subtitle2">the file must be YAML or JSON</Typography>
                </div>
              )}
            </div>
          )
           : (
              <div className={uploadedFileWrapper}>
                  <InfoBox message="✅ Uploaded File"/>
                  <List className={thumb}>
                    {acceptedFiles.map(file => (
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
                        <ListItemSecondaryAction className={removeThumb}>
                          <RemoveIcon />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
              </div>
            )}
        </div>
      </>
    );

}