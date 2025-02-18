import { Box, Typography } from '@material-ui/core'
import React from 'react'
import Lottie from 'react-lottie';
import { FeedbackComponentProps } from './types';
import { useFeedbackComponentStyles } from './styles';
import { JsonObject } from '../../../utils/types';
import { getImagePayload } from '../../../utils/helpers/getImagePayload';

const SuccessAnimation = () => {

  const [ successAnimation, setSuccessAnimation ] = React.useState<JsonObject|null>(null);

  React.useEffect(()=>{
    const loadAnimation = async () => {
      const animation = await getImagePayload('success.json');
      setSuccessAnimation(animation);
    };
    loadAnimation();
  },[])

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation!,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
      <Lottie 
	      options={defaultOptions}
        height={150}
        width={150}
      />
  );
}

const ErrorAnimation = () => {

  const [ errorAnimation, setErrorAnimation ] = React.useState<JsonObject|null>(null);

  React.useEffect(()=>{
    const loadAnimation = async () => {
      const animation = await getImagePayload('error.json');
      setErrorAnimation(animation);
    };
    loadAnimation();
  },[]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: errorAnimation!,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
      <Lottie 
	      options={defaultOptions}
        height={80}
        width={90}
      />
  );
}

export const FeedbackComponent : React.FC<FeedbackComponentProps>= (props) => {

  const { variant, message, actions } = props;
  const { blur, root, content, animation, btnGroup } = useFeedbackComponentStyles();

  return (
   <div className={blur}>
    <Box
      className={root}
     > 
      <div className={content}>
         <div className={animation}>
           {variant === "success" ? <SuccessAnimation/> : <ErrorAnimation/>}
          </div>
          <Typography variant="h6" style={{marginLeft: '2rem'}}>{message}</Typography>
      </div>
      {!!actions && (
         <div className={btnGroup}>
         {actions}
         </div>
      )}
    </Box>
    </div>
  )
}
