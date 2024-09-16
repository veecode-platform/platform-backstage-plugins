import React from 'react'
import { SpecCardProps } from './types'
import { useSpecCardStyles } from './styles';
import { Box, Chip, Typography } from '@material-ui/core';
import { MdOpenInNew } from 'react-icons/md';
import { FaUser } from 'react-icons/fa6';

export const SpecCard : React.FC<SpecCardProps> = (props) => {
  
    const { title, description, owner, tags } = props;
    const { root, cardHeader, cardBody, cardFooter } = useSpecCardStyles();

    return (
    <Box className={root}>
        <div className={cardHeader}>
            <Typography variant="h6">{title}</Typography>
            <MdOpenInNew size={26} color="#CDCDCD" style={{ cursor: 'pointer'}}/>
        </div>
        <div className={cardBody}>
            <Typography variant="body1">{description.length <= 3 ? 'No description...' : description}</Typography>
        </div>
        <div className={cardFooter}>
            <div><FaUser /> {owner}</div>
            <div>
                {tags.map(tag => 
                    <Chip label={tag}/>
                )}
            </div>
        </div>
    </Box>
  )
}
