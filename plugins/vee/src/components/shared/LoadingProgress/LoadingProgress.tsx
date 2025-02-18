import React from 'react'
import { useLoadingProgressStyles } from './styles'
import Lottie from 'react-lottie';
import { getImagePayload } from '../../../utils/helpers/getImagePayload';
import { JsonObject } from '../../../utils/types';

export const LoadingProgress = () => {

  const [starsAnimation, setStarsAnimation] = React.useState<JsonObject|null>(null);
  const {loadingContent} = useLoadingProgressStyles();

  React.useEffect(()=>{
    const loadAnimation = async () => {
      const animation = await getImagePayload('stars.json');
      setStarsAnimation(animation);
    };
    loadAnimation();
  },[])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: starsAnimation!,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  
  return (
    <div className={loadingContent}>
        <Lottie 
          options={defaultOptions}
          height={200}
          width={200}
        />
    </div>
  )
}
