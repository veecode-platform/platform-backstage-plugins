import React from 'react';
import Default from '../assets/default.png';
import Box from '@mui/material/Box';

interface PluginImageProps {
  pluginSlug: string;
  className?: string;
  alt?: string;
}

export const PluginImage: React.FC<PluginImageProps> = ({
  pluginSlug,
  className,
  alt,
}) => {
  let imageSrc;
  try {
    const imageLoad = require(`../assets/plugins/kong-inc_${pluginSlug}.png`);
    if (imageLoad) {
      imageSrc = imageLoad;
    } else {
      imageSrc = require(`../assets/plugins/${pluginSlug}.png`);
    }
  } catch (err) {
    imageSrc = Default;
  }

  return <Box component="img" src={imageSrc} alt={alt} className={className} />;
};
