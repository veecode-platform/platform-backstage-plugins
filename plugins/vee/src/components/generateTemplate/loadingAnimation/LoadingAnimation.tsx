import React from "react";
import { LoadingAnimationProps } from "./types";
import { useLoadingAnimationStyles } from "./styles";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Lottie from "react-lottie";
import StarsAnimationData from '../../../assets/stars.json';
import  Typography  from "@mui/material/Typography";

export const LoadingAnimation : React.FC<LoadingAnimationProps> = (props) => {

    const { open, onClose } = props;
    const { root } = useLoadingAnimationStyles();

    const stars = {
        loop: true,
        autoplay: true,
        animationData: StarsAnimationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      }

    return (
        <Backdrop
         className={root}
         open={open}
         onClick={onClose}
        >
          <Box>
            <Lottie
               options={stars}
               height={60}
               width={60}
               style={{position: 'absolute', top: '1.5rem', bottom: '0', right: '1.5rem'}}
              />
            <Typography variant="h6">Generating Template ...</Typography>
          </Box>
        </Backdrop>
    )
}