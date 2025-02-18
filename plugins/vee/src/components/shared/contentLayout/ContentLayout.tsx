import React from 'react';
import type { ContentLayoutProps } from './types';
import { useContentLayoutStyles } from './styles';
import { Box, Divider, Typography } from '@material-ui/core';
import { getImagePayload } from '../../../utils/helpers/getImagePayload';

export const ContentLayout: React.FC<ContentLayoutProps> = props => {
  
  const [veeLogo, setVeeLogo] = React.useState<string|null>(null);
  const { title, children } = props;
  const { root, titleBar,titleContent, logo, body } = useContentLayoutStyles();

  React.useEffect(() => {
    const loadImage = async () => {
      const img = await getImagePayload('veecodeAI.png');
      setVeeLogo(img);
    };
    loadImage();
  },[]);

  return (<Box className={root}>
    <div className={titleBar}>
      <div className={titleContent}>
        <Typography variant="h6"> {title} </Typography>
      </div>
      <img src={veeLogo!} alt="" className={logo} />
     </div>
     <Divider/>
    <div className={body}>
     {children}
    </div>
    </Box>);
};
