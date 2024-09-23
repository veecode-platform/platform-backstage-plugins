import React from 'react'
import { SpecCardProps } from './types'
import { useSpecCardStyles } from './styles';
import { Box, Typography } from '@material-ui/core';
import { MdOpenInNew } from 'react-icons/md';
import { FaUser } from 'react-icons/fa6';
import { Link } from '@backstage/core-components';

export const SpecCard : React.FC<SpecCardProps> = (props) => {
  
    const { title, description, owner, setSpec } = props;
    const { root, cardHeader, cardBody, cardFooter } = useSpecCardStyles();

    React.useEffect(()=>{
        if(title){
            setSpec(title)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
    <Box className={root}>
        <div className={cardHeader}>
            <Typography variant="h6">{title}</Typography>
            <Link to={`${title}`}><MdOpenInNew size={26} color="#CDCDCD" style={{ cursor: 'pointer'}}/></Link>
        </div>
        <div className={cardBody}>
            <Typography variant="body1">{description.length <= 3 ? 'No description...' : description}</Typography>
        </div>
        <div className={cardFooter}>
            <div><FaUser /> {owner.split("/")[1]}</div>
        </div>
    </Box>
  )
}
