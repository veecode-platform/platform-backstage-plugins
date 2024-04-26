import React from 'react';
import { UploadFilePickerProps } from "./schema";
import { Box } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { useStyles } from './styles';
import { FileUpload } from './assets/fileUpload';
import RemoveIcon from '@material-ui/icons/Remove';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';


export const UploadFilePicker = (props:UploadFilePickerProps) => {
   // const { onChange, rawErrors, required, formData } = props;

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
   const {uploadWrapper, uploadElement,textUploadElement, thumbsContainer, thumb, removeThumb} = useStyles();


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
    console.log(props)

    return (
      <Box className={uploadWrapper}>
        <div {...getRootProps({ className: `${uploadElement} dropzone` })}>
          <input {...getInputProps()} />
          <FileUpload/>
          <p className={textUploadElement}>
          {isDragActive ? "Drop the file here!" : "Drag the file here or click to upload..."}
          </p>
        </div>
        <aside className={thumbsContainer}>
          <ul className={thumb}>
            {acceptedFiles.map(file => (
              <li key={file.name}>
                <InsertDriveFileIcon/>
                {file.name} - {file.size} bytes
                <span className={removeThumb}>
                    <RemoveIcon/>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </Box>
    );

}